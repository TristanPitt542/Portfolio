// =====================
// HAMBURGER MENU TOGGLE
// =====================
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

//get leetcode stats
document.addEventListener("DOMContentLoaded", async () => {
  // Elements
  const usernameEl = document.getElementById("lc-username");
  const totalEl = document.getElementById("lc-total");
  const easyEl = document.getElementById("lc-easy");
  const mediumEl = document.getElementById("lc-medium");
  const hardEl = document.getElementById("lc-hard");
  const rankEl = document.getElementById("lc-rank");
  const statsContainer = document.getElementById("leetcode-data");
  const buttonEl = document.getElementById("leetcode-button");

  try {
    // Fetch local JSON file
    const res = await fetch("stats/leetcode.json");
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    const data = await res.json();

    // Populate stats
    usernameEl.textContent = data.username;
    totalEl.textContent = data.totalSolved;
    easyEl.textContent = data.totalEasy;
    mediumEl.textContent = data.totalMedium;
    hardEl.textContent = data.totalHard;
    rankEl.textContent = data.ranking.toLocaleString();

    // Show stats and button
    statsContainer.classList.remove("hidden");
    buttonEl.classList.remove("hidden");

  } catch (err) {
    usernameEl.textContent = "Error loading stats";
    console.error("Error loading LeetCode stats:", err);
  }
});
