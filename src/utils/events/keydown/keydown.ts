import { getKeydownActions, handleRegularChar } from "./actions";

export function handleKeydown(e: KeyboardEvent, inputDisabled: boolean) {
  if (inputDisabled) return;

  const input = document.getElementById("input") as HTMLInputElement;
  const info = document.getElementById("info") as HTMLElement;
  const cursor = document.querySelector(".cursor") as HTMLDivElement;

  const isSpecialChar = e.key.length !== 1;

  const keydownActions = getKeydownActions(e);
  keydownActions[e.key as keyof typeof keydownActions]?.();

  if (!isSpecialChar) handleRegularChar(e);

  if (input.value.length === 0) {
    info.classList.remove("hidden");
    info.classList.add("max-sm:hidden");
  }

  cursor.style.left = input.value.length + "ch";
}
