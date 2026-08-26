import React, { useState, useEffect } from 'react';
import { getTasks, completeTask, deleteTask, createTask } from '../../services/plantService';
import { TASK_TYPES, TASK_PRIORITIES } from '../../utils/constants';
import { useNotification } from '../../hooks/useNotification';
import TaskForm from './TaskForm';
import './ScheduleTab.css';

const ScheduleTab = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { addNotification } = useNotification();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Failed to load tasks', error);
    }
  };

  const handleComplete = async (id) => {
    try {
      await completeTask(id);
      addNotification('Task completed!', 'success');
      loadTasks();
    } catch (error) {
      addNotification('Failed to complete task', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await deleteTask(id);
      addNotification('Task deleted', 'success');
      loadTasks();
    } catch (error) {
      addNotification('Failed to delete task', 'error');
    }
  };

  return (
    <div className="schedule-tab">
      <div className="schedule-header">
        <h2>📅 Tasks & Schedule</h2>
        <button className="btn-primary" onClick={() => setShowForm(true)}>+ Add Task</button>
      </div>
      <ul className="task-list">
        {tasks.length === 0 && <p>No tasks yet.</p>}
        {tasks.map(task => (
          <li key={task._id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <div className="task-info">
              <h4>{task.title}</h4>
              <span className="task-type">{task.type}</span>
              <span className="task-priority" style={{ background: task.priority === 'high' ? '#e8b4b4' : '#f0d5c0' }}>
                {task.priority}
              </span>
              <span className="task-due">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
            </div>
            <div className="task-actions">
              {!task.completed && (
                <button className="btn-secondary" onClick={() => handleComplete(task._id)}>✓</button>
              )}
              <button className="btn-danger" onClick={() => handleDelete(task._id)}>✕</button>
            </div>
          </li>
        ))}
      </ul>
      {showForm && <TaskForm onClose={() => { setShowForm(false); loadTasks(); }} />}
    </div>
  );
};

export default ScheduleTab;