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

  const deleteNode = (nodeId) => {
    const deleteNodeFromData = (explorer, nodeId) => {
      let latestNode = explorer.items.map((obj) => {
        if(obj.items.length === 0) {return obj}
        return deleteNodeFromData(obj, nodeId)
      }).filter((obj)=> obj.id===nodeId?false:true)
      return {...explorer,items:latestNode}
    };
    let updatedExplorer = deleteNodeFromData(explorerData,nodeId);
    setExplorerData(updatedExplorer);
  };

  return (
    <div className="App">
      <Folder insertNode={insertNode} deleteNode={deleteNode} explorer={explorerData}></Folder>
    </div>
  );
}
