const PREFIX = "/api";

let authToken = null;
export const setToken = token => {
  authToken = token;
};

export const addCourse = (name, price) => {
  return postData(PREFIX + "/courses", { name, price: parseFloat(price) });
};

export const buyCourse = courseId => {
  return postData(PREFIX + "/buy", { courseId });
};

export const loadCourses = () => {
  return fetch(PREFIX + "/courses")
    .then(handleErrors)
    .then(res => res.json());
};

export const addLesson = (name, courseId) => {
  return postData(PREFIX + "/lessons", { name, courseId });
};

export const loadLessons = courseId => {
  return fetch(PREFIX + "/lessons?courseId=" + courseId, {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(handleErrors)
    .then(res => res.json());
};

export const saveLesson = lesson => {
  return putData(PREFIX + `/lessons/${lesson.id}`, lesson);
};

export const deleteLesson = lesson => {
  return deleteData(PREFIX + `/lessons/${lesson.id}`);
};

export const login = (username, password) => {
  return postData(PREFIX + "/login", { username, password });
};

export const signup = (username, password) => {
  return postData(PREFIX + "/users", { username, password });
};

const postData = (url = ``, data = {}) => {
  return fetchWithData(url, data, "POST");
};

const putData = (url = ``, data = {}) => {
  return fetchWithData(url, data, "PUT");
};

const deleteData = (url = ``, data = {}) => {
  return fetchWithData(url, data, "DELETE");
};

const fetchWithData = (
  url = `https://mighty-wildwood-30537.herokuapp.com`,
  data = {},
  method = "POST"
) => {
  // Default options are marked with *
  return fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: authToken ? `Bearer ${authToken}` : undefined
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  })
    .then(handleErrors)
    .then(response => response.json());
};

const handleErrors = response => {
  if (!response.ok) {
    return response.json().then(body => {
      throw new Error(body.message);
    });
  } else {
    return response;
  }
};
