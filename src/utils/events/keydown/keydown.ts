import { getKeydownActions, updateInfo } from "./actions.ts";

export function handleKeydown(e: KeyboardEvent) {
  const input = document.getElementById("input") as HTMLInputElement;

  if (input.disabled) return;
  if (document.activeElement !== input) {
    input.focus();
  }

  const isSpecialChar = e.key.length !== 1;
  if (!isSpecialChar) return;

  const keydownActions = getKeydownActions(e);
  keydownActions[e.key as keyof typeof keydownActions]?.();

  updateInfo();
}
