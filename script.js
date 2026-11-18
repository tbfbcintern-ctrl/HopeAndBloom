// Hope and Bloom Interactive Scripts

document.addEventListener('DOMContentLoaded', () => {
  // Form submission handler
  const form = document.getElementById('f');
  const okStatus = document.getElementById('ok');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (okStatus) {
        okStatus.style.display = 'block';
        okStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      form.reset();
    });
  }

  // Setting chips interaction
  const chips = document.querySelectorAll('.chip');
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.style.borderColor = 'var(--line)');
      chip.style.borderColor = 'var(--teal-primary)';
      chip.style.backgroundColor = 'var(--teal-soft)';
    });
  });

  // Floating chat button scrolls to contact form & focuses name input
  const floatingChat = document.querySelector('.floating-chat');
  if (floatingChat) {
    floatingChat.addEventListener('click', (e) => {
      const nameInput = document.getElementById('name');
      if (nameInput) {
        setTimeout(() => nameInput.focus(), 600);
      }
    });
  }
});
