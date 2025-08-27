"use client"
import { skills } from "@/data/skills";
import Link from "next/link";
import { useState } from "react";

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
        <h1 className="text-4xl font-extrabold text-blue-700 mb-4">
          Explora y conecta con talento 🚀
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Descubre personas con habilidades unicas y encuentra tu compañero
          ideal para intercambiar conocimientos.
        </p>
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

        {/* <h2 className="text-3xl font-bold text-blue-600 mb-6">
          Usuarios disponibles
        </h2> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <div
              key={user.username}
              className="border rounded-2xl shadow-md p-6 hover:shadow-lg transition bg-white flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold text-xl">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {user.name}
                  </h2>
                  <span className="text-sm text-gray-500">
                    @{user.username}
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {user.description}
              </p>

              <div className="mb-3">
                <p className="font-medium text-gray-700 mb-1">
                  Habilidades:
                </p>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                href={`/profile/${user.username}`}
                className="mt-4 inline-block text-sm text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full text-center"
              >
                Ver perfil →
              </Link>
            </div>
          ))}

          {filteredUsers.length === 0 && (
            <p className="text-gray-500 col-span-full text-center">
              No se encontraron usuarios con esos filtros 😥
            </p>
          )}
        </div>
      </div>
      {/* <h1 className="text-3xl font-bold text-blue-600 mb-4">Explorar usuarios</h1>
            <ul className="space-y-4">
                {skills.map((user) => (
                    <li key={user.username} className="bg-white shadow p-4 rounded-lg">
                        <h2 className="font-semibold">{user.name}</h2>
                        <p className="text-gray-600">@{user.username}</p>
                        <p className="text-sm text-gray-500">Skills: {user.skills.join(", ")}</p>
                        <p className="mt-2">
                            <strong>Skills:</strong> {user.skills.join(", ")}
                        </p>
                        <Link
                            href={`/profile/${user.username}`}
                            className="text-blue-500 mt-2 inline-block hover:underline"
                        >
                            Ver perfil
                        </Link>
                    </li>
                ))}
            </ul>
 */}
    </div>
  );
}
