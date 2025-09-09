"use client"
import ChatModal from "@/components/chatModal/chatModal";
import { skills } from "@/data/skills";
import { useState } from "react";
import { motion } from "framer-motion";


interface Props {
    params: {
        username: string;
    };
}

export default function ProfilePage({ params }: Props) {
    const [openChat, setOpenChat] = useState(false);

    const user = skills.find((u) => u.username === params.username);

    if (!user) {
        return (
            <div className="p-10 text-center">
                <h2 className="text-2xl font-bold text-gray-700">Usuario no encontrado</h2>
            </div>
        );
    }

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-10"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }} 
                className="bg-white shadow-xl rounded-2xl p-6 sm:p-10"
            >
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.2 } },
                    }} 
                    className="flex flex-col sm:flex-row items-center sm:items-start gap-6"
                >
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, x: -20 },
                            visible: { opacity: 1, x: 0 },        
                        }}
                        className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-tr from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-4xl font-bold"
                    >
                        {user.name.charAt(0)}
                    </motion.div>

                    <motion.div
                        variants={{
                            hidden: { opacity: 0, x: 20 },
                            visible: { opacity: 1, x: 0 },
                        }} 
                        className="text-center sm:text-left"
                    >
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                            {user.name}
                        </h1>
                        <p className="text-gray-500">@{user.username}</p>
                        <p className="mt-3 text-gray-600 max-w-lg">
                            Intercambiando conocimientos y aprendiendo nuevas habilidades 🚀
                        </p>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.2 } },
                    }} 
                    className="mt-8 space-y-8"
                >
                    <motion.section
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 },
                        }}
                    >
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
                            Habilidades
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {user.skills.map((skill, i) => (
                                <motion.span
                                    key={i}
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium cursor-default"
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>
                    </motion.section>
                    
                    <motion.section
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        className="border-t pt-6"
                    >
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
                                Lo que ofrece
                            </h2>
                            <ul className="list-disc list-inside space-y-2 text-gray-600">
                                {user.offers.map((offer, i) => (
                                    <li key={i}>{offer}</li>
                                ))}
                            </ul>
                    </motion.section>

                    <motion.section
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 20 },
                        }}
                        className="border-t pt-6"
                    >
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
                            Lo que busca aprender
                        </h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-600">
                            {user.wants.map((want, i) => (
                                <li key={i}>{want}</li>
                            ))}
                        </ul>
                    </motion.section>
                </motion.div>

                <motion.div 
                    whileTap={{ scale: 0.95 }}
                    className="mt-10 flex justify-center"
                >
                    <button 
                        className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium"
                        onClick={() => setOpenChat(true)}
                    >
                        Abrir chat con {user.name}
                    </button>
                </motion.div>
            </motion.div>
            <ChatModal isOpen={openChat} onClose={() => setOpenChat(false)} userName={user.name} />
        </motion.div>
    )
}