const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function writeInitialParagraphs() {
  const IS_FIRST_TIME_KEY = "isNewVisitor";
  const isNewVisitor = localStorage.getItem(IS_FIRST_TIME_KEY) !== "false";
  const delayMs = isNewVisitor ? 150 : 0;

  const paragraphs = [
    "¡Hola! Mi nombre es Manuel Seitz.",
    "Soy Analista de Sistemas y Desarrollador de Software orientado a front-end.",
    "",
    "Durante mis estudios, lideré un equipo de 7 personas en el desarrollo de GEMA, un sistema de gestión y mantenimiento de equipos médicos que facilita el trabajo en hospitales y clínicas.",
    "Hoy, además de mantener este sistema, estoy abierto a nuevas propuestas y desafíos.",
    "",
    "Escriba alguno de estos comandos y presione Enter para saber más:",
  ];

  const content = document.getElementById("content") as HTMLElement;
  const container = document.createElement("div");
  content.insertAdjacentElement("afterbegin", container);

  for (const p of paragraphs) {
    const element = document.createElement("p");
    element.classList.add("inline-block", "max-w-[70ch]");
    container.appendChild(element);

    const cursor = document.createElement("div");
    cursor.classList.add("inline-block", "w-2.5", "h-4", "bg-neutral-50");

    const textContainer = document.createElement("span");
    element.appendChild(textContainer);

    textContainer.insertAdjacentElement("afterend", cursor);

    if (isNewVisitor) {
      for (const char of p) {
        const charNode = document.createTextNode(char);
        textContainer.appendChild(charNode);
        await delay(isNewVisitor ? Math.random() * (15 - 5) + 5 : 0);
      }
    } else {
      textContainer.innerHTML = p;
    }

    await delay(delayMs);
    element.classList.add("text-pretty");
    cursor.remove();
    const br = document.createElement("br");
    container.appendChild(br);
    await delay(delayMs);
    localStorage.setItem(IS_FIRST_TIME_KEY, "false");
  }
}
