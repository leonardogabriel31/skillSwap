"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function OnboardingPage() {
    const [username, setUsername] = useState("");
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (username.trim() === "") return alert("Elige un nombre de usuario");
        router.push(`/profile/${username}`);

    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4 text-blue-600">Completa tu perfil</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Nombre del usuario</label>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        placeholder="Ej: leonardo" 
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Guardar
                </button>
            </form>
        </div>
    )
}