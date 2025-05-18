document.addEventListener("DOMContentLoaded", () => {
  const receptenContainer = document.getElementById("recepten");
  const categoryFilter = document.getElementById("category-filter");
  const herkomstFilter = document.getElementById("herkomst-filter");
  const searchInput = document.getElementById("search");

  // 1. API recepten ophalen en weergeven
  fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
    .then((response) => response.json())
    .then((data) => {
      const recepten = data.meals;

      recepten.forEach((recept) => {
        const div = document.createElement("div");
        div.classList.add("recept");

        div.innerHTML = `
          <img src="${recept.strMealThumb}" alt="${recept.strMeal}" />
          <h2>${recept.strMeal}</h2>
          <p><strong>Categorie:</strong> ${recept.strCategory}</p>
          <p><strong>Land:</strong> ${recept.strArea}</p>
        `;

        receptenContainer.appendChild(div);
      });

      vulHerkomstFilter();
    })
    .catch((error) => {
      console.error("Fout bij ophalen van API recepten:", error);
    });

  // 2. Categorieën ophalen en dropdown vullen
  fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
    .then((response) => response.json())
    .then((data) => {
      data.meals.forEach((cat) => {
        const option = document.createElement("option");
        option.value = cat.strCategory;
        option.textContent = cat.strCategory;
        categoryFilter.appendChild(option);
      });
    })
    .catch((err) => console.error("Fout bij ophalen categorieën:", err));

  // Functie om herkomst filter opties te vullen
  function vulHerkomstFilter() {
    const herkomstSet = new Set();

    const alleRecepten = document.querySelectorAll(".recept");

    alleRecepten.forEach((recept) => {
      const herkomstP = recept.querySelector("p:nth-of-type(2)");
      if (herkomstP) {
        // Pak tekst achter 'Land: '
        const tekst = herkomstP.textContent.trim();
        const land = tekst.split("Land:")[1]?.trim();
        if (land) {
          herkomstSet.add(land);
        }
      }
    });

    herkomstSet.forEach((land) => {
      const option = document.createElement("option");
      option.value = land.toLowerCase();
      option.textContent = land;
      herkomstFilter.appendChild(option);
    });
  }

  // Functie om recepten te filteren op zoekterm, categorie en herkomst
  function filterRecepten() {
    const zoekterm = searchInput.value.toLowerCase();
    const geselecteerdeCategorie = categoryFilter.value.toLowerCase();
    const geselecteerdeHerkomst = herkomstFilter.value.toLowerCase();

    const recepten = document.querySelectorAll(".recept");

    recepten.forEach((recept) => {
      const titel = recept.querySelector("h2").textContent.toLowerCase();

      // Categorie tekst pakken (bv 'Categorie: Beef')
      const categorieTekst = recept.querySelector("p:nth-of-type(1)").textContent.toLowerCase();
      const categorie = categorieTekst.split("categorie:")[1]?.trim() || "";

      // Herkomst tekst pakken (bv 'Land: Italy')
      const herkomstTekst = recept.querySelector("p:nth-of-type(2)").textContent.toLowerCase();
      const herkomst = herkomstTekst.split("land:")[1]?.trim() || "";

      const matchZoek = titel.includes(zoekterm);
      const matchCategorie = geselecteerdeCategorie === "" || categorie === geselecteerdeCategorie;
      const matchHerkomst = geselecteerdeHerkomst === "" || herkomst === geselecteerdeHerkomst;

      recept.style.display = matchZoek && matchCategorie && matchHerkomst ? "block" : "none";
    });
  }

  // Eventlisteners voor filters
  searchInput.addEventListener("input", filterRecepten);
  categoryFilter.addEventListener("change", filterRecepten);
  herkomstFilter.addEventListener("change", filterRecepten);
});
