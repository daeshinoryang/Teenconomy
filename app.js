const quizData = [
  {
    question: "물건의 가격이 오르면 일반적으로 수요량은 어떻게 변할까?",
    options: ["증가한다", "감소한다", "항상 그대로다", "사라진다"],
    answer: 1,
    area: "경제 기본원리"
  },
  {
    question: "예금과 적금 중 매달 일정 금액을 넣는 상품은?",
    options: ["예금", "적금", "주식", "ETF"],
    answer: 1,
    area: "금융상품"
  },
  {
    question: "여러 종목을 묶어 거래하는 투자 상품은?",
    options: ["ETF", "현금", "대출", "보험"],
    answer: 0,
    area: "투자 이해"
  },
  {
    question: "기회비용의 의미로 가장 알맞은 것은?",
    options: ["선택으로 얻은 이익", "포기한 대안의 가치", "물건 가격", "세금"],
    answer: 1,
    area: "경제 기본원리"
  },
  {
    question: "복리는 무엇에 이자가 붙는 방식인가?",
    options: ["원금에만", "원금과 이자에", "세금에만", "소비에만"],
    answer: 1,
    area: "금융상품"
  }
];

const learningData = [
  { title: "기회비용 이해하기", level: "★☆☆☆☆", time: "8분", category: "경제 기본원리" },
  { title: "수요와 공급의 원리", level: "★★☆☆☆", time: "10분", category: "경제 기본원리" },
  { title: "예금과 적금 비교", level: "★☆☆☆☆", time: "7분", category: "금융상품" },
  { title: "ETF란 무엇인가?", level: "★★★☆☆", time: "12분", category: "투자 이해" },
  { title: "주식 투자의 기본", level: "★★★☆☆", time: "15분", category: "투자 이해" },
  { title: "인플레이션과 물가", level: "★★☆☆☆", time: "10분", category: "경제 기본원리" }
];

const shortsData = [
  { title: "ETF란?", quiz: "ETF는 여러 자산을 묶어 거래할 수 있다. O/X", answer: "O" },
  { title: "복리란?", quiz: "복리는 원금에만 이자가 붙는다. O/X", answer: "X" },
  { title: "예금과 적금 차이", quiz: "적금은 매달 일정 금액을 넣는 방식이다. O/X", answer: "O" },
  { title: "인플레이션", quiz: "인플레이션은 전반적인 물가 상승을 의미한다. O/X", answer: "O" }
];

const productData = [
  {
    name: "예금",
    desc: "일정 금액을 한 번에 맡기고 약속된 이자를 받는 금융상품이다.",
    pros: "안정성이 높고 구조가 쉽다.",
    cons: "수익률이 낮을 수 있다.",
    risk: "낮음",
    target: "안정적인 저축을 원하는 학생"
  },
  {
    name: "적금",
    desc: "매달 일정 금액을 넣고 만기에 원금과 이자를 받는 상품이다.",
    pros: "저축 습관을 만들기 좋다.",
    cons: "중도 해지 시 이자가 줄어들 수 있다.",
    risk: "낮음",
    target: "꾸준히 돈을 모으고 싶은 학생"
  },
  {
    name: "ETF",
    desc: "여러 주식이나 자산을 묶어 하나의 상품처럼 거래하는 투자상품이다.",
    pros: "분산투자가 가능하다.",
    cons: "시장 상황에 따라 손실이 날 수 있다.",
    risk: "중간",
    target: "투자를 처음 배우는 학생"
  },
  {
    name: "주식",
    desc: "기업의 일부를 소유하는 투자 방식이다.",
    pros: "높은 수익 가능성이 있다.",
    cons: "가격 변동이 크다.",
    risk: "높음",
    target: "위험과 수익의 관계를 이해한 학생"
  }
];

const simulationData = [
  { month: "1월", asset: 100000 },
  { month: "2월", asset: 103000 },
  { month: "3월", asset: 98000 },
  { month: "4월", asset: 108000 },
  { month: "5월", asset: 113000 },
  { month: "6월", asset: 119000 }
];

const answers = {};

function renderQuiz() {
  const quizBox = document.getElementById("quizBox");
  quizBox.innerHTML = quizData.map((q, index) => `
    <div class="question-card">
      <h3>${index + 1}. ${q.question}</h3>
      <div class="option-grid">
        ${q.options.map((option, optionIndex) => `
          <button class="option" data-question="${index}" data-option="${optionIndex}">
            ${option}
          </button>
        `).join("")}
      </div>
    </div>
  `).join("");

  document.querySelectorAll(".option").forEach((button) => {
    button.addEventListener("click", () => {
      const questionIndex = Number(button.dataset.question);
      const optionIndex = Number(button.dataset.option);
      answers[questionIndex] = optionIndex;

      document
        .querySelectorAll(`.option[data-question="${questionIndex}"]`)
        .forEach((btn) => btn.classList.remove("selected"));

      button.classList.add("selected");
    });
  });
}

function calculateQuiz() {
  let score = 0;
  const areas = {};

  quizData.forEach((q, index) => {
    if (!areas[q.area]) areas[q.area] = { correct: 0, total: 0 };
    areas[q.area].total += 1;

    if (answers[index] === q.answer) {
      score += 1;
      areas[q.area].correct += 1;
    }
  });

  return { score, total: quizData.length, areas };
}

function starText(correct, total) {
  const count = Math.round((correct / total) * 5);
  return "★".repeat(count) + "☆".repeat(5 - count);
}

function getFeedback(result) {
  const weakAreas = Object.entries(result.areas)
    .filter(([, value]) => value.correct / value.total < 0.6)
    .map(([area]) => area);

  if (weakAreas.length === 0) {
    return "전반적으로 경제 개념을 잘 이해하고 있습니다. 이제 모의투자와 금융상품 비교 학습으로 확장해보세요.";
  }

  return `${weakAreas.join(", ")} 영역이 부족합니다. 해당 영역의 기초 학습을 먼저 복습하는 것을 추천합니다.`;
}

function renderResult() {
  const result = calculateQuiz();
  const resultBox = document.getElementById("resultBox");
  resultBox.classList.remove("hidden");

  resultBox.innerHTML = `
    <h3>진단 결과</h3>
    <p>점수: <strong>${result.score}</strong> / ${result.total}</p>
    ${Object.entries(result.areas).map(([area, value]) => `
      <div class="level-row">
        <strong>${area}</strong>
        <span class="stars">${starText(value.correct, value.total)}</span>
      </div>
    `).join("")}
    <div class="ai-box">
      <h4>AI 추천 피드백</h4>
      <p>${getFeedback(result)}</p>
    </div>
  `;

  resultBox.scrollIntoView({ behavior: "smooth", block: "center" });
}

function renderLearningCards() {
  const box = document.getElementById("learningCards");
  box.innerHTML = learningData.map((item) => `
    <article class="card">
      <span class="learning-badge">${item.category}</span>
      <h3>${item.title}</h3>
      <p>난이도: ${item.level}</p>
      <p>예상 학습시간: ${item.time}</p>
      <button class="btn primary" style="margin-top:18px;width:100%">학습하기</button>
    </article>
  `).join("");
}

function renderShortsCards() {
  const box = document.getElementById("shortsCards");
  box.innerHTML = shortsData.map((item) => `
    <article class="card short-card">
      <div class="thumb">▶</div>
      <h3>${item.title}</h3>
      <p>${item.quiz}</p>
      <button class="btn secondary" style="margin-top:18px;width:100%" onclick="alert('정답: ${item.answer}')">퀴즈 풀기</button>
    </article>
  `).join("");
}

function renderProductCards() {
  const box = document.getElementById("productCards");
  box.innerHTML = productData.map((item) => `
    <article class="card">
      <h3>${item.name}</h3>
      <p>${item.desc}</p>
      <div style="margin-top:18px;color:#475569">
        <p><strong>장점:</strong> ${item.pros}</p>
        <p><strong>단점:</strong> ${item.cons}</p>
        <p><strong>위험도:</strong> ${item.risk}</p>
        <p><strong>추천 대상:</strong> ${item.target}</p>
      </div>
    </article>
  `).join("");
}

function renderCharts() {
  const assetCtx = document.getElementById("assetChart");
  new Chart(assetCtx, {
    type: "line",
    data: {
      labels: simulationData.map((d) => d.month),
      datasets: [{
        label: "자산 변화",
        data: simulationData.map((d) => d.asset),
        borderWidth: 3,
        tension: 0.35
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: true } }
    }
  });

  const growthCtx = document.getElementById("growthChart");
  new Chart(growthCtx, {
    type: "line",
    data: {
      labels: ["1주차", "2주차", "3주차", "4주차"],
      datasets: [{
        label: "경제이해력 점수",
        data: [45, 58, 72, 84],
        borderWidth: 3,
        tension: 0.35
      }]
    }
  });

  const activityCtx = document.getElementById("activityChart");
  new Chart(activityCtx, {
    type: "bar",
    data: {
      labels: ["퀴즈", "학습", "모의투자", "복습"],
      datasets: [{
        label: "활동 횟수",
        data: [12, 8, 5, 6],
        borderWidth: 1
      }]
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderQuiz();
  renderLearningCards();
  renderShortsCards();
  renderProductCards();
  renderCharts();

  document.getElementById("submitQuiz").addEventListener("click", renderResult);
});
