import { UserService } from "../../../../dist/users/service/user.service.js";

const userService = new UserService(); 
const hyperlink = document.getElementById('hyperlink'); //text is either, register here or login here
const h2 = document.getElementById('log/register'); //text is either login or register
const submitButton = document.getElementById('loginFormSubmit'); //text is either login or register
const hyperlinkPrologue = document.getElementById('hyperlinkPrologue'); //text is either, register here or login here


const username = document.getElementById('username') as HTMLInputElement | null;
const password = document.getElementById('password') as HTMLInputElement | null;
document.addEventListener("DOMContentLoaded", () => {
  const password = document.getElementById('password') as HTMLInputElement | null;
  const togglePassword = document.getElementById('togglePassword') as HTMLElement | null;

  if (password && togglePassword) {
    togglePassword.addEventListener('click', () => {
      const isPassword = password.type === 'password';
      password.type = isPassword ? 'text' : 'password';
      togglePassword.textContent = isPassword ? '🙈' : '👁️';
    });
  }
});

hyperlink.addEventListener('click', () => {
    if (hyperlink.textContent === 'Register here') {
        h2.textContent = 'Register';
        hyperlinkPrologue.textContent = 'Already have an account?';
        submitButton.textContent = 'Register';
        hyperlink.textContent = 'Login here';
    }
    else {
        h2.textContent = 'Login';
        hyperlinkPrologue.textContent = 'Don\'t have an account?';
        submitButton.textContent = 'Login';
        hyperlink.textContent = 'Register here';
    }
});

submitButton.addEventListener('click', () => {
 event.preventDefault(); // Prevents the page from reloading
console.log("Username:", username?.value, "Password:", password?.value);
userService.login(username.value, password.value)
    .then(user => {
      console.log("Logged in as:", user);
      if(user.role === 'guide')
      { 
        sessionStorage.setItem('guideID', user.id);
      }
       window.location.href = "../../../tours/pages/tourMainPage/tourMainPage.html";
    })
    .catch(err => console.error("Login failed:", err.message));
   
}
)
