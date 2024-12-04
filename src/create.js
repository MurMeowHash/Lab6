const baseUrl = "https://havrysh-web-6-api-production.up.railway.app";

window.addEventListener("load", function () {
  const form = document.getElementById("form");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const image_link = document.getElementById("image_link").value;
    const description = document.getElementById("description").value;
    const data = { image_link, description };
    fetch(`${baseUrl}/images`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(`Record added with id: ${data.id}`);
        form.reset();
      });
  });

  const reset = document.getElementById("reset");
  reset.addEventListener("click", function () {
    fetch(`${baseUrl}/flush-all`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then((response) => alert("All records deleted"));
  });
});
