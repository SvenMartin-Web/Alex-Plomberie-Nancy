const header = document.getElementById('header');
const burger = document.getElementById('burger');
const mobileNav = document.getElementById('mobileNav');
const form = document.getElementById('contactForm');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

burger.addEventListener('click', (event) => {
  event.stopPropagation();
  mobileNav.classList.toggle('open');
});

function closeNav() {
  mobileNav.classList.remove('open');
}

window.closeNav = closeNav;

document.addEventListener('click', (event) => {
  if (!mobileNav.contains(event.target) && !burger.contains(event.target)) {
    mobileNav.classList.remove('open');
  }
});

const revealElements = document.querySelectorAll('.service-card, .commitment-card, .image-mosaic figure, .contact-lines a, .contact-lines span');
revealElements.forEach((element) => element.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const delay = Number(entry.target.dataset.delay || 0);
      setTimeout(() => entry.target.classList.add('visible'), delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach((element) => observer.observe(element));

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const nom = document.getElementById('nom').value.trim();
  const tel = document.getElementById('tel').value.trim();
  const email = document.getElementById('email').value.trim();
  const service = document.getElementById('service').value.trim();
  const message = document.getElementById('message').value.trim();

  const subject = encodeURIComponent(`Demande de devis - ${service || 'Plomberie'}`);
  const body = encodeURIComponent(
    `Bonjour Alex Plomberie Nancy,\n\n` +
    `Je souhaite vous contacter pour : ${service || 'une demande de plomberie'}.\n\n` +
    `Nom : ${nom}\n` +
    `Téléphone : ${tel || 'Non renseigné'}\n` +
    `Email : ${email}\n\n` +
    `Message :\n${message || 'Non renseigné'}\n\n` +
    `Merci de me recontacter.\n`
  );

  window.location.href = `mailto:alexdel54@hotmail.fr?subject=${subject}&body=${body}`;
});
