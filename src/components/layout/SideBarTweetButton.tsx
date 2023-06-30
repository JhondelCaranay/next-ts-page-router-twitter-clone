import { useRouter } from "next/router";
import { FaFeather } from "react-icons/fa";

type Props = {};
const SideBarTweetButton = (props: Props) => {
  const router = useRouter();
  return (
    <div onClick={() => router.push("/")}>
      <div className="mt-6 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-sky-500 p-4 transition hover:bg-opacity-80 lg:hidden">
        <FaFeather size={24} color="white" />
      </div>
      <div
        className="mt-6
        hidden 
        cursor-pointer 
        gap-4
        rounded-full    
        bg-sky-500
        px-4
        py-2 
        hover:bg-opacity-90 lg:block"
      >
        <p
          className="
            hidden 
            text-center 
            text-[20px]
            font-semibold
            text-white 
            lg:block
        "
        >
          Tweet
        </p>
      </div>
    </div>
  );
};
export default SideBarTweetButton;
