import React from 'react'
import Image from "next/image";
import ChatView from '@/components/custom/ChatView';
import CodeView from '@/components/custom/CodeView';
const page = () => {
  return (
    <div>
      <div className=" p-2 w-auto flex justify-between">
        <Image src="/logo.svg" width={30} height={20} alt="logo" />
      </div>
      <div className="p-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <ChatView />
          <div className='col-span-2'>
            <CodeView />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page
