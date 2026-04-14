import { add } from "../../../data/api.js";
import AddStoriesPresenter from "./add-presenter";
import { maps } from "../../../utils/maps";
import { CameraController } from "../../../utils/camera";

export default class AddStoriesPage {
  #presenter = null;
  #currentMarker = null;
  #cameraBlob = null;

  async render() {
    return `
      <div class="loader" style="display: none;"></div>
      <section class="add-stories-container">
        <h1 class="heading">Buat Stories Baru</h1>

          <form id="storyForm" enctype="multipart/form-data">
            <!-- Deskripsi -->
            <div class="form-group">
              <label for="description" class="form-label">Description</label>
              <textarea 
                id="description" 
                name="description" 
                class="form-control" 
                placeholder="Masukkan deskripsi lengkap..." 
                required
              ></textarea>
            </div>

            <!-- Foto -->
            <div class="form-group">
              <label for="photo" class="form-label">Foto</label>
              <div>
                <button type="button" id="openCamera" class="btn-dokumentasi">
                  Aktifkan Kamera
                </button>
                <button type="button" id="choosePhotoBtn" class="btn-dokumentasi">
                  Pilih Foto
                </button
              </div>  
              <input 
                type="file" 
                id="photo" 
                name="photo" 
                accept="image/*" 
              />
              <!-- Preview -->
              <div id="preview-container" style="display: none">
                <video id="camera-video" class="camera__video">Video stream not available.</video>
                <button type="button" id="take-photo" class="btn-dokumentasi">Take Foto</button>
              </div>
            </div>

            <!-- Lokasi -->
            <div class="form-group">
              <label class="form-label">Lokasi</label>

              <div id="map" class="map"></div>

              <div class="coords">
                <input 
                  type="text" 
                  id="lat" 
                  name="lat"
                  class="form-control"
                  placeholder="Latitude (opsional)" 
                  readonly
                >

                <input 
                  type="text" 
                  id="lon" 
                  name="lon"
                  class="form-control"
                  placeholder="Longitude (opsional)" 
                  readonly
                >
              </div>
            </div>

            <!-- Tombol -->
            <div class="action-buttons">
              <button type="submit" class="btn-submit">Buat Story</button>
              <button type="button" class="btn-cancel">Batal</button>
            </div>

          </form>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new AddStoriesPresenter({
      model: add,
      view: this,
    });

    this.#showMaps();
    this.resetForm();
    await this.#handleDokumentasi();
    this.handleAdd();
  }

  handleAdd() {
    const form = document.querySelector("form");

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const file = this.#cameraBlob
        ? this.#cameraBlob // dari kamera
        : form.photo.files[0] || null; // dari file input

      const formData = new FormData();
      formData.append("description", form.description.value);
      formData.append("photo", file);
      formData.append("lat", parseFloat(form.lat?.value || 0));
      formData.append("lon", parseFloat(form.lon?.value || 0));

      await this.#presenter.addStories(formData);
    });
  }

  #handleDokumentasi() {
    let cameraStatus = false;
    const openCamera = document.getElementById("openCamera");
    const previewContainer = document.getElementById("preview-container");
    const photoGallery = document.getElementById("choosePhotoBtn");
    const takeFoto = document.getElementById("take-photo");

    openCamera.addEventListener("click", () => {
      cameraStatus = !cameraStatus;
      const camera = new CameraController(cameraStatus);
      camera.init();

      if (cameraStatus) {
        previewContainer.style.display = "block";
        openCamera.innerText = "Tutup Kamera";
      } else {
        previewContainer.style.display = "none";
        openCamera.innerText = "Aktifkan Kamera";
      }

      takeFoto.addEventListener("click", async () => {
        const blob = await camera.cameraTakePicture();
        this.#cameraBlob = new File([blob], "camera.png", {
          type: "image/png",
        });
        alert("Foto berhasil diambil!");
      });
    });

    photoGallery.addEventListener("click", () => {
      if (cameraStatus) {
        alert("maaf kamera aktif, matikan kamera untuk upload foto");
      } else {
        document.getElementById("photo").click();
      }
    });
  }

  #showMaps() {
    const map = maps();

    map.on("click", (event) => {
      const { lat, lng } = event.latlng;

      if (!this.#currentMarker) {
        this.#currentMarker = L.marker([lat, lng]).addTo(map);
      } else {
        this.#currentMarker.setLatLng([lat, lng]);
      }

      document.getElementById("lat").value = lat;
      document.getElementById("lon").value = lng;
    });
  }

  reset() {
    const previewContainer = document.getElementById("preview-container");
    const openCamera = document.getElementById("openCamera");
    const form = document.querySelector("form");

    form.reset();
    previewContainer.style.display = "none";
    openCamera.innerText = "Aktifkan Kamera";

    const camera = new CameraController(false);
    camera.init();
  }

  resetForm() {
    const btnCancel = document.querySelector(".btn-cancel");
    btnCancel.addEventListener("click", () => {
      this.reset();
    });
  }

  loadingForm() {
    const form = document.querySelector("form");
    const loader = document.querySelector(".loader");
    form.style.display = "none";
    loader.style.display = "block";
  }

  afterLoading() {
    const form = document.querySelector("form");
    const loader = document.querySelector(".loader");
    form.style.display = "block";
    loader.style.display = "none";
  }
}
