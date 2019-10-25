import React, { useState, useEffect } from "react";
import courseStore from "../stores/courseStore";
import ProfessorStore from "../stores/professorStore";
import CourseList from "./CourseList";
import { Link } from "react-router-dom";
import { loadCourses, deleteCourse } from "../actions/courseActions";
import { loadProfessors } from "../actions/professorActions";

function CoursesPage() {
   const [courses, setCourses] = useState(courseStore.getCourses());
  const [professors, setProfessors] = useState(ProfessorStore.getProfessors());
  
  console.log(courses);
  console.log(professors);
  useEffect(() => {
    courseStore.addChangeListener(onChange);
    ProfessorStore.addChangeListener(onChange);
     if (courseStore.getCourses().length === 0) loadCourses();
    if (ProfessorStore.getProfessors().length === 0) loadProfessors();
    return () => courseStore.removeChangeListener(onChange); // cleanup on unmount (navigate to a different page)
   }, []);

  function onChange() {
    //debugger;
    setCourses(courseStore.getCourses());
    setProfessors(ProfessorStore.getProfessors());
  }

  return (
    <><h2>Courses</h2>
      <Link className="btn btn-primary" to="/course">
        Add Course
      </Link>
      
      { <CourseList courses={courses} deleteCourse={deleteCourse} /> }
    </>
  );
  
}

export default CoursesPage;