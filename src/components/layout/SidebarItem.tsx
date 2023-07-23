import useCurrentUser from "@/hooks/swr/useCurrentUser";
import useLoginModal from "@/hooks/zustand/useLoginModal";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { BsDot } from "react-icons/bs";
import { IconType } from "react-icons/lib";

type Props = {
  label: string;
  icon: IconType;
  href?: string;
  onClick?: () => void;
  auth?: boolean;
  alert?: boolean;
};
const SidebarItem = ({
  label,
  icon: Icon,
  href,
  auth,
  onClick,
  alert,
}: Props) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();

  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick();
    }

    if (auth && !currentUser) {
      loginModal.onOpen();
    } else if (href) {
      router.push(href);
    }
  }, [router, href, auth, loginModal, onClick, currentUser]);

  return (
    <div onClick={handleClick} className="flex items-center">
      <div className="relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-full p-4 hover:bg-slate-300 hover:bg-opacity-10 lg:hidden">
        <Icon size={28} color="white" />
        {alert ? (
          <BsDot className="absolute -top-4 left-0 text-sky-500" size={70} />
        ) : null}
      </div>
      <div className="relative hidden cursor-pointer items-center justify-center gap-4 rounded-full p-4 hover:bg-slate-300 hover:bg-opacity-10 lg:flex">
        <Icon size={24} color="white" />
        <p className="hidden text-xl text-white lg:block">{label}</p>
        {alert ? (
          <BsDot className="absolute -top-4 left-0 text-sky-500" size={70} />
        ) : null}
      </div>
    </div>
  );
};
export default SidebarItem;
