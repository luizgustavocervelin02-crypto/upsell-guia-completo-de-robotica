document.addEventListener('DOMContentLoaded', () => {
  // Modal Elements
  const modal = document.getElementById('modal-downsell');
  const noOfferLink = document.getElementById('no-offer-link');
  const noOfferFinal = document.getElementById('no-offer-final');

  // Show Modal on clicking the "No thanks" link
  if (noOfferLink) {
    noOfferLink.addEventListener('click', (e) => {
      e.preventDefault();
      modal.style.display = 'block';
    });
  }

  // Final Rejection in Modal -> Redirect to Thank You Page
  if (noOfferFinal) {
    noOfferFinal.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('closing');
      setTimeout(() => {
        window.location.href = 'obrigado.html';
      }, 400);
    });
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

  const elements = document.querySelectorAll('.benefit-card, .glass-section, .price-tag');
  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
  });

  const style = document.createElement('style');
  style.innerHTML = `
    .visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);

  // Timer Configuration (Exactly 5 Minutes)
  const timerDuration = 300; // 5 minutes
  let timeRemaining = timerDuration;

  const createTimerElement = () => {
    const timerDiv = document.createElement('div');
    timerDiv.id = 'countdown-timer';
    timerDiv.style = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 0.8rem 1.2rem;
      background: var(--secondary);
      color: #000;
      border-radius: 12px;
      font-weight: 800;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
      z-index: 1000;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.1rem;
      border: 2px solid white;
      transition: all 0.3s ease;
    `;
    timerDiv.innerHTML = `
      <span style="font-size: 0.65rem; text-transform: uppercase;">A Oferta Expira Em:</span>
      <span id="timer-display" style="font-size: 1.5rem;">05:00</span>
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
