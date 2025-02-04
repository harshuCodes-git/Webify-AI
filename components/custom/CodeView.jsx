"use client";

import React, { useState, useEffect } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackFileExplorer,
  SandpackCodeEditor,
  SandpackPreview,
  useSandpack,
} from "@codesandbox/sandpack-react";
import Lookup from "@/data/Lookup";

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
    />
  );
};

const CodeView = () => {
  const [activeTab, setActiveTab] = useState("code");
  const [editorFiles, setEditorFiles] = useState(getInitialFiles);

  // Persist files to localStorage when they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("sandpack-files", JSON.stringify(editorFiles));
    }
  }, [editorFiles]);

  return (
    <div className="w-full">
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
      >
        <SandpackLayout>
          {activeTab === "code" ? (
            <>
              <SandpackFileExplorer style={{ height: "80vh" }} />
              <CodeEditorWithPersistence updateFiles={setEditorFiles} />
            </>
          ) : (
            <SandpackPreview style={{ height: "80vh" }} showNavigator={true} />
          )}
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
};

export default CodeView;
