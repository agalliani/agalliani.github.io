/// <reference types="cypress" />

// Analytics is fire-and-forget, so the only thing worth asserting is what we
// push into `dataLayer` — gtag.js itself is Google's problem. Each test stubs
// nothing: the real inline snippet in index.html runs, and we read back the
// queue it fills.

type DataLayerEntry = IArguments | unknown[]

/** Events pushed as gtag('event', name, params). */
function events(win: Cypress.AUTWindow) {
  const layer = (win as unknown as { dataLayer?: DataLayerEntry[] }).dataLayer ?? []
  return Array.from(layer)
    .map((entry) => Array.from(entry as ArrayLike<unknown>))
    .filter((args) => args[0] === 'event')
    .map((args) => ({ name: args[1] as string, params: (args[2] ?? {}) as Record<string, unknown> }))
}

function consentUpdates(win: Cypress.AUTWindow) {
  const layer = (win as unknown as { dataLayer?: DataLayerEntry[] }).dataLayer ?? []
  return Array.from(layer)
    .map((entry) => Array.from(entry as ArrayLike<unknown>))
    .filter((args) => args[0] === 'consent' && args[1] === 'update')
    .map((args) => args[2] as Record<string, string>)
}

describe('analytics', () => {
  describe('consent banner', () => {
    it('asks on first visit and remembers "accept"', () => {
      cy.visit('/')
      cy.contains('button', 'Accetta').should('be.visible')

      // Nothing is granted until the visitor says so.
      cy.window().then((win) => expect(consentUpdates(win)).to.have.length(0))

      cy.contains('button', 'Accetta').click()
      cy.contains('button', 'Accetta').should('not.exist')
      cy.window().then((win) => {
        expect(win.localStorage.getItem('ag-consent')).to.eq('granted')
        expect(consentUpdates(win).at(-1)).to.include({ analytics_storage: 'granted' })
      })

      cy.reload()
      cy.contains('button', 'Accetta').should('not.exist')
    })

    it('remembers "reject" and keeps analytics_storage denied', () => {
      cy.visit('/')
      cy.contains('button', 'Rifiuta').click()
      cy.window().then((win) => {
        expect(win.localStorage.getItem('ag-consent')).to.eq('denied')
        expect(consentUpdates(win).at(-1)).to.include({ analytics_storage: 'denied' })
      })
      cy.reload()
      cy.contains('button', 'Rifiuta').should('not.exist')
    })
  })

  describe('pageviews', () => {
    beforeEach(() => {
      // Pre-decide so the fixed banner never sits on top of a click target.
      cy.visit('/', {
        onBeforeLoad: (win) => win.localStorage.setItem('ag-consent', 'granted'),
      })
    })

    it('sends exactly one page_view per view, titled correctly', () => {
      cy.window().then((win) => {
        const views = events(win).filter((e) => e.name === 'page_view')
        expect(views).to.have.length(1)
        expect(views[0].params.page_path).to.eq('/')
      })

      cy.contains('a', 'Blog').first().click()
      cy.location('pathname').should('eq', '/blog')
      cy.window().then((win) => {
        const views = events(win).filter((e) => e.name === 'page_view')
        expect(views).to.have.length(2)
        expect(views[1].params.page_path).to.eq('/blog')
        // The nextTick in main.ts is what keeps this from being the home title.
        expect(String(views[1].params.page_title)).to.contain('Blog')
      })
    })
  })

  describe('interaction events', () => {
    beforeEach(() => {
      cy.visit('/', {
        onBeforeLoad: (win) => win.localStorage.setItem('ag-consent', 'granted'),
      })
    })

    it('tracks the language toggle', () => {
      cy.get('nav button').click()
      cy.window().then((win) => {
        const ev = events(win).find((e) => e.name === 'language_switch')
        expect(ev?.params.to).to.eq('en')
      })
    })

    it('tracks an outbound click in Selected work without blocking navigation', () => {
      // target=_blank would open a tab in the runner; strip it and stop the
      // navigation — the handler under test runs either way.
      cy.get('#work a[target="_blank"]').first().invoke('removeAttr', 'target').then(($a) => {
        cy.wrap($a).invoke('attr', 'href').as('href')
      })
      cy.get('#work a').first().click()
      cy.window().then((win) => {
        const ev = events(win).find((e) => e.name === 'outbound_click')
        expect(ev, 'outbound_click was sent').to.exist
        expect(ev?.params.context).to.eq('featured_work')
      })
    })

    it('tracks the email link as a contact conversion', () => {
      cy.get('#contact a[href^="mailto:"]').click()
      cy.window().then((win) => {
        const ev = events(win).find((e) => e.name === 'contact_click')
        expect(ev?.params.method).to.eq('email')
      })
    })

    it('tracks a hero CTA', () => {
      cy.get('#hero a, header + section a').first().click({ force: true })
      cy.window().then((win) => {
        expect(events(win).some((e) => e.name === 'cta_click')).to.be.true
      })
    })
  })

  describe('blog engagement', () => {
    it('fires each scroll_depth threshold once, then read_complete', () => {
      cy.visit('/blog', {
        onBeforeLoad: (win) => win.localStorage.setItem('ag-consent', 'granted'),
      })
      cy.get('main a').first().click()
      cy.get('.post-body').should('exist')

      cy.scrollTo('bottom', { duration: 400 })
      cy.scrollTo('top', { duration: 200 })
      cy.scrollTo('bottom', { duration: 400 })

      cy.window().then((win) => {
        const depths = events(win)
          .filter((e) => e.name === 'scroll_depth')
          .map((e) => e.params.percent)
        // Once each, despite scrolling down → up → down.
        expect(depths).to.deep.eq([25, 50, 75, 100])
        expect(events(win).filter((e) => e.name === 'read_complete')).to.have.length(1)
      })
    })

    it('tracks outbound links inside the post body', () => {
      cy.visit('/blog', {
        onBeforeLoad: (win) => win.localStorage.setItem('ag-consent', 'granted'),
      })
      cy.get('main a').first().click()

      cy.get('.post-body').then(($body) => {
        const external = $body.find('a').filter((_, a) => a.hostname !== window.location.hostname)
        if (!external.length) {
          cy.log('no outbound links in this post — nothing to assert')
          return
        }
        cy.wrap(external.first()).invoke('removeAttr', 'target').click()
        cy.window().then((win) => {
          const ev = events(win).find((e) => e.params.context === 'post_body')
          expect(ev?.name).to.eq('outbound_click')
        })
      })
    })
  })
})
