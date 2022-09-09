import React from "react";
import { Link } from "react-router-dom";

export default function Lessons() {
  const renderLessons = () => {
    let lessons = [];
    for (let i = 1; i <= 58; i++) {
      lessons.push(
        <Link to={`/lesson/${i}`} key={i}>
          Lesson {i}
        </Link>
      );
    }
    return lessons;
  };
  return (
    <div>
      <h1>Lessons</h1>
      {renderLessons()}
    </div>
  );
}
