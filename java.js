
const leaderboard = [
  { name: "Zed", score: 1200, level: 5 },
  { name: "Ronel", score: 800, level: 3 },
  { name: "Emman", score: 1500, level: 5 },
  { name: "Ashlie", score: 950, level: 4 },
  { name: "Chanchan", score: 600, level: 2 }
];

function getAverage(players) {
  const total = players.reduce((sum, player) => sum + player.score, 0);
  return total / players.length;
}


function getAbove(players, threshold) {
  return players.filter(player => players.score > threshold);
}

function getTop(players) {
  const scores = players.map(player => player.score)
  const maxScore = Math.max.apply(null, scores)

  const topPlayer = players.find(player => player.score === maxScore);
  return topPlayer;
}

function groupLevels(players) {
  let groups = {};
  for (let i = 0; i < players.length; i++) {
    let lvl = players[i].level;
    if (!groups[lvl]) {
      groups[lvl] = [];
    }
    groups[lvl].push(players[i]);
  }
  return groups;
}

function fetchScores() {
  return new Promise((resolve) => {
    setTimeout(() => {
      let updated = [];
      for (let i = 0; i < leaderboard.length; i++) {
        let p = leaderboard[i];
        updated.push({ ...p, score: p.score + Math.floor(Math.random() * 200) });
      }
      resolve(updated);
    }, 1500);
  });
}

console.log("Average:", getAverage(leaderboard));
console.log("Above 500:", getAbove(leaderboard, 500));
console.log("Top:", getTop(leaderboard));
console.log("Grouped:", groupLevels(leaderboard));

fetchScores().then(newScores => {
  console.log("Updated Scores:", newScores);
});
