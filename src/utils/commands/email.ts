import personal from "../../data/personal.json";

export function executeEmail() {
  const anchor = document.createElement("a");
  anchor.href = "mailto:" + personal.email;
  anchor.click();
}
