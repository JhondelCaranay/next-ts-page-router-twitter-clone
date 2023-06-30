import { useMemo } from "react";
import { BsBellFill, BsHouseFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";

import SideBarLogo from "./SideBarLogo";
import SidebarItem from "./SidebarItem";
import SideBarTweetButton from "./SideBarTweetButton";

type Props = {};
const SideBar = (props: Props) => {
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
      href: `/users/${1}`,
      // auth: true,
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
        />
      );
    });
  }, [items]);

  return (
    <div className="col-span-1 h-full bg-slate-900 pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <SideBarLogo />
          {item}
          <SidebarItem onClick={() => {}} icon={BiLogOut} label="Logout" />
          <SideBarTweetButton />
        </div>
      </div>
    </div>
  );
};
export default SideBar;
