import commands from "../../../data/commands.json";
import { executeEmail } from "../../commands/email";
import { executeProjects } from "../../commands/projects";
import { executeResume } from "../../commands/resume";
import { executeSocial } from "../../commands/social";

const commandNames = commands.map((command) => command.name.toLowerCase());
const content = document.getElementById("content") as HTMLElement;

const input = document.getElementById("input") as HTMLInputElement;
const info = document.getElementById("info") as HTMLElement;
const cursor = document.querySelector(".cursor") as HTMLDivElement;

let suggestion = "";

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

export function findSuggestion() {
  suggestion =
    commandNames.find((command) =>
      command.startsWith(input.value.toLowerCase()),
    ) ?? "";

  if (suggestion) {
    info.classList.remove("hidden", "max-sm:hidden");
    input.classList.add("z-20");
  } else {
    info.classList.add("hidden", "max-sm:hidden");
    input.classList.remove("z-20");
  }

  info.innerHTML =
    "&nbsp;".repeat(input.value.length) + suggestion.slice(input.value.length);
}

export function updateInfo() {
  if (input.value.length === 0) {
    info.classList.remove("hidden");
    info.classList.add("max-sm:hidden");
    info.innerHTML =
      'usa <strong class="text-neutral-400">help</strong> si necesitas ayuda';
  }

  cursor.style.left = input.value.length + "ch";
}

function handleEnter(e: KeyboardEvent) {
  e.preventDefault();
  const lowercasedInput = input.value.toLowerCase();

  if (commandNames.includes(lowercasedInput)) {
    const selectedCommand = commands.find(
      (command) => command.name.toLowerCase() === lowercasedInput,
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
  suggestion = "";
  lastList = document.querySelector("#content > ul:last-of-type");
  content.scrollTo({ top: content.scrollHeight });
}

function handleTab(e: KeyboardEvent) {
  e.preventDefault();
  if (suggestion) {
    input.value = suggestion;
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

function handleArrowDown(e: KeyboardEvent) {
  e.preventDefault();
  if (!lastList) return;

  selectedListItem?.classList.remove("selected");

  if (!selectedListItem || !selectedListItem.nextElementSibling) {
    selectedListItem = lastList.firstElementChild;
  } else {
    selectedListItem = selectedListItem.nextElementSibling;
  }

  selectedListItem?.classList.add("selected");
}

export function getKeydownActions(e: KeyboardEvent) {
  return {
    Enter: () => handleEnter(e),
    Tab: () => handleTab(e),
    ArrowUp: () => handleArrowUp(e),
    ArrowDown: () => handleArrowDown(e),
  };
}
