"use client";

import { Message, User } from "@prisma/client";
import { FC } from "react";

interface BodyProps {
  messages: Message[] &
    {
      sender: User;
      seen: User[];
    }[];
}
const Body: FC<BodyProps> = ({ messages }) => {
  return <div className="flex-1 overflow-y-auto">Body</div>;
};

export default Body;
