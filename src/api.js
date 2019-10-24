const PREFIX = "/api";

export const addCourse = (name, price) => {
  return postData(PREFIX + "/courses", { name, price: parseFloat(price) });
};

export const loadCourses = () => {
  return fetch(PREFIX + "/courses").then(res => res.json());
};

export const addLesson = (name, courseId) => {
  return postData(PREFIX + "/lessons", { name, courseId });
};

export const loadLessons = courseId => {
  return fetch(PREFIX + "/lessons?courseId=" + courseId).then(res =>
    res.json()
  );
};

export const saveLesson = lesson => {
  return putData(PREFIX + `/lessons/${lesson.id}`, lesson);
};

export const deleteLesson = lesson => {
  return deleteData(PREFIX + `/lessons/${lesson.id}`);
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

const fetchWithData = (url = ``, data = {}, method = "POST") => {
  // Default options are marked with *
  return fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  }).then(response => response.json());
};
