document.getElementById('submitBtn').addEventListener('click', async () => {
  const value = document.getElementById('userInput').value;
  const status = document.getElementById('status');

  const res = await fetch(
    "https://api.github.com/repos/YOUR_USERNAME/YOUR_REPO/actions/workflows/update-json.yml/dispatches",
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer YOUR_GITHUB_PAT",
        "Accept": "application/vnd.github.v3+json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ref: "main",
        inputs: {
          content: value
        }
      })
    }
  );

  if (res.ok) {
    status.textContent = "✅ Triggered update!";
  } else {
    const error = await res.text();
    status.textContent = "❌ Failed: " + error;
  }
});
