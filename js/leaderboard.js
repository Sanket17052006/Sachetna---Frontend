document.addEventListener("DOMContentLoaded", () => {
  const leaderboardList = document.getElementById("leaderboardList");

  // TEST leaderboard entries
  const mockEntries = [
    { name: "Learner_472", score: "5/5" },
    { name: "Learner_389", score: "2/5" }
  ];
  const guestScore = localStorage.getItem("guestScore");
  if (guestScore) {
    mockEntries.push({ name: "You", score: guestScore });
  }
  mockEntries.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = `${entry.name} – ${entry.score}`;
    leaderboardList.appendChild(li);
  });
});