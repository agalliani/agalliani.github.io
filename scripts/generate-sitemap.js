import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');
const hostname = 'https://agalliani.github.io';

const routes = [
    { path: '/', changefreq: 'weekly', priority: '1.0' },
    { path: '/about', changefreq: 'monthly', priority: '0.8' },
    { path: '/timeline-me/', changefreq: 'monthly', priority: '0.9' },
    { path: '/frontend-oxymeter/', changefreq: 'monthly', priority: '0.9' },
    { path: '/scientific_academic_cv_eng.pdf', changefreq: 'monthly', priority: '0.7' }
];

const generateSitemap = () => {
    const date = new Date().toISOString();

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${hostname}${route.path}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml);
    console.log('✅ Generated sitemap.xml');
};

const generateRobots = () => {
    const robots = `User-agent: *
Allow: /

Sitemap: ${hostname}/sitemap.xml`;

    fs.writeFileSync(path.join(distDir, 'robots.txt'), robots);
    console.log('✅ Generated robots.txt');
};

if (fs.existsSync(distDir)) {
    generateSitemap();
    generateRobots();
} else {
    console.error('❌ Dist directory not found. Run build first.');
    process.exit(1);
}
