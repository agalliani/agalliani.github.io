// The English tree is only worth having if it is *served* as English: a crawler
// reads the raw response and never runs the app. These specs use cy.request so
// they assert the prerendered HTML on disk, not the hydrated DOM — the one thing
// cy.visit could never tell apart.

const SITE = 'https://andreagalliani.com'

const pairs = [
  { it: '/', en: '/en' },
  { it: '/projects', en: '/en/projects' },
  { it: '/blog', en: '/en/blog' },
  {
    // Localized slugs: the English URL is a real English slug, not the
    // Italian one wearing an /en prefix — see LocalizedBlogPost.langPaths.
    it: '/blog/mandare-un-pezzo-di-me-in-stratosfera',
    en: '/en/blog/send-a-piece-of-myself-to-the-stratosphere',
  },
]

describe('prerendered language trees', () => {
  pairs.forEach(({ it: itPath, en: enPath }) => {
    it(`serves ${enPath} as English HTML with reciprocal hreflang`, () => {
      cy.request(enPath).its('body').then((html: string) => {
        expect(html, 'html lang').to.contain('<html lang="en"')
        expect(html, 'self-referencing canonical').to.contain(
          `<link rel="canonical" href="${SITE}${enPath}">`,
        )
        expect(html, 'alternate it').to.contain(`hreflang="it" href="${SITE}${itPath}"`)
        expect(html, 'alternate en').to.contain(`hreflang="en" href="${SITE}${enPath}"`)
        expect(html, 'x-default points at Italian').to.contain(
          `hreflang="x-default" href="${SITE}${itPath}"`,
        )
      })
    })

    it(`serves ${itPath} as Italian HTML`, () => {
      cy.request(itPath).its('body').then((html: string) => {
        expect(html, 'html lang').to.contain('<html lang="it"')
        expect(html, 'self-referencing canonical').to.contain(
          `<link rel="canonical" href="${SITE}${itPath}">`,
        )
      })
    })
  })

  it('translates the post body, not just the chrome', () => {
    cy.request('/en/blog/send-a-piece-of-myself-to-the-stratosphere')
      .its('body')
      .should('contain', 'In third grade I wrote')
    cy.request('/blog/mandare-un-pezzo-di-me-in-stratosfera')
      .its('body')
      .should('contain', 'In terza elementare')
  })

  it('keeps navigation inside the language tree', () => {
    cy.visit('/en')
    cy.get('nav a[href="/en/blog"]').click()
    cy.location('pathname').should('eq', '/en/blog')
    cy.contains('a', 'I want to send a piece of myself to the stratosphere').click()
    cy.location('pathname').should('eq', '/en/blog/send-a-piece-of-myself-to-the-stratosphere')
  })

  // Note: the 301 from the old pre-localization English URL to the new slug
  // is a vercel.json `redirects` rule — Vercel-only routing that `vite
  // preview` doesn't emulate, so it can't be asserted by this local Cypress
  // suite. Verify manually against the production deployment instead:
  //   curl -sI https://andreagalliani.com/en/blog/mandare-un-pezzo-di-me-in-stratosfera

  it('lists both languages in the sitemap', () => {
    cy.request('/sitemap.xml').its('body').then((xml: string) => {
      expect(xml).to.contain(`<loc>${SITE}/en/blog</loc>`)
      expect(xml).to.contain(`<loc>${SITE}/blog</loc>`)
      expect(xml).to.contain('xmlns:xhtml')
    })
  })
})
