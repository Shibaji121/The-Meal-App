const mealsList = document.getElementById("meal-cards");
const searchBar = document.getElementById("search-bar-box");
const searchListBox = document.getElementById("search-value-list");
let foodList = [];

const fetchRandomly = () => {
  url = "https://www.themealdb.com/api/json/v1/1/random.php";
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
function addFoodCards(eleArr) {
  const item = document.createElement("div");
  item.className = "col-md-4";
  item.innerHTML = `<div class="card-sl">
    <div class="card-image">
      <img
        src=${eleArr[0].strMealThumb}
      />
    </div>
    <div id=${eleArr[0].idMeal} class="card-action" onclick="toggleFavourite(${
    eleArr[0].idMeal
  })";
      ><i class="fa-regular fa-heart"></i>
      <i 
      id="${eleArr[0].idMeal}" 
      class="fa-solid fa-heart fav-icon"
      ></i>
    </div>
    <div class="card-heading"><span id="card-head">${
      eleArr[0].strMeal
    }</span></div>
    <div class="card-text"><span id="card-txt">This a ${eleArr[0].strArea} ${
    eleArr[0].strTags == null ? "Food" : eleArr[0].strTags
  }</span></div>
    <a href="/recipe.html" class="card-button" onclick="storeIdInLocalStorage(${
      eleArr[0].idMeal
    })">View Recipe</a>
  </div>`;
  mealsList.append(item);
  applyFavChange(eleArr[0].idMeal);
}

function applyFavChange(id) {
  if (
    localStorage.getItem("Favourites") !== null &&
    localStorage.getItem("Favourites").includes(id)
  ) {
    document.getElementById(id).getElementsByTagName("i")[1].style.display =
      "inline";
  }
}

if (foodList.length === 0) {
  for (let i = 0; i < 9; i++) {
    fetchRandomly();
  }
}

function storeIdInLocalStorage(id) {
  localStorage.setItem("MealID", id);
}

function toggleFavourite(id) {
  let favArr = [];
  if (localStorage.getItem("Favourites") == null) {
    localStorage.setItem("Favourites", JSON.stringify(favArr));
  } else {
    favArr = JSON.parse(localStorage.getItem("Favourites"));
  }
  let displayValue = window.getComputedStyle(
    document.getElementById(id).getElementsByTagName("i")[1]
  ).display;
  const favIcon = document.getElementById(id).getElementsByTagName("i")[1];
  if (displayValue === "none") {
    favIcon.style.display = "inline";
    favIcon.style.color = "#e26d5c";
    if (!favArr.includes(id)) {
      favArr.push(id);
    }
    localStorage.setItem("Favourites", JSON.stringify(favArr));
  } else {
    favIcon.style.display = "none";
    favArr = favArr.filter((item) => item !== id);
    localStorage.setItem("Favourites", JSON.stringify(favArr));
  }
}

async function fetchBySearchName(name) {
  url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + name;
  await fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("NETWORK RESPONSE ERROR");
      }
    })
    .then((obj) => {
      foodList = obj.meals;
      addSearchList(obj.meals);
    })
    .catch((error) => {
      console.error("FETCH ERROR:", error);
    });
}

function addSearchList(eleArr) {
  if (eleArr === null) {
    searchListBox.innerHTML = "";
    return;
  }
  searchListBox.innerHTML = "";
  const list = document.createElement("div");
  for (let i = 0; i < eleArr.length && i < 5; i++) {
    list.innerHTML += `
    <a
    onclick="storeIdInLocalStorage(${eleArr[i].idMeal})"
    href="/recipe.html">
    ${eleArr[i].strMeal}</a>`;
  }
  searchListBox.append(list);
}

searchBar.addEventListener("keyup", (e) => {
  if (e.target.value === "") {
    searchListBox.innerHTML = "";
    searchBar.style.backgroundColor = "transparent";
  } else {
    fetchBySearchName(e.target.value);
    searchBar.style.backgroundColor = "rgb(234, 234, 234)";
  }
});

window.addEventListener("click", () => {
  searchListBox.innerHTML = "";
});

searchBar.addEventListener("click", () => {
  searchListBox.innerHTML = "";
  searchBar.style.backgroundColor = "rgb(234, 234, 234)";
});

function addSearchFoodCards() {
  mealsList.innerHTML = "";
  if (foodList === null || foodList.length === 0) {
    mealsList.innerHTML = `
    <h1 style=" width: 80%; margin: 10px auto; font-family: cursive; ">Hey Buddy!! Sorry.. We don't have any Meals with your search criteria</h1>
    <p style=" width: 80%; margin: 0px auto 4rem; font-family: cursive; ">Search Any thing else Thank you!!..</p>`;
    return;
  }
  for (let i = 0; i < foodList.length; i++) {
    mealsList.innerHTML += `<div class="col-md-4">
    <div class="card-sl">
    <div class="card-image">
      <img
        src=${foodList[i].strMealThumb}
      />
    </div>
    <div id=${
      foodList[i].idMeal
    } class="card-action" onclick="toggleFavourite(${foodList[i].idMeal})";
      ><i class="fa-regular fa-heart"></i>
      <i id="${foodList[i].idMeal}" class="fa-solid fa-heart fav-icon"></i>
    </div>
    <div class="card-heading"><span id="card-head">${foodList[i].strMeal}
    </span></div>
    <div class="card-text"><span id="card-txt">This a ${foodList[i].strArea} ${
      foodList[i].strTags == null ? "Food" : foodList[i].strTags
    }</span></div>
    <a href="/recipe.html" class="card-button" onclick="storeIdInLocalStorage(${
      foodList[i].idMeal
    })">View Recipe</a>
  </div>
  </div>`;
    applyFavChange(foodList[i].idMeal);
  }
  mealsList.scrollIntoView(true);
}
