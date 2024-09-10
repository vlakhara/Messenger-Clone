import getConversations from "../actions/getConversations";
import SideBar from "../components/sidebar/Sidebar";
import ConversationList from "./components/ConversionList";

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();

  return (
    <SideBar>
      <div className="h-full">
        <ConversationList conversations={conversations} />
        {children}
      </div>
    </SideBar>
  );
}
