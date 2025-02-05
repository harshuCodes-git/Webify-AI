import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Button } from "../ui/button";
import { MessageCircleCodeIcon } from "lucide-react";
import WorkspaceHistory from "./WorkspaceHistory";
import SideBarFooter from "./SideBarFooter";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <Image 
      src={'/layers.png'}
      alt="logo"
      width={30}
      height={20}/>
      <SidebarContent className="p-5" >
        <Button className=""> <MessageCircleCodeIcon className=""/> Start new Chat</Button>
        <SidebarGroup>
          <WorkspaceHistory/>
        </SidebarGroup>
        {/* <SidebarGroup /> */}
      </SidebarContent>
      <SidebarFooter >
        <SideBarFooter/>
      </SidebarFooter>
    </Sidebar>
  );
}
