import api from "./api.js";

export const processText = async (type, text) => {
  const { data } = await api.post(`/text/${type}`, { text });
  return data;
};

export const fetchHistory = async (params = {}) => {
  const { data } = await api.get("/history", { params });
  return data;
};

export const deleteHistoryItem = async (id) => {
  const { data } = await api.delete(`/history/${id}`);
  return data;
};

export const fetchAnalytics = async () => {
  const { data } = await api.get("/history/analytics");
  return data;
};
