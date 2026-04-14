export default class AddStoriesPresenter {
  #view = null;
  #model = null;

  constructor({ model, view }) {
    this.#model = model;
    this.#view = view;
  }

  async addStories(data) {
    try {
      this.#view.loadingForm();
      const response = await this.#model(data);

      if (response) {
        alert(response.message);
        location.hash = "/stories";
      }
    } catch (error) {
      alert("message" + error);
    } finally {
      this.#view.afterLoading();
    }
  }
}
