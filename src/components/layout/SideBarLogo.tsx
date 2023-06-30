import { useRouter } from "next/router";
import { BsTwitter } from "react-icons/bs";

type Props = {};
const SideBarLogo = (props: Props) => {
  const router = useRouter();
  return (
    <div
      className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full p-4 transition hover:bg-blue-300 hover:bg-opacity-10"
      onClick={() => router.push("/")}
    >
      <BsTwitter size={28} color="white" />
    </div>
  );
};
export default SideBarLogo;
