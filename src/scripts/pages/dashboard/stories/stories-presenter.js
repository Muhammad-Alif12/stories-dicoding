export default class modelPresenter {
  #view = null;
  #model = null;
  #dbModel = null;

  constructor({ view, model, dbModel }) {
    this.#view = view;
    this.#model = model;
    this.#dbModel = dbModel;
  }

  async showList() {
    try {
      this.#view.isLoading();
      const response = await this.#model.getAllStories();

      const data = response.listStory;

      if (!data || data.length === 0) {
        this.#view.listNotFound();
        return;
      }
      this.#view.showListView(data);
      this.#view.showMapsView(data);
    } catch (error) {
      alert("Gagal memuat. Silakan coba lagi nanti.");
    } finally {
      this.#view.notLoading();
    }
  }
}
