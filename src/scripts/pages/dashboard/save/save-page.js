import SavePrenseter from "./save-presenter";
import Database from "../../../data/database";
import { generateListStoryTemplate } from "../../../templates";

export default class SavePage {
  #prenseter = null;
  async render() {
    return `
      <section class="save-container">
        <h1 class="heading">Save Page</h1>

        <div class="loader"></div>    

        <div id="cards" class="cards"></div>

        <a href="#/add-stories" class="btn-add">+</a>
      </section>
    `;
  }

  async afterRender() {
    this.#prenseter = new SavePrenseter({
      view: this,
      dbModel: Database,
    });

    await this.#prenseter.showListSave();
  }

  showListView(data) {
    const html = data.reduce(
      (accumulator, currentValue) =>
        accumulator.concat(generateListStoryTemplate(currentValue)),
      "",
    );

    document.getElementById("cards").innerHTML = html;
  }

  listNotFound() {
    document.getElementById("cards").innerHTML =
      "<p class='not-found'>Tidak ada cerita yang ditemukan.</p>";
  }

  isLoading() {
    const loader = document.querySelector(".loader");
    loader.style.display = "block";
  }

  notLoading() {
    const loader = document.querySelector(".loader");
    loader.style.display = "none";
  }
}
