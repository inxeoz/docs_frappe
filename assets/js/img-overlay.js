document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.createElement("div");
  lightbox.id = "lightbox";
  document.body.appendChild(lightbox);

  const img = document.createElement("img");
  lightbox.appendChild(img);

  document.querySelectorAll(".content img").forEach((el) => {
    el.addEventListener("click", () => {
      img.src = el.src;
      lightbox.style.display = "flex";
    });
  });

  lightbox.addEventListener("click", () => {
    lightbox.style.display = "none";
  });
});
