document.getElementById("checkBtn").addEventListener("click", () => {
  const url = document.getElementById("urlInput").value.trim();
  const resultDiv = document.getElementById("result");

  if (!url) {
    resultDiv.innerHTML = "❗ Please enter a valid URL.";
    return;
  }

  const apiKey = "AIzaSyAPN4mvYxrRYCO_B7qKJE7Ze10Gp-JSbkE";
  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=mobile&key=${apiKey}`;

  resultDiv.innerHTML = "⏳ Checking speed, please wait...";

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const score = data.lighthouseResult.categories.performance.score * 100;
      let color = "green";
      if (score < 50) color = "red";
      else if (score < 80) color = "orange";

      resultDiv.innerHTML = `
        <div style="font-size: 22px;">
          📊 Mobile Speed Score: <strong style="color: ${color};">${score}/100</strong>
        </div>
      `;
    })
    .catch((error) => {
      resultDiv.innerHTML = "❌ Error fetching score. Please try again.";
    });
});

