import personal from "../../data/personal.json";
import { updateInfo } from "../events/keydown/actions.ts";

export function executeProjects(): void {
  const content = document.getElementById("content") as HTMLElement;

  const list = document.createElement("ul");
  list.classList.add("list");

  const title = document.createElement("p");
  title.textContent = "Mis proyectos:";
  content.appendChild(title);

  personal.projects.forEach(({ name, description, href }) => {
    const item = document.createElement("li");
    const desc = document.createElement("span");
    desc.classList.add("text-neutral-500");
    desc.textContent = " # " + description;
    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.textContent = name;
    item.appendChild(anchor);
    item.appendChild(desc);
    list.appendChild(item);
  });

  content.appendChild(list);
  const br = document.createElement("br");
  content.appendChild(br);
  updateInfo(
    'usa las <strong class="text-neutral-400">flechas</strong> para navegar entre proyectos',
  );
}
