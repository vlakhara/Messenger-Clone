"use client";

import { User } from "@prisma/client";
import { FC } from "react";

interface UserBoxProps {
  item: User;
}

const UserBox: FC<UserBoxProps> = ({ item }) => {
  return <div className="">UserBox</div>;
};

export default UserBox;
