
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