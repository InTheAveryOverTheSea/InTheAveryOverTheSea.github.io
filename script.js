document.addEventListener('DOMContentLoaded', () => {
  // --- Image Carousel ---
 const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');
const caption = document.getElementById('carousel-caption');

let currentSlideIndex = 0;

// Set initial caption
updateCaption();

// Update slide position based on index
function updateSlidePosition() {
  track.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
  updateCaption();
}

// Update caption text based on current slide
function updateCaption() {
  const currentSlide = slides[currentSlideIndex];
  const img = currentSlide.querySelector('img');
  caption.textContent = img.alt || '';
}

// Button navigation
nextButton.addEventListener('click', () => {
  currentSlideIndex = (currentSlideIndex + 1) % slides.length;
  updateSlidePosition();
});

prevButton.addEventListener('click', () => {
  currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
  updateSlidePosition();
});

// Touch Swipe Support


let startX = 0;
let endX = 0;

track.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

track.addEventListener('touchmove', (e) => {
  endX = e.touches[0].clientX;
});

track.addEventListener('touchend', () => {
  const threshold = 50;
  const deltaX = endX - startX;

  if (deltaX > threshold) {
    // Swiped right
    currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    updateSlidePosition();
  } else if (deltaX < -threshold) {
    // Swiped left
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    updateSlidePosition();
  }

  // Reset swipe values
  startX = 0;
  endX = 0;
});
  // --- Form Validation ---
  const form = document.getElementById('contact-form');
  const confirmation = document.getElementById('form-confirmation');
  const mailtoLink = document.getElementById('mailto-link');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');

    let valid = true;

    // Clear errors
    [nameError, emailError, messageError].forEach(error => {
      error.textContent = '';
      error.classList.remove('show');
    });

    confirmation.classList.remove('show');

    // Validate name
    if (!name.value.trim()) {
      nameError.textContent = 'Please enter your name.';
      nameError.classList.add('show');
      valid = false;
    }

    // Validate email
    if (!email.value.trim()) {
      emailError.textContent = 'Please enter your email.';
      emailError.classList.add('show');
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
      emailError.textContent = 'Please enter a valid email address.';
      emailError.classList.add('show');
      valid = false;
    }

    // Validate message
    if (!message.value.trim()) {
      messageError.textContent = 'Please enter your message.';
      messageError.classList.add('show');
      valid = false;
    }

    // If all valid
    if (valid) {
      // Set dynamic mailto link
      const subject = encodeURIComponent("New message from portfolio");
      const body = encodeURIComponent(`Name: ${name.value}\nEmail: ${email.value}\n\n${message.value}`);
      mailtoLink.href = `mailto:averypickard@protonmail.com?subject=${subject}&body=${body}`;

      confirmation.classList.add('show');
      form.reset();

      // Hide after delay
      setTimeout(() => {
        confirmation.classList.remove('show');
      }, 6000);
    }
  });
});
