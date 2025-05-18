document.addEventListener("DOMContentLoaded", () => {
  const receptenContainer = document.getElementById("recepten");


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
    })
    .catch((error) => {
      console.error("Fout bij ophalen van API recepten:", error);
    });

  const searchInput = document.getElementById("search");
  searchInput.addEventListener("input", () => {
    const zoekterm = searchInput.value.toLowerCase();
    const recepten = document.querySelectorAll(".recept");

    recepten.forEach((recept) => {
      const titel = recept.querySelector("h2").textContent.toLowerCase();
      recept.style.display = titel.includes(zoekterm) ? "block" : "none";
    });
  });
});
console.log('geladen of niet')
