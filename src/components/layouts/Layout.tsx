import { Outlet } from "react-router";
import { Header } from "./Header";
import useOnlineStatus from "@/lib/hooks/useOnlineStatus";
import InstallPrompt from "../InstallPrompt";
import Offline from "../Offline";

const Layout = () => {
  const isOnline = useOnlineStatus();

  return (
    <div className="flex flex-col items-center justify-center text-center p-5">
      {/* Show Offline component when offline */}
      {!isOnline ? (
        <Offline />
      ) : (
        <>
          <Header />
          <main>
            <Outlet />
          </main>
        </>
      )}
      <InstallPrompt />
    </div>
  );
};

export default Layout;
