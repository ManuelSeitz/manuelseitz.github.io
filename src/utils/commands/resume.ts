export function executeResume() {
  const anchor = document.createElement("a");
  anchor.href = "/resumes/manuel_seitz_cv.pdf";
  anchor.download = "";
  anchor.click();
}
