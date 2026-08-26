import api from './api';

export const getGardens = async () => {
  const res = await api.get('/gardens');
  return res.data.gardens;
};

export const createGarden = async (data) => {
  const res = await api.post('/gardens', data);
  return res.data.garden;
};

export const updateGarden = async (id, data) => {
  const res = await api.put(`/gardens/${id}`, data);
  return res.data.garden;
};

export const deleteGarden = async (id) => {
  await api.delete(`/gardens/${id}`);
};

export const getPlants = async () => {
  const res = await api.get('/plants');
  return res.data.plants;
};

export const addPlant = async (data) => {
  const res = await api.post('/plants', data);
  return res.data.plant;
};

export const updatePlant = async (id, data) => {
  const res = await api.put(`/plants/${id}`, data);
  return res.data.plant;
};

export const deletePlant = async (id) => {
  await api.delete(`/plants/${id}`);
};

export const addTimelineEntry = async (plantId, data) => {
  const res = await api.post(`/plants/${plantId}/timeline`, data);
  return res.data.timeline;
};

// Disease diagnosis
export const diagnosePlant = async (formData) => {
  const res = await api.post('/disease/diagnose', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data.diagnosis;
};

export const getDiagnosisHistory = async () => {
  const res = await api.get('/disease/history');
  return res.data.diagnoses;
};

// Crop recommendations
export const getCropRecommendations = async (data) => {
  const res = await api.post('/crops/recommend', data);
  return res.data;
};

// Watering
export const generateWateringSchedule = async (plantId) => {
  const res = await api.post('/watering/generate', { plantId });
  return res.data.schedule;
};

export const getWateringSchedules = async () => {
  const res = await api.get('/watering/all');
  return res.data.schedules;
};

// Schedule tasks
export const getTasks = async (params) => {
  const res = await api.get('/schedule', { params });
  return res.data.tasks;
};

export const createTask = async (data) => {
  const res = await api.post('/schedule', data);
  return res.data.task;
};

export const updateTask = async (id, data) => {
  const res = await api.put(`/schedule/${id}`, data);
  return res.data.task;
};

export const completeTask = async (id) => {
  const res = await api.put(`/schedule/${id}/complete`);
  return res.data.task;
};

export const deleteTask = async (id) => {
  await api.delete(`/schedule/${id}`);
};

// Community
export const getCommunityPosts = async (params) => {
  const res = await api.get('/community', { params });
  return res.data.posts;
};

export const createPost = async (data) => {
  const res = await api.post('/community', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data.post;
};

export const addComment = async (postId, content) => {
  const res = await api.post(`/community/${postId}/comments`, { content });
  return res.data.post;
};

export const toggleLike = async (postId) => {
  const res = await api.put(`/community/${postId}/like`);
  return res.data;
};