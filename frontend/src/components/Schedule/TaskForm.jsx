import React, { useState } from 'react';
import { createTask } from '../../services/plantService';
import { TASK_TYPES, TASK_PRIORITIES } from '../../utils/constants';
import { useNotification } from '../../hooks/useNotification';
import './TaskForm.css';

const TaskForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'other',
    priority: 'medium',
    dueDate: '',
    plantId: '',
  });
  const { addNotification } = useNotification();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTask(formData);
      addNotification('Task created', 'success');
      onClose();
    } catch (error) {
      addNotification('Failed to create task', 'error');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>New Task</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title *</label>
            <input name="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="2" />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Type</label>
              <select name="type" value={formData.type} onChange={handleChange}>
                {TASK_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Priority</label>
              <select name="priority" value={formData.priority} onChange={handleChange}>
                {TASK_PRIORITIES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Due Date</label>
            <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} required />
          </div>
          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;