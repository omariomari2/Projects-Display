// Initialize EmailJS (replace with your user ID)
try {
  if (window.emailjs) {
    emailjs.init('YOUR_EMAILJS_USER_ID');
  } else {
    console.warn('EmailJS SDK not loaded');
  }
} catch (e) {
  console.warn('EmailJS initialization error', e);
}

/**
 * Send email using EmailJS
 * @param {Event} e
 */
function sendEmail(e) {
  e.preventDefault();
  const loadingText = document.querySelector('.loading-text');
  loadingText.style.display = 'inline-block';
  emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', '#contact-form')
    .then(() => {
      loadingText.style.display = 'none';
      alert('Message sent successfully!');
      document.getElementById('contact-form').reset();
    }, (error) => {
      loadingText.style.display = 'none';
      alert('Failed to send message. Please try again.');
      console.error('EmailJS Error:', error);
    });
  return false; // prevents form default
}

// Expand/contract project cards on click via simple binding
const cards = document.querySelectorAll('.container .content');
cards.forEach(card => {
  card.addEventListener('click', () => {
    const isActive = card.classList.contains('active');
    const container = card.closest('.container');
    if (container.classList.contains('two')) {
      if (isActive) return; // don't collapse on clicking active
      const contents = container.querySelectorAll('.content');
      contents.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      return;
    }
    // default behavior: toggle within this container only
    const siblings = container.querySelectorAll('.content');
    siblings.forEach(c => c.classList.remove('active'));
    if (!isActive) card.classList.add('active');
  });
});

// Randomize skill pill positions in about section with collision avoidance
window.addEventListener('load', () => {
  const container = document.querySelector('.skills-list');
  if (!container) return;
  const skills = Array.from(container.querySelectorAll('.skill'));
  const width = container.clientWidth;
  const height = container.clientHeight;
  const placed = [];
  skills.forEach(skill => {
    const sw = skill.clientWidth;
    const sh = skill.clientHeight;
    let left, top, rect;
    let attempt = 0;
    do {
      left = Math.random() * (width - sw);
      top = Math.random() * (height - sh);
      rect = { x: left, y: top, w: sw, h: sh };
      attempt++;
    } while (
      placed.some(r => !(r.x + r.w < rect.x || rect.x + rect.w < r.x || r.y + r.h < rect.y || rect.y + rect.h < r.y))
      && attempt < 100
    );
    skill.style.left = `${left}px`;
    skill.style.top = `${top}px`;
    placed.push(rect);
  });
});