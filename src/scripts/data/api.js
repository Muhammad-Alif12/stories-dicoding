import CONFIG from "../config";
import { getAccessToken } from "../utils/auth";

const ENDPOINTS = {
  LOGIN: `${CONFIG.BASE_URL}/login`,
  REGISTER: `${CONFIG.BASE_URL}/register`,
  ALLSTORIES: `${CONFIG.BASE_URL}/stories`,
  ADDSTORIES: `${CONFIG.BASE_URL}/stories`,
  DETAIL: `${CONFIG.BASE_URL}/stories`,
  SUBSCRIBE: `${CONFIG.BASE_URL}/notifications/subscribe`,
  UNSUBSCRIBE: `${CONFIG.BASE_URL}/notifications/subscribe`,
};

export async function getData() {
  const fetchResponse = await fetch(ENDPOINTS.ENDPOINT);
  return await fetchResponse.json();
}

export async function login({ email, password }) {
  const response = await fetch(ENDPOINTS.LOGIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const responseData = await response.json();

  if (responseData.error) {
    throw new Error(responseData.message);
  }

  return responseData;
}

export async function register(data) {
  const response = await fetch(ENDPOINTS.REGISTER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (responseData.error) {
    throw new Error(responseData.message);
  }

  return responseData;
}

export async function getAllStories() {
  const accessToken = getAccessToken();

  const response = await fetch(ENDPOINTS.ALLSTORIES, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const responseData = await response.json();

  return responseData;
}

export async function getStoriesDetail(id) {
  const accessToken = getAccessToken();
  console.log("id from api" + id);

  const response = await fetch(ENDPOINTS.DETAIL + `/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const responseData = await response.json();

  return responseData;
}

export async function add(data) {
  const accessToken = getAccessToken();
  const response = await fetch(ENDPOINTS.ADDSTORIES, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
    body: data,
  });
  const responseData = await response.json();
  if (responseData.error) {
    throw new Error(responseData.message);
  }
  return responseData;
}

export async function subscribePushNotification({
  endpoint,
  keys: { p256dh, auth },
}) {
  const accessToken = getAccessToken();
  const data = JSON.stringify({
    endpoint,
    keys: { p256dh, auth },
  });

  const fetchResponse = await fetch(ENDPOINTS.SUBSCRIBE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: data,
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function unsubscribePushNotification({ endpoint }) {
  const accessToken = getAccessToken();
  const data = JSON.stringify({ endpoint });

  const fetchResponse = await fetch(ENDPOINTS.UNSUBSCRIBE, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: data,
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}
