// Function to fetch movie data from OMDb API for a specific category
async function fetchMoviesByCategory(category) {
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=c017c841&s=${category}&type=movie`
    );
    const data = await response.json();
    return data.Search; // Return array of movie objects
  } catch (error) {
    console.error(`Error fetching ${category} movies:`, error);
    return [];
  }
}

// Function to display posters of movies from different categories
async function displayPosters() {
  const categories = [
    "action",
    "comedy",
    "drama",
    "sci-fi",
    "horror",
    "thriller",
  ]; // Example categories
  const postersContainer = document.getElementById("posters-container");

  for (const category of categories) {
    const movies = await fetchMoviesByCategory(category);
    const categoryMovies = getRandomMovies(movies, 7);
    categoryMovies.forEach((movie) => {
      const poster = document.createElement("img");
      poster.classList.add("poster");
      poster.src = movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg"; // Placeholder image if poster not available
      poster.alt = movie.Title;
      postersContainer.appendChild(poster);
    });
  }
}

// Function to get random movies from a list
function getRandomMovies(movies, count) {
  // Shuffle the array of movies
  const shuffledMovies = movies.sort(() => Math.random() - 0.5);
  // Return the first 'count' movies
  return shuffledMovies.slice(0, count);
}

// Call function to display posters when the page loads
displayPosters();
function handleSearchInput() {
  const searchInput = document.getElementById("search-input");
  const query = searchInput.value.trim();
  displayPosters(query); // Pass the search query to the displayPosters function
}

// Event listener for search input
document
  .getElementById("search-input")
  .addEventListener("input", handleSearchInput);
