import * as storiesAPi from "../../../data/api";
import StoriesPresenter from "./stories-presenter";
import {
  generateListStoryTemplate,
  generateSaveReportButtonTemplate,
  generateRemoveReportButtonTemplate,
} from "../../../templates";
import { maps } from "../../../utils/maps";
import Database from "../../../data/database";

export default class StoriesPage {
  #presenter = null;
  async render() {
    return `
    <section class="stories-container"> 
      <h1 class="heading">Stories Page</h1>
      <div class="loader"></div>      

      <div id="map" class="map"></div>

      <div id="cards" class="cards"></div>

      <a href="#/add-stories" class="btn-add">+</a>
    </section>
    `;
  }

  async afterRender() {
    this.#presenter = new StoriesPresenter({
      model: storiesAPi,
      view: this,
      dbModel: Database,
    });

    await this.#presenter.showList();
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

  showMapsView(data) {
    maps(data);
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
