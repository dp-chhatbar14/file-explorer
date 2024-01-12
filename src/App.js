import { useState } from "react";
import "./styles.css";
import explorer from "./data/folderData";
import Folder from "./components/Folder";

export default function App() {
  const [explorerData, setExplorerData] = useState(explorer);

  const insertNode = (folderId, name, isFolder) => {
    const insertNodeToData = (explorer, folderId, name, isFolder) => {
      console.log(explorer);
      if (explorer.id === folderId) {
        explorer.items.unshift({
          id: new Date().getTime(),
          name: name,
          isFolder,
          items: [],
        });
        return explorer;
      }
      let latestNode = [];
      latestNode = explorer.items.map((obj) => {
        return insertNodeToData(obj, folderId, name, isFolder);
      });
      console.log(latestNode);
      return { ...explorer, items: latestNode };
    };
    let updatedExplorer = insertNodeToData(
      explorerData,
      folderId,
      name,
      isFolder
    );
    setExplorerData(updatedExplorer);
  };

  return (
    <div className="App">
      <Folder insertNode={insertNode} explorer={explorerData}></Folder>
    </div>
  );
}
