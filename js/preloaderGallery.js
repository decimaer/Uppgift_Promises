import * as model from "./model.js";

const galleryContainer = document.getElementById("gallery-container");

const cssGalleryImages = `
   height: 15em;
   width: auto;
`;

const galleryState = {
	galleryIsLoaded: false,
};

const controlPreloaderGallery = async function (entries) {
	try {
		if (!entries[0].isIntersecting) return;
		if (galleryState.galleryIsLoaded) return;

		const imagePromises = model.state.backgroundImage.fullData.map(
			(imgData) =>
				new Promise((resolve, reject) => {
					const img = new Image();
					img.src = imgData.urls.regular;
					img.style.cssText = cssGalleryImages;
					img.addEventListener("load", () => resolve(img));
					img.addEventListener("error", (err) => reject(err));
				})
		);

		const settledImages = await Promise.allSettled(imagePromises);
		settledImages.forEach((img) => galleryContainer.appendChild(img.value));

		galleryState.galleryIsLoaded = true;
		console.info("Gallery loaded");
	} catch (error) {
		console.error(error);
	}
};

export const renderError = function () {
	galleryContainer.innerHTML = "Error loading gallery";
};

export const initIntersectionObserver = function () {
	const observerOptions = {
		root: null,
		threshold: 0.1,
	};

	const intersectionObserver = new IntersectionObserver(
		controlPreloaderGallery,
		observerOptions
	);

	intersectionObserver.observe(galleryContainer);
};
