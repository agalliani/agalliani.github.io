/**
 * post-images.js
 *
 * Post-processing for the <img> tags markdown-it emits, applied at sync time
 * (see sync-blog-content.js) so the committed HTML already carries what the
 * browser and Google need:
 *
 *  - width/height: the intrinsic size, read from the copied file. Without it
 *    the browser can't reserve the box before the bytes arrive, and the text
 *    below jumps when they do — Cumulative Layout Shift, one of the three Core
 *    Web Vitals Google measures.
 *  - loading="lazy" on everything but the first image, which is the one that
 *    can plausibly be in the viewport on load — deferring that one would delay
 *    the very metric lazy loading exists to protect. No fetchpriority: on a
 *    post the LCP element is usually the title, and promoting a mid-article
 *    picture above it would make things worse, not better.
 *  - decoding="async": decoding off the main thread, so a large photo doesn't
 *    block interaction.
 *
 * Alt text is not touched — it comes from the markdown, which is where the
 * author can actually describe the picture.
 *
 * Dimensions are parsed from the file headers directly rather than pulling in
 * an image library: four container formats, a few dozen bytes each.
 */

import fs from 'node:fs';

/** Intrinsic size of a PNG / JPEG / GIF / WebP file, or null if unreadable. */
export function imageSize(file) {
  let buf;
  try {
    buf = fs.readFileSync(file);
  } catch {
    return null;
  }

  // PNG: IHDR is always the first chunk, width/height at a fixed offset.
  if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }

  // GIF: little-endian 16-bit logical screen size in the header.
  if (buf.length > 10 && buf.toString('ascii', 0, 3) === 'GIF') {
    return { width: buf.readUInt16LE(6), height: buf.readUInt16LE(8) };
  }

  // WebP: RIFF container, three sub-formats with different size encodings.
  if (buf.length > 30 && buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') {
    const kind = buf.toString('ascii', 12, 16);
    if (kind === 'VP8 ') {
      return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
    }
    if (kind === 'VP8L') {
      const bits = buf.readUInt32LE(21);
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
    if (kind === 'VP8X') {
      const dim = (o) => 1 + (buf[o] | (buf[o + 1] << 8) | (buf[o + 2] << 16));
      return { width: dim(24), height: dim(27) };
    }
    return null;
  }

  // JPEG: walk the marker segments to the start-of-frame, which is the only
  // one that carries the size. Segment lengths let us skip the payloads.
  if (buf.length > 4 && buf.readUInt16BE(0) === 0xffd8) {
    let offset = 2;
    while (offset + 9 < buf.length) {
      if (buf[offset] !== 0xff) {
        offset += 1; // resync on padding between segments
        continue;
      }
      const marker = buf[offset + 1];
      // SOF0..SOF15, minus the DHT/JPG/DAC markers that share the range.
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return { height: buf.readUInt16BE(offset + 5), width: buf.readUInt16BE(offset + 7) };
      }
      offset += 2 + buf.readUInt16BE(offset + 2);
    }
  }

  return null;
}

/**
 * Adds size and loading hints to every local <img> in a rendered post body.
 *
 * @param html rendered post HTML, image paths already rewritten to /images/...
 * @param publicDir the site's `public/` directory, where those paths resolve.
 */
export function enhancePostImages(html, publicDir) {
  let index = 0;
  return html.replace(/<img\s([^>]*?)>/g, (tag, attrs) => {
    const src = /src="([^"]+)"/.exec(attrs)?.[1];
    // Remote images: no file to measure, and no control over their delivery.
    if (!src || !src.startsWith('/')) return tag;

    const first = index === 0;
    index += 1;

    const extra = [];
    if (!/\bwidth=/.test(attrs)) {
      const size = imageSize(`${publicDir}${src}`);
      if (size) extra.push(`width="${size.width}"`, `height="${size.height}"`);
    }
    if (!/\bloading=/.test(attrs) && !first) extra.push('loading="lazy"');
    if (!/\bdecoding=/.test(attrs)) extra.push('decoding="async"');

    return extra.length ? `<img ${attrs} ${extra.join(' ')}>` : tag;
  });
}
