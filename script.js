document.addEventListener('DOMContentLoaded', () => {
  // Replace checkout link with the one provided in the request
  const ctaLink = document.getElementById('cta-link');
  if (ctaLink) {
    ctaLink.href = "link_para_o_checkout";
  }

  // Animation on scroll
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Apply to relevant sections
  const elements = document.querySelectorAll('.benefit-card, .glass-section, .price-tag');
  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
  });

  // Adding the 'visible' class styles dynamically
  const style = document.createElement('style');
  style.innerHTML = `
    .visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);

  // Simple countdown to increase urgency (fictional timer)
  const timerDuration = 599; // 10 minutes
  let timeRemaining = timerDuration;
  
  const createTimerElement = () => {
    const timerDiv = document.createElement('div');
    timerDiv.id = 'countdown-timer';
    timerDiv.style = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 1rem 1.5rem;
      background: var(--secondary);
      color: #000;
      border-radius: 12px;
      font-weight: 800;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
      z-index: 1000;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.25rem;
      border: 2px solid white;
    `;
    timerDiv.innerHTML = `
      <span style="font-size: 0.75rem; text-transform: uppercase;">Oferta Expira Em:</span>
      <span id="timer-display" style="font-size: 1.5rem;">10:00</span>
    `;
    document.body.appendChild(timerDiv);
  }

  createTimerElement();

  const updateTimer = () => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    document.getElementById('timer-display').textContent = 
      `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    if (timeRemaining > 0) {
      timeRemaining--;
    } else {
      clearInterval(timerInterval);
    }
  }

  const timerInterval = setInterval(updateTimer, 1000);
  updateTimer();
});
