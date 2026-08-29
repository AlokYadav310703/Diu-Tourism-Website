import React, { useState, useEffect } from "react";
import "./Eventplanner.css";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { FaSave, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import TaskColumn from "./components/TaskColumn";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Datepicker from "./components/Datepicker";

const formatDayLabel = (date) =>
  date
    ? date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    : null;

const EventPlanner = () => {
  const { profile } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [ActiveCard, setActiveCard] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [banner, setBanner] = useState(null); // { type: 'success' | 'error', message }

  // Pull the saved trip date from the auth context's profile (which
  // already fetched it via GET /profile) instead of a separate session call.
  useEffect(() => {
    if (profile?.date_of_trip) {
      setSelectedDate(new Date(profile.date_of_trip));
    }
  }, [profile]);

  useEffect(() => {
    api.get("/eventplan/")
      .then(response => {
        // event_plan_items rows already come back as { activity, status, ... }
        const formattedTasks = (response.data || []).map(item => ({
          task: item.activity,
          status: item.status
        }));
        setTasks(formattedTasks);
      })
      .catch(error => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  useEffect(() => {
    if (!banner) return;
    const timer = setTimeout(() => setBanner(null), 4000);
    return () => clearTimeout(timer);
  }, [banner]);

  const saveTasksToDatabase = async () => {
    if (!selectedDate) {
      setBanner({ type: "error", message: "Choose a trip start date before saving." });
      return;
    }

    setIsSaving(true);
    try {
      const tasksToSave = tasks.map(task => ({
        activity: task.task,
        status: task.status
      }));
      const adjustedDate = new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000);
      const dateToSave = adjustedDate.toISOString().split("T")[0];

      const taskResponse = await api.post("/eventplan/save", { tasks: tasksToSave });
      if (!taskResponse.data.success) throw new Error("Failed to update tasks");

      await api.patch("/profile", { date_of_trip: dateToSave });

      setBanner({ type: "success", message: "Your plan is saved!" });
    } catch (error) {
      console.error("Error saving tasks or date:", error);
      setBanner({
        type: "error",
        message: error.response?.data?.error || error.message || "Something went wrong while saving.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = (taskIndex) => {
    const newTasks = tasks.filter((task, index) => index !== taskIndex);
    setTasks(newTasks);
  };

  const onDrop = (status, position) => {
    if (ActiveCard == null || ActiveCard === undefined) return;
    const taskToMove = tasks[ActiveCard];
    const updatedTasks = tasks.filter((task, index) => index !== ActiveCard)
    updatedTasks.splice(position, 0, {
      ...taskToMove,
      status: status
    })
    setTasks(updatedTasks)
  };

  const getAdjustedDate = (baseDate, offset) => {
    if (!baseDate) return null;
    const newDate = new Date(baseDate.getTime() - baseDate.getTimezoneOffset() * 60000);
    newDate.setDate(newDate.getDate() + offset);
    return newDate;
  };

  const day1Label = formatDayLabel(getAdjustedDate(selectedDate, 0));
  const day2Label = formatDayLabel(getAdjustedDate(selectedDate, 1));
  const day3Label = formatDayLabel(getAdjustedDate(selectedDate, 2));

  return (
    <div className="ep-page">
      <Navbar />

      <div className="ep-hero">
        <h1>Plan Your Diu Trip</h1>
        <p>Drag places into the day you'll visit them, or set them aside for another time.</p>
        <Datepicker setDate={setSelectedDate} initialDate={selectedDate} />
      </div>

      <main className="ep-board">
        <TaskColumn
          label="To Consider"
          variant="todo"
          tasks={tasks}
          status="todo"
          handleDelete={handleDelete}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
        />
        <TaskColumn
          label="Day 1"
          dateLabel={day1Label}
          variant="day1"
          tasks={tasks}
          status="day1"
          handleDelete={handleDelete}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
        />
        <TaskColumn
          label="Day 2"
          dateLabel={day2Label}
          variant="day2"
          tasks={tasks}
          status="day2"
          handleDelete={handleDelete}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
        />
        <TaskColumn
          label="Day 3"
          dateLabel={day3Label}
          variant="day3"
          tasks={tasks}
          status="day3"
          handleDelete={handleDelete}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
        />
        <TaskColumn
          label="Not Doing"
          variant="skip"
          tasks={tasks}
          status="Not Doing"
          handleDelete={handleDelete}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
        />
      </main>

      <div className="ep-save-bar">
        <button onClick={saveTasksToDatabase} className="ep-save-btn" disabled={isSaving}>
          <FaSave /> {isSaving ? "Saving..." : "Save My Plan"}
        </button>
        {banner && (
          <div className={`ep-banner ep-banner--${banner.type}`} role="status">
            {banner.type === "success" ? <FaCheckCircle /> : <FaExclamationCircle />}
            {banner.message}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default EventPlanner;
