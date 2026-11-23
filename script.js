const passwordInput = document.getElementById("passwordInput");
const strengthBar = document.getElementById("strengthBar");
const feedbackText = document.getElementById("feedbackText");

// Password Strength Checker
function checkPasswordStrength(password) {
  let score = 0;
  let feedback = [];

  if (password.length >= 8) score += 1;
  else feedback.push("Use at least 8 characters");

  if (/[a-z]/.test(password)) score += 1;
  else feedback.push("Add lowercase letters");

  if (/[A-Z]/.test(password)) score += 1;
  else feedback.push("Add uppercase letters");

  if (/\d/.test(password)) score += 1;
  else feedback.push("Add digits");

  if (/[\W_]/.test(password)) score += 1;
  else feedback.push("Add special characters");

  return { score, feedback };
}

// Visual UI update
function updateStrengthUI(score, feedback) {
  let strength = "";
  let color = "";
  let width = "";

  switch (score) {
    case 0:
    case 1:
      strength = "Very Weak";
      color = "red";
      width = "20%";
      break;
    case 2:
      strength = "Weak";
      color = "orange";
      width = "40%";
      break;
    case 3:
      strength = "Moderate";
      color = "gold";
      width = "60%";
      break;
    case 4:
      strength = "Strong";
      color = "lightgreen";
      width = "80%";
      break;
    case 5:
      strength = "Very Strong";
      color = "green";
      width = "100%";
      break;
  }

  strengthBar.style.width = width;
  strengthBar.style.backgroundColor = color;

  // Update textual feedback
  feedbackText.innerHTML = `<strong>${strength}</strong><br>` +
    (feedback.length ? "❌ " + feedback.join("<br>❌ ") : "✅ All strength rules met.");
}

// SHA-1 hash function using Web Crypto API
async function sha1(input) {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-1", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
}

// HIBP Breach Check
async function checkHIBPBreach(password) {
  const hash = await sha1(password);
  const prefix = hash.slice(0, 5);
  const suffix = hash.slice(5);

  try {
    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
    const data = await response.text();
    const lines = data.split("\n");

    for (const line of lines) {
      const [hashSuffix, count] = line.trim().split(":");
      if (hashSuffix === suffix) {
        return parseInt(count);
      }
    }
    return 0;
  } catch (error) {
    console.error("HIBP API error:", error);
    return -1;
  }
}

// Main handler
passwordInput.addEventListener("input", async () => {
  const password = passwordInput.value;

  const result = checkPasswordStrength(password);
  updateStrengthUI(result.score, result.feedback);

  // Check breach only if length >= 6
  if (password.length >= 6) {
    const breachCount = await checkHIBPBreach(password);

    if (breachCount > 0) {
      feedbackText.innerHTML += `<br><br>⚠️ <strong>Found in ${breachCount.toLocaleString()} data breaches!</strong><br><span style="color:red;">Avoid using this password.</span>`;
      strengthBar.style.backgroundColor = "darkred";
    } else if (breachCount === 0) {
      feedbackText.innerHTML += `<br><br>✅ Not found in known breaches.`;
    } else {
      feedbackText.innerHTML += `<br><br>⚠️ Could not verify password breach status.`;
    }
  }
});
