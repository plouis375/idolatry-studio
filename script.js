const toggle = document.querySelector('.menu-toggle')
const nav = document.querySelector('.site-nav')

const floatingTop = document.querySelector('.floating-top')
const updateFloatingTop = () => {
  const visible = window.scrollY > 480
  floatingTop?.classList.toggle('is-visible', visible)
  floatingTop?.setAttribute('aria-hidden', String(!visible))
  if (floatingTop) floatingTop.tabIndex = visible ? 0 : -1
}
window.addEventListener('scroll', updateFloatingTop, { passive: true })
updateFloatingTop()
floatingTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }))

toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true'
  toggle.setAttribute('aria-expanded', String(!open))
  toggle.setAttribute('aria-label', open ? 'Ouvrir le menu' : 'Fermer le menu')
  nav?.classList.toggle('is-open', !open)
})

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  toggle?.setAttribute('aria-expanded', 'false')
  toggle?.setAttribute('aria-label', 'Ouvrir le menu')
  nav.classList.remove('is-open')
}))

document.querySelectorAll('[data-map-url]').forEach((button) => button.addEventListener('click', () => {
  const frame = document.createElement('iframe')
  frame.title = 'Carte pour rejoindre Idolatry Studio à Ivry-sur-Seine'
  frame.src = button.dataset.mapUrl
  frame.loading = 'lazy'
  frame.referrerPolicy = 'no-referrer-when-downgrade'
  button.replaceWith(frame)
}))

document.querySelectorAll('[data-package]').forEach((link) => link.addEventListener('click', () => {
  const purpose = document.querySelector('#contact-purpose')
  if (purpose) purpose.value = link.dataset.package
}))

document.querySelector('#contact-form')?.addEventListener('submit', (event) => {
  event.preventDefault()
  const form = event.currentTarget
  const values = new FormData(form)
  const subject = `Demande Idolatry Studio — ${values.get('purpose')}`
  const body = [
    `Nom : ${values.get('name')}`,
    `E-mail : ${values.get('email')}`,
    `Demande : ${values.get('purpose')}`,
    `Date souhaitée : ${values.get('date') || 'À préciser'}`,
    '',
    String(values.get('message')),
  ].join('\n')
  window.location.href = `mailto:production@idolatry.tv?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
})

document.querySelector('#year').textContent = String(new Date().getFullYear())

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.12 })
  document.querySelectorAll('.intro-grid, .studio-gallery-intro, .studio-photo, .plans-copy, .plan-image, .pricing-heading, .equipment-intro, .price-card, .work-card, .work-aside, .access-copy, .map-frame, .contact-main, .contact-form').forEach((item) => {
    item.classList.add('reveal')
    observer.observe(item)
  })
}
