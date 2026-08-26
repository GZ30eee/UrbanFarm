export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatTime = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

export const getInitials = (name) => {
  if (!name) return 'U';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const truncate = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '…';
};

export const getStatusColor = (status) => {
  const map = {
    seedling: '#b8a9c9',
    growing: '#a8d5ba',
    mature: '#f0d5c0',
    harvested: '#d4b8a0',
    dead: '#c9b0a0',
  };
  return map[status] || '#b8a9c9';
};

export const getPriorityColor = (priority) => {
  const map = {
    low: '#a8d5ba',
    medium: '#f0d5c0',
    high: '#e8b4b4',
  };
  return map[priority] || '#b8a9c9';
};

export const getConfidenceEmoji = (conf) => {
  if (conf >= 0.8) return '🟢';
  if (conf >= 0.5) return '🟡';
  return '🔴';
};