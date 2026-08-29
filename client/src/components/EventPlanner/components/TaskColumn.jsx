import React from "react";
import { FaInbox, FaBan } from "react-icons/fa";

import "./TaskColumn.css";
import TaskCard from "./TaskCard";
import DropArea from "./DropArea";

// Presentation lookup: EventPlanner.jsx owns the actual data (status
// values used for filtering/saving), this owns how each column looks.
const COLUMN_STYLES = {
  todo: { icon: <FaInbox />, colorClass: "col-todo" },
  day1: { dayNumber: 1, colorClass: "col-day1" },
  day2: { dayNumber: 2, colorClass: "col-day2" },
  day3: { dayNumber: 3, colorClass: "col-day3" },
  skip: { icon: <FaBan />, colorClass: "col-skip" },
};

const EMPTY_MESSAGES = {
  todo: "Nothing waiting to be sorted.",
  day1: "Drag a place in to plan your day.",
  day2: "Drag a place in to plan your day.",
  day3: "Drag a place in to plan your day.",
  skip: "Nothing skipped.",
};

const TaskColumn = ({ label, dateLabel, variant, tasks, status, handleDelete, setActiveCard, onDrop }) => {
  const style = COLUMN_STYLES[variant] || COLUMN_STYLES.todo;
  const columnTasks = tasks.filter((task) => task.status === status);

  return (
    <section className={`task_column ${style.colorClass}`}>
      <header className="task_column_header">
        <div className="task_column_heading">
          {style.dayNumber ? (
            <span className="task_column_daybadge">{style.dayNumber}</span>
          ) : (
            <span className="task_column_icon">{style.icon}</span>
          )}
          <div className="task_column_titles">
            <h2>{label}</h2>
            {dateLabel && <span className="task_column_date">{dateLabel}</span>}
          </div>
        </div>
        <span className="task_column_count">{columnTasks.length}</span>
      </header>

      <div className="task_column_body">
        <DropArea onDrop={() => onDrop(status, 0)} />
        {columnTasks.length === 0 && (
          <p className="task_column_empty">{EMPTY_MESSAGES[variant]}</p>
        )}
        {tasks.map(
          (task, index) =>
            task.status === status && (
              <React.Fragment key={index}>
                <TaskCard
                  title={task.task}
                  handleDelete={handleDelete}
                  index={index}
                  setActiveCard={setActiveCard}
                />
                <DropArea onDrop={() => onDrop(status, index + 1)} />
              </React.Fragment>
            )
        )}
      </div>
    </section>
  );
};

export default TaskColumn;
