import Header from "@/components/Header";
import Form from "@/components/forms/Form";
import PostFeed from "@/components/posts/PostFeed";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`min-h-screen  ${inter.className}`}>
      <Header label="Home" />
      <Form placeholder="What's happening?" />
      <PostFeed />
    </main>
  );
}
