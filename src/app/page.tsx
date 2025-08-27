import { skills } from "@/data/skills";
// import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">SkillSwap</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {skills.map((person) => (
          <div key={person.id} className="bg-white shadow rounded-lg p-4">
            {/* <Image
              src={person.image}
              alt={person.name}
              width={400}
              height={300}
              className="rounded-lg"
            /> */}
            <div className="flex flex-col items-center justify-center">

            <div className="w-24 h-24 bg-gradient-to-tr from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {person.name.charAt(0)}
            </div>
            <h2 className="text-xl font-semibold mt-4">{person.name}</h2>
            <p className="text-gray-500">{person.skill}</p>
            </div>
            <p className="mt-2 text-sm text-gray-700">{person.description}</p>
            <div className="flex flex-col items-center justify-center">
            <Link
              href={`/profile/${person.username}`}
              className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full text-center"
            >
              Ver perfil
            </Link>
          </div>
          </div>
        ))}
      </div>
    </main>
  );
}
