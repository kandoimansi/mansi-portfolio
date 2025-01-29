document.addEventListener("DOMContentLoaded", () => {
  const typingElement = document.querySelector(".typing");
  const words = JSON.parse(typingElement.getAttribute("data-words")); // Get words from the HTML
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typingSpeed = 150; // Typing speed in ms
  const erasingSpeed = 100; // Erasing speed in ms
  const delayBetweenWords = 500; // Delay before switching words

  function typeWords() {
    const currentWord = words[wordIndex];
    if (!isDeleting && charIndex <= currentWord.length) {
      // Add one character at a time
      typingElement.textContent = currentWord.substring(0, charIndex);
      charIndex++;
      setTimeout(typeWords, typingSpeed);
    } else if (isDeleting && charIndex >= 0) {
      // Remove one character at a time
      typingElement.textContent = currentWord.substring(0, charIndex);
      charIndex--;
      setTimeout(typeWords, erasingSpeed);
    } else if (!isDeleting && charIndex > currentWord.length) {
      // Pause before deleting
      isDeleting = true;
      setTimeout(typeWords, delayBetweenWords);
    } else {
      // Move to the next word
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length; // Loop back to the first word
      setTimeout(typeWords, typingSpeed);
    }
  }

  typeWords(); // Start the typing effect
});
