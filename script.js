function searchUniversities() {
  const query = document.getElementById("searchInput").value.trim();
  const url = `http://universities.hipolabs.com/search?name=${query}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const resultsDiv = document.getElementById("results");
      const count = document.getElementById("count");
      resultsDiv.innerHTML = "";

      if (data.length === 0) {
        resultsDiv.innerHTML = "<p>No universities found.</p>";
        count.textContent = "";
        return;
      }

      count.textContent = `Found ${data.length} universities`;

      data.forEach(university => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <h3>${university.name}</h3>
          <p><strong>Country:</strong> ${university.country}</p>
          <p><a href="${university.web_pages[0]}" target="_blank">Visit Website</a></p>
        `;
        resultsDiv.appendChild(card);
      });
    })
    .catch(err => {
      document.getElementById("results").innerHTML = "<p>Error fetching data.</p>";
      console.error(err);
    });
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}
