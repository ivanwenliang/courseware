import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { addLesson } from "../actions";
import "./NewLesson.css";

const NewLesson = ({ addLesson, courseId }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState("");
  const inputRef = useRef();

  const commitEdit = e => {
    e.preventDefault();
    addLesson(title, courseId);
    reset();
  };

  const reset = () => {
    setTitle("");
    setEditing(false);
  };

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  return editing ? (
    <form className="add-lesson-button editing" onSubmit={commitEdit}>
      <input
        ref={inputRef}
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        onBlur={reset}
        placeholder="Name the lesson"
      />
    </form>
  ) : (
    <button
      className="add-lesson-button"
      onClick={() => setEditing(true)}
      type="submit"
    >
      New Lesson
    </button>
  );
};

const mapDispatch = {
  addLesson
};
export default connect(
  null,
  mapDispatch
)(NewLesson);