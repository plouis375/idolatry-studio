const language = document.documentElement.lang || 'fr'
const copy = language === 'fr'
  ? { open:'Ouvrir le menu', close:'Fermer le menu', subject:'Demande Idolatry Studio', name:'Nom', email:'E-mail', purpose:'Demande', date:'Date souhaitée', specify:'À préciser', source:'Nous a connus', link:'Lien suivi', map:'Carte pour rejoindre Idolatry Studio à Ivry-sur-Seine' }
  : { open:'Open menu', close:'Close menu', subject:'Idolatry Studio enquiry', name:'Name', email:'Email', purpose:'Enquiry', date:'Preferred date', specify:'To be confirmed', source:'Heard about us', link:'Tracked link', map:'Map to Idolatry Studio in Ivry-sur-Seine' }

window.dataLayer = window.dataLayer || []
function gtag(){window.dataLayer.push(arguments)}
gtag('js', new Date())
gtag('config', 'AW-1031371802')
const toggle = document.querySelector('.menu-toggle')
const nav = document.querySelector('.site-nav')

const lightbox = document.querySelector('#studio-lightbox')
const galleryFigures = [...document.querySelectorAll('.studio-gallery .studio-photo')]
const lightboxImage = lightbox?.querySelector('.lightbox-image')
const lightboxCaption = lightbox?.querySelector('.lightbox-caption')
const lightboxCount = lightbox?.querySelector('.lightbox-count')
let currentGalleryIndex = 0

const showGalleryImage = (index) => {
  if (!lightbox || !lightboxImage || !galleryFigures.length) return
  currentGalleryIndex = (index + galleryFigures.length) % galleryFigures.length
  const figure = galleryFigures[currentGalleryIndex]
  const image = figure.querySelector('img')
  lightboxImage.src = image.currentSrc || image.src
  lightboxImage.alt = image.alt
  lightboxCaption.textContent = figure.querySelector('figcaption')?.textContent || image.alt
  lightboxCount.textContent = `${currentGalleryIndex + 1} / ${galleryFigures.length}`
}

galleryFigures.forEach((figure, index) => {
  figure.querySelector('.studio-photo-trigger')?.addEventListener('click', () => {
    showGalleryImage(index)
    lightbox?.showModal()
    lightbox?.querySelector('.lightbox-close')?.focus()
  })
})

lightbox?.querySelector('.lightbox-close')?.addEventListener('click', () => lightbox.close())
lightbox?.querySelector('.lightbox-prev')?.addEventListener('click', () => showGalleryImage(currentGalleryIndex - 1))
lightbox?.querySelector('.lightbox-next')?.addEventListener('click', () => showGalleryImage(currentGalleryIndex + 1))
lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close()
})
lightbox?.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') showGalleryImage(currentGalleryIndex - 1)
  if (event.key === 'ArrowRight') showGalleryImage(currentGalleryIndex + 1)
})

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
  toggle.setAttribute('aria-label', open ? copy.open : copy.close)
  nav?.classList.toggle('is-open', !open)
})

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  toggle?.setAttribute('aria-expanded', 'false')
  toggle?.setAttribute('aria-label', copy.open)
  nav.classList.remove('is-open')
}))

document.querySelectorAll('.map-frame iframe').forEach((frame) => { frame.title = copy.map })

document.querySelectorAll('[data-package]').forEach((link) => link.addEventListener('click', () => {
  const purpose = document.querySelector('#contact-purpose')
  if (purpose) purpose.value = link.dataset.package
}))

document.querySelector('#contact-form')?.addEventListener('submit', (event) => {
  event.preventDefault()
  gtag('event', 'conversion', { send_to: 'AW-1031371802/bpogCOC28J0dEJr45esD' })
  const form = event.currentTarget
  const values = new FormData(form)
  // Paramètres utm_* de l'adresse, pour savoir quelle publicité a amené la demande
  const tracking = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'].map((key) => new URLSearchParams(window.location.search).get(key)).filter(Boolean).join(' / ')
  const subject = `${copy.subject} — ${values.get('purpose')}`
  const body = [
    `${copy.name}: ${values.get('name')}`,
    `${copy.email}: ${values.get('email')}`,
    `${copy.purpose}: ${values.get('purpose')}`,
    `${copy.date}: ${values.get('date') || copy.specify}`,
    `${copy.source}: ${values.get('source') || copy.specify}`,
    ...(tracking ? [`${copy.link}: ${tracking}`] : []),
    '',
    String(values.get('message')),
  ].join('\n')
  window.location.href = `mailto:studio@idolatry.paris?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
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
