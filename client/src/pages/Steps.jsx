import { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  PhoneCall,
  FileText,
  ClipboardCheck,
  ShieldCheck,
  UserCheck,
  Send,
} from "lucide-react";

export default function Steps() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const steps = [
    {
      title: "Заявка и консультация",
      description: "Оставляете заявку на сайте или по телефону. Уточняем задачу и сроки.",
      icon: PhoneCall,
    },
    {
      title: "Сбор исходных данных",
      description: "Присылаете ТЗ, чертежи, геодезию. Помогаем, если чего-то не хватает.",
      icon: FileText,
    },
    {
      title: "Разработка документации",
      description: "Создаём ППР, ПОД, ПЗР и сметы. Учитываем СП, ГОСТ и ваши пожелания.",
      icon: ClipboardCheck,
    },
    {
      title: "Внутренняя проверка",
      description: "Проверяем читаемость, соответствие нормам и качеству оформления.",
      icon: ShieldCheck,
    },
    {
      title: "Согласование с заказчиком",
      description: "Вы получаете макет. Вносим правки, уточняем детали, подписываем.",
      icon: UserCheck,
    },
    {
      title: "Передача итогового пакета",
      description: "Передаём документы в нужных форматах. Готово к сдаче и применению.",
      icon: Send,
    },
  ];

  return (
    <section className="bg-white py-20 px-4 text-gray-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Этапы работы</h2>
        <p className="text-center text-gray-500 max-w-2xl mx-auto mb-12 text-base">
          Сопровождаем проект от первого звонка до финальной сдачи документации.
        </p>

        <div className="space-y-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              className="flex items-start gap-4"
            >
              {/* Иконка */}
              <div className="w-12 h-12 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center shadow">
                <step.icon className="w-5 h-5 text-gray-700" />
              </div>

              {/* Контент */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all w-full">
                <h3 className="text-base font-semibold mb-1">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA кнопка */}
        <div className="text-center mt-16">
          <Link
            to="/contacts"
            className="inline-flex items-center gap-2 bg-gray-800 text-white font-semibold px-6 py-3 rounded-full hover:bg-gray-700 transition"
          >
            Обсудить проект →
          </Link>
        </div>
      </div>
    </section>
  );
}
