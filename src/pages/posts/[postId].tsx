import Header from "@/components/Header";
import Form from "@/components/forms/Form";
import PostItem from "@/components/posts/PostItem";
import usePost from "@/hooks/swr/usePost";
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";

type Props = {};
const PostView = (props: Props) => {
  const router = useRouter();
  const { postId } = router.query;

  const { data: fetchedPost, isLoading } = usePost(postId as string);

  if (isLoading || !fetchedPost) {
    return (
      <div className="flex h-full items-center justify-center">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <>
      <Header showBackArrow label="Tweet" />
      <PostItem data={fetchedPost} />
      <Form
        postId={postId as string}
        isComment
        placeholder="Tweet your reply"
      />
      {/* <CommentFeed comments={fetchedPost?.comments} /> */}
    </>
  );
};
export default PostView;
