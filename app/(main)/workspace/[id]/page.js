import React from 'react'
import Image from "next/image";
import ChatView from '@/components/custom/ChatView';
import CodeView from '@/components/custom/CodeView';
const page = () => {
  return (
    <div>
      <div className=" p-1 w-auto flex justify-between">
        <Image src="/logo.svg" width={30} height={20} alt="logo" />
      </div>
      <div className="p-5">
        <div className="grid grid-cols-3 md:grid-cols-4 gap-10">
          <ChatView />
          <div className='col-span-3'>
            <CodeView />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page
