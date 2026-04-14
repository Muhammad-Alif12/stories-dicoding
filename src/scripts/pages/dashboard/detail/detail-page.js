import * as storiesApi from "../../../data/api";
import Database from "../../../data/database";
import DetailPresenter from "./detail-presenter";
import { parseActivePathname } from "../../../routes/url-parser";
import {
  generateDetailTemplate,
  generateSaveReportButtonTemplate,
  generateRemoveReportButtonTemplate,
} from "../../../templates";

export default class DetailPage {
  #presenter = null;
  async render() {
    return `
      <section class="detail-container">
        <div class="loader"></div>      

        <div class="detail-card"></div>
      </section>    
    `;
  }

  async afterRender() {
    this.#presenter = new DetailPresenter(parseActivePathname().id, {
      view: this,
      apiModel: storiesApi,
      dbModel: Database,
    });

    await this.#presenter.showDetail();
    await this.#presenter.showSaveButton();
  }

  showDetail(data) {
    const detailCard = document.querySelector(".detail-card");
    detailCard.innerHTML = generateDetailTemplate(data);
  }

  isLoading() {
    const loader = document.querySelector(".loader");
    loader.style.display = "block";
  }

  notLoading() {
    const loader = document.querySelector(".loader");
    loader.style.display = "none";
  }

  renderSaveButton() {
    document.getElementById("save-actions-container").innerHTML =
      generateSaveReportButtonTemplate();

    document
      .getElementById("report-detail-save")
      .addEventListener("click", async () => {
        await this.#presenter.saveReport();
        await this.#presenter.showSaveButton();
      });
  }

  saveToBookmarkSuccessfully(message) {
    alert(message);
  }
  saveToBookmarkFailed(message) {
    alert(message);
  }

  renderRemoveButton() {
    document.getElementById("save-actions-container").innerHTML =
      generateRemoveReportButtonTemplate();

    document
      .getElementById("report-detail-remove")
      .addEventListener("click", async () => {
        await this.#presenter.removeReport();
        await this.#presenter.showSaveButton();
      });
  }

  removeFromBookmarkSuccessfully(message) {
    console.log(message);
  }
  removeFromBookmarkFailed(message) {
    alert(message);
  }
}
