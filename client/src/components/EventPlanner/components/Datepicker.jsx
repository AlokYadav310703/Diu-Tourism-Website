import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { FaCalendarAlt } from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';
import "./Datepicker.css"

// initialDate lets EventPlanner.jsx pass in a previously saved trip date
// (from the user's profile) so returning users see it pre-filled instead
// of a blank picker every time.
const Datepicker = ({ setDate, initialDate }) => {
  const [selectedDate, setSelectedDate] = useState(initialDate || null);

  useEffect(() => {
    if (initialDate) setSelectedDate(initialDate);
  }, [initialDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setDate(date);
  };

  return (
    <div className="DP">
      <FaCalendarAlt className="DP_icon" />
      <span className="DP_label">Trip start date</span>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="dd MMM yyyy"
        minDate={new Date()}
        placeholderText="Choose a date"
      />
    </div>
  )
}
export default Datepicker
