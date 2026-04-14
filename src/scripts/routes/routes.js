import LoginPage from "../pages/auth/login/login-page";
import RegisterPage from "../pages/auth/register/register-page";
import StoriesPage from "../pages/dashboard/stories/stories-page.js";
import DetailPage from "../pages/dashboard/detail/detail-page.js";
import AddStoriesPage from "../pages/dashboard/add-stories/add-page.js";
import HomePage from "../pages/homePage/home-page.js";
import SavePage from "../pages/dashboard/save/save-page.js";
import {
  checkAuthenticatedRoute,
  checkUnauthenticatedRouteOnly,
} from "../utils/auth.js";

const routes = {
  "/login": () => checkUnauthenticatedRouteOnly(new LoginPage()),
  "/register": () => checkUnauthenticatedRouteOnly(new RegisterPage()),
  "/": () => new HomePage(),

  "/stories": () => checkAuthenticatedRoute(new StoriesPage()),
  "/detail-stories/:id": () => checkAuthenticatedRoute(new DetailPage()),
  "/stories-save": () => checkAuthenticatedRoute(new SavePage()),
  "/add-stories": () => checkAuthenticatedRoute(new AddStoriesPage()),
};

export default routes;
