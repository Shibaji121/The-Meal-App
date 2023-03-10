const recipePage = document.getElementById("meal-detail");
const recipeInstruction = document.getElementById("instruction");
const ingredientList = document.getElementById("ingredent");
let eleArray = [];

async function addMealDetail(id) {
  console.log(id);
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

addMealDetail(localStorage.getItem("MealID"));
