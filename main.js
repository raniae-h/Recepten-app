document.addEventListener("DOMContentLoaded", () => {
  const receptenContainer = document.getElementById("recepten");
  const categoryFilter = document.getElementById("category-filter");
  const herkomstFilter = document.getElementById("herkomst-filter");
  const moeilijkheidFilter = document.getElementById("moeilijkheid-filter");
  const tijdFilter = document.getElementById("tijd-filter");
  const searchInput = document.getElementById("search");

let lang = 'nl';


  const dishes = [
  {
    strMeal: "Migas",
    strCategory: "Ontbijt",
    strArea: "Spanje",
    moeilijkheid: "Gemiddeld",
    tijd: "30-40",
    strMealThumb: "https://www.themealdb.com/images/media/meals/xxpqsy1511452222.jpg",
    description: "Traditioneel Spaans gerecht met broodkruimels."
  },
  {
    strMeal: "Sushi",
    strCategory: "Lunch",
    strArea: "Japan",
    moeilijkheid: "Moeilijk",
    tijd: "60-90",
    strMealThumb: "https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg",
    description: "Verse sushi rollen."
  },
  {
      strMeal: "Burek",
      strCategory: "Snack",
      strArea: "Balkan",
      moeilijkheid: "Gemiddeld",
      tijd: "45-60",
      strMealThumb: "https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg",
      description: "Bladerdeeg gevuld met vlees of kaas."
    },
    {
      strMeal: "Corba",
      strCategory: "Soep",
      strArea: "Turkije",
      moeilijkheid: "Gemakkelijk",
      tijd: "30-45",
      strMealThumb: "https://www.themealdb.com/images/media/meals/58oia61564916529.jpg",
      description: "Hartverwarmende Turkse linzensoep."
    },
    {
      strMeal: "Kumpir",
      strCategory: "Fastfood",
      strArea: "Turkije",
      moeilijkheid: "Gemiddeld",
      tijd: "60",
      strMealThumb: "https://www.themealdb.com/images/media/meals/mlchx21564916997.jpg",
      description: "Gevulde gepofte aardappel met toppings."
    },
    {
      strMeal: "Tamiya",
      strCategory: "Vegetarisch",
      strArea: "Egypte",
      moeilijkheid: "Gemiddeld",
      tijd: "40-60",
      strMealThumb: "https://www.themealdb.com/images/media/meals/n3xxd91598732796.jpg",
      description: "Egyptische falafel gemaakt van tuinbonen."
    },
    {
      strMeal: "Bistek",
      strCategory: "Hoofdgerecht",
      strArea: "Filipijnen",
      moeilijkheid: "Gemakkelijk",
      tijd: "15-25",
      strMealThumb: "https://www.themealdb.com/images/media/meals/4pqimk1683207418.jpg",
      description: "Gemarineerde biefstuk met uien."
    },
    {
      strMeal: "Wontons",
      strCategory: "Voorgerecht",
      strArea: "China",
      moeilijkheid: "Moeilijk",
      tijd: "60-90",
      strMealThumb: "https://www.themealdb.com/images/media/meals/1525876468.jpg",
      description: "Gevulde deegpakketjes in bouillon."
    },
    {
      strMeal: "Kafteji",
      strCategory: "Vegetarisch",
      strArea: "Tunesië",
      moeilijkheid: "Gemiddeld",
      tijd: "45",
      strMealThumb: "https://www.themealdb.com/images/media/meals/1bsv1q1560459826.jpg",
      description: "Gebakken groentemix met eieren."
    },
    {
      strMeal: "Big Mac",
      strCategory: "Fastfood",
      strArea: "VS",
      moeilijkheid: "Gemakkelijk",
      tijd: "20-30",
      strMealThumb: "https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg",
      description: "Dubbele hamburger met speciale saus."
    },
    {
      strMeal: "Lasagne",
      strCategory: "Hoofdgerecht",
      strArea: "Italië",
      moeilijkheid: "Gemiddeld",
      tijd: "60-90",
      strMealThumb: "https://www.themealdb.com/images/media/meals/wtsvxx1511296896.jpg",
      description: "Laagjes pasta, saus en kaas."
    },
    {
      strMeal: "Timbits",
      strCategory: "Dessert",
      strArea: "Canada",
      moeilijkheid: "Gemiddeld",
      tijd: "60",
      strMealThumb: "https://www.themealdb.com/images/media/meals/txsupu1511815755.jpg",
      description: "Mini donutballetjes van Tim Hortons."
    },
    {
      strMeal: "Dal Fry",
      strCategory: "Vegetarisch",
      strArea: "India",
      moeilijkheid: "Gemiddeld",
      tijd: "40-50",
      strMealThumb: "https://www.themealdb.com/images/media/meals/wuxrtu1483564410.jpg",
      description: "Gekruide linzenstoofpot."
    },
    {
      strMeal: "Koshari",
      strCategory: "Hoofdgerecht",
      strArea: "Egypte",
      moeilijkheid: "Moeilijk",
      tijd: "60-90",
      strMealThumb: "https://www.themealdb.com/images/media/meals/4er7mj1598733193.jpg",
      description: "Mix van rijst, linzen, pasta en saus."
    },
    {
      strMeal: "Poutine",
      strCategory: "Snack",
      strArea: "Canada",
      moeilijkheid: "Gemiddeld",
      tijd: "45-60",
      strMealThumb: "https://www.themealdb.com/images/media/meals/uuyrrx1487327597.jpg",
      description: "Frieten met kaas en jus."
    },
    {
      strMeal: "Pancakes",
      strCategory: "Ontbijt",
      strArea: "Internationaal",
      moeilijkheid: "Gemakkelijk",
      tijd: "15-25",
      strMealThumb: "https://www.themealdb.com/images/media/meals/rwuyqx1511383174.jpg",
      description: "Luchtige pannenkoeken met siroop."
    },
    {
      strMeal: "Kapsalon",
      strCategory: "Fastfood",
      strArea: "Nederland",
      moeilijkheid: "Gemiddeld",
      tijd: "45",
      strMealThumb: "https://www.themealdb.com/images/media/meals/sxysrt1468240488.jpg",
      description: "Döner met friet, kaas en salade."
    },
    {
      strMeal: "Moussaka",
      strCategory: "Hoofdgerecht",
      strArea: "Griekenland",
      moeilijkheid: "Moeilijk",
      tijd: "90-120",
      strMealThumb: "https://www.themealdb.com/images/media/meals/ctg8jd1585563097.jpg",
      description: "Ovenschotel met aubergine en gehakt."
    },
    {
      strMeal: "Shawarma",
      strCategory: "Streetfood",
      strArea: "Midden-Oosten",
      moeilijkheid: "Moeilijk",
      tijd: "90-120",
      strMealThumb: "https://www.themealdb.com/images/media/meals/rvxxuy1468312893.jpg",
      description: "Gekruid geroosterd vlees in pitabrood."
    },
    {
      strMeal: "Fish Pie",
      strCategory: "Hoofdgerecht",
      strArea: "VK",
      moeilijkheid: "Gemiddeld",
      tijd: "60-75",
      strMealThumb: "https://www.themealdb.com/images/media/meals/ysxwuq1487323065.jpg",
      description: "Ovenschotel met vis en aardappelpuree."
    },
    {
      strMeal: "Flamiche",
      strCategory: "Taart",
      strArea: "Frankrijk",
      moeilijkheid: "Gemiddeld",
      tijd: "60-75",
      strMealThumb: "https://www.themealdb.com/images/media/meals/wssvvs1511785879.jpg",
      description: "Hartige preitaart uit Noord-Frankrijk."
    },
    {
      strMeal: "Stamppot",
      strCategory: "Traditioneel",
      strArea: "Nederland",
      moeilijkheid: "Gemakkelijk",
      tijd: "45",
      strMealThumb: "https://www.themealdb.com/images/media/meals/hyarod1565090529.jpg",
      description: "Gestampte aardappelen met groente."
    },
    {
      strMeal: "Kedgeree",
      strCategory: "Ontbijt",
      strArea: "VK",
      moeilijkheid: "Gemiddeld",
      tijd: "45-60",
      strMealThumb: "https://www.themealdb.com/images/media/meals/utxqpt1511639216.jpg",
      description: "Rijstgerecht met vis, ei en kruiden."
    },
    {
      strMeal: "Ribollita",
      strCategory: "Soep",
      strArea: "Italië",
      moeilijkheid: "Gemiddeld",
      tijd: "60-90",
      strMealThumb: "https://www.themealdb.com/images/media/meals/xrrwpx1487347049.jpg",
      description: "Stevige Toscaanse broodsoep."
    },
    {
      strMeal: "Roti John",
      strCategory: "Streetfood",
      strArea: "Maleisië",
      moeilijkheid: "Gemiddeld",
      tijd: "30-45",
      strMealThumb: "https://www.themealdb.com/images/media/meals/hx335q1619789561.jpg",
      description: "Broodje met ei, vlees en kruiden."
    }

]; 
  const allRecepten = dishes;

function isFavorite(id) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  return favorites.includes(id);
}


  function renderRecepten(recepten) {
    receptenContainer.innerHTML = "";
    recepten.forEach((recept) => {
      const div = document.createElement("div");
      div.classList.add("recept");

      div.innerHTML = `
        <img src="${recept.strMealThumb}" alt="${recept.strMeal}" />
        <h2>${recept.strMeal}</h2>
        <p>${recept.description || ""}</p>
        <p><strong>Categorie:</strong> ${recept.strCategory} | 
           <strong>Land:</strong> ${recept.strArea}</p>
        <p><strong>Moeilijkheid:</strong> ${recept.moeilijkheid} | 
           <strong>Tijd:</strong> ${recept.tijd} min</p>
      `;
      div.innerHTML = `
  <img src="${recept.strMealThumb}" alt="${recept.strMeal}" />
  <h2>${recept.strMeal}</h2>
  <button class="favorite-btn" data-id="${recept.strMeal}">
    ${isFavorite(recept.strMeal) ? '❤️' : '♡'}
  </button>
  <p>${recept.description || ""}</p>
  <p><strong>Categorie:</strong> ${recept.strCategory} | 
     <strong>Land:</strong> ${recept.strArea}</p>
  <p><strong>Moeilijkheid:</strong> ${recept.moeilijkheid} | 
     <strong>Tijd:</strong> ${recept.tijd} min</p>
`;


      receptenContainer.appendChild(div);
    });

    document.querySelectorAll(".favorite-btn").forEach(button => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id");
      toggleFavorite(id);
      filterRecepten();
    });
  })




  }

  function vulCategorieFilter(recepten) {
    const categorieSet = new Set();
    recepten.forEach(r => categorieSet.add(r.strCategory));
    categoryFilter.innerHTML = '<option value="">Alle categorieën</option>';
    categorieSet.forEach(cat => {
      const option = document.createElement("option");
      option.value = cat;
      option.textContent = cat;
      categoryFilter.appendChild(option);
    });
  }

  function vulHerkomstFilter(recepten) {
    const herkomstSet = new Set();
    recepten.forEach(r => herkomstSet.add(r.strArea));
    herkomstFilter.innerHTML = '<option value="">Alle herkomsten</option>';
    herkomstSet.forEach(land => {
      const option = document.createElement("option");
      option.value = land;
      option.textContent = land;
      herkomstFilter.appendChild(option);
    });
  }

  function vulMoeilijkheidFilter(recepten) {
  const moeilijkheidSet = new Set();
  recepten.forEach(r => moeilijkheidSet.add(r.moeilijkheid));
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
    <option value="">Alle tijden</option>
    <option value="<30">Minder dan 30 min</option>
    <option value="30-60">30 tot 60 min</option>
    <option value=">60">Meer dan 60 min</option>
  `;
}

const hamburgerBtn = document.getElementById('hamburger');
const mobileMenu = document.getElementById('hamburger-menu');

hamburgerBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});


  function parseTijd(tijdStr) {
    if (!tijdStr) return 0;
    if (tijdStr.includes('-')) {
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
if (gekozenTijd === "<30") {
  tijdMatch = tijd < 30;
} else if (gekozenTijd === "30-60") {
  tijdMatch = tijd >= 30 && tijd <= 60;
} else if (gekozenTijd === ">60") {
  tijdMatch = tijd > 60;
}


      return (
        titel.includes(zoekTekst) &&
        (!gekozenCategorie || categorie === gekozenCategorie) &&
        (!gekozenHerkomst || herkomst === gekozenHerkomst) &&
        (!gekozenMoeilijkheid || moeilijkheid === gekozenMoeilijkheid) &&
        tijdMatch
      );
    });

    renderRecepten(gefilterd);
  }

  function toggleFavorite(id) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  if (favorites.includes(id)) {
    favorites = favorites.filter(fav => fav !== id);
  } else {
    favorites.push(id);
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
  filterRecepten();
}

function isFavorite(id) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  return favorites.includes(id);
}


  renderRecepten(allRecepten);
  vulCategorieFilter(allRecepten);
  vulHerkomstFilter(allRecepten);

  searchInput.addEventListener("input", filterRecepten);
  categoryFilter.addEventListener("change", filterRecepten);
  herkomstFilter.addEventListener("change", filterRecepten);
  moeilijkheidFilter.addEventListener("change", filterRecepten);
  tijdFilter.addEventListener("change", filterRecepten);


  document.addEventListener("DOMContentLoaded", function () {
  vulCategorieFilter(allRecepten);
  vulHerkomstFilter(allRecepten);
  vulMoeilijkheidFilter(allRecepten);
  vulTijdFilter();
});


searchInput.addEventListener("input", filterRecepten);
categoryFilter.addEventListener("change", filterRecepten);
herkomstFilter.addEventListener("change", filterRecepten);
moeilijkheidFilter.addEventListener("change", filterRecepten);
tijdFilter.addEventListener("change", filterRecepten);


})