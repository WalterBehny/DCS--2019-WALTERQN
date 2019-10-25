import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.REACT_APP_API_URL + "/courses/";
const baseUrlp = process.env.REACT_APP_API_URL + "/professors/";

export function getCourses() {
  console.log("mario fullstack");
  return fetch(baseUrl)
    .then(response => {
      return response.json().then(items => {
        items.forEach(items => {
          fetch(baseUrlp+ "?id="+items.professorId).then(
            responses =>{
              responses.json().then(itsems => {                
                  items.profesor = itsems[0].name;
                }
              ) 
            }
          );
        });
        return items;
      });
    })
    .catch(handleError);
}

export function getCourseBySlug(slug) {
  return fetch(baseUrl + "?slug=" + slug)
    .then(response => {
      if (!response.ok) throw new Error("Network response was not ok.");
      return response.json().then(courses => {
        if (courses.length !== 1) throw new Error("Course not found: " + slug);
        return courses[0]; // should only find one course for a given slug, so return it.
      });
    })
    .catch(handleError);
}

export function saveCourse(course) {
  return fetch(baseUrl + (course.id || ""), {
    method: course.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      ...course,
      // Parse professorId to a number (in case it was sent as a string).
      professorId: parseInt(course.professorId, 10)
    })
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteCourse(courseId) {
  return fetch(baseUrl + courseId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
