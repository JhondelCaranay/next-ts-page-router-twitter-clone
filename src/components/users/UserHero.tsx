import useUser from "@/hooks/swr/useUser";
import Image from "next/image";
import Avatar from "../Avatar";

type Props = {
  userId: string;
};

const UserHero = ({ userId }: Props) => {
  const { data: fetchedUser } = useUser(userId);

  return (
    <div>
      <div className="relative h-44 bg-neutral-700">
        {fetchedUser?.coverImage && (
          <Image
            src={fetchedUser.coverImage}
            fill
            alt="Cover Image"
            style={{ objectFit: "cover" }}
          />
        )}
        <div className="absolute -bottom-16 left-4">
          <Avatar userId={userId} isLarge hasBorder />
        </div>
      </div>
    </div>
  );
};
export default UserHero;
