import personal from "../../data/personal.json";

export function executeSocial() {
  const content = document.getElementById("content") as HTMLElement;
  const list = document.createElement("ul");
  list.classList.add("list");

  const title = document.createElement("p");
  title.textContent = "Mis redes sociales:";
  content.appendChild(title);

  personal.social.forEach(({ name, href }) => {
    const item = document.createElement("li");
    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.textContent = name;
    item.appendChild(anchor);
    list.appendChild(item);
  });

  content.appendChild(list);
  const br = document.createElement("br");
  content.appendChild(br);
}
