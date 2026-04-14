export default class LoginPresenter {
  #view = null;
  #model = null;
  #authModel = null;

  constructor({ view, model, authModel }) {
    this.#view = view;
    this.#model = model;
    this.#authModel = authModel;
  }

  async login(data) {
    try {
      this.#view.isLoading();
      const response = await this.#model(data);

      const isAuthSuccess = this.#authModel(response?.loginResult?.token);
      if (isAuthSuccess) {
        location.hash = "/stories";
      }
    } catch (error) {
      alert("Login gagal: " + error.message);
    } finally {
      this.#view.notLoading();
    }
  }
}
