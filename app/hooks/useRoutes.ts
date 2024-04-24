import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { use, useMemo } from "react";
import { HiChat } from "react-icons/hi";
import { HiArrowLeftOnRectangle, HiUsers } from "react-icons/hi2";
import useConversation from "./useConversation";
import { IconType } from "react-icons";

interface ROUTES {
  label: string;
  href: string;
  icon: IconType;
  onClick?: () => {};
  active?: boolean;
}

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId, isOpen } = useConversation();

  const routes: ROUTES[] = useMemo(
    () => [
      {
        label: "Chat",
        href: "/conversations",
        icon: HiChat,
        active: pathname === "/conversations" || isOpen,
      },
      {
        label: "Users",
        href: "/users",
        icon: HiUsers,
        active: pathname === "/users",
      },
      {
        label: "Logout",
        href: "#",
        onClick: () => signOut(),
        icon: HiArrowLeftOnRectangle,
      },
    ],

    [pathname, conversationId, isOpen]
  );

  return routes;
};

export default useRoutes;
