interface Reaction {
    likes: number;
    hearts: number;
}

interface Comment {
    id: number;
    author: string;
    text: string;
}

export interface Post {
    id: number;
    name: string;
    username: string;
    skill: string;
    skills: string[];
    description: string;
    image: string;
    offers: string[];
    wants: string[];
    content: string;
    reactions: Reaction;
    comments: Comment[];
    userReaction: "likes" | "hearts" | null;
    createAt: string;
    imagePost?: string | null;
}