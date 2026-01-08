export function handleScroll(e: Event) {
  const scrollPos = (e.target as HTMLElement).scrollTop;
  const overlay = document.getElementById("overlay");
  if (!overlay) return;

  if (scrollPos === 0) {
    overlay.style.opacity = "0";
  } else {
    overlay.style.top = scrollPos + "px";
    overlay.style.opacity = "1";
  }
}
