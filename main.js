window.location.href = "Joker-Smoker/judgment.html"
  ;document.getElementById("unlockBtn").addEventListener("click", async () => {
  const response = await fetch("/verify-token", {
    method: "POST",
    body: JSON.stringify({ userId: "..." }),
    headers: { "Content-Type": "application/json" }
  });

  const result = await response.json();
  if (result.success) {
    document.getElementById("villainPanels").style.display = "block";
  } else {
    alert("Access denied. Try again.");
  }
});
