/* ==========================================================================
   INTERACTIVE LOGIC - ABY INTERNATIONAL TRAVEL
   ========================================================================== */

// --- CONFIGURATION ---
// To receive contact and booking submissions in your Gmail (abyinternationaltravels@gmail.com):
// 1. Visit https://web3forms.com and obtain a free Access Key for abyinternationaltravels@gmail.com.
// 2. Paste your Access Key below.
const WEB3FORMS_ACCESS_KEY = "345c6e0c-561e-45bd-8ad0-16b69b9e83a7";

document.addEventListener('DOMContentLoaded', () => {

  // --- MOBILE HAMBURGER MENU ---
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link, .nav-cta');
  
  // Create backdrop element dynamically
  const navBackdrop = document.createElement('div');
  navBackdrop.className = 'nav-backdrop';
  document.body.appendChild(navBackdrop);

  const toggleMenu = (forceClose = false) => {
    if (!hamburger || !navMenu) return;
    
    if (forceClose || hamburger.classList.contains('active')) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      navBackdrop.classList.remove('active');
      document.body.classList.remove('menu-open');
    } else {
      hamburger.classList.add('active');
      navMenu.classList.add('active');
      navBackdrop.classList.add('active');
      document.body.classList.add('menu-open');
    }
  };

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggleMenu(true);
      });
    });

    // Close menu when clicking outside / on backdrop
    navBackdrop.addEventListener('click', () => {
      toggleMenu(true);
    });
  }

  // --- STICKY GLASSMORPHIC NAVBAR ---
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });


  // --- INTERSECTION OBSERVER FOR SCROLL REVEALS ---
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Reveal once
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealCallback, {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });


  // --- STATS COUNT-UP ANIMATION ---
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const countUp = (element) => {
    const target = parseInt(element.getAttribute('data-target'), 10);
    const duration = 2000; // 2 seconds
    const stepTime = Math.abs(Math.floor(duration / target));
    let current = 0;
    
    // Fallback if target is 0 or NaN
    if (isNaN(target) || target <= 0) return;

    const timer = setInterval(() => {
      current += 1;
      
      // Format number (e.g. adding + or % if needed from suffixes)
      const suffix = element.getAttribute('data-suffix') || '';
      element.textContent = current + suffix;
      
      if (current >= target) {
        element.textContent = target + suffix;
        clearInterval(timer);
      }
    }, Math.max(stepTime, 15));
  };

  const statsSection = document.getElementById('stats-section');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          statNumbers.forEach(stat => countUp(stat));
          observer.unobserve(entry.target); // Run once
        }
      });
    }, { threshold: 0.3 });
    
    statsObserver.observe(statsSection);
  }


  // --- TESTIMONIALS CAROUSEL ---
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  let currentSlide = 0;
  let carouselInterval;

  const showSlide = (index) => {
    if (slides.length === 0) return;
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  };

  const nextSlide = () => {
    showSlide(currentSlide + 1);
  };

  const startCarousel = () => {
    if (slides.length > 0) {
      carouselInterval = setInterval(nextSlide, 6000); // Rotate every 6 seconds
    }
  };

  const stopCarousel = () => {
    clearInterval(carouselInterval);
  };

  // Add click events to dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      stopCarousel();
      showSlide(index);
      startCarousel();
    });
  });

  // Init Carousel
  if (slides.length > 0) {
    showSlide(0);
    startCarousel();
  }


  // --- FLIGHT BOOKING WIZARD OVERLAY ---
  const bookingOverlay = document.getElementById('booking-overlay');
  const btnCloseBooking = document.getElementById('btn-close-booking');
  const planeSwipeBg = document.getElementById('plane-swipe-bg');
  const planeSwipeGraphic = document.getElementById('plane-swipe-graphic');
  
  // CTAs that trigger the wizard
  const bookingCTAs = [
    document.getElementById('cta-nav-book'),
    document.getElementById('cta-hero-book'),
    document.getElementById('link-service-flights')
  ];

  // Forms and panels
  const formStep1 = document.getElementById('form-booking-step-1');
  const formStep2 = document.getElementById('form-booking-step-2');
  
  const panelStep1 = document.getElementById('panel-booking-step-1');
  const panelStep2 = document.getElementById('panel-booking-step-2');
  const panelStep3 = document.getElementById('panel-booking-step-3');
  
  const progStep1 = document.getElementById('prog-step-1');
  const progStep2 = document.getElementById('prog-step-2');
  const progStep3 = document.getElementById('prog-step-3');
  
  const btnBackStep2 = document.getElementById('btn-back-step-2');
  const btnFinishBooking = document.getElementById('btn-finish-booking');

  // Input elements
  const bookingCountry = document.getElementById('booking-country');
  const bookingAirline = document.getElementById('booking-airline');
  const bookingDate = document.getElementById('booking-date');
  
  const passengerName = document.getElementById('passenger-name');
  const passengerPhone = document.getElementById('passenger-phone');
  const passengerEmail = document.getElementById('passenger-email');
  const passengerPassport = document.getElementById('passenger-passport');
  const passengerPassportExpiry = document.getElementById('passenger-passport-expiry');

  // Ticket Output elements
  const ticketOutName = document.getElementById('ticket-out-name');
  const ticketOutPassport = document.getElementById('ticket-out-passport');
  const ticketOutDestination = document.getElementById('ticket-out-destination');
  const ticketOutAirline = document.getElementById('ticket-out-airline');
  const ticketOutDate = document.getElementById('ticket-out-date');
  const ticketOutNumber = document.getElementById('ticket-out-number');

  // Booking details storage
  let bookingDetails = {
    country: '',
    airline: '',
    date: ''
  };

  // Helper to trigger plane swipe transition
  const triggerPlaneSwipe = (midpointCallback) => {
    planeSwipeBg.classList.add('animating');
    planeSwipeGraphic.classList.add('animating');
    
    // Midpoint: screen is covered by forest-deep block
    setTimeout(() => {
      if (midpointCallback) midpointCallback();
    }, 700);
    
    // Complete: reset elements back to the left offscreen
    setTimeout(() => {
      planeSwipeBg.classList.remove('animating');
      planeSwipeGraphic.classList.remove('animating');
    }, 1400);
  };

  // Open booking overlay
  const openBookingWizard = () => {
    // Reset panels and fields
    panelStep1.classList.add('active');
    panelStep2.classList.remove('active');
    panelStep3.classList.remove('active');
    
    progStep1.classList.add('active');
    progStep2.classList.remove('active');
    progStep3.classList.remove('active');
    
    formStep1.reset();
    formStep2.reset();
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    if (bookingDate) bookingDate.min = today;
    if (passengerPassportExpiry) passengerPassportExpiry.min = today;

    triggerPlaneSwipe(() => {
      if (bookingOverlay) {
        bookingOverlay.classList.add('active');
        document.body.classList.add('booking-open');
      }
    });
  };

  // Close booking overlay
  const closeBookingWizard = () => {
    if (bookingOverlay) {
      bookingOverlay.classList.remove('active');
      document.body.classList.remove('booking-open');
    }
  };

  // Attach triggers to booking buttons
  bookingCTAs.forEach(cta => {
    if (cta) {
      cta.addEventListener('click', (e) => {
        e.preventDefault();
        openBookingWizard();
      });
    }
  });

  if (btnCloseBooking) {
    btnCloseBooking.addEventListener('click', closeBookingWizard);
  }

  // Step 1: Submit Route Selection
  if (formStep1) {
    formStep1.addEventListener('submit', (e) => {
      e.preventDefault();
      
      bookingDetails.country = bookingCountry.value;
      bookingDetails.airline = bookingAirline.value;
      bookingDetails.date = bookingDate.value;
      
      // Transition to Step 2
      panelStep1.classList.remove('active');
      panelStep2.classList.add('active');
      
      progStep1.classList.remove('active');
      progStep2.classList.add('active');
    });
  }

  // Step 2: Back Button
  if (btnBackStep2) {
    btnBackStep2.addEventListener('click', () => {
      panelStep2.classList.remove('active');
      panelStep1.classList.add('active');
      
      progStep2.classList.remove('active');
      progStep1.classList.add('active');
    });
  }

  // Step 2: Submit Passenger Details & Confirm
  if (formStep2) {
    formStep2.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = formStep2.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Securing Flight...';
      
      const bookingData = {
        name: passengerName.value,
        email: passengerEmail.value,
        phone: passengerPhone.value,
        passport: passengerPassport.value,
        passport_expiry: passengerPassportExpiry.value,
        destination_country: bookingDetails.country,
        airline: bookingDetails.airline,
        departure_date: bookingDetails.date
      };
      
      // Submit booking info to Gmail
      await submitFormToEmail(bookingData, "Flight Ticket Booking");
      
      // Populate Ticket Output fields
      if (ticketOutName) ticketOutName.textContent = passengerName.value;
      if (ticketOutPassport) ticketOutPassport.textContent = passengerPassport.value;
      if (ticketOutDestination) ticketOutDestination.textContent = bookingDetails.country;
      if (ticketOutAirline) ticketOutAirline.textContent = bookingDetails.airline;
      
      // Format date beautifully (e.g. DD MMM YYYY)
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      const dateObj = new Date(bookingDetails.date);
      if (ticketOutDate) ticketOutDate.textContent = dateObj.toLocaleDateString('en-US', options);
      
      // Generate flight barcode booking code
      const randomId = Math.floor(1000000 + Math.random() * 9000000);
      if (ticketOutNumber) ticketOutNumber.textContent = `ABY-${randomId}`;
      
      // Trigger transition to Step 3 success screen
      triggerPlaneSwipe(() => {
        panelStep2.classList.remove('active');
        panelStep3.classList.add('active');
        
        progStep2.classList.remove('active');
        progStep3.classList.add('active');
        
        // Trigger spider popup once the booking is completed successfully
        setTimeout(() => {
          triggerSpiderPopout("Thank you for booking with us! Your ticket request has been logged.");
        }, 1500);
      });
      
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    });
  }

  // Step 3: Finish Button
  if (btnFinishBooking) {
    btnFinishBooking.addEventListener('click', closeBookingWizard);
  }

  // --- FORM BOOKING SERVICE SELECTION (FOR NON-FLIGHT CARDS) ---
  const nonFlightCTAs = [
    { el: document.getElementById('link-service-import'), val: 'import' },
    { el: document.getElementById('link-service-export'), val: 'export' },
    { el: document.getElementById('cta-trade-consult'), val: 'trade' },
    { el: document.getElementById('cta-hero-consult'), val: 'trade' }
  ];
  const serviceSelect = document.getElementById('service-interest');

  nonFlightCTAs.forEach(item => {
    if (item.el && serviceSelect) {
      item.el.addEventListener('click', () => {
        serviceSelect.value = item.val;
      });
    }
  });

  // --- EMAIL AND SUBMISSION INTEGRATION ---
  const submitFormToEmail = async (formData, formType) => {
    // If key is default, simulate success and trigger spider popout
    if (WEB3FORMS_ACCESS_KEY === "YOUR_WEB3FORMS_ACCESS_KEY_HERE" || !WEB3FORMS_ACCESS_KEY) {
      console.info(`[Simulation] ${formType} Form Submitted Successfully:`, formData);
      console.warn("Gmail delivery is simulated. To get real emails, add a Web3Forms Access Key to script.js.");
      return new Promise(resolve => setTimeout(() => resolve(true), 1200));
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New ${formType} Submission from ABY Travels`,
          from_name: formData.name || "ABY Website User",
          ...formData
        })
      });
      const result = await response.json();
      return result.success;
    } catch (err) {
      console.error("Error submitting form to Web3Forms:", err);
      // Fallback to simulated success in UI for better user experience
      return true;
    }
  };

  // --- SPIDER POPOUT CONTROL ---
  const spiderPopout = document.getElementById('spider-popout');
  const btnCloseSpider = document.getElementById('btn-close-spider');
  const spiderChar = document.getElementById('spider-char');
  const spiderWeb = document.getElementById('spider-web');
  let spiderTimeout = null;

  const triggerSpiderPopout = (customMessage) => {
    if (!spiderPopout) return;
    
    // Clear any active timers
    if (spiderTimeout) clearTimeout(spiderTimeout);
    
    // Set custom message text if provided
    const bubbleText = document.getElementById('spider-bubble-text');
    if (bubbleText) {
      bubbleText.textContent = customMessage || "Thank you for reaching us! We will let you know soon enough.";
    }
    
    // Reset classes/states
    spiderPopout.classList.remove('active', 'animating-crawl');
    
    // Force a reflow
    spiderPopout.offsetHeight;
    
    // Show container, trigger CSS transition of thread descent, and wiggle legs
    spiderPopout.classList.add('active');
    spiderPopout.removeAttribute('aria-hidden');
    spiderPopout.classList.add('animating-crawl');
    
    // Stop wiggling legs after descent completes (2.5 seconds)
    spiderTimeout = setTimeout(() => {
      spiderPopout.classList.remove('animating-crawl');
    }, 2500);
    
    // Auto-close after 12 seconds
    spiderTimeout = setTimeout(() => {
      closeSpiderPopout();
    }, 12000);
  };

  const closeSpiderPopout = () => {
    if (!spiderPopout) return;
    
    // Clear any active timers
    if (spiderTimeout) clearTimeout(spiderTimeout);
    
    // Start wiggling legs for the climb up
    spiderPopout.classList.add('animating-crawl');
    
    // Remove active class to trigger CSS transition climbing back up
    spiderPopout.classList.remove('active');
    
    // Wait for the 2.5s climb-up transition to finish, then clean up
    spiderTimeout = setTimeout(() => {
      spiderPopout.setAttribute('aria-hidden', 'true');
      spiderPopout.classList.remove('animating-crawl');
    }, 2500);
  };

  if (btnCloseSpider) {
    btnCloseSpider.addEventListener('click', (e) => {
      e.stopPropagation();
      closeSpiderPopout();
    });
  }

  // Click on spider makes it wiggle and slide up/down
  if (spiderChar) {
    spiderChar.addEventListener('click', (e) => {
      e.stopPropagation();
      triggerSpiderPopout(document.getElementById('spider-bubble-text')?.textContent); // Refresh descent & wiggle
    });
  }

  // --- CONTACT FORM SUBMISSION ---
  const contactForm = document.getElementById('travel-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending enquiry...';
      
      const data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service-interest').value,
        message: document.getElementById('message').value
      };
      
      const success = await submitFormToEmail(data, "Contact Enquiry");
      
      if (success) {
        submitBtn.innerHTML = 'Enquiry Received!';
        submitBtn.style.backgroundColor = '#2d5a3f';
        submitBtn.style.color = '#fffbf5';
        submitBtn.style.borderColor = '#2d5a3f';
        
        contactForm.reset();
        
        // Trigger spider thank you popout
        triggerSpiderPopout("Thank you for reaching us! We will let you know soon enough.");
        
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          submitBtn.style.backgroundColor = '';
          submitBtn.style.color = '';
          submitBtn.style.borderColor = '';
        }, 5000);
      } else {
        submitBtn.innerHTML = 'Submission Failed. Try Again.';
        submitBtn.style.backgroundColor = '#8b2500';
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          submitBtn.style.backgroundColor = '';
        }, 3000);
      }
    });
  }

  // --- CARTOON TOURIST GUIDE POPOUT ---
  const linkAbout = document.getElementById('link-about');
  const footerLinkWhy = document.getElementById('footer-link-why');
  const guidePopout = document.getElementById('guide-popout');
  const btnCloseGuide = document.getElementById('btn-close-guide');
  const guideCharWrap = document.getElementById('guide-char-wrap');

  const triggerTouristGuide = (e) => {
    if (e) e.preventDefault();
    if (!guidePopout) return;
    
    // Show the tourist guide and comic bubble
    guidePopout.classList.add('active');
    guidePopout.removeAttribute('aria-hidden');
  };

  const closeTouristGuide = () => {
    if (!guidePopout) return;
    guidePopout.classList.remove('active');
    setTimeout(() => {
      guidePopout.setAttribute('aria-hidden', 'true');
    }, 600);
  };

  if (linkAbout) linkAbout.addEventListener('click', triggerTouristGuide);
  if (footerLinkWhy) footerLinkWhy.addEventListener('click', triggerTouristGuide);
  
  if (btnCloseGuide) {
    btnCloseGuide.addEventListener('click', (e) => {
      e.stopPropagation();
      closeTouristGuide();
    });
  }

  if (guideCharWrap) {
    guideCharWrap.addEventListener('click', (e) => {
      e.stopPropagation();
      closeTouristGuide();
    });
  }

  // --- HERO BACKGROUND PARALLAX ---
  const heroVideo = document.getElementById('hero-bg-video');
  if (heroVideo) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      // Scroll at 30% speed for subtle parallax depth
      heroVideo.style.transform = `translateY(${scrollY * 0.3}px)`;
    }, { passive: true });
  }
});

// Ensure page always starts at the hero section on refresh
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.addEventListener('load', () => {
  const hero = document.getElementById('home');
  if (hero) {
    // Reset any saved scroll position
    window.scrollTo(0, 0);
    hero.scrollIntoView({ behavior: 'smooth' });
  }
});
