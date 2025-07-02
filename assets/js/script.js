const API_KEY = '5b6f7b3773f6652670ed983c90ab0d39';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';


async function searchTMDB(title, type = 'tv') {
  const url = `${BASE_URL}/search/${type}?api_key=${API_KEY}&query=${encodeURIComponent(title)}&language=en-US`;

  const res = await fetch(url);
  const data = await res.json();

  // Devuelve el primer resultado
  return data.results?.[0] || null;
}

function renderCard(data) {
  const container = document.getElementById('recommendations');

  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <img src="${IMG_BASE_URL + data.poster_path}" alt="${data.name || data.title}">
    <div class="info">
      <h2>${data.name || data.title}</h2>
      <p>${data.overview}</p>
    </div>
  `;
  container.appendChild(card);
}

const recommendations = [
  { title: "Arcane", type: "tv" },
  { title: "Adults", type: "tv" },
  { title: "Derry Girls", type: "tv" }
];

async function loadRecommendations() {
  for (const rec of recommendations) {
    const result = await searchTMDB(rec.title, rec.type);
    if (result) {
      renderCard(result);
    }
  }
}

document.addEventListener('DOMContentLoaded', loadRecommendations);
