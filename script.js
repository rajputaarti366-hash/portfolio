// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');
if(navToggle){
  navToggle.addEventListener('click', ()=>{
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navList.classList.toggle('show');
  });
}
// Close mobile nav when a link is clicked
if(navList){
  navList.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click', ()=>{
      if(navList.classList.contains('show')){
        navList.classList.remove('show');
        navToggle.setAttribute('aria-expanded','false');
      }
    });
  });
}
// Close nav with Escape key
document.addEventListener('keydown',(e)=>{
  if(e.key === 'Escape' && navList.classList.contains('show')){
    navList.classList.remove('show');
    navToggle.setAttribute('aria-expanded','false');
  }
});

// Reveal on scroll using IntersectionObserver
const revealTargets = [
  ...document.querySelectorAll('.reveal'),
  ...document.querySelectorAll('.section-title, .about-box, .skill-card, .experience-card, .contact-card, .project-card')
];

const reveals = [...new Set(revealTargets)];

reveals.forEach((el, index) => {
  el.classList.add('reveal');
  if(!el.dataset.delay){
    el.style.transitionDelay = `${Math.min(index * 45, 320)}ms`;
  }
});

if('IntersectionObserver' in window && reveals.length){
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const el = entry.target;
        const delay = el.dataset.delay || '0s';
        el.style.transitionDelay = delay;
        el.classList.add('show');
        io.unobserve(el);
      }
    });
  },{threshold:0.14, rootMargin:'0px 0px -8% 0px'});
  reveals.forEach(r=>io.observe(r));
} else {
  // fallback: just show
  reveals.forEach(r=>r.classList.add('show'));
}

// Navbar shrink on scroll
const nav = document.querySelector('nav');
const headerOffset = 60;
window.addEventListener('scroll', ()=>{
  if(window.scrollY > headerOffset){
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Subtle parallax for the hero visuals and background glows
const heroImage = document.querySelector('.hero-image img');
const glow1 = document.querySelector('.blur1');
const glow2 = document.querySelector('.blur2');
let ticking = false;

function updateParallax(){
  const offset = window.scrollY;
  if(heroImage){
    heroImage.style.transform = `translateY(${Math.min(offset * 0.06, 22)}px) scale(${1 + Math.min(offset * 0.00012, 0.02)})`;
  }
  if(glow1){
    glow1.style.transform = `translate(${Math.min(offset * 0.02, 36)}px, ${Math.min(offset * 0.03, 48)}px)`;
  }
  if(glow2){
    glow2.style.transform = `translate(${Math.min(offset * -0.02, -36)}px, ${Math.min(offset * -0.03, -48)}px)`;
  }
  ticking = false;
}

window.addEventListener('scroll', ()=>{
  if(!ticking){
    window.requestAnimationFrame(updateParallax);
    ticking = true;
  }
});

// Active link highlighting based on section in view
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
if('IntersectionObserver' in window && sections.length){
  const sectionObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const id = entry.target.id;
        navLinks.forEach(a=>a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
      }
    });
  },{threshold:0.55});
  sections.forEach(s=>sectionObserver.observe(s));
}
