import commands from "../../../data/commands.json";
import { executeEmail } from "../../commands/email";
import { executeProjects } from "../../commands/projects";
import { executeResume } from "../../commands/resume";
import { executeSocial } from "../../commands/social";

const commandNames = commands.map((command) => command.name.toLowerCase());
const content = document.getElementById("content") as HTMLElement;
const input = document.getElementById("input") as HTMLInputElement;
const info = document.getElementById("info") as HTMLElement;
let suggest = "";
let lastList: HTMLElement | null = null;
let selectedListItem: Element | null = null;
const helpInfo =
  'usa <strong class="text-neutral-400">help</strong> si necesitas ayuda';

const commandActions: Record<Commands, () => void> = {
  projects: () => executeProjects(),
  social: () => executeSocial(),
  resume: () => executeResume(),
  email: () => executeEmail(),
};

function handleBackspace() {
  input.value = input.value.slice(0, -1);
  if (input.value.length === 0) {
    info.innerHTML = helpInfo;
  }
}

function handleEnter(e: KeyboardEvent) {
  e.preventDefault();
  const lowercasedInput = input.value.toLowerCase();

  if (commandNames.includes(lowercasedInput)) {
    const selectedCommand = commands.find(
      (command) => command.name.toLowerCase() === lowercasedInput
    );
    info.innerHTML = helpInfo;
    commandActions[selectedCommand?.id as Commands]();
  } else if (selectedListItem && !input.value) {
    const anchor = selectedListItem.querySelector("a");
    anchor?.click();
  } else {
    const element = document.createElement("p");
    element.classList.add("max-w-[70ch]");
    element.textContent = "Comando no reconocido, intente con otro.";
    content.appendChild(element);
  }

  input.value = "";
  suggest = "";
  lastList = document.querySelector("#content > ul:last-of-type");
  selectedListItem?.classList.remove("selected");
  selectedListItem = null;
  info.classList.remove("hidden");
  content.scrollTo({ top: content.scrollHeight });
}

function handleTab(e: KeyboardEvent) {
  e.preventDefault();
  if (suggest) {
    input.value = suggest;
  }
}

function handleArrowUp(e: KeyboardEvent) {
  e.preventDefault();
  if (!lastList) return;

  selectedListItem?.classList.remove("selected");

  if (!selectedListItem || !selectedListItem.previousElementSibling) {
    selectedListItem = lastList.lastElementChild;
  } else {
    selectedListItem = selectedListItem.previousElementSibling;
  }

  selectedListItem?.classList.add("selected");
}

export function handleRegularChar(e: KeyboardEvent) {
  input.value += e.key;

  suggest =
    commandNames.find((command) =>
      command.startsWith(input.value.toLowerCase())
    ) ?? "";

  if (suggest) {
    info.innerHTML = suggest;
    info.classList.remove("hidden");
    input.classList.add("z-20");
  } else {
    info.classList.add("hidden");
    input.classList.remove("z-20");
  }
}

export function getKeydownActions(e: KeyboardEvent) {
  return {
    Backspace: handleBackspace,
    Enter: () => handleEnter(e),
    Tab: () => handleTab(e),
    ArrowUp: () => handleArrowUp(e),
  };
}
