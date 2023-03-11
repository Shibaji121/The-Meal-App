const mealsList = document.getElementById("meal-cards");
let favArr = JSON.parse(localStorage.getItem("Favourites"));

// Fetching meal by ID
const fetchById = (id) => {
  url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id;
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("NETWORK RESPONSE ERROR");
      }
    })
    .then((obj) => {
      addFoodCards(obj.meals);
    })
    .catch((error) => {
      console.error("FETCH ERROR:", error);
    });
};

// Adding food cards after successfully fetching
function addFoodCards(eleArr) {
  const item = document.createElement("div");
  item.className = "col-md-4";
  item.innerHTML = `<div class="card-sl">
    <div class="card-image">
      <img
        src=${eleArr[0].strMealThumb}
      />
    </div>
    <div id=${eleArr[0].idMeal} 
    class="card-action"
    onclick="toggleFavStyle(${eleArr[0].idMeal})"
      ><i class="fa-solid fa-heart"></i>
    </div>
    <div class="card-heading"><span id="card-head">${
      eleArr[0].strMeal
    }</span></div>
    <div class="card-text"><span id="card-txt">This a ${eleArr[0].strArea} ${
    eleArr[0].strTags == null ? "Food" : eleArr[0].strTags
  }</span></div>
    <a href="/recipe.html" 
    class="card-button" 
    onclick="storeIdInLocalStorage(${eleArr[0].idMeal})">View Recipe</a>
  </div>`;
  mealsList.append(item);
}

// Checking if any favourites is there or not
// and then calling addFoodCards if favourites available
function addFavourites() {
  if (favArr === null || favArr.length === 0 || favArr === undefined) {
    const item = document.createElement("div");
    item.innerHTML = `
    <h1> Hey Buddy!! Add Some Meal to your list </h1>
    <a 
    class="btn btn-warning" 
    href="/index.html" 
    role="button"
    >Click Here to go to Search Page</a>`;
    mealsList.append(item);
    mealsList.style.margin = "auto";
    mealsList.style.width = "60%";
    mealsList.style.fontFamily = "cursive";
  } else {
    for (let i = 0; i < favArr.length; i++) {
      fetchById(favArr[i]);
    }
  }
}

// Function to remove meal from favourite list on clicking favourite button
function toggleFavStyle(id) {
  Array.prototype.remove = function (value) {
    this.splice(this.indexOf(value), 1);
  };
  favArr.remove(id);
  localStorage.setItem("Favourites", JSON.stringify(favArr));
  mealsList.innerHTML = "";
  addFavourites();
}

// On clicking View Recipe button store the meal ID
function storeIdInLocalStorage(id) {
  localStorage.setItem("MealID", id);
}

// Defaultly call this function on loading of Favourite page
addFavourites();
