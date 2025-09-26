"use client";
import React from 'react'
import { useParams } from 'next/navigation';
import { skills } from '@/data/skills';
import Link from 'next/link';


export default function HashtagPage() {
    const { tag } = useParams();

    const posts = skills.filter((post) =>
        post.content.toLowerCase().includes(`#${tag}`.toLowerCase())
    );
    return (
        <div className='max-w-3xl mx-auto mt-6 p-4 bg-white shadow-md rounded-xl'>
            <div className='bg-white shadow-md rounded-xl p-4 mb-6'>
                <h1 className='text-2xl font-bold text-purple-600'>#{tag}</h1>
                <p className='text-gray-600 mt-2'>
                    Mostrando publicaciones relacionadas con{" "}
                    <span className='text-purple-500'>#{tag}</span>.
                </p>
            </div>
        
            {posts.length > 0 ? (
                <div className='space-y-4'>
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className='bg-white shadow-sm rounded-xl p-4 border hover:shadow-md transition'
                        >
                            <div className='flex items-center gap-2 mb-2'>
                                <div className='w-10 h-10 bg-gradient-to-tr from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold'>
                                    {post.name.charAt(0)}
                                </div>
                                <div>
                                    <p className='font-semibold text-gray-800'>{post.name}</p>
                                    <p className='text-sm text-gray-500'>@{post.username}</p>
                                </div>
                            </div>
                            <p className='text-gray-700 mb-2'>{post.content}</p>

                            {post.imagePost && (
                                <img 
                                    src={post.imagePost} 
                                    alt="post image"
                                    className='rounded-lg mt-2 max-h-60 object-cover' 
                                />
                            )}

                            <Link
                                href={`/profile/${post.username}`}
                                className='text-blue-500 text-sm hover:underline mt-2 inline block'
                            >
                                Ver perfil →
                            </Link>
                        </div>
                    ))}
                </div>
            )   :   (
                <p className='text-gray-500 text-center'>
                    No hay publicaciones con{" "}
                    <span className='text-purple-500'>#{tag}</span>
                </p>
            )}
        </div>
    )
}
