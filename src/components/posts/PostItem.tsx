import useCurrentUser from "@/hooks/swr/useCurrentUser";
import useLoginModal from "@/hooks/zustand/useLoginModal";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import Avatar from "../Avatar";
import useLike from "@/hooks/swr/useLike";

type Props = {
  data: Record<string, any>;
  userId?: string;
};
const PostItem = ({ data, userId }: Props) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { hasLiked, toggleLike } = useLike({ postId: data.id, userId });

  const goToUser = useCallback(
    (ev: any) => {
      ev.stopPropagation();
      router.push(`/users/${data.user.id}`);
    },
    [router, data.user.id]
  );

  const goToPost = useCallback(() => {
    router.push(`/posts/${data.id}`);
  }, [router, data.id]);

  const onLike = useCallback(
    async (ev: any) => {
      ev.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      toggleLike();
    },
    [loginModal, currentUser, toggleLike]
  );

  const LikeIcon = true ? AiFillHeart : AiOutlineHeart;

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt]);

  return (
    <div
      onClick={goToPost}
      className="
        cursor-pointer 
        border-b-[1px] 
        border-neutral-800 
        p-5 
        transition 
        hover:bg-neutral-900
      "
    >
      <div className="flex flex-row items-start gap-3">
        <Avatar userId={data.user.id} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={goToUser}
              className="
                cursor-pointer 
                font-semibold 
                text-white 
                hover:underline
            "
            >
              {data.user.name}
            </p>
            <span
              onClick={goToUser}
              className="
                hidden
                cursor-pointer
                text-neutral-500
                hover:underline
                md:block
            "
            >
              @{data.user.username}
            </span>
            <span className="text-sm text-neutral-500">{createdAt}</span>
          </div>
          {/* tweet */}
          <div className="mt-1 text-white">{data.body}</div>
          <div className="mt-3 flex flex-row items-center gap-10">
            <div
              className="
                flex 
                cursor-pointer 
                flex-row 
                items-center 
                gap-2 
                text-neutral-500 
                transition 
                hover:text-sky-500
            "
            >
              <AiOutlineMessage size={20} />
              <p>{data.comments?.length || 0}</p>
            </div>
            <div
              onClick={onLike}
              className="
                flex 
                cursor-pointer 
                flex-row 
                items-center 
                gap-2 
                text-neutral-500 
                transition 
                hover:text-red-500
            "
            >
              <LikeIcon color={hasLiked ? "red" : ""} size={20} />
              <p>{data.likedIds.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostItem;
