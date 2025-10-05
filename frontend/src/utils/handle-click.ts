export function handleScrollToTop(duration = 800) {
  if (typeof window === "undefined") return;

  const start = window.scrollY;
  const startTime = performance.now();

  function scrollStep(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1); // từ 0 → 1

    // Easing function (mềm mại hơn)
    const easeInOutCubic =
      progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    window.scrollTo(0, start * (1 - easeInOutCubic));

    if (elapsed < duration) {
      requestAnimationFrame(scrollStep);
    }
  }

  requestAnimationFrame(scrollStep);
}

export function handleCallClick(phoneNumber = "+1234567890") {
  window.location.href = "tel:" + phoneNumber;
}

export function handleMessengerClick() {
  window.open("https://m.me/yourpage", "_blank");
}
