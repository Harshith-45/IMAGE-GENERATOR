let generateImageForm = document.getElementById('generate-image-form');
let formInput = document.getElementById('input-value');
let imageContainerText = document.getElementById('imageContainerText');
let imageGenerated = document.getElementById('generated-image');
let imageContainer = document.getElementById('images-visible');

async function fetchImages(category) {
    try {
        const accessKey = "sxh5Px5x41i0HiSPAomjtLZITdRRGIFBO-Fx21zo38U"; 
        const query = encodeURIComponent(category.trim());
        const apiUrl = `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}&per_page=1`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Unable to fetch data');
        }

        const data = await response.json();

        if (data.results.length > 0) {
            const imageUrl = data.results[0].urls.regular;
            imageContainerText.innerText = `Results for: "${category}"`;
            imageContainer.style.display = "block";
            imageGenerated.src = imageUrl;
            console.log("Image URL:", imageUrl);
        } else {
            imageContainerText.innerText = `No images found for "${category}"`;
            imageContainer.style.display = "none";
        }

    } catch (error) {
        console.error('Fetch Error:', error);
        imageContainerText.innerText = "Failed to load image. Please try again.";
        imageContainer.style.display = "none";
    }
}

generateImageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const enteredText = formInput.value.trim();
    if (enteredText !== "") {
        fetchImages(enteredText);
    } else {
        imageContainerText.innerText = "Input field cannot be empty!";
        imageContainer.style.display = "none";
    }
});
