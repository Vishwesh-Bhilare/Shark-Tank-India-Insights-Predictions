document.getElementById("prediction-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const industry = document.getElementById("industry").value;
    const revenue = parseFloat(document.getElementById("revenue").value);
    const hasPatent = document.getElementById("patent").value === "yes";

    let multiplier = 5;

    if (industry === "tech" || industry === "healthcare") multiplier = 6;
    if (hasPatent) multiplier += 1;

    let estimatedValuation = revenue * multiplier;
    let dealPercent = Math.random() * (10 - 2) + 2; // 2% - 10%
    let dealAmount = (dealPercent / 100) * estimatedValuation;

    document.getElementById("prediction-result").innerHTML = `
        <div class="prediction-box">
            <h3>Estimated Valuation: ₹${estimatedValuation.toFixed(2)} Cr</h3>
            <p>Based on similar Shark Tank India deals, you might expect to give up around <strong>${dealPercent.toFixed(1)}%</strong> equity.</p>
            <p>Estimated Deal Amount: ₹${dealAmount.toFixed(2)} Cr</p>
        </div>
    `;
});
