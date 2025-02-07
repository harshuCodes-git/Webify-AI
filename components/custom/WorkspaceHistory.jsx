"use client";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import React, { useContext, useEffect, useState } from "react";

const WorkspaceHistory = () => {
  const { userDetails } = useContext(UserDetailsContext);
  const convex = useConvex();
  const [workspaceList, setWorkSpaceList] = useState([]);

  useEffect(() => {
    if (userDetails) {
      getAllWorkspace();
    }
  }, [userDetails]);

  const getAllWorkspace = async () => {
    try {
      const result = await convex.query(api.workspace.GetAllWorkspace, {
        userId: userDetails?._id,
      });

      setWorkSpaceList(result || []); // Default to empty array if result is undefined
      // console.log(result);
    } catch (error) {
      console.error("Error fetching workspaces:", error);
    }
  };

  return (
    <div>
      <h2 className="font-medium text-lg">Your Chats</h2>
      <div className="w-full">
        {workspaceList && workspaceList.length > 0 ? (
          workspaceList.map((messagesList, index) => (
            <h2
              key={index}
              className="text-sm font-light text-gray-400 cursor-pointer hover:text-white  pt-2 w-full"
            >
              {messagesList?.messages[0]?.content || "No Content"}
            </h2>
          ))
        ) : (
          <p>No chats found.</p>
        )}
      </div>
    </div>
  );
};

export default WorkspaceHistory;
