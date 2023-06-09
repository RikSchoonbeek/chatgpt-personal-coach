const BASE_URL = "http://localhost:8000/";

export const apiUrls = {
  folder: (id) => BASE_URL + (id ? `folder/${id}/` : "folder/"),
  snippet: (id) => BASE_URL + (id ? `snippet/${id}/` : "snippet/"),
};
