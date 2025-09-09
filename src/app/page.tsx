"use client"
import { skills as initialSkills, skills } from "@/data/skills";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { X, Heart, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { Post } from "@/types/post"
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale"


const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, y: -30, transition: { duration: 0.3, ease: "easeIn"} }
}

const newPostVariant: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "backOut" } },
}

const titleVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut"} },
}


const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.8, y: 20, transition: { duration: 0.25 } },
}

export default function Home() {
  const [showModal, setShowModal] = useState(true);
  const [posts, setPosts] = useState<Post[]>(initialSkills);
  const [commentTexts, setCommentTexts] = useState<{ [key: number]: string }>({})
  const [newPostText, setNewPostText] = useState("")

  const handleAddPost = () => {
    if (!newPostText.trim()) return;

    const newPost = {
      id: posts.length + 1,
      name: "Tú",
      username: "yo",
      skill: "Frontend Developer",
      skills: [],
      description: "",
      image: "/images/default.jpg",
      offers: [],
      wants: [],
      content: newPostText,
      reactions: { likes: 0, hearts: 0 },
      comments: [],
      userReaction: null,
      createAt: new Date().toISOString(),
    };

    setPosts([newPost, ...posts]);
    setNewPostText("");
  }

  const handleReaction = (id: number, type: "likes" | "hearts") => {
    setPosts((prev) => 
      prev.map((post) => {
        if (post.id === id) {
          if(post.userReaction === type) {
            return {
              ...post,
              reactions: {
                ...post.reactions,
                [type]: post.reactions[type] -1,
              },
              userReaction: null,
            };
          }

          if (post.userReaction) {
            return {
              ...post,
              reactions: {
                ...post.reactions,
                [post.userReaction]: post.reactions[post.userReaction] -1,
                [type]: post.reactions[type] +1,
              },
              userReaction: type,
            };
          }

          return {
            ...post,
            reactions: {
              ...post.reactions,
              [type]: post.reactions[type] +1,
            },
            userReaction: type,
          };
        }

        return post;
      })
    );
  };

  const handleComment = (id: number, text: string) => {
    if (!text.trim()) return;
    setPosts((prev) =>
      prev.map((post) => 
        post.id === id
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: post.comments.length + 1,
                  author: "Tú",
                  text,
                },
              ],
            }
        : post
      )
    );
  };

  return (
    <main className="px-4 sm:px-6 lg:px-12 py-8 flex flex-col items-center gap-6">
      <motion.h1 
        className="text-3xl sm:text-4xl font-bold mb-8 text-center"
        variants={titleVariants}
        initial="hidden"
        animate="visible"
      >
        SkillSwap
      </motion.h1>

      <div className="w-full max-w-3xl flex flex-col gap-2 mb-6">
        <textarea 
          value={newPostText}
          onChange={(e) => setNewPostText(e.target.value)}
          placeholder="Qué estás haciendo??"
          className="border rounded-lg p-3 w-full text-sm"
        />
        <button
          onClick={handleAddPost}
          className="self-end bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Publicar
        </button>
      </div>

      <div className="flex flex-col items-center gap-6 w-full">
        {posts
          .slice()
          .sort((a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime())
          .map((person) => (
            <motion.div 
              key={person.id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white shadow-md rounded-2xl p-6 w-full max-w-3xl hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold">
                  {person.name.charAt(0)}
                </div>
                <div>
                  <h2 className="font-semibold text-gray-800">{person.name}</h2>
                  <p className="text-gray-500 text-sm">{person.skill}</p>
                  <p className="text-gray-400 text-xs">
                    {formatDistanceToNow(new Date(person.createAt), {addSuffix: true, locale: es })}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {person.skills.map((s, idx) => (
                  <span 
                    key={idx}
                    className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs"
                  >
                    #{s}
                  </span>
                ))}
              </div>

              <p className="text-gray-700 text-sm sm:text-base mb-4">
                {person.content}
              </p>

              <div className="flex items-center gap-6 mt-2">
                <button 
                  onClick={() => handleReaction(person.id, "likes")}
                  className={`flex items-center gap-1 transition ${
                    person.userReaction === "likes"
                      ? "text-blue-500"
                      : "text-gray-600 hover:text-blue-500"
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>{person.reactions.likes}</span>
                </button>

                <button 
                  onClick={() => handleReaction(person.id, "hearts")}
                  className={`flex items-center gap-1 transition ${
                    person.userReaction === "hearts"
                      ? "text-red-500"
                      : "text-gray-600 hover:text-red-500"
                  }`}
                >
                  <Heart className="w-4 h-4" />
                  <span>{person.reactions.hearts}</span>
                </button>
              </div>

              <div className="mt-4">
                {person.comments.map((comment) => (
                  <div key={comment.id} className="text-sm text-gray-700 mb-2">
                    <span className="font-semibold">{comment.author}: </span>
                    {comment.text}
                  </div>
                ))}

                <div className="mt-2 flex items-center gap-2">
                  <input 
                    type="text" 
                    placeholder="Escribe un comentario..."
                    value={commentTexts[person.id] || ""}
                    onChange={(e) => setCommentTexts({ ...commentTexts, [person.id]: e.target.value })}
                    className="flex-1 border rounded-lg px-3 py-1 text-sm"
                  />
                  <button 
                    onClick={() => {
                      handleComment(person.id, commentTexts[person.id] || "");
                      setCommentTexts({ ...commentTexts, [person.id]: "" });
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600"
                  >
                    Comentar
                  </button>
                </div>
              </div>

              {/* <div className="mt-4"> */}
                <Link
                  href={`/profile/${person.username}`}
                  className="mt-4 block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-center text-sm sm:text-base"
                >
                  Ver perfil
                </Link>
              {/* </div> */}
            </motion.div>
          
        ))}
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative bg-white rounded-2xl shadow-lg w-full max-w-md p-6"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 transition"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>

              <h2 className="text-xl font-semibold mb-3">Bienvenido a SkillSwap!! 🚀</h2>
              <p className="text-gray-700">
                Explora usuarios, descubre habilidades y conecta con talento.
                Puedes hacer clic en "Ver perfil" para conocer mas sobre cada persona.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
