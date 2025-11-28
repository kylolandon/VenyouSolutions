// -------------------- Fade-in on scroll (for sections) --------------------
const faders = document.querySelectorAll('.fade-in');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

faders.forEach(f => fadeObserver.observe(f));


// -------------------- Parallax gradient --------------------
const bg = document.querySelector('.bg-gradient');
window.addEventListener('scroll', () => {
  if (!bg) return;
  bg.style.transform = `translateY(${window.scrollY * 0.15}px)`;
});


// -------------------- Smooth anchor scrolling --------------------
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else {
      // if href="#top" or '#', scroll to top
      if (href === '#top' || href === '#') window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // if mobile nav open, close it when a link is clicked
    if (mobileNav && mobileNav.style.display === 'flex') {
      toggleMobile(false);
    }
  });
});


// -------------------- Mobile menu toggle --------------------
const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');

function toggleMobile(open) {
  if (!mobileNav || !menuBtn) return;
  const isOpen = (typeof open === 'boolean') ? open : (mobileNav.style.display !== 'flex');
  if (isOpen) {
    mobileNav.style.display = 'flex';
    mobileNav.setAttribute('aria-hidden', 'false');
    menuBtn.setAttribute('aria-expanded', 'true');
    // animate burger -> X
    menuBtn.classList.add('open');
    menuBtn.querySelector('.bar1').style.transform = 'rotate(45deg) translate(4px, 4px)';
    menuBtn.querySelector('.bar2').style.opacity = '0';
    menuBtn.querySelector('.bar3').style.transform = 'rotate(-45deg) translate(4px, -4px)';
  } else {
    // close
    mobileNav.style.opacity = '0';
    menuBtn.setAttribute('aria-expanded', 'false');
    setTimeout(() => {
      mobileNav.style.display = 'none';
      mobileNav.style.opacity = '';
    }, 180);
    menuBtn.classList.remove('open');
    menuBtn.querySelector('.bar1').style.transform = '';
    menuBtn.querySelector('.bar2').style.opacity = '';
    menuBtn.querySelector('.bar3').style.transform = '';
    mobileNav.setAttribute('aria-hidden', 'true');
  }
}

if (menuBtn) {
  menuBtn.addEventListener('click', () => toggleMobile());
}


// -------------------- Logo click scroll to top --------------------
const logoLink = document.getElementById('logo-link');
if (logoLink) {
  logoLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // also close mobile menu if open
    if (mobileNav && mobileNav.style.display === 'flex') toggleMobile(false);
  });
}


// -------------------- Rotating hero text (Option B) --------------------
const heroSets = Array.from(document.querySelectorAll('.hero-set'));
let heroIndex = 0;
const IN_DURATION = 900;   // ms
const OUT_DURATION = 900;  // ms
const TOTAL_DURATION = 7000; // per set (including in + hold + out)

function showHero(index) {
  heroSets.forEach((el, i) => {
    el.classList.remove('is-in', 'is-out');
    // keep hidden; visible only when in
  });
  const el = heroSets[index];
  // start in animation
  el.classList.add('is-in');
  // schedule out animation
  setTimeout(() => {
    el.classList.remove('is-in');
    el.classList.add('is-out');
  }, TOTAL_DURATION - OUT_DURATION); // start out before switching
}

function startHeroRotation() {
  if (!heroSets.length) return;
  // show first immediately
  showHero(heroIndex);

  // then cycle
  setInterval(() => {
    heroIndex = (heroIndex + 1) % heroSets.length;
    showHero(heroIndex);
  }, TOTAL_DURATION);
}

document.addEventListener('DOMContentLoaded', () => {
  // small safety: ensure the first state is visible quickly
  if (heroSets.length) {
    // show first with slight delay so CSS has applied
    setTimeout(() => {
      startHeroRotation();
    }, 120);
  }
});
