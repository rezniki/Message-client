import { useNavigate } from "react-router-dom";

export default function Welcome() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
        <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-lg text-center transition hover:shadow-xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Привет! 👋</h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
            Добро пожаловать в наше приложение! Здесь ты можешь быстро и удобно отправить сообщение.
            </p>
            <button
            onClick={() => navigate("/send")}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium shadow-md hover:bg-blue-700 hover:shadow-lg transition-transform transform hover:scale-[1.03] active:scale-[0.97]"
            >
            Далее →
            </button>
        </div>
        </div>
    );
}
