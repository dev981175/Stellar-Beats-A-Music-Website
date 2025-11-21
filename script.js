function handleLogin(event) {
  event.preventDefault()
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value
  const errorMessage = document.getElementById("errorMessage")

  // Simple client-side validation
  if (email === "devansh@example.com" && password === "password123") {
    errorMessage.style.display = "none"
    // Hide login, show dashboard
    document.getElementById("loginContainer").style.display = "none"
    document.getElementById("dashboardContainer").style.display = "block"
    // Initialize dashboard
    initializeDashboard()
  } else {
    errorMessage.style.display = "block"
  }
}

function handleLogout() {
  // Clear form
  document.getElementById("loginForm").reset()
  // Hide dashboard, show login
  document.getElementById("dashboardContainer").style.display = "none"
  document.getElementById("loginContainer").style.display = "flex"
  // Stop any playing audio
  isPlaying = false
  audioPlayer.pause()
}

function initializeDashboard() {
  renderTracks()
  renderSongs()
  renderArtists()
  updatePlayer()
  setupAudioListeners()
}

// Track Data
const tracks = [
  {
    id: 1,
    title: "Passori",
    artist: "Shae Gill, Ali Sethi",
    image: "images/pasoori.jpg",
    url: "audio/Pasoori.mp3",
  },
  {
    id: 2,
    title: "Naina Da Kya Kasoor",
    artist: "Amit Trivedi",
    image: "images/naina.jpeg",
    url: "audio/naina.mp3",
  },
  {
    id: 3,
    title: "Sahiba",
    artist: "Aditya Rikhari",
    image: "images/sahiba.jpeg",
    url: "audio/Sahiba.mp3",
  },
  {
    id: 4,
    title: "High On You",
    artist: "Jind Universe",
    image: "images/high.jpeg",
    url: "audio/HIGH.mp3",
  },
  {
    id: 5,
    title: "Kaise Hua",
    artist: "Vishal Mishra, Manoj Muntashir",
    image: "images/kaise.jpg",
    url: "audio/Kaise.mp3",
  },
  {
    id: 6,
    title: "Janiye",
    artist: "Vishal Mishra, Rashmeet Kaur",
    image: "images/janiye.jpg",
    url: "audio/Janiye.mp3",
  },
  {
    id: 7,
    title: "Haseen",
    artist: "Talwiinder, Nds, Rippy Grewal",
    image: "images/haseen.jpeg",
    url: "audio/Haseen.mp3",
  },
  {
    id: 8,
    title: "One Thousand Miles",
    artist: "Yo Yo Honey Singh",
    image: "images/one.jpeg",
    url: "audio/one.mp3",
  },
  {
    id: 9,
    title: "Raabta",
    artist: "Arijit Singh, Shreya Ghoshal",
    image: "images/Raabta.jpg",
    url: "audio/Raabta.mp3",
  },
]

const popularSongs = [
  { title: "Naina Da Kya Kasoor", artist: "Amit Trivedi", image: "images/naina.jpeg" },
  { title: "Sahiba", artist: "Aditya Rikhari", image: "images/sahiba.jpeg" },
  { title: "High On You", artist: "Jind Universe", image: "images/high.jpeg" },
  { title: "Kaise Hua", artist: "Vishal Mishra, Manoj Muntashir", image: "images/kaise.jpg" },
  { title: "Janiye", artist: "Vishal Mishra, Rashmeet Kaur", image: "images/janiye.jpg" },
  { title: "Haseen", artist: "Talwiinder,Nds,Rippy Grewal", image: "images/haseen.jpeg" },
  { title: "One Thousand Miles", artist: "Yo Yo Honey Singh", image: "images/one.jpeg" },
  { title: "Raabta", artist: "Arijit Singh, Shreya Ghoshal", image: "images/Raabta.jpg" },
]

const popularArtists = [
  { name: "Arijit Singh", image: "images/arijit.jpeg" },
  { name: "Nora Fatehi", image: "images/nora.jpeg" },
  { name: "Divya Kumar", image: "images/divya.jpeg" },
  { name: "Payal Dev", image: "images/payal.jpeg" },
  { name: "Neha Kakkar", image: "images/neha.jpg" },
  { name: "Honey Singh", image: "images/honey.jpeg" },
  { name: "Badshah", image: "images/Badshah.webp" },
  { name: "Emiway", image: "images/emiway.jpeg" },
]

// State Variables
let currentTrack = 0
let isPlaying = false
let currentProgress = 0

// DOM Elements
const audioPlayer = document.getElementById("audioPlayer")
const playBtn = document.getElementById("playBtn")
const progressBar = document.getElementById("progressBar")
const currentTimeEl = document.getElementById("currentTime")
const durationTimeEl = document.getElementById("durationTime")
const volumeSlider = document.getElementById("volumeSlider")

// Audio Event Listeners
function setupAudioListeners() {
  audioPlayer.addEventListener("timeupdate", updateProgress)
  audioPlayer.addEventListener("ended", () => {
    nextTrack()
    playCurrentTrack()
  })
  audioPlayer.addEventListener("loadedmetadata", updateDuration)
}

// Render Tracks List
function renderTracks() {
  const tracksList = document.getElementById("tracksList")
  tracksList.innerHTML = tracks
    .map(
      (track, index) => `
    <li class="track-item ${currentTrack === index ? "active" : ""}" onclick="selectTrack(${index})">
      <div style="display: flex; align-items: center; gap: 8px;">
        <span class="track-item-number">${String(index + 1).padStart(2, "0")}</span>
        <div class="track-item-info">
          <p class="track-item-title">${track.title}</p>
          <p class="track-item-artist">${track.artist}</p>
        </div>
      </div>
    </li>
  `,
    )
    .join("")
}

// Render Popular Songs
function renderSongs() {
  const songsGrid = document.getElementById("songsGrid")
  songsGrid.innerHTML = popularSongs
    .map(
      (song, index) => `
    <li class="track-item ${currentTrack === index ? "active" : ""}" onclick="selectTrack(${index})">
    <div class="song-card">
      <div class="song-card-image">
        <img src="${song.image}" alt="${song.title}" loading="lazy">
        <button class="play-button" onclick="playCurrentTrack()">▶</button>
      </div>
      <p class="song-card-title">${song.title}</p>
      <p class="song-card-artist">${song.artist}</p>
    </div>
  `,
    )
    .join("")
}

// Render Popular Artists
function renderArtists() {
  const artistsCarousel = document.getElementById("artistsCarousel")
  artistsCarousel.innerHTML = popularArtists
    .map(
      (artist, index) => `
    <div class="artist-card">
      <div class="artist-image">
        <img src="${artist.image}" alt="${artist.name}" loading="lazy">
      </div>
      <p class="artist-name">${artist.name}</p>
    </div>
  `,
    )
    .join("")
}

// Update Player Display
function updatePlayer() {
  const track = tracks[currentTrack]

  // Update featured section
  document.getElementById("featuredImage").style.backgroundImage = `url('${track.image}')`
  document.getElementById("featuredTitle").textContent = track.title
  document.getElementById("featuredArtist").textContent = `${track.artist} • Popular Hindi Song`

  // Update player
  document.getElementById("playerImage").style.backgroundImage = `url('${track.image}')`
  document.getElementById("playerTitle").textContent = track.title
  document.getElementById("playerArtist").textContent = track.artist

  // Update audio source
  audioPlayer.src = track.url

  // Update track list
  document.querySelectorAll(".track-item").forEach((el, index) => {
    el.classList.toggle("active", index === currentTrack)
  })

  // Update progress
  progressBar.value = 0
  currentTimeEl.textContent = "0:00"
}

// Play Current Track
function playCurrentTrack() {
  isPlaying = true
  audioPlayer.play().catch((err) => console.log("Play error:", err))
  updatePlayButton()
}

// Toggle Play/Pause
function togglePlay() {
  if (isPlaying) {
    audioPlayer.pause()
    isPlaying = false
  } else {
    audioPlayer.play().catch((err) => console.log("Play error:", err))
    isPlaying = true
  }
  updatePlayButton()
}

// Update Play Button
function updatePlayButton() {
  playBtn.textContent = isPlaying ? "⏸" : "▶"
}

// Next Track
function nextTrack() {
  currentTrack = (currentTrack + 1) % tracks.length
  updatePlayer()
  if (isPlaying) playCurrentTrack()
}

// Previous Track
function previousTrack() {
  currentTrack = (currentTrack - 1 + tracks.length) % tracks.length
  updatePlayer()
  if (isPlaying) playCurrentTrack()
}

// Select Track
function selectTrack(index) {
  currentTrack = index
  updatePlayer()
  playCurrentTrack()
}

// Format Time
function formatTime(seconds) {
  if (!isFinite(seconds) || seconds <= 0) return "0:00"
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${String(secs).padStart(2, "0")}`
}

// Update Progress
function updateProgress() {
  const { currentTime, duration } = audioPlayer
  if (duration && isFinite(duration)) {
    currentProgress = (currentTime / duration) * 100
    progressBar.value = currentProgress
    currentTimeEl.textContent = formatTime(currentTime)
    durationTimeEl.textContent = formatTime(duration)
  }
}

// Update Duration
function updateDuration() {
  durationTimeEl.textContent = formatTime(audioPlayer.duration)
}

// Seek Track
function seekTrack(value) {
  const { duration } = audioPlayer
  if (duration && isFinite(duration)) {
    audioPlayer.currentTime = (value / 100) * duration
  }
}

// Change Volume
function changeVolume(value) {
  audioPlayer.volume = Math.max(0, Math.min(1, Number.parseFloat(value)))
}

// Scroll Songs
function scrollSongsLeft() {
  const grid = document.getElementById("songsGrid")
  grid.scrollBy({ left: -200, behavior: "smooth" })
}

function scrollSongsRight() {
  const grid = document.getElementById("songsGrid")
  grid.scrollBy({ left: 200, behavior: "smooth" })
}

// Scroll Artists
function scrollArtistsLeft() {
  const carousel = document.getElementById("artistsCarousel")
  carousel.scrollBy({ left: -200, behavior: "smooth" })
}

function scrollArtistsRight() {
  const carousel = document.getElementById("artistsCarousel")
  carousel.scrollBy({ left: 200, behavior: "smooth" })
}

// Navigation Functions
function previousPage() {
  console.log("Previous page")
}

function nextPage() {
  console.log("Next page")
}
