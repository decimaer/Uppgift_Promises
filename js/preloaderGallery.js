import * as model from "./model.js";

const galleryContainer = document.getElementById("gallery-container");

const cssGalleryImages = `
   height: 15em;
   width: auto;
`;
const cssGalleryBlur = `
   filter: blur(20px);
`;

const galleryState = {
	galleryIsLoaded: false,
};

const renderGallery = function (images) {
	const allImagesMarkup = images
		.map((image) => {
			return `<img src=${image} class="thumbnail">`;
		})
		.join("");

	galleryContainer.insertAdjacentHTML("beforeend", allImagesMarkup);
	galleryContainer
		.querySelectorAll("img")
		.forEach((el) => (el.style.cssText = cssGalleryImages + cssGalleryBlur));
};

const controlPreloaderGallery = async function (entries) {
	try {
		if (!entries[0].isIntersecting) return;
		if (galleryState.galleryIsLoaded) return;

		const thumbnails = model.state.backgroundImage.fullData.data.map(
			(imgData) => imgData.urls.thumb
		);
		renderGallery(thumbnails);

		const imagePromises = model.state.backgroundImage.fullData.data.map(
			(imgData) => {
				new Promise((resolve, reject) => {
					const img = new Image();
					img.src = imgData.urls.regular;
					img.style.cssText = cssGalleryImages;
					img.addEventListener("load", () => {
						galleryContainer.appendChild(img);
						resolve(img);
					});
					img.addEventListener("error", (err) => reject(err));
				});
			}
		);

		// This is just for demonstration purposes
		imagePromises.push(
			new Promise((resolve, _) => setTimeout(() => resolve(), 2000))
		);

		// Clear temporary thumbnails
		imagePromises.unshift(
			new Promise((resolve, _) => {
				galleryContainer
					.querySelectorAll(".thumbnail")
					.forEach((img) => img.remove());
				resolve();
			})
		);

		// await Promise.all(imagePromises);

		galleryState.galleryIsLoaded = true;
		console.info("Gallery loaded");
	} catch (error) {}
};

const observerOptions = {
	root: null,
	threshold: 0.1,
};

const intersectionObserver = new IntersectionObserver(
	controlPreloaderGallery,
	observerOptions
);

intersectionObserver.observe(galleryContainer);
