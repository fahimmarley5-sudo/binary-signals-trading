import React, { useEffect, useState } from 'react';
import './CoursesList.css';

const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/courses');
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  return (
    <div className="courses-container">
      <h2>📚 Educational Courses</h2>
      
      {!selectedCourse ? (
        <div className="courses-grid">
          {courses.map(course => (
            <div key={course.id} className="course-card">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <div className="course-meta">
                <span>{course.lessons.length} lessons</span>
              </div>
              <button 
                className="btn-enroll"
                onClick={() => setSelectedCourse(course)}
              >
                View Course →
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="course-detail">
          <button className="btn-back" onClick={() => setSelectedCourse(null)}>← Back</button>
          <h3>{selectedCourse.title}</h3>
          <p>{selectedCourse.description}</p>
          
          <div className="lessons-list">
            <h4>Lessons:</h4>
            {selectedCourse.lessons.map(lesson => (
              <div key={lesson.id} className="lesson-item">
                <span className="lesson-title">{lesson.title}</span>
                <span className="lesson-duration">{lesson.duration} min</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesList;