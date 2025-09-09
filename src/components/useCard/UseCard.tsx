"use client";
// import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"


interface User {
    id: number;
    name: string;
    username: string;
    description: string;
    skills: string[];
    offers: string[];
    wants: string[];
    image: string;
}

export default function UserCard({ user }: { user: User }) {
    const [activeTab, setActiveTab] = useState<"offers" | "wants">("offers");

    return (
        <motion.div 
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20}}
            className="border rounded-2xl shadow-md p-6 hover:shadow-xl bg-white flex flex-col"
        >
            <div className="flex items-center gap-3 mb-4">
                {/* {user.image ? (
                    <Image
                        src={user.image}
                        alt={user.name}
                        width={56}
                        height={56}
                        className="w-14 h-14 rounded-full object-cover"
                    />
                ):( */}
                    <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold text-xl">
                        {user.name.charAt(0)}
                    </div>
                {/* )} */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">{user.name}</h2>
                    <span className="text-sm text-gray-500">@{user.username}</span>
                </div>
            </div>

            <p className="text-sm text-gray-600 mb-4 line-clamp-3">{user.description}</p>

            <div className="mb-3">
                <p className="font-medium text-gray-700 mb-1">Habilidades:</p>
                <div className="flex flex-wrap gap-2">
                    {user.skills.map((skill, i) => (
                        <motion.span
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            key={i}
                            className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded-full cursor-defaul"
                        >
                            {skill}
                        </motion.span>
                    ))}
                </div>
            </div>

            <div className="mt-3">
                <div className="flex gap-4 border-b mb-2">
                    <button
                        onClick={() => setActiveTab("offers")}
                        className={`pb-1 transition-colors ${
                            activeTab === "offers"
                                ? "border-b-2 border-blue-600 text-blue-600 font-medium"
                                : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        Ofrece
                    </button>

                    <button
                        onClick={() => setActiveTab("wants")}
                        aria-pressed={activeTab === "wants"}
                        className={`pb-1 transition-colors ${
                            activeTab === "wants"
                                ? "border-b-2 border-blue-600 text-blue-600 font-medium"
                                : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        Busca
                    </button>
                </div>

                <div className="relative min-h-[60px]">
                    <AnimatePresence mode="wait">
                        <motion.ul 
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0}}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="text-sm text-gray-700 space-y-1 absolute w-full"
                        >
                            {(activeTab === "offers" ? user.offers : user.wants)
                                .slice(0, 3)
                                .map((item, i) => (
                                    <li 
                                    key={i} 
                                    className="list-disc ml-4 truncate"
                                    title={item}
                                    >
                                    {item}
                                </li> 
                            ))}
                        </motion.ul>
                    </AnimatePresence>
                </div>

            </div>
            <motion.div whileTap={{ scale: 0.95 }}>
                <Link
                    href={`/profile/${user.username}`}
                    className="mt-4 inline-block text-sm text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full text-center"
                >
                    Ver perfil →
                </Link>
            </motion.div>
        </motion.div>
    );
}