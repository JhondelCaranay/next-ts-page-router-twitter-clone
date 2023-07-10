import useCurrentUser from "@/hooks/swr/useCurrentUser";
import useUser from "@/hooks/swr/useUser";
import { useMemo } from "react";
import { format } from "date-fns";
import Button from "../forms/Button";
import { BiCalendar } from "react-icons/bi";
import useEditModal from "@/hooks/zustand/useEditModal";

type Props = {
  userId: string;
};
const UserBio = ({ userId }: Props) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedUser } = useUser(userId);

  const editModal = useEditModal();

  // const { isFollowing, toggleFollow } = useFollow(userId);

  const createdAt = useMemo(() => {
    if (!fetchedUser?.createdAt) {
      return null;
    }

    return format(new Date(fetchedUser.createdAt), "MMMM yyyy");
  }, [fetchedUser?.createdAt]);

  return (
    <div className="border-b-[1px] border-neutral-800 pb-4">
      <div className="flex justify-end p-2">
        {currentUser?.id === userId ? (
          <Button secondary label="Edit" onClick={editModal.onOpen} />
        ) : (
          <Button
            onClick={() => {}}
            label={true ? "Unfollow" : "Follow"}
            secondary={true}
            outline={false}
          />
        )}
      </div>
      <div className="mt-8 px-4">
        <div className="flex flex-col">
          <p className="text-2xl font-semibold text-white">
            {fetchedUser?.name}
          </p>
          <p className="text-md text-neutral-500">@{fetchedUser?.username}</p>
        </div>
        <div className="mt-4 flex flex-col">
          <p className="text-white">{fetchedUser?.bio}</p>
          <div
            className="
                mt-4 
                flex 
                flex-row 
                items-center 
                gap-2 
                text-neutral-500
            "
          >
            <BiCalendar size={24} />
            <p>Joined {createdAt}</p>
          </div>
        </div>
        <div className="mt-4 flex flex-row items-center gap-6">
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{fetchedUser?.followingIds?.length}</p>
            <p className="text-neutral-500">Following</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{fetchedUser?.followersCount || 0}</p>
            <p className="text-neutral-500">Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserBio;
