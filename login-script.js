document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault()
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value
  const remember = document.getElementById("remember").checked
  console.log("[v0] Login attempt:", { email, remember })
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
  simulateLogin(email, password, remember)
})
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
function simulateLogin(email, password, remember) {
  const loginBtn = document.querySelector(".btn-login")
  const originalText = loginBtn.textContent
  loginBtn.disabled = true
  loginBtn.textContent = "Signing in..."
  setTimeout(() => {
    console.log("[v0] Login successful")
    if (remember) {
      localStorage.setItem("rememberedEmail", email)
    } else {
      localStorage.removeItem("rememberedEmail")
    }
    window.location.href = "index.html"
  }, 1500)
}
function loginGoogle() {
  console.log("[v0] Google login initiated")
  alert("Google login would be implemented here with OAuth")
}
window.addEventListener("DOMContentLoaded", () => {
  const rememberedEmail = localStorage.getItem("rememberedEmail")
  if (rememberedEmail) {
    document.getElementById("email").value = rememberedEmail
    document.getElementById("remember").checked = true
  }
})