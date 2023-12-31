import useCurrentUser from "@/hooks/swr/useCurrentUser";
import useNotifications from "@/hooks/swr/useNotifications";
import React, { useEffect } from "react";
import { BsTwitter } from "react-icons/bs";

type Props = {};

const NotificationsFeed = (props: Props) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedNotifications = [] } = useNotifications(currentUser?.id);

  useEffect(() => {
    mutateCurrentUser();
  }, [mutateCurrentUser]);

  if (fetchedNotifications.length === 0) {
    return (
      <div className="p-6 text-center text-xl text-neutral-600">
        No notifications
      </div>
    );
  } 

  return (
    <div className="flex flex-col">
      {fetchedNotifications.map((notification: Record<string, any>) => (
        <div
          key={notification.id}
          className="flex flex-row items-center gap-4 border-b-[1px] border-neutral-800 p-6"
        >
          <BsTwitter color="white" size={32} />
          <p className="text-white">{notification.body}</p>
        </div>
      ))}
    </div>
  );
};

export default NotificationsFeed;
