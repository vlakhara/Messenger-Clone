"use client";

import Avatar from "@/app/components/Avatar";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC, useCallback, useState } from "react";

interface UserBoxProps {
  user: User;
}

const UserBox: FC<UserBoxProps> = ({ user }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>();

  const handleConversion = useCallback(() => {
    setIsLoading(true);
    axios
      .post("/api/conversations", {
        userId: user.id,
      })
      .then((response) => {
        router.push(`/conversations/${response.data.id}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [user, router]);

  return (
    <div
      className="
        w-full 
        relative 
        flex 
        items-center 
        space-x-3
        bg-white 
        p-3 
        hover:bg-neutral-100
        transition
        cursor-pointer"
      onClick={handleConversion}
    >
      <Avatar key={user.id} user={user} />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBox;
