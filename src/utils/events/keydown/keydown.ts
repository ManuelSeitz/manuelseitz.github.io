import { getKeydownActions, handleRegularChar } from "./actions";

export function handleKeydown(e: KeyboardEvent, inputDisabled: boolean) {
  const input = document.getElementById("input") as HTMLInputElement;
  const info = document.getElementById("info") as HTMLElement;

  const isSpecialChar = e.key.length !== 1;

  const keydownActions = getKeydownActions(e);
  keydownActions[e.key as keyof typeof keydownActions]?.();

  if (!isSpecialChar) handleRegularChar(e);

  if (input.value.length === 0) {
    info.classList.remove("hidden");
  }

  input.style.width = input.value.length + "ch";
}
