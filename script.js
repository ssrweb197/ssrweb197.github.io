
async function checkSpeed() {
  const url = document.getElementById('urlInput').value;
  const resultDiv = document.getElementById('result');

  if (!url) {
    resultDiv.innerHTML = '❌ Please enter a valid URL.';
    return;
  }

  resultDiv.innerHTML = '⏳ Checking...';

  try {
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=mobile`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.lighthouseResult) {
      const score = data.lighthouseResult.categories.performance.score * 100;
      resultDiv.innerHTML = `📊 Mobile Speed Score: <strong>${score}</strong>/100`;
    } else {
      resultDiv.innerHTML = '❌ Could not fetch speed score. Please try again.';
    }
  } catch (error) {
    resultDiv.innerHTML = '❌ Error fetching data.';
  }
}
