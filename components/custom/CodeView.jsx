"use client";

import React, { useState, useEffect, useContext, lazy } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackFileExplorer,
  SandpackCodeEditor,
  SandpackPreview,
  useSandpack,
} from "@codesandbox/sandpack-react";
import Lookup from "@/data/Lookup";
import axios from "axios";
import Prompt from "@/data/Prompt";
import { ContextMessage } from "@/context/ContextMessage";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Loader2Icon } from "lucide-react";

// Load from localStorage or fallback to initial files from Lookup
const getInitialFiles = () => {
  if (typeof window !== "undefined") {
    const savedFiles = localStorage.getItem("sandpack-files");
    return savedFiles ? JSON.parse(savedFiles) : Lookup?.DEFAULT_FILE;
  }
  return Lookup?.DEFAULT_FILE;
};

const CodeEditorWithPersistence = ({ updateFiles }) => {
  const { sandpack } = useSandpack();
  const activeFile = sandpack.activeFile;

  const handleChange = (newCode) => {
    updateFiles((prevFiles) => ({
      ...prevFiles,
      [activeFile]: { code: newCode },
    }));
  };

  useEffect(() => {
    const saveOnUnload = () => {
      updateFiles((prevFiles) => ({
        ...prevFiles,
        [activeFile]: { code: sandpack.files[activeFile]?.code },
      }));
    };

    // Save code when navigating away or reloading the page
    window.addEventListener("beforeunload", saveOnUnload);

    return () => {
      window.removeEventListener("beforeunload", saveOnUnload);
    };
  }, [activeFile, sandpack.files, updateFiles]);

  return (
    <SandpackCodeEditor
      style={{ height: "80vh" }}
      showRunButton={true}
      onChange={handleChange}
      showTabs={false}
      showLineNumbers={true}
      showInlineErrors={true}
      wrapContent={false}
      closableTabs={true}
      initMode={lazy}
    />
  );
};

const CodeView = () => {
  const [activeTab, setActiveTab] = useState("code");
  const [editorFiles, setEditorFiles] = useState(getInitialFiles);
  const { messages, setMessages } = useContext(ContextMessage);
  const UpdateFile = useMutation(api.workspace.UpdateFile);
  const { id } = useParams();
  const convex = useConvex();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    id && GetFiles();
  }, [id]);

  const GetFiles = async () => {
    setLoading(true);
    const result = await convex.query(api.workspace.GetWorkspace, {
      worksSpaceID: id,
    });

    const mergedFile = { ...Lookup.DEFAULT_FILE, ...result?.file };
    setEditorFiles(mergedFile);
    setLoading(false);
  };

  // Persist files to localStorage when they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("sandpack-files", JSON.stringify(editorFiles));
    }
  }, [editorFiles]);

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages?.length - 1].role;
      if (role == "user") {
        onAICodeGenerate();
      }
    }
  }, [messages]);

  const onAICodeGenerate = async () => {
    setLoading(true);
    const PROMPT = JSON.stringify(messages) + " " + Prompt.CODE_GEN_PROMPT;
    const result = await axios.post("/api/gen-ai-code", {
      prompt: PROMPT,
    });

    console.log(result.data);
    const aiResponse = result.data;

    const mergedFile = { ...Lookup.DEFAULT_FILE, ...aiResponse?.files };
    setEditorFiles(mergedFile);
    await UpdateFile({
      worksSpaceID: id,
      files: aiResponse?.files,
    });
    setLoading(false);
  };

  return (
    <div className="relative">
      <div className="bg-[#181818] w-full p-2 border rounded-lg">
        <div className="flex flex-wrap items-center shrink-0 bg-black p-2 w-[144px] gap-3 justify-center rounded-full">
          <h2
            onClick={() => setActiveTab("code")}
            className={`text-sm cursor-pointer ${
              activeTab === "code" &&
              "text-blue-500 bg-blue-500 bg-opacity-25 p-1 px-2 rounded-full"
            }`}
          >
            Code
          </h2>
          <h2
            onClick={() => setActiveTab("preview")}
            className={`text-sm cursor-pointer ${
              activeTab === "preview" &&
              "text-blue-500 bg-blue-500 bg-opacity-25 p-1 px-2 rounded-full"
            }`}
          >
            Preview
          </h2>
        </div>
      </div>

      <SandpackProvider
        template="react"
        theme="dark"
        files={editorFiles}
        customSetup={{
          dependencies: {
            ...Lookup.DEPENDANCY,
          },
        }}
        options={{
          externalResources: ["https://unpkg.com/@tailwindcss/browser@4"],
        }}
        suppressHydrationWarning
      >
        <SandpackLayout>
          {activeTab === "code" ? (
            <>
              <SandpackFileExplorer
                style={{
                  height: "80vh",
                  overflowY: "scroll",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              />
              <CodeEditorWithPersistence updateFiles={setEditorFiles} />
            </>
          ) : (
            <SandpackPreview
              style={{
                height: "80vh",
                overflowX: "scroll",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
              showNavigator={true}
            />
          )}
        </SandpackLayout>
      </SandpackProvider>

      {loading && (
        <div className="p-10 bg-gray-900 opacity-85 absolute top-0 rounded-lg w-full h-full flex items-center justify-center">
          <Loader2Icon className="animate-spin h-10 w-10 text-white" />
          <h2 className="text-white">Generating Files...</h2>
        </div>
      )}
    </div>
  );
};

export default CodeView;
