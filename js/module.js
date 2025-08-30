const urlParams = new URLSearchParams(window.location.search);
const moduleId = urlParams.get("moduleId");

let questions = [];

fetch(`${BASE_URL}/api/module/${moduleId}`)
  .then(res => res.json())
  .then(data => {
    document.getElementById("moduleTitle").innerText = data.title;

    
    const slidesContainer = document.getElementById("slidesContainer");
    data.slides.forEach((slide, index) => {
      const div = document.createElement("div");
      div.innerHTML = `<h3>Slide ${index + 1}</h3><p>${slide}</p>`;
      slidesContainer.appendChild(div);
    });

    // Render quiz
    questions = data.quiz;
    const quizContainer = document.getElementById("quizContainer");
    questions.forEach(q => {
      const div = document.createElement("div");
      div.innerHTML = `<p>${q.question}</p>` +
        q.options.map(opt => `
          <label>
            <input type="radio" name="${q.id}" value="${opt}"> ${opt}
          </label><br>`).join("");
      quizContainer.appendChild(div);
    });
  });

function submitQuiz() {
  const answers = {};
  questions.forEach(q => {
    const selected = document.querySelector(`input[name="${q.id}"]:checked`);
    if (selected) answers[q.id] = selected.value;
  });
  fetch(`${BASE_URL}/api/quiz/submit`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(answers)
})

  
  .then(res => res.json())
  .then(result => {
    document.getElementById("quizResult").innerText = `Score: ${result.score}\n${result.message}`;
    localStorage.setItem("guestScore", `${result.score}/5`);
  });
  
}