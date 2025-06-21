// Адаптированный AdminPanel без авторизации
// Всё сразу отображается, данные подгружаются автоматом

import { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash, Save, Upload, Plus } from "lucide-react";
import {
  ClipboardCheck,
  TrafficCone,
  Construction,
  Ruler,
  FileText,
  FileSearch,
  BookOpen,
} from "lucide-react";

const ICONS = {
  ClipboardCheck,
  TrafficCone,
  Construction,
  Ruler,
  FileText,
  FileSearch,
  BookOpen,
};

export default function AdminPanel() {
  const [tab, setTab] = useState("requests");
  const [requests, setRequests] = useState([]);
  const [content, setContent] = useState({});
  const [editId, setEditId] = useState(null);
  const [editedRequest, setEditedRequest] = useState({});

  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000/api";

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${API_BASE}/requests`);
      setRequests(res.data);
    } catch (err) {
      console.error("Ошибка при получении заявок:", err);
    }
  };

  const fetchContent = async () => {
    try {
      const res = await axios.get(`${API_BASE}/content/all`);
      const data = res.data.reduce((acc, { key, value }) => {
        acc[key] = JSON.parse(value);
        return acc;
      }, {});
      setContent(data);
    } catch (err) {
      console.error("Ошибка при загрузке контента:", err);
    }
  };

  useEffect(() => {
    fetchRequests();
    fetchContent();
  }, []);

  const startEdit = (r) => {
    setEditId(r.id);
    setEditedRequest({ ...r });
  };

  const saveEdit = async () => {
    try {
      await axios.put(`${API_BASE}/requests/${editId}`, {
        service_type: editedRequest.service_type,
        message: editedRequest.message,
      });
      setEditId(null);
      fetchRequests();
    } catch (err) {
      console.error("Ошибка при обновлении заявки:", err);
    }
  };

  const deleteRequest = async (id) => {
    if (!window.confirm("Удалить эту заявку?")) return;
    try {
      await axios.delete(`${API_BASE}/requests/${id}`);
      fetchRequests();
    } catch (err) {
      console.error("Ошибка при удалении заявки:", err);
    }
  };

  const updateContent = async (key, value) => {
    try {
      await axios.put(`${API_BASE}/content/${key}`, {
        value: JSON.stringify(value),
      });
      fetchContent();
    } catch (err) {
      console.error("Ошибка при обновлении контента:", err);
    }
  };

  const handleFileUpload = async (e, idx) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(`${API_BASE}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const imageUrl = `${API_BASE}/uploads/${res.data.filename}`;
      const updated = [...content.cards];
      updated[idx].image = imageUrl;
      setContent({ ...content, cards: updated });
    } catch (err) {
      console.error("Ошибка при загрузке изображения:", err);
    }
  };

  // 👇 Остальная часть интерфейса (вкладки и отрисовка) остаётся без изменений
  // Просто убрана авторизация

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Админ-панель (без входа)</h1>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        {["requests", "cards", "services", "steps", "price_table"].map((key) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-4 py-2 rounded ${tab === key ? "bg-blue-600 text-white" : "bg-white border"}`}
          >
            {key}
          </button>
        ))}
      </div>

      {/* Здесь отрисовка вкладок — вставляется из оригинального кода */}
    </div>
  );
}
