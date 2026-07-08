// movies is a dictionary that contains information about each movie, including its title, image, description, genre, year, rating, and reviews. Each movie is identified by a unique
// each key is a movie ID and value is an object containing movie details.
// reviews is an array (list) of review objects, which can be added to dynamically when users submit new reviews through the review form 
// via the "reviews.push()" function.
const movies = {
    "the-boys": {
        title: "The Boys",
        image: "images/the_boys.jpg",
        alt: "The Boys poster",
        description: "A fun and irreverent take on what happens when superheroes abuse their superpowers.",
        genre: "Action / Sci-Fi",
        year: "2019",
        rating: "8.7/10",
        reviews: [
            { name: "Jordan", rating: "5", text: "Sharp, chaotic, and full of memorable scenes." },
            { name: "Sam", rating: "4", text: "A bold superhero story with a darker sense of humor." }
        ]
    },
    "superman": {
        title: "Superman",
        image: "images/superman.jpeg",
        alt: "Superman movie poster",
        description: "An upcoming superhero movie following Superman's journey to reconcile his Kryptonian heritage.",
        genre: "Action / Sci-Fi",
        year: "2025",
        rating: "8.5/10",
        reviews: [
            { name: "Maya", rating: "5", text: "A hopeful take on a classic hero." },
            { name: "Luis", rating: "4", text: "The story has a lot of potential." }
        ]
    },
    "avatar-fire-and-ash": {
        title: "Avatar: Fire and Ash",
        image: "images/avatar_fire_and_ash.jpeg",
        alt: "Avatar: Fire and Ash movie poster",
        description: "The next chapter in the Avatar franchise exploring the new ash people of Pandora.",
        genre: "Science Fiction",
        year: "2025",
        rating: "8.9/10",
        reviews: [
            { name: "Ari", rating: "5", text: "The worldbuilding sounds massive and exciting." },
            { name: "Taylor", rating: "4", text: "I am curious to see more of Pandora." }
        ]
    }
};

function renderDetailsPage() {
    const titleElement = document.querySelector("#movie-title");

    if (!titleElement) {
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const movieId = params.get("movie");
    const movie = movies[movieId];

    if (!movie) {
        titleElement.textContent = "Movie Not Found";
        document.querySelector("#movie-description").textContent = "Choose a movie from the Featured Movies page to view its details.";
        document.querySelector("#movie-image").classList.add("hidden");
        document.querySelector("#movie-genre").textContent = "N/A";
        document.querySelector("#movie-year").textContent = "N/A";
        document.querySelector("#movie-rating").textContent = "N/A";
        document.querySelector("#reviews-list").innerHTML = "<p>No reviews are available for this movie.</p>";
        return;
    }

    document.title = `CPSC-349 Lab 5: ${movie.title}`;
    titleElement.textContent = movie.title;
    document.querySelector("#movie-image").src = movie.image;
    document.querySelector("#movie-image").alt = movie.alt;
    document.querySelector("#movie-description").textContent = movie.description;
    document.querySelector("#movie-genre").textContent = movie.genre;
    document.querySelector("#movie-year").textContent = movie.year;
    document.querySelector("#movie-rating").textContent = movie.rating;

    // call a function for renderReviews(movie.reviews);
    renderReviews(movie.reviews);
    // call another function for setupReviewForm(movie.reviews);
    setupReviewForm(movie.reviews);
}    

function renderReviews(reviews) {
    /*
    TODO: This function takes an array of review objects and renders them in the reviews section of the movie details page. 
    It first clears any existing reviews from the reviews list, then checks if there are any reviews to display. 
    If there are no reviews, it shows a message indicating that no reviews have been added yet. 
    If there are reviews, it creates a card for each review with the reviewer's name, rating, and review text, and appends these cards to the reviews list.
    */
    const reviewsList = document.querySelector("#reviews-list");
    if (!reviewsList) {
        return;
    }

    reviewsList.replaceChildren();

    if (reviews.length === 0) {
        // display a message if there are no reviews to show. We create a paragraph element, set its text content to indicate that there are no reviews, and append it to the reviews list.
        const emptyMessage = document.createElement("p");
        emptyMessage.textContent = "No reviews have been added yet.";
        reviewsList.append(emptyMessage);
        return;
    }

    reviews.forEach((review) => {
        const reviewCard = document.createElement("div");
        reviewCard.classList.add("review-card");

        const reviewerName = document.createElement("h3");
        reviewerName.textContent = review.name;

        const reviewerRating = document.createElement("p");
        reviewerRating.textContent = `Rating: ${review.rating}/5`;

        const reviewerText = document.createElement("p");
        reviewerText.textContent = review.text;

        reviewCard.append(reviewerName, reviewerRating, reviewerText);
        reviewsList.append(reviewCard);
    });
}

function setupReviewForm(reviews) {
    const reviewForm = document.querySelector("#review-form");

    if (!reviewForm) {
        return;
    }

    reviewForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.querySelector("#reviewer-name").value.trim();
        const rating = document.querySelector("#review-rating").value;
        const text = document.querySelector("#review-text").value.trim();
        const heading = document.querySelector("#review-heading");
        const reply = document.querySelector("#review-reply");
        const output = document.querySelector("#review-output");
        const reviewerNameOutput = document.querySelector("#review-output-name");
        const reviewerTextOutput = document.querySelector("#review-output-text");

        if (!name || !rating || !text) {
            heading.textContent = "Please complete your name, rating, and review before submitting.";
            reply.classList.add("hidden");
            reviewerTextOutput.textContent = "";
            output.classList.remove("hidden");
            return;
        }

        reviews.push({ name, rating, text });

        renderReviews(reviews);
        heading.textContent = "Thank you for your review!";
        reviewerNameOutput.textContent = name;
        reply.classList.remove("hidden");
        output.classList.remove("hidden");
        reviewForm.reset();
    });
}


function setupFeedbackForm() {
    // Select the feedback form element from the Document Object Model (DOM). We have to make sure this exists.
    const feedbackForm = document.querySelector("#feedback-form");

    if (!feedbackForm) {
        return;
    }

    feedbackForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent the default form submission behavior. Otherwise, the page will refresh and we won't see the feedback message.

        // Get the values from the form fields and trim any extra whitespace. We also select the elements we will need to update with the feedback message.
        const name = document.querySelector("#name").value.trim();
        const email = document.querySelector("#email").value.trim();
        const topic = document.querySelector("#topic").value;
        const message = document.querySelector("#message").value.trim();
        const output = document.querySelector("#feedback-output");
        const heading = document.querySelector("#feedback-heading");
        const reply = document.querySelector("#feedback-reply");
        const feedbackTopic = document.querySelector("#feedback-topic");
        const feedbackEmail = document.querySelector("#feedback-email");
        const feedbackMessage = document.querySelector("#feedback-message");

        // Validation: Check if the name, email, and message fields are not empty. If any of them are empty, we display an error message and hide the feedback reply section. We also clear any previous feedback message and show the output section to display the error.
        if (!name || !email || !message) {
            heading.textContent = "Please complete your name, email, and message before submitting.";
            reply.classList.add("hidden");
            feedbackMessage.textContent = "";
            output.classList.remove("hidden");
            return;
        }

        // If the validation passes, we update the feedback reply section with the user's input. We set the heading to thank the user by name, display the selected topic, email, and message. We also make sure to show the feedback reply section and the output section, and reset the form for future submissions.
        heading.textContent = `Thank you, ${name}!`;
        feedbackTopic.textContent = topic;
        feedbackEmail.textContent = `[${email}]`;
        feedbackMessage.textContent = `"${message}"`;
        reply.classList.remove("hidden");
        output.classList.remove("hidden");
        feedbackForm.reset();
    });
}

renderDetailsPage();
setupFeedbackForm();
