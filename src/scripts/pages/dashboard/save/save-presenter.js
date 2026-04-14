export default class SavePrenseter {
  #view = null;
  #dbModel = null;

  constructor({ view, dbModel }) {
    this.#view = view;
    this.#dbModel = dbModel;
  }

  async showListSave() {
    try {
      this.#view.isLoading();
      const data = await this.#dbModel.getAllReports();
      if (!data || data.length === 0) {
        this.#view.listNotFound();
        return;
      }
      this.#view.showListView(data);
    } catch (error) {
      console.error(error);
    } finally {
      this.#view.notLoading();
    }
  }
}
