"use client"
import { ContextMessage } from '@/context/ContextMessage'
import Lookup from '@/data/Lookup'
import { ArrowRight, Link } from 'lucide-react'
import React, { useContext, useState } from 'react'

const Main = () => {
    const [userInput,setuserInput]=useState()
    const context = useContext(ContextMessage);
    const { messages, setMessages } = context;
  return (
    <div className="flex flex-col mt-20 justify-center items-center  gap-2 ">
      <h2 className="font-bold text-4xl">{Lookup.HERO_HEADING}</h2>
      <p className="font-medium text-gray-400">{Lookup.HERO_DESC}</p>
      <div className="p-5 border rounded-xl w-full max-w-2xl ">
        <div className="flex gap-2">
          <textarea
            name=""
            id=""
            placeholder={Lookup.INPUT_PLACEHOLDER}
            onChange={(event) => {
              setuserInput(event);
            }}
            className="outline-none bg-transparent w-full h-32 max-h-56  overflow-auto"
          ></textarea>
          {userInput && (
            <ArrowRight className="bg-blue-600 p-2  rounded-md cursor-pointer h-8 w-8 " />
          )}
        </div>
        <div>
          <Link className="h-4 w-4" />
        </div>
      </div>
      <div className="flex flex-wrap p-2 max-w-2xl justify-center gap-3">
        {Lookup?.SUGGSTIONS.map((suggestion, index) => (
          <h2  key={index}
          className='px-2 p-1 border rounded-full text-gray-400 text-xs cursor-pointer hover:text-white'>{suggestion}</h2>
        ))}
      </div>
    </div>
  );
}

export default Main
