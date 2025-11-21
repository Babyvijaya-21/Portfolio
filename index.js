// Year in footer
const yearEl = document.getElementById('year');
if(yearEl) yearEl.textContent = new Date().getFullYear();

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', function(e){
    // allow external anchors (like #) to work if needed
    const href = this.getAttribute('href');
    if(!href || href === '#') return;
    if(href.startsWith('#')){
      const target = document.querySelector(href);
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
        // close mobile nav if open
        const navList = document.getElementById('nav-list');
        if(navList && window.getComputedStyle(navList).display === 'flex' && navList.classList.contains('open')){
          navList.classList.remove('open');
          document.getElementById('nav-toggle').setAttribute('aria-expanded','false');
        }
      }
    }
  });
});

// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const navList = document.getElementById('nav-list');
if(navToggle && navList){
  navToggle.addEventListener('click', ()=>{
    const open = navList.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
    navList.style.display = open ? 'flex' : 'none';
  });
  // ensure initial state on resize
  window.addEventListener('resize', ()=>{
    if(window.innerWidth > 980){
      navList.style.display = 'flex';
      navList.classList.remove('open');
      navToggle.setAttribute('aria-expanded','false');
    } else {
      navList.style.display = 'none';
    }
  });
  // set initial state
  if(window.innerWidth <= 980) navList.style.display = 'none';
}

// Reveal on scroll
const revealObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
},{threshold: 0.12});

document.querySelectorAll('.card, .skill, .project, .timeline-item').forEach(el=>{
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// Contact form demo handler
const contactForm = document.getElementById('contact-form');
if(contactForm){
  contactForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    alert('Thanks — message sent (demo).');
    contactForm.reset();
  });
}
