// Form Submission
document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault()

  const email = document.getElementById("email").value
  const password = document.getElementById("password").value
  const remember = document.getElementById("remember").checked

  console.log("[v0] Login attempt:", { email, remember })

  // Validate inputs
  if (!email || !password) {
    showError("Please fill in all fields")
    return
  }

  if (!isValidEmail(email)) {
    showError("Please enter a valid email")
    return
  }

  if (password.length < 6) {
    showError("Password must be at least 6 characters")
    return
  }

  // Simulate login (replace with actual API call)
  simulateLogin(email, password, remember)
})

// Toggle Password Visibility
function togglePassword() {
  const passwordInput = document.getElementById("password")
  const toggle = document.querySelector(".password-toggle")

  if (passwordInput.type === "password") {
    passwordInput.type = "text"
    toggle.textContent = "🙈"
  } else {
    passwordInput.type = "password"
    toggle.textContent = "👁"
  }
}

// Validate Email
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

// Show Error Message
function showError(message) {
  const form = document.getElementById("loginForm")
  let errorDiv = form.querySelector(".error-message")

  if (!errorDiv) {
    errorDiv = document.createElement("div")
    errorDiv.className = "error-message"
    form.insertBefore(errorDiv, form.firstChild)
  }

  errorDiv.textContent = message
  errorDiv.style.display = "block"
  errorDiv.style.padding = "12px 16px"
  errorDiv.style.borderRadius = "8px"
  errorDiv.style.backgroundColor = "rgba(255, 71, 87, 0.2)"
  errorDiv.style.color = "#ff4757"
  errorDiv.style.fontSize = "13px"
  errorDiv.style.marginBottom = "16px"
  errorDiv.style.border = "1px solid #ff4757"

  setTimeout(() => {
    errorDiv.style.display = "none"
  }, 5000)
}

// Simulate Login
function simulateLogin(email, password, remember) {
  const loginBtn = document.querySelector(".btn-login")
  const originalText = loginBtn.textContent

  loginBtn.disabled = true
  loginBtn.textContent = "Signing in..."

  // Simulate API call
  setTimeout(() => {
    console.log("[v0] Login successful")

    // Store credentials if remember is checked
    if (remember) {
      localStorage.setItem("rememberedEmail", email)
    } else {
      localStorage.removeItem("rememberedEmail")
    }

    // Redirect to main app
    window.location.href = "index.html"
  }, 1500)
}

// Google Login
function loginGoogle() {
  console.log("[v0] Google login initiated")
  alert("Google login would be implemented here with OAuth")
}

// Load remembered email on page load
window.addEventListener("DOMContentLoaded", () => {
  const rememberedEmail = localStorage.getItem("rememberedEmail")
  if (rememberedEmail) {
    document.getElementById("email").value = rememberedEmail
    document.getElementById("remember").checked = true
  }
})
