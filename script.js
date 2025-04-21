document.getElementById("prediction-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const industry = document.getElementById("industry").value;
  const stage = document.getElementById("stage").value;
  const revenue = parseFloat(document.getElementById("revenue").value);
  const hasPatent = document.getElementById("patent").value === "yes";
  const askEquity = parseFloat(document.getElementById("askEquity").value);

  const spinner = document.getElementById("spinner");
  const resultDiv = document.getElementById("prediction-result");

  spinner.style.display = "block";
  resultDiv.innerHTML = "";

  // Simulate processing
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Valuation multiplier logic
  let multiplier = 4.5;
  if (industry === "tech" || industry === "healthcare") multiplier += 1;
  if (hasPatent) multiplier += 1;
  if (revenue > 5) multiplier += 0.5;

  if (stage === "idea") multiplier -= 0.5;
  else if (stage === "revenue") multiplier += 0.5;
  else if (stage === "scaling") multiplier += 1;

  const estimatedValuation = revenue * multiplier;
  const askAmount = (askEquity / 100) * estimatedValuation;

  let equityFeedback = "";
  if (askEquity < 2.5) {
    equityFeedback = "This is a very aggressive ask. Sharks might question the valuation.";
  } else if (askEquity > 20) {
    equityFeedback = "This is a high equity offer. Sharks might perceive undervaluation.";
  } else {
    equityFeedback = "This is within a typical Shark Tank equity range.";
  }

  const industryInfo = {
    food: {
      text: "Food startups show consistent growth with strong branding.",
      image: "images/industry-food.png",
      averageDeal: { equity: 10.0, amount: 60 },
      similar: [
        { name: "SharmaJiKiAata", revenue: "N/A", deal: 40, equity: 20 },
        { name: "GudGum", revenue: "N/A", deal: 80, equity: 10 }
      ]
    },
    tech: {
      text: "Tech startups attract high valuations due to scalability.",
      image: "images/industry-tech.png",
      averageDeal: { equity: 7.6, amount: 81.6 },
      similar: [
        { name: "funngro", revenue: "N/A", deal: 50, equity: 4.16 },
        { name: "NOOE", revenue: "N/A", deal: 500, equity: 51 }
      ]
    },
    fashion: {
      text: "Fashion startups rely on niche branding and trends.",
      image: "images/industry-fashion.png",
      averageDeal: { equity: 10, amount: 50 },
      similar: [
        { name: "Arata", revenue: 170, deal: 100, equity: 1.33 },
        { name: "Angrakhaa", revenue: "N/A", deal: 40, equity: 20 }
      ]
    },
    healthcare: {
      text: "Healthcare startups gain trust through real-world impact.",
      image: "images/industry-healthcare.png",
      averageDeal: { equity: 4.8, amount: 84.6 },
      similar: [
        { name: "Cervicheck", revenue: "N/A", deal: 75, equity: 5 },
        { name: "Sahayatha", revenue: "N/A", deal: 100, equity: 10 }
      ]
    }
  };

  const selected = industryInfo[industry];

  // Build output
  spinner.style.display = "none";
  resultDiv.innerHTML = `
    <div class="prediction-box">
      <h3>Estimated Valuation: ₹${estimatedValuation.toFixed(2)} Cr</h3>
      <p>You're offering <strong>${askEquity.toFixed(1)}%</strong> for a deal of <strong>₹${askAmount.toFixed(2)} Cr</strong>.</p>
      <p><em>${equityFeedback}</em></p>

      <div class="industry-trend">
        <h4>${industry.charAt(0).toUpperCase() + industry.slice(1)} Industry Trends</h4>
        <p>${selected.text}</p>
        <p><strong>Avg Deal:</strong> ₹${selected.averageDeal.amount} Cr for ${selected.averageDeal.equity}% equity</p>
        <img src="${selected.image}" alt="${industry} trend graph">
      </div>

      <div class="similar-startups">
        <h4>Similar Startups</h4>
        <ul>
          ${selected.similar.map(s => `<li><strong>${s.name}</strong> – ₹${s.deal} Cr for ${s.equity}% equity</li>`).join('')}
        </ul>
      </div>
    </div>
  `;
});

// Reveal charts on scroll
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
