import { register } from "../../../data/api.js";
import RegisterPresenter from "./register-presenter.js";

export default class RegisterPage {
  #presenter = null;

  async render() {
    return `
      <section class="auth-container">
        <h1>Register</h1>
        <div class="loader"></div>
        <form class="auth-form">
          <div class="form-group">
           <label for="name" class="form-label">Name:</label>
           <input type="text" id="name" name="name" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="email" class="form-label">Email:</label>
            <input type="email" id="email" name="email" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="password" class="form-label">Password:</label>
            <input type="password" id="password" name="password" class="form-control" required />
          </div>
          <button type="submit" class="btn-auth">Daftar</button>
        </form>
        <p>Sudah punya akun? <a href="/#/login">Login di sini</a></p>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new RegisterPresenter({
      view: this,
      model: register,
    });

    await this.#registerHandler();
  }

  #registerHandler() {
    const form = document.querySelector("form");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const data = {
        name: event.target.name.value,
        email: event.target.email.value,
        password: event.target.password.value,
      };

      await this.#presenter.register(data);
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
