const baseUrl = "https://havrysh-web-6-api-production.up.railway.app";

let fetchedData = "";

window.addEventListener("load", function () {
  const block = document.getElementById("slide-area");
  let currentIndex = 0;

  const renderSlider = (data) => {
    block.innerHTML = `
      <div class="slider">
        <div class="slider-track">
          ${data
            .map(
              (image) => `
            <div class="slider-item">
              <img class="slider-image" src="${image.image_link}"/>
              <p>${image.description}</p>
              </div>
              `
            )
            .join("")}
            </div>
            <div class="slider-buttons">
              <button class="slider-btn prev-btn">Previous</button>
              <button class="slider-btn next-btn">Next</button>
            </div>
      </div>
    `;
  };

  const updateSlider = () => {
    const track = document.querySelector(".slider-track");
    const items = document.querySelectorAll(".slider-item");
    const width = items[0].clientWidth;
    track.style.transform = `translateX(-${currentIndex * width}px)`;
  };

  const fetchImages = () => {
    fetch(`${baseUrl}/images`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (JSON.stringify(data) === fetchedData) {
          return;
        }
        fetchedData = JSON.stringify(data);
        renderSlider(data);
        currentIndex = 0;
        updateSlider();

        // Add event listeners for navigation buttons
        document.querySelector(".prev-btn").addEventListener("click", () => {
          currentIndex = Math.max(0, currentIndex - 1);
          updateSlider();
        });

        document.querySelector(".next-btn").addEventListener("click", () => {
          const items = document.querySelectorAll(".slider-item");
          currentIndex = Math.min(items.length - 1, currentIndex + 1);
          updateSlider();
        });

        window.addEventListener("resize", updateSlider);
      });
  };

  fetchImages();

  setInterval(() => {
    console.log("Refreshing images...");
    fetchImages();
  }, 5000);
});
