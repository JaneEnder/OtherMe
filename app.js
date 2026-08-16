const selects = [...document.querySelectorAll("select")];

function randomize(select) {
  const optionCount = select.options.length - 1;
  select.selectedIndex = 1 + Math.floor(Math.random() * optionCount);
}

function updateResult() {
  const country = document.querySelector("#country").value;
  const sex = document.querySelector("#sex").value;
  const religion = document.querySelector("#religion").value;
  const result = document.querySelector("#result");

  if (!country && !sex && !religion) {
    result.textContent = "Your alternate starting point will appear here.";
    return;
  }

  result.textContent = `Imagine starting life in ${country || "another country"}, ${sex ? `born ${sex.toLowerCase()}` : "in another body"}, and raised in ${religion || "another belief system"}.`;
}

document.querySelectorAll(".dice").forEach((button) => {
  button.addEventListener("click", () => {
    randomize(document.querySelector(`#${button.dataset.target}`));
    updateResult();
  });
});

document.querySelector("#randomize-all").addEventListener("click", () => {
  selects.forEach(randomize);
  updateResult();
});

selects.forEach((select) => select.addEventListener("change", updateResult));
