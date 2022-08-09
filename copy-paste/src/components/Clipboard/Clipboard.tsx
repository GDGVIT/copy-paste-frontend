import React, { useState, useEffect } from "react";
import { readText } from "@tauri-apps/api/clipboard";
import { invoke } from "@tauri-apps/api/tauri";

export default function Clipboard() {
  const [machineId, setMachineId] = useState("");
  const [clipboardContent, setClipboardContent] = useState("");
  useEffect(() => {
    async function fetchDetails() {
      const rustMachineId: string = await invoke("get_machine_uid");
      const clipboard: string | null = await readText();
      setMachineId(rustMachineId);
      setClipboardContent(clipboard!);
    }

    fetchDetails();
  }, []);
  return (
    <div>
      <h1>Clipboard</h1>
      <h1>{clipboardContent}</h1>
      <h1>{machineId}</h1>
    </div>
  );
}
