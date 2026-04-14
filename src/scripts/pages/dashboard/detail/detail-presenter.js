export default class DetailPresenter {
  #storiesId = null;
  #apiModel = null;
  #dbModel = null;
  #view = null;

  constructor(id, { view, apiModel, dbModel }) {
    this.#storiesId = id;
    this.#view = view;
    this.#apiModel = apiModel;
    this.#dbModel = dbModel;
  }

  async showDetail() {
    try {
      this.#view.isLoading();
      const response = await this.#apiModel.getStoriesDetail(this.#storiesId);
      const data = response.story;

      this.#view.showDetail(data);
    } catch (error) {
      alert("Gagal memuat. Silakan coba lagi nanti.");
    } finally {
      this.#view.notLoading();
    }
  }

  async saveReport() {
    try {
      const report = await this.#apiModel.getStoriesDetail(this.#storiesId);
      await this.#dbModel.putReport(report.story);
      this.#view.saveToBookmarkSuccessfully("Success to save to bookmark");
    } catch (error) {
      console.error("saveReport: error:", error);
      this.#view.saveToBookmarkFailed(error.message);
    }
  }

  async removeReport() {
    try {
      await this.#dbModel.removeReport(this.#storiesId);
      this.#view.removeFromBookmarkSuccessfully(
        "Success to remove from bookmark",
      );
    } catch (error) {
      console.error("removeReport: error:", error);
      this.#view.removeFromBookmarkFailed(error.message);
    }
  }

  async showSaveButton() {
    if (await this.#isStorySaved()) {
      this.#view.renderRemoveButton();
      return;
    }
    this.#view.renderSaveButton();
  }

  async #isStorySaved() {
    return !!(await this.#dbModel.getReportById(this.#storiesId));
  }
}
