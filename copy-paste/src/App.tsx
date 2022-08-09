import { useNavigate } from "react-router-dom";
import { register } from "@tauri-apps/api/globalShortcut";
import { appWindow } from "@tauri-apps/api/window";

import Clipboard from "./components/Clipboard/Clipboard";
import Shell from "./components/Shell/Shell";

import "./App.css";
import { useEffect } from "react";

register("ctrl+shift+c", async () => {
  console.log("ctrl+shift+c");
  await appWindow.show();
  await appWindow.setFocus();
});

function App() {
  return (
    <Shell>
      <Clipboard />
    </Shell>
  );
}

export default App;
