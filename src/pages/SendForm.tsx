import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

type Errors = Partial<Record<"name" | "phone" | "message" | "submit", string>>;

export default function SendForm() {
    const [form, setForm] = useState({ name: "", phone: "", message: "" });
    const [errors, setErrors] = useState<Errors>({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({});
        setSuccess(null);
    };

    const validateClient = (): Errors => {
        const e: Errors = {};
        if (form.name.trim().length < 2) e.name = "Имя минимум 2 символа";
        if (!/^(\+375|80)\d{9}$/.test(form.phone.trim()))
        e.phone = "Телефон должен быть в формате +375XXXXXXXXX или 80XXXXXXXXX";
        if (form.message.trim().length < 2) e.message = "Сообщение минимум 2 символа";
        return e;
    };

    const handleSubmit = async (ev: React.FormEvent) => {
        ev.preventDefault();

        const clientErrors = validateClient();
        if (Object.keys(clientErrors).length > 0) {
        setErrors(clientErrors);
        return;
        }

        setLoading(true);
        setErrors({});
        setSuccess(null);

        try {
        const res = await fetch(`${API_BASE}/api/messages`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
            if (data?.errors && typeof data.errors === "object") {
            setErrors({ ...data.errors, submit: "Исправьте ошибки и попробуйте ещё раз" });
            } else {
            setErrors({ submit: data?.error ?? "Ошибка сервера" });
            }
            return;
        }

        setSuccess("Сообщение успешно отправлено! ✅");
        setForm({ name: "", phone: "", message: "" });
        } catch {
        setErrors({ submit: "Не удалось подключиться к серверу" });
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 p-6">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            📩 Отправить сообщение
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Имя */}
            <div>
                <label className="block text-gray-700 font-medium mb-1" htmlFor="name">
                Имя
                </label>
                <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition ${
                    errors.name
                    ? "border-red-400 focus:ring-red-400"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-300"
                }`}
                placeholder="Введите имя"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Телефон */}
            <div>
                <label className="block text-gray-700 font-medium mb-1" htmlFor="phone">
                Телефон
                </label>
                <input
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition ${
                    errors.phone
                    ? "border-red-400 focus:ring-red-400"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-300"
                }`}
                placeholder="+375291234567"
                />
                <p className="text-gray-500 text-xs mt-1">
                Формат: +375XXXXXXXXX или 80XXXXXXXXX
                </p>
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            {/* Сообщение */}
            <div>
                <label className="block text-gray-700 font-medium mb-1" htmlFor="message">
                Сообщение
                </label>
                <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition ${
                    errors.message
                    ? "border-red-400 focus:ring-red-400"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-300"
                }`}
                rows={4}
                placeholder="Введите сообщение"
                />
                {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
            </div>

            {/* Уведомления */}
            {errors.submit && (
                <div className="bg-red-100 text-red-700 p-3 rounded-lg shadow-sm">
                {errors.submit}
                </div>
            )}
            {success && (
                <div className="bg-green-100 text-green-700 p-3 rounded-lg shadow-sm">
                {success}
                </div>
            )}

            {/* Кнопки */}
            <div className="flex gap-3 mt-4">
                <button
                type="submit"
                disabled={loading}
                className={`flex-1 bg-blue-600 text-white px-5 py-2 rounded-lg text-lg shadow-md transition-transform transform hover:scale-[1.03] ${
                    loading ? "bg-gray-400 cursor-not-allowed" : "hover:bg-blue-700 hover:shadow-lg"
                }`}
                >
                {loading ? "Отправка..." : "Отправить"}
                </button>
                <button
                type="button"
                onClick={() => navigate("/")}
                className="flex-1 bg-gray-200 text-gray-800 px-5 py-2 rounded-lg text-lg hover:bg-gray-300 transition"
                >
                Назад
                </button>
            </div>
            </form>
        </div>
        </div>
    );
}
