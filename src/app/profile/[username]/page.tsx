"use client"
import ChatModal from "@/components/chatModal/chatModal";
import { skills } from "@/data/skills";
// import { notFound } from "next/navigation";
import { useState } from "react";


interface Props {
    params: {
        username: string;
    };
}

export default function ProfilePage({ params }: Props) {
    const [openChat, setOpenChat] = useState(false);

    const user = skills.find((u) => u.username === params.username);

    if (!user) {
        // notFound();
        return (
            <div className="p-10 text-center">
                <h2 className="text-2xl font-bold text-gray-700">Usuario no encontrado</h2>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="bg-white shadow-lg rounded-2xl p-8">
                <div className="flex items-center gap-6">
                    <div className="w-24 h-24 bg-gradient-to-tr from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                        {user.name.charAt(0)}
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
                        <p className="text-gray-500">@{user.username}</p>
                        <p className="mt-2 text-gray-600">
                            Intercambiando conocimientos y aprendiendo nuevas habilidades 🚀
                        </p>
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">Habilidades</h2>
                    <div className="flex flex-wrap gap-3">
                        {user.skills.map((skill, i) => (
                            <span
                                key={i}
                                className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">Lo que ofrece</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                        {user.offers.map((offer, i) => (
                            <li key={i}>{offer}</li>
                        ))}
                    </ul>
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">Lo que busca aprender</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                        {user.wants.map((want, i) => (
                            <li key={i}>{want}</li>
                        ))}
                    </ul>
                </div>

                <div className="mt-8">
                    <button 
                        className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                        onClick={() => setOpenChat(true)}
                    >
                        Abrir chat con {user.name}
                    </button>
                    <ChatModal isOpen={openChat} onClose={() => setOpenChat(false)} userName={user.name} />
                </div>
            </div>
        </div>
    )
}