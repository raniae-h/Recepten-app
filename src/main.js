document.addEventListener("DOMContentLoaded", () => {
  const receptenContainer = document.getElementById("recepten");
  const categoryFilter = document.getElementById("category-filter");
  const herkomstFilter = document.getElementById("herkomst-filter");
  const moeilijkheidFilter = document.getElementById("moeilijkheid-filter");
  const tijdFilter = document.getElementById("tijd-filter");
  const searchInput = document.getElementById("search");
  const hamburgerBtn = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('hamburger-menu');
  const languageSwitcher = document.getElementById("language-select");
  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modal-body");

  document.getElementById("modal-close").addEventListener("click", () => {
    modal.style.display = "none";
  });

  let allRecepten = [];
  let currentLang = 'nl';

  const translations = {
  nl: {
    title: "Recepten",
    searchPlaceholder: "Zoeken...",
    category: "Categorie",
    origin: "Herkomst",
    difficulty: "Moeilijkheidsgraad",
    time: "Tijd",
    allTimes: "Alle tijden",
    timeLessThan30: "< 30 minuten",
    time30to60: "30 - 60 minuten",
    timeMoreThan60: "> 60 minuten"
  },
  en: {
    title: "Recipes",
    searchPlaceholder: "Search...",
    category: "Category",
    origin: "Origin",
    difficulty: "Difficulty",
    time: "Time",
    allTimes: "All times",
    timeLessThan30: "< 30 minutes",
    time30to60: "30 - 60 minutes",
    timeMoreThan60: "> 60 minutes"
  },
  fr: {
    title: "Recettes",
    searchPlaceholder: "Recherche...",
    category: "Catégorie",
    origin: "Origine",
    difficulty: "Difficulté",
    time: "Temps",
    allTimes: "Tous les temps",
    timeLessThan30: "< 30 minutes",
    time30to60: "30 - 60 minutes",
    timeMoreThan60: "> 60 minutes"
  }
};




  function translateUI() {
    document.getElementById("search").placeholder = translations[currentLang].searchPlaceholder;
    document.querySelector("label[for='category-filter']").innerText = translations[currentLang].category;
    document.querySelector("label[for='herkomst-filter']").innerText = translations[currentLang].origin;
    document.querySelector("label[for='moeilijkheid-filter']").innerText = translations[currentLang].difficulty;
    document.querySelector("label[for='tijd-filter']").innerText = translations[currentLang].time;
    


    vulCategorieFilter(allRecepten);
    vulHerkomstFilter(allRecepten);
    vulMoeilijkheidFilter(allRecepten);
    vulTijdFilter();
  }

  function fetchRecepten(zoekterm = "") {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${zoekterm}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.meals) {
          allRecepten = data.meals.map(meal => ({
            ...meal,
            categorie: ["Ontbijt", "Lunch", "Snack", "Soep", "Fastfood", "Vegetarisch", "Hoofdgerecht", "Voorgerecht", "Dessert", "Streetfood", "Taart", "Traditioneel"][Math.floor(Math.random() * 12)],
            herkomst: ["Spanje", "Japan", "Balkan", "Turkije", "Egypte", "Filipijnen", "China", "Tunesië", "Verenigde Staten", "Italië", "Canada", "India", "Internationaal", "Nederland", "Griekenland", "Midden-Oosten", "Verenigd Koninkrijk", "Frankrijk", "Maleisië"][Math.floor(Math.random() * 19)],
            moeilijkheid: ["Makkelijk", "Gemiddeld", "Moeilijk"][Math.floor(Math.random() * 3)],
            tijd: [30, 45, 60, 90][Math.floor(Math.random() * 4)]
          }));
          renderRecepten(allRecepten);
          translateUI();
        } else {
          receptenContainer.innerHTML = "<p>Geen recepten gevonden.</p>";
        }
      })
      .catch(error => {
        console.error("Fout bij ophalen recepten:", error);
        receptenContainer.innerHTML = "<p>Er is een fout opgetreden bij het laden van de recepten.</p>";
      });
  }

  function renderRecepten(recepten) {
    receptenContainer.innerHTML = "";
    recepten.forEach(recept => {
      const div = document.createElement("div");
      div.classList.add("recept");

      div.innerHTML = `
        <img src="${recept.strMealThumb}" alt="${recept.strMeal}" />
        <h2>${recept.strMeal}</h2>
        <button class="favorite-btn" data-id="${recept.strMeal}">
          ${isFavorite(recept.strMeal) ? '❤️' : '♡'}
        </button>
        <p><strong>Categorie:</strong> ${recept.strCategory} | 
           <strong>Land:</strong> ${recept.strArea}</p>
        <p><strong>Moeilijkheid:</strong> ${recept.moeilijkheid} | 
           <strong>Tijd:</strong> ${recept.tijd} min</p>
      `;

      div.addEventListener("click", () => {
        modal.style.display = "block";
        modalBody.innerHTML = `
          <h2>${recept.strMeal}</h2>
          <img src="${recept.strMealThumb}" />
          <p><strong>Instructies:</strong> ${recept.strInstructions}</p>
        `;
      });

      receptenContainer.appendChild(div);
    });

    document.querySelectorAll(".favorite-btn").forEach(button => {
      button.addEventListener("click", (e) => {
        e.stopPropagation(); // voorkomt dat modal opent
        const id = button.getAttribute("data-id");
        toggleFavorite(id);
        filterRecepten();
      });
    });
  }

  function isFavorite(id) {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    return favorites.includes(id);
  }

  function toggleFavorite(id) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (favorites.includes(id)) {
      favorites = favorites.filter(fav => fav !== id);
    } else {
      favorites.push(id);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }

  function vulCategorieFilter(recepten) {
    const categorieSet = new Set(recepten.map(r => r.strCategory));
    categoryFilter.innerHTML = '<option value="">Alle categorieën</option>';
    categorieSet.forEach(cat => {
      const option = document.createElement("option");
      option.value = cat;
      option.textContent = cat;
      categoryFilter.appendChild(option);
    });
  }

  function vulHerkomstFilter(recepten) {
    const herkomstSet = new Set(recepten.map(r => r.strArea));
    herkomstFilter.innerHTML = '<option value="">Alle herkomsten</option>';
    herkomstSet.forEach(land => {
      const option = document.createElement("option");
      option.value = land;
      option.textContent = land;
      herkomstFilter.appendChild(option);
    });
  }

  function vulMoeilijkheidFilter(recepten) {
    const moeilijkheidSet = new Set(recepten.map(r => r.moeilijkheid));
    moeilijkheidFilter.innerHTML = '<option value="">Alle moeilijkheden</option>';
    moeilijkheidSet.forEach(m => {
      const option = document.createElement("option");
      option.value = m;
      option.textContent = m;
      moeilijkheidFilter.appendChild(option);
    });
  }

  function vulTijdFilter() {
    tijdFilter.innerHTML = `
      <option value="">${translations[currentLang].allTimes}</option>
      <option value="<30">${translations[currentLang].timeLessThan30}</option>
      <option value="30-60">${translations[currentLang].time30to60}</option>
      <option value=">60">${translations[currentLang].timeMoreThan60}</option>
    `;
  }

  function parseTijd(tijdStr) {
    if (!tijdStr) return 0;
    if (typeof tijdStr === 'string' && tijdStr.includes('-')) {
      const delen = tijdStr.split('-').map(x => parseInt(x.trim()));
      return (delen[0] + delen[1]) / 2;
    }
    return parseInt(tijdStr);
  }

  function filterRecepten() {
    const zoekTekst = searchInput.value.toLowerCase();
    const gekozenCategorie = categoryFilter.value;
    const gekozenHerkomst = herkomstFilter.value;
    const gekozenMoeilijkheid = moeilijkheidFilter.value;
    const gekozenTijd = tijdFilter.value;

    const gefilterd = allRecepten.filter(recept => {
      const titel = recept.strMeal.toLowerCase();
      const categorie = recept.strCategory;
      const herkomst = recept.strArea;
      const moeilijkheid = recept.moeilijkheid;
      const tijd = parseTijd(recept.tijd);

      let tijdMatch = true;
      if (gekozenTijd === "<30") tijdMatch = tijd < 30;
      else if (gekozenTijd === "30-60") tijdMatch = tijd >= 30 && tijd <= 60;
      else if (gekozenTijd === ">60") tijdMatch = tijd > 60;

      return (
        titel.includes(zoekTekst) &&
        (!gekozenCategorie || categorie === gekozenCategorie) &&
        (!gekozenHerkomst || herkomst === gekozenHerkomst) &&
        (!gekozenMoeilijkheid || moeilijkheid === gekozenMoeilijkheid) &&
        tijdMatch
      );
    });

    if (gefilterd.length === 0) {
      receptenContainer.innerHTML = "<p>Geen recepten gevonden.</p>";
    } else {
      renderRecepten(gefilterd);
    }
  }

  // Hamburger menu
  hamburgerBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  // Filters
  searchInput.addEventListener("input", filterRecepten);
  categoryFilter.addEventListener("change", filterRecepten);
  herkomstFilter.addEventListener("change", filterRecepten);
  moeilijkheidFilter.addEventListener("change", filterRecepten);
  tijdFilter.addEventListener("change", filterRecepten);




  
  // Taal
  languageSwitcher.addEventListener("change", (e) => {
    currentLang = e.target.value;
    translateUI();
    filterRecepten();
  });

  // Init
  fetchRecepten();
});
