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
  const statsContainer = document.getElementById("leetcode-stats");

  try {
    // Fetch the local JSON file with your stats
    const res = await fetch("stats/leetcode.json");
    const data = await res.json();

    // Display stats
    statsContainer.innerHTML = `
      <h3>${data.username}'s LeetCode Stats</h3>
      <p><strong>Total Solved:</strong> ${data.totalSolved}</p>
      <p><strong>Easy:</strong> ${data.totalEasy}</p>
      <p><strong>Medium:</strong> ${data.totalMedium}</p>
      <p><strong>Hard:</strong> ${data.totalHard}</p>
      <p><strong>Ranking:</strong> ${data.ranking.toLocaleString()}</p>
      <p><em>Last updated: ${new Date(data.fetchedAt).toLocaleString()}</em></p>
    `;
  } catch (err) {
    // If JSON file missing or error occurs
    statsContainer.innerHTML = "<p>Error loading stats.</p>";
    console.error("Error loading LeetCode stats:", err);
  }
});

const logos = document.querySelectorAll('.skill img');

logos.forEach(img => {
  img.addEventListener('mouseenter', () => {
    const color = getDominantColor(img); // function to get main color
    img.style.filter = `drop-shadow(0 0 15px ${color})`;
  });
});