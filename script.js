// =====================
// HAMBURGER MENU TOGGLE
// =====================
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", async () => {
    const username = "Dazagi542";  
    const url = `https://leetcode-api-faisalshohag.vercel.app/${username}`;

    const statsContainer = document.getElementById("leetcode-stats");

    try {
        const res = await fetch(url);
        const data = await res.json();

        if (!data || data.status !== "success") {
            statsContainer.innerHTML = "<p>Unable to load LeetCode stats.</p>";
            return;
        }

        statsContainer.innerHTML = `
            <h3>LeetCode Stats</h3>
            <p><strong>Total Solved:</strong> ${data.totalSolved}</p>
            <p><strong>Easy:</strong> ${data.easySolved} / ${data.totalEasy}</p>
            <p><strong>Medium:</strong> ${data.mediumSolved} / ${data.totalMedium}</p>
            <p><strong>Hard:</strong> ${data.hardSolved} / ${data.totalHard}</p>
            <p><strong>Acceptance Rate:</strong> ${data.acceptanceRate}%</p>
            <p><strong>Ranking:</strong> ${data.ranking.toLocaleString()}</p>
        `;
    } catch (err) {
        statsContainer.innerHTML = "<p>Error loading stats.</p>";
        console.error(err);
    }
});