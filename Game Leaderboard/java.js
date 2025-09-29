
const leaderboard = [
  { name: "Zed", score: 1200, level: 5 },
  { name: "Ronel", score: 800, level: 3 },
  { name: "Emman", score: 1500, level: 5 },
  { name: "Ashlie", score: 950, level: 4 },
  { name: "Chanchan", score: 600, level: 2 }
];

function getAverage(players) {
  let total = 0;
  for (let p of players) {
    total += p.score;
  }
  return total / players.length;
}


function getAbove(players, threshold) {
  let result = [];
  for (let i = 0; i < players.length; i++) {
    if (players[i].score > threshold) {
      result.push(players[i]);
    }
  }
  return result;
}


function getTop(players) {
  let highest = Math.max(players[0].score, players[1].score, players[2].score, players[3].score, players[4].score);
  for (let i = 0; i < players.length; i++) {
    if (players[i].score === highest) {
      return players[i];
    }
  }
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
console.log("Above 900:", getAbove(leaderboard, 900));
console.log("Top:", getTop(leaderboard));
console.log("Grouped:", groupLevels(leaderboard));

fetchScores().then(newScores => {
  console.log("Updated Scores:", newScores);
});
