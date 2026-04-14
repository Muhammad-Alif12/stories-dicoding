import { login } from "../../../data/api.js";
import LoginPresenter from "./login-presenter";
import { putAccessToken } from "../../../utils/auth.js";

export default class LoginPage {
  #presenter = null;

  async render() {
    return `
      <section class="auth-container">
        <h1>Login</h1>
        <form class="auth-form">
          <div class="loader"></div>
          <div class="form-group">
            <label for="email" class="form-label">Email:</label>
            <input type="email" id="email" name="email" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="password" class="form-label">Password:</label>
            <input type="password" id="password" name="password" class="form-control" required />
          </div>
          <button type="submit" class="btn-auth">Login</button>
        </form>
        <p>Belum punya akun? <a href="/#/register">Daftar di sini</a></p>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new LoginPresenter({
      view: this,
      model: login,
      authModel: putAccessToken,
    });

    await this.#handleLogin();
  }

  #handleLogin() {
    const form = document.querySelector("form");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const dataLogin = {
        email: form.email.value,
        password: form.password.value,
      };

      await this.#presenter.login(dataLogin);
    });
  }

  isLoading() {
    const loader = document.querySelector(".loader");
    loader.style.display = "block";

    const form = document.querySelector("form");
    form.style.opacity = "0.2";

    const button = form.querySelector(".btn-auth");
    button.disabled = true;
  }

  notLoading() {
    const loader = document.querySelector(".loader");
    loader.style.display = "none";

    const form = document.querySelector("form");
    form.style.opacity = "1";

    const button = form.querySelector(".btn-auth");
    button.disabled = false;
  }
}
