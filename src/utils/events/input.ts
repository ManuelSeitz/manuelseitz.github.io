import { findSuggestion, updateInfo } from "./keydown/actions.ts";

export function handleInput() {
  const input = document.getElementById("input") as HTMLInputElement;

  if (input.disabled) return;

  findSuggestion();
  updateInfo();
}
