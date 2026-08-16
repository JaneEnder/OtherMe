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
  const percentage = document.querySelector("#percentage");
  const odds = document.querySelector("#odds");

  if (!country && !sex && !religion) {
    result.textContent = "Your alternate starting point will appear here.";
    percentage.textContent = "—%";
    odds.textContent = "Complete all three choices";
    return;
  }

  result.textContent = `Imagine starting life in ${country || "another country"}, ${sex ? `born ${sex.toLowerCase()}` : "in another body"}, and raised in ${religion || "another belief system"}.`;

  if (!country || !sex || !religion) {
    percentage.textContent = "—%";
    odds.textContent = "Complete all three choices";
    return;
  }

  const countryData = window.OTHERME_DATA[country];
  const sexShare = countryData?.sex[sex];
  const religionShare = countryData?.religion[religion];

  if (!countryData || !sexShare || !religionShare) {
    percentage.textContent = "—%";
    odds.textContent = sex === "Intersex" ? "Comparable global data is not available yet" : "Estimate not available";
    return;
  }

  const probability = countryData.birthShare * sexShare * religionShare;
  const percentValue = probability * 100;
  const digits = percentValue >= 1 ? 2 : percentValue >= 0.1 ? 3 : 4;
  percentage.textContent = `${percentValue.toFixed(digits)}%`;
  odds.textContent = `About 1 in ${Math.round(1 / probability).toLocaleString("en-US")}`;
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
