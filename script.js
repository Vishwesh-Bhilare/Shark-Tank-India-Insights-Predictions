document.getElementById("prediction-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const industry = document.getElementById("industry").value;
  const revenue = parseFloat(document.getElementById("revenue").value);
  const hasPatent = document.getElementById("patent").value === "yes";
  const askEquity = parseFloat(document.getElementById("askEquity").value);

  // Valuation Logic
  let multiplier = 4.5;
  if (industry === "tech" || industry === "healthcare") multiplier += 1;
  if (hasPatent) multiplier += 1;
  if (revenue > 5) multiplier += 0.5;

  const estimatedValuation = revenue * multiplier;
  const askAmount = (askEquity / 100) * estimatedValuation;

  // Feedback
  let equityFeedback = "";
  if (askEquity < 2.5) {
    equityFeedback = "This is a very aggressive ask. Sharks might question the valuation.";
  } else if (askEquity > 20) {
    equityFeedback = "This is a high equity offer. Sharks might perceive undervaluation.";
  } else {
    equityFeedback = "This is within a typical Shark Tank equity range.";
  }

  // Industry Insights
  const industryInfo = {
    food: {
      text: "Food startups have shown consistent growth, often backed by strong branding and unique offerings.",
      image: "images/industry-food.png",
    },
    tech: {
      text: "Technology startups attract high valuations due to scalability and innovation-driven models.",
      image: "images/industry-tech.png",
    },
    fashion: {
      text: "Fashion startups focus on niche branding and online presence, making them attractive in D2C models.",
      image: "images/industry-fashion.png",
    },
    healthcare: {
      text: "Healthcare startups gain investor trust by offering impact-driven solutions and addressing real-world problems.",
      image: "images/industry-healthcare.png",
    },
  };

  const selected = industryInfo[industry];

  // Display Result
  document.getElementById("prediction-result").innerHTML = `
    <div class="prediction-box">
      <h3>Estimated Valuation: ₹${estimatedValuation.toFixed(2)} Cr</h3>
      <p>You're offering <strong>${askEquity.toFixed(1)}%</strong> for a deal of <strong>₹${askAmount.toFixed(2)} Cr</strong>.</p>
      <p><em>${equityFeedback}</em></p>
      <div class="industry-trend">
        <h4>${industry.charAt(0).toUpperCase() + industry.slice(1)} Industry Trends</h4>
        <p>${selected.text}</p>
        <img src="${selected.image}" alt="${industry} industry trends graph">
      </div>
    </div>
  `;
});

// Fade-in Animation for Charts
const chartRows = document.querySelectorAll('.chart-row');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1
});

chartRows.forEach(row => observer.observe(row));
