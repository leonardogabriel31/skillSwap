"use client"
import UserCard from "@/components/useCard/UseCard";
import { skills } from "@/data/skills";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ExplorePage() {
  const [search, setSearch] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");

  const allSkills = Array.from(new Set(skills.flatMap((u) => u.skills)));

  const filteredUsers = skills.filter((user) => {    
    const matchesSearch =
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.username.toLowerCase().includes(search.toLowerCase());
    
    const matchesSkill = selectedSkill
    ? user.skills.includes(selectedSkill)
    : true;

    return matchesSearch && matchesSkill;
  });

  return (
    <div>
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 py-16 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }} 
          className="text-4xl font-extrabold text-blue-700 mb-4"
        >
          Explora y conecta con talento 🚀
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="text-lg text-gray-700 max-w-2xl mx-auto"
        >
          Descubre personas con habilidades unicas y encuentra tu compañero
          ideal para intercambiar conocimientos.
        </motion.p>
      </div>

      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <input 
            type="text" 
            placeholder="Buscar por nombre o usuario..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 border rounded-xl focus:outline-none focus:ring-blue-500"
          />

          <select 
            value={selectedSkill} 
            onChange={(e) => setSelectedSkill(e.target.value)}
            className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-blue-500"
          >
            <option value="">Todas las habilidades</option>
            {allSkills.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        </div>

        <p className="text-gray-600 mb-4">
          Mostrando <span className="font-bold">{filteredUsers.length}</span>{" "}
          usuarios
        </p>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          {filteredUsers.map((user) => (
            <motion.div
              key={user.username}
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1},
              }}
              transition={{ duration: 0.5, ease: "easeOut"}}
            >
              <UserCard user={user} />
            </motion.div>
          ))}

          {filteredUsers.length === 0 && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-gray-500 col-span-full text-center"
            >
              No se encontraron usuarios con esos filtros 😥
            </motion.p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
