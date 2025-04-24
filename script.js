function getRandomMeal() {
  const url = "https://www.themealdb.com/api/json/v1/1/random.php";
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const meal = data.meals[0];
      const ingredients = [];

      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
          ingredients.push(`${measure} ${ingredient}`);
        }
      }

      const card = document.createElement("div");
      card.className = "item";
      card.innerHTML = `
        <div class="img"><img src="${meal.strMealThumb}" alt="meal"/></div>
        <div class="item-body">
          <h6>${meal.strMeal}</h6>
          <p><strong>الفئة:</strong> ${meal.strCategory || "غير محدد"}</p>
          <p><strong>المنطقة:</strong> ${meal.strArea || "غير محدد"}</p>
          <p><strong>المكونات:</strong><br>${ingredients.join(", ")}</p>
          <p><strong>الطريقة:</strong><br>${meal.strInstructions.slice(0, 300)}...</p>
          <a href="${meal.strYoutube}" target="_blank">🎥 شاهد الطريقة بالفيديو</a>
        </div>
      `;
      resultsDiv.appendChild(card);
    })
    .catch(err => {
      resultsDiv.innerHTML = "<p style='padding:20px'>حدث خطأ أثناء جلب البيانات.</p>";
      console.error(err);
    });
}
