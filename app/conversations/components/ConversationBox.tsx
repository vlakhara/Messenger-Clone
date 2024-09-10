"use client";

import Avatar from "@/app/components/Avatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import { FullConversationType } from "@/app/types";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC, useCallback, useMemo } from "react";
import { format } from "date-fns";

interface ConversationBoxProps {
  conversation: FullConversationType;
  selected?: boolean;
}

const ConversationBox: FC<ConversationBoxProps> = ({
  conversation,
  selected,
}) => {
  const router = useRouter();
  const otherUser = useOtherUser(conversation);
  const session = useSession();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${conversation.id}`);
  }, [conversation.id, router]);
  const lastMessage = useMemo(() => {
    const messages = conversation.messages || [];
    return messages[messages.length - 1];
  }, [conversation.messages]);

  const userEmail = useMemo(() => {
    return session?.data?.user?.email;
  }, [session?.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) false;
    const seenArr = lastMessage?.seen || [];
    if (!userEmail) false;
    return !!seenArr.filter((user) => user.email === userEmail).length;
  }, [userEmail, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) "sent an image";
    return lastMessage?.body ?? "Start a conversation";
  }, [lastMessage]);

  return (
    <div
      className={clsx(
        "w-full relative flex items-center space-x-3 hover:bg-neutral-100 rounded-lg transition cursor-auto p-3",
        selected ? "bg-neutral-100" : "bg-white"
      )}
      onClick={handleClick}
    >
      <Avatar user={otherUser} />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm font-medium text-gray-900">
              {conversation?.name || otherUser?.name}
            </p>
            {lastMessage?.createdAt && (
              <p className="text-xs font-gray-400 font-light">
                {format(new Date(lastMessage.createdAt), "p")}
              </p>
            )}
          </div>
          <p
            className={clsx(
              "truncate text-sm",
              hasSeen ? "text-gray-500" : "text-black font-medium"
            )}
          >
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
