import FollowBar from "./FollowBar";
import SideBar from "./SideBar";

type Props = {
  children: React.ReactNode;
};
const Layout = ({ children }: Props) => {
  return (
    <div className="h-screen bg-black text-white">
      <div className="container mx-auto h-full max-w-6xl xl:px-32">
        <div className="grid h-full grid-cols-4">
          <SideBar />
          <div className="col-span-3 border-x border-neutral-800 lg:col-span-2">
            {children}
          </div>
          <FollowBar />
        </div>
      </div>
    </div>
  );
};
export default Layout;
