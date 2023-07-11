import useCurrentUser from "@/hooks/swr/useCurrentUser";
import usePost from "@/hooks/swr/usePost";
import usePosts from "@/hooks/swr/usePosts";
import useLoginModal from "@/hooks/zustand/useLoginModal";
import useRegisternModal from "@/hooks/zustand/useRegisterModal";
import axios from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import Button from "./Button";
import Avatar from "../Avatar";

type Props = {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
};
const Form = ({ placeholder, isComment, postId }: Props) => {
  const registerModal = useRegisternModal();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();
  const { mutate: mutatePost } = usePost(postId as string);

  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      const url = isComment ? `/api/comments?postId=${postId}` : "/api/posts";

      await axios.post(url, { body });

      toast.success("Tweet created");
      setBody("");
      mutatePosts();
      mutatePost();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [body, mutatePosts, isComment, postId, mutatePost]);

  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      {currentUser ? (
        <div className="flex flex-row gap-4">
          <div>
            <Avatar userId={currentUser?.id} />
          </div>
          <div className="w-full">
            <textarea
              disabled={isLoading}
              onChange={(event) => setBody(event.target.value)}
              value={body}
              className="
                peer
                mt-3
                w-full 
                resize-none 
                bg-black 
                text-[20px] 
                text-white 
                placeholder-neutral-500 
                outline-none 
                ring-0 
                disabled:opacity-80
              "
              placeholder={placeholder}
            ></textarea>
            <hr
              className="
                h-[1px] 
                w-full 
                border-neutral-800 
                opacity-0 
                transition 
                peer-focus:opacity-100"
            />
            <div className="mt-4 flex flex-row justify-end">
              <Button
                disabled={isLoading || !body}
                onClick={onSubmit}
                label="Tweet"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h1 className="mb-4 text-center text-2xl font-bold text-white">
            Welcome to Twitter
          </h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button label="Login" onClick={loginModal.onOpen} />
            <Button label="Register" onClick={registerModal.onOpen} secondary />
          </div>
        </div>
      )}
    </div>
  );
};
export default Form;
