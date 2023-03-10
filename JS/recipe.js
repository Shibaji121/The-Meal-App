const recipePage = document.getElementById("meal-detail");
const recipeInstruction = document.getElementById("instruction");
const ingredientList = document.getElementById("ingredent");
const recipeContainer = document.getElementById("recipe-container");
let eleArray = [];

// Function to Add Meal Detail on recipe page
async function addMealDetail(id) {
  // if directly some one go to recipe page or meal is invalid
  if (id === null || id === "") {
    recipeContainer.innerHTML = `
    <h1> Hey Buddy!! Please Select a Meal's View Recipe button to view the recipe </h1>
    <a 
    class="btn btn-warning" 
    href="/index.html" 
    role="button"
    >Click Here to go to Search Page</a>`;
    recipeContainer.style.margin = "2rem auto";
    recipeContainer.style.width = "60%";
    recipeContainer.style.fontFamily = "cursive";
    return;
  }

  // Fetching meals by id
  const url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id;
  await fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("NETWORK RESPONSE ERROR");
      }
    })
    .then((data) => {
      eleArray = data.meals;
    })
    .catch((error) => {
      console.error("FETCH ERROR:", error);
    });
  recipePage.innerHTML = `
        <img
          src=${eleArray[0].strMealThumb}
          alt="food-img"
        />`;
  recipeInstruction.innerHTML = `<div>
        <h1>${eleArray[0].strMeal}</h1>
        <p>${eleArray[0].strInstructions}</p>
        </div>`;
  addIngreList(eleArray);
}

// function to add Ingredient list
function addIngreList(array) {
  let heading = document.createElement("h2");
  heading.innerText = "Ingredients";
  let list = document.createElement("ul");
  let IngreName = "strIngredient";
  let measure = "strMeasure";
  for (let i = 1; i <= 20; i++) {
    let k = IngreName + i;
    let l = measure + i;
    if (array[0][k] !== "" && array[0][k] !== null) {
      let listItem = document.createElement("li");
      listItem.innerHTML = `${array[0][k]}  ${
        array[0][l] !== " " ? `= ${array[0][l]}` : " = as needed"
      }`;
      list.append(listItem);
    }
  }
  ingredientList.append(heading);
  ingredientList.append(list);
}

// Default call on loading of recipe Page with parameter ID stored in local Storage
addMealDetail(localStorage.getItem("MealID"));
