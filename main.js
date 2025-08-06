window.location.href = "/judgment.html"
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
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("formArea").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const route = loginMode ? "/login" : "/register";

    const res = await fetch(route, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.text();
    alert(result);

    if (result.includes("✅") || result.includes("🔓")) {
      window.location.href = "judgment.html"; // Redirect after successful login
    }
  });
});
