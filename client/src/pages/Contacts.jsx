import { useState } from "react";
import axios from "axios";
import InputMask from "react-input-mask";
import {
  Mail,
  Phone,
  MessageSquare,
  Clock,
  MapPin,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export default function Contacts() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    full_name: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let isValid = true;
    const newErrors = { full_name: "", phone: "", message: "" };
    const cleanedPhone = form.phone.replace(/\D/g, "");

    if (!form.full_name.trim()) {
      newErrors.full_name = "Введите имя";
      isValid = false;
    }

    if (cleanedPhone.length !== 11 || !cleanedPhone.startsWith("7")) {
      newErrors.phone = "Введите корректный номер телефона в формате +7 (XXX) XXX-XX-XX";
      isValid = false;
    }

    if (!form.message.trim()) {
      newErrors.message = "Введите сообщение";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.post("http://localhost:3000/api/requests", form);
      setSubmitted(true);
    } catch (err) {
      console.error("Ошибка при отправке заявки:", err);
      alert("Произошла ошибка при отправке. Попробуйте позже.");
    }
  };

  return (
    <section className="bg-background py-20 px-4 sm:px-6 text-primary">
      <div className="max-w-5xl mx-auto animate-fade-in">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Связаться с нами</h2>
        <p className="text-center text-muted mb-12 text-sm sm:text-base">
          Оставьте заявку — мы ответим и предложим решение в кратчайшие сроки.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Форма */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 shadow hover:shadow-md transition-all">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Имя */}
                <div className="relative">
                  <label className="block text-sm font-medium mb-1">Имя</label>
                  <input
                    name="full_name"
                    type="text"
                    value={form.full_name}
                    onChange={handleChange}
                    placeholder="Ваше имя"
                    className={`w-full px-4 py-2 pl-10 border rounded-md bg-white text-primary focus:outline-none focus:ring text-sm ${
                      errors.full_name ? "border-red-500" : "focus:ring-primary/30"
                    }`}
                  />
                  <span className="absolute left-3 top-[38px] text-muted">
                    <MessageSquare size={16} />
                  </span>
                  {errors.full_name && (
                    <p className="text-red-500 text-xs mt-1">{errors.full_name}</p>
                  )}
                </div>

                {/* Телефон */}
                <div className="relative">
                  <label className="block text-sm font-medium mb-1">Телефон</label>
                  <InputMask
                    mask="+7 (999) 999-99-99"
                    value={form.phone}
                    onChange={handleChange}
                    maskChar="_"
                    name="phone"
                  >
                    {(inputProps) => (
                      <input
                        {...inputProps}
                        type="tel"
                        placeholder="+7 (999) 123-45-67"
                        className={`w-full px-4 py-2 pl-10 border rounded-md bg-white text-primary focus:outline-none focus:ring text-sm ${
                          errors.phone ? "border-red-500" : "focus:ring-primary/30"
                        }`}
                      />
                    )}
                  </InputMask>
                  <span className="absolute left-3 top-[38px] text-muted">
                    <Phone size={16} />
                  </span>
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Сообщение */}
                <div>
                  <label className="block text-sm font-medium mb-1">Сообщение</label>
                  <textarea
                    name="message"
                    rows="5"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Расскажите, что вам нужно — мы предложим решение."
                    className={`w-full px-4 py-3 border rounded-md bg-white text-primary resize-none focus:outline-none focus:ring text-sm ${
                      errors.message ? "border-red-500" : "focus:ring-primary/30"
                    }`}
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center items-center gap-2 bg-primary text-white py-2.5 rounded-md hover:bg-accent transition text-sm font-medium shadow"
                >
                  Отправить заявку <ArrowRight size={16} />
                </button>
              </form>
            ) : (
              <div className="flex items-center justify-center text-center gap-4 bg-green-100 border border-green-300 text-green-800 p-6 rounded-lg shadow-md">
                <CheckCircle size={28} className="text-green-600" />
                <div>
                  <p className="font-semibold text-sm sm:text-base">
                    Заявка отправлена успешно
                  </p>
                  <p className="text-xs sm:text-sm text-green-700">
                    Мы свяжемся с вами в ближайшее время.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Контактная информация */}
          <div className="space-y-6">
            <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-md font-semibold mb-1 flex items-center gap-2">
                <Mail size={16} /> Почта
              </h3>
              <a href="mailto:info@pto-ppr.ru" className="text-blue-600 hover:underline text-sm">
                info@pto-ppr.ru
              </a>
            </div>
            <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-md font-semibold mb-1 flex items-center gap-2">
                <Phone size={16} /> Телефон
              </h3>
              <a href="tel:+79184522769" className="text-blue-600 hover:underline text-sm">
                +7 (918) 452-27-69
              </a>
              <p className="text-muted text-xs mt-1">Работаем по всей России</p>
            </div>
            <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-md font-semibold mb-1 flex items-center gap-2">
                <Clock size={16} /> Режим работы
              </h3>
              <p className="text-muted text-sm">Пн–Сб: 09:00–20:00</p>
              <p className="text-muted text-sm">Вс: выходной</p>
            </div>
          </div>
        </div>

        {/* Карта */}
        <div className="mt-16">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <MapPin size={18} /> Мы на карте
          </h3>
          <div className="w-full h-64 sm:h-72 rounded-md overflow-hidden border shadow-sm">
            <iframe
              title="Яндекс Карта — Москва, Лечебная 5"
              src="https://yandex.ru/map-widget/v1/?um=constructor%3Ab8c3f7b7559c7d932f69ff633a54504a163e24356c7b95df9587aba328f67d3c&amp;source=constructor"
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
