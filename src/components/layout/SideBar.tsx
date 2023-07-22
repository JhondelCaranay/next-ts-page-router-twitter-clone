import { useMemo } from "react";
import { BsBellFill, BsHouseFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";

import SideBarLogo from "./SideBarLogo";
import SidebarItem from "./SidebarItem";
import SideBarTweetButton from "./SideBarTweetButton";
import useCurrentUser from "@/hooks/swr/useCurrentUser";
import { signOut } from "next-auth/react";

type Props = {};
const SideBar = (props: Props) => {
  const { data: currentUser } = useCurrentUser();

  const items = [
    {
      icon: BsHouseFill,
      label: "Home",
      href: "/",
    },
    {
      icon: BsBellFill,
      label: "Notifications",
      href: "/notifications",
      auth: true,
    },
    {
      icon: FaUser,
      label: "Profile",
      href: `/users/${currentUser?.id}`,
      auth: true,
    },
  ];

  const item = useMemo(() => {
    return items.map((item) => {
      return (
        <SidebarItem
          key={item.label}
          href={item.href}
          label={item.label}
          icon={item.icon}
          auth={item.auth}
        />
      );
    });
  }, [items]);

  return (
    <div className="h-ful col-span-1 pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <SideBarLogo />
          {item}
          {currentUser && (
            <SidebarItem
              onClick={() => signOut()}
              icon={BiLogOut}
              label="Logout"
            />
          )}
          <SideBarTweetButton />
        </div>
      </div>
    </div>
  );
};
export default SideBar;
