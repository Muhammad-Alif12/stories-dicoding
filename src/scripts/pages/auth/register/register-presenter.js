export default class RegisterPresenter {
  #view = null;
  #model = null;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async register(data) {
    try {
      this.#view.isLoading();
      const response = await this.#model(data);
      if (response) {
        alert("Registration successful! Please login.");
        window.location.href = "/#/login";
      }
    } catch (error) {
      alert(error.message);
    } finally {
      this.#view.notLoading();
    }
  }
}
