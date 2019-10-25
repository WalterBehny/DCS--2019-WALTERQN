import React, { useState, useEffect } from "react";
//import { Prompt } from "react-router-dom";
import CourseForm from "./CourseForm";
import courseStore from "../stores/courseStore";
import ProfessorStore from "../stores/professorStore";
import { toast } from "react-toastify";
import * as courseActions from "../actions/courseActions";
import { loadProfessors } from "../actions/professorActions";

const ManageCoursePage = props => {
  //debugger;
  
  const [professors, setProfessors] = useState(ProfessorStore.getProfessors());
  
  console.log(professors);

  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    professorId: null,
    category: ""
  });

  useEffect(() => {
    courseStore.addChangeListener(onChange);
    const slug = props.match.params.slug; // from the path `/courses/:slug`
    if (courses.length === 0) {
      courseActions.loadCourses();
    } else if (slug) {
      setCourse(courseStore.getCourseBySlug(slug));
    }
    return () => courseStore.removeChangeListener(onChange);
  }, [courses.length, props.match.params.slug]);

  function onChange() {
    setCourses(courseStore.getCourses());
  }

  function handleChange({ target }) {
    //debugger;
    setCourse({
      ...course,
      [target.name]: target.value
    });
  }

  function formIsValid() {
    const _errors = {};
    if (!course.title) _errors.title = "Title is required";
    if (!course.professorId) _errors.professorId = "professor ID is required";
    if (!course.category) _errors.category = "Category is required";
    setErrors(_errors);
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    courseActions.saveCourse(course).then(() => {
      props.history.push("/courses");
      toast.success("Course saved.");
    });
  }

  return (
    <>
      <h2>Manage Course</h2>
      {/*<Prompt when={true} message="Are you sure you want to leave?" />*/}
      {/*props.match.params.slug*/}
      <CourseForm
        course={course}
        errors={errors}
        professors={professors}
        onChange={handleChange}
        onSubmit={handleSubmit} />
    </>
  );
}

export default ManageCoursePage;