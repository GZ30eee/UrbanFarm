import React from 'react';
import { formatDate } from '../../utils/helpers';
import './WateringSchedule.css';

const WateringSchedule = ({ schedule }) => {
  return (
    <div className="watering-schedule">
      <h3>Watering Schedule</h3>
      <ul>
        {schedule.schedule?.map((item, idx) => (
          <li key={idx} className="schedule-item">
            <span className="date">{formatDate(item.date)}</span>
            <span className="amount">{item.amount}</span>
            <span className="time">{item.timeOfDay}</span>
            <span className="notes">{item.notes}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WateringSchedule;