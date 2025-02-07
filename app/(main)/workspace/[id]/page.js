import React from "react";
import Image from "next/image";
import ChatView from "@/components/custom/ChatView";
import CodeView from "@/components/custom/CodeView";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <div>
      <div className="p-3 w-auto flex justify-end">
        <div className="flex justify-between space-x-2">
          <Button>Export</Button>
          <Button>Deploy</Button>
        </div>
      </div>

      <div className="p-4" suppressHydrationWarning>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
          <ChatView />
          <div className="col-span-3" suppressHydrationWarning>
            <CodeView suppressHydrationWarning />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
