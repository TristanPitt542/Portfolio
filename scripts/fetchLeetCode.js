import fs from "fs";
import path from "path";
import fetch from "node-fetch";

const USERNAME = "Dazagi542";

async function fetchLeetCodeStats() {
  const query = `
    query userProfile($username: String!) {
      matchedUser(username: $username) {
        username
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
        profile {
          ranking
        }
      }
    }
  `;

  try {
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
        variables: { username: USERNAME },
      }),
    });

    const json = await response.json();

    const user = json.data.matchedUser;

    const stats = {
      username: user.username,
      totalSolved: user.submitStatsGlobal.acSubmissionNum.find(d => d.difficulty === "All").count,
      totalEasy: user.submitStatsGlobal.acSubmissionNum.find(d => d.difficulty === "Easy").count,
      totalMedium: user.submitStatsGlobal.acSubmissionNum.find(d => d.difficulty === "Medium").count,
      totalHard: user.submitStatsGlobal.acSubmissionNum.find(d => d.difficulty === "Hard").count,
      ranking: user.profile.ranking,
      fetchedAt: new Date().toISOString(),
    };

    const statsDir = path.join(process.cwd(), "stats");
    const statsFile = path.join(statsDir, "leetcode.json");

    if (!fs.existsSync(statsDir)) {
      fs.mkdirSync(statsDir);
    }

    fs.writeFileSync(statsFile, JSON.stringify(stats, null, 2));

    console.log("LeetCode stats saved to stats/leetcode.json");
  } catch (error) {
    console.error("Failed to fetch LeetCode stats:", error);
    process.exit(1);
  }
}

fetchLeetCodeStats();
