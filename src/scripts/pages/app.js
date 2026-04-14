import routes from "../routes/routes";
import { getActiveRoute } from "../routes/url-parser";
import {
  navigationListTemplate,
  buttonSubscribeTemplate,
  buttonUnscribeTemplate,
} from "../templates.js";
import { getAccessToken, getLogout } from "../utils/auth.js";
import { isServiceWorkerAvailable } from "../utils";
import {
  isCurrentPushSubscriptionAvailable,
  subscribe,
  unsubscribe,
} from "../utils/notification-helper.js";

class App {
  #content = null;
  #drawerButton = null;
  #navigationDrawer = null;
  #isLogin = null;

  constructor({ navigationDrawer, drawerButton, content }) {
    this.#content = content;
    this.#drawerButton = drawerButton;
    this.#navigationDrawer = navigationDrawer;

    this._setupDrawer();
  }

  _setupDrawer() {
    this.#drawerButton.addEventListener("click", () => {
      this.#navigationDrawer.classList.toggle("open");
    });

    document.body.addEventListener("click", (event) => {
      if (
        !this.#navigationDrawer.contains(event.target) &&
        !this.#drawerButton.contains(event.target)
      ) {
        this.#navigationDrawer.classList.remove("open");
      }

      this.#navigationDrawer.querySelectorAll("a").forEach((link) => {
        if (link.contains(event.target)) {
          this.#navigationDrawer.classList.remove("open");
        }
      });
    });
  }

  _setupNavigation() {
    this.#isLogin = !!getAccessToken();
    const navList = this.#navigationDrawer.children.namedItem("nav-list");

    navList.innerHTML = navigationListTemplate(this.#isLogin);

    const logoutButton = document.getElementById("logout-button");
    logoutButton?.addEventListener("click", (event) => {
      event.preventDefault();

      if (confirm("Apakah Anda yakin ingin keluar?")) {
        getLogout();

        // Redirect
        location.hash = "/login";
      } else {
        location.hash = "/stories";
      }
    });
  }

  async #setupPushNotification() {
    const pushNotificationTools = document.getElementById(
      "push-notification-tools",
    );
    const isSubscribed = await isCurrentPushSubscriptionAvailable();

    if (isSubscribed) {
      pushNotificationTools.innerHTML = buttonUnscribeTemplate();
      document
        .getElementById("unsubscribe-button")
        .addEventListener("click", () => {
          unsubscribe().finally(() => {
            this.#setupPushNotification();
          });
        });

      return;
    }

    pushNotificationTools.innerHTML = buttonSubscribeTemplate();
    document
      .getElementById("subscribe-button")
      .addEventListener("click", () => {
        subscribe().finally(() => {
          this.#setupPushNotification();
        });
      });
  }

  async renderPage() {
    const url = getActiveRoute();

    const route =
      routes[url] ||
      (() => ({
        render: async () =>
          "<h2 class='not-found'>Halaman tidak ditemukan</h2>",
        afterRender: async () => {},
      }));

    const page = route();

    if (page === null) {
      // jangan render apapun
      return;
    }

    const transition = document.startViewTransition(async () => {
      this.#content.innerHTML = await page.render();
      await page.afterRender();
    });

    transition.ready.catch(console.error);
    transition.updateCallbackDone.then(() => {
      scrollTo({ top: 0, behavior: "instant" });
      this._setupNavigation();

      if (isServiceWorkerAvailable() && this.#isLogin) {
        this.#setupPushNotification();
      }
    });
  }
}

export default App;
