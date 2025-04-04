document.getElementById("prediction-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const industry = document.getElementById("industry").value;
    const revenue = parseFloat(document.getElementById("revenue").value);
    const hasPatent = document.getElementById("patent").value === "yes";

    let multiplier = 5;
    if (industry === "tech" || industry === "healthcare") multiplier = 6;
    if (hasPatent) multiplier += 1;

    let estimatedValuation = revenue * multiplier;
    let dealPercent = Math.random() * (10 - 2) + 2;
    let dealAmount = (dealPercent / 100) * estimatedValuation;

    let industryInfo = {
        food: {
            text: "Food startups have shown consistent growth, often backed by strong branding and unique offerings.",
            image: "images/industry-food.png"
        },
        tech: {
            text: "Technology startups attract high valuations due to scalability and innovation-driven models.",
            image: "images/industry-tech.png"
        },
        fashion: {
            text: "Fashion startups focus on niche branding and online presence, making them attractive in D2C models.",
            image: "images/industry-fashion.png"
        },
        healthcare: {
            text: "Healthcare startups gain investor trust by offering impact-driven solutions and addressing real-world problems.",
            image: "images/industry-healthcare.png"
        }
    };

    const selected = industryInfo[industry];

    document.getElementById("prediction-result").innerHTML = `
        <div class="prediction-box">
            <h3>Estimated Valuation: ₹${estimatedValuation.toFixed(2)} Cr</h3>
            <p>You might expect to give up around <strong>${dealPercent.toFixed(1)}%</strong> equity.</p>
            <p>Estimated Deal Amount: ₹${dealAmount.toFixed(2)} Cr</p>
            <div class="industry-trend">
                <h4>${industry.charAt(0).toUpperCase() + industry.slice(1)} Industry Trends</h4>
                <p>${selected.text}</p>
                <img src="${selected.image}" alt="${industry} industry trends graph">
            </div>
        </div>
    `;
});
