import { showFormattedDate } from "./utils";

export function navigationListTemplate(isLogin) {
  if (!isLogin) {
    return `  
      <li><a href="#/login">Login</a></li>
      <li><a href="#/register">Register</a></li>
    `;
  }
  return `
    <li id="push-notification-tools" class="push-notification-tools"></li>
    <li><a href="#/stories">Stories</a></li>
    <li><a href="#/stories-save">Stories Tersimpan</a></li>
    <li><a href="#/logout" id="logout-button">Keluar</a></li>
  `;
}

export function buttonSubscribeTemplate() {
  return `<button id="subscribe-button" class="btn-notif subscribe-button">Notifikasi</button>`;
}

export function buttonUnscribeTemplate() {
  return `<button id="unsubscribe-button" class="btn-notif unsubscribe-button">Batalkan</button>`;
}

export function generateListStoryTemplate(story) {
  return `<div class="card">
    <img src="${story.photoUrl}" alt="${story.name}">
    <div class="content">
      <h2>${story.name}</h2>
      <p>${story.description}</p> 
      <div class="meta">
        <span class="author">Pembuat: ${story.name}</span>
        <span class="date">${showFormattedDate(story.createdAt)}</span>
      </div>
       <div class="btn-wrapper">
        <a href="#/detail-stories/${story.id}" class="btn-detail">Selengkapnya</a>
      </div>
    </div>
  </div>`;
}

export function generateDetailTemplate(story) {
  return `
      <img class="detail-image" src="${story.photoUrl}" alt="${story.name}">
      
      <div class="detail-content">
        <h1 class="detail-title">${story.name}</h1>
        
        <p class="detail-location">
          📍 Lat: ${story.lat ? story.lat : "Tidak Ada"} 
          | Lng: ${story.lon ? story.lon : "Tidak Ada"}
        </p>

        <p class="detail-description">
          ${story.description}
        </p>

        <div id="save-actions-container" class="save-actions-container"></div>
      </div>
  `;
}

export function generateRemoveReportButtonTemplate() {
  return `
    <button id="report-detail-remove" class="btn btn-transparent">
      Batal Save <i class="fas fa-bookmark"></i>
    </button>
  `;
}

export function generateSaveReportButtonTemplate() {
  return `
    <button id="report-detail-save" class="btn btn-transparent">
      Save Stories <i class="far fa-bookmark"></i>
    </button>
  `;
}
