import { useState } from "react";

function Folder({ insertNode, deleteNode, explorer }) {
  const [expand, setExpand] = useState(false);
  const [inputExpand, setInputExpand] = useState({
    visible: false,
    isFolder: null,
  });
  
  const handleCreateFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setInputExpand({ visible: true, isFolder });
  };

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      setInputExpand({ ...inputExpand, visible: false });
      insertNode(explorer.id,e.target.value,inputExpand.isFolder);
    }
  };

  if (explorer.isFolder) {
    return (
      <div style={{ marginTop: 5 }}>
        <div
          onClick={() => {
            setExpand(!expand);
          }}
          className="folder"
        >
          <span>📁 {explorer.name}</span>
          <div className="buttonContainer">
            <button onClick={(e) => handleCreateFolder(e, true)}>📁 +</button>
            <button onClick={(e) => handleCreateFolder(e, false)}>📄 +</button>
            {explorer.id==="1"?null:<button onClick={() => deleteNode(explorer.id)}>❌</button>}
          </div>
        </div>
        <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
          {inputExpand.visible && (
            <div className="inputContainer">
              <span>{inputExpand.isFolder ? "📁" : "📄"}</span>
              <input
                type="text"
                onKeyDown={(e) => onAddFolder(e)}
                onBlur={() =>
                  setInputExpand({ ...inputExpand, visible: false })
                }
                className="inputContainer__input"
                autoFocus
              />
            </div>
          )}
          {explorer.items.map((ob) => {
            return <Folder insertNode={insertNode} deleteNode={deleteNode} explorer={ob} key={ob.id} />;
          })}
        </div>
      </div>
    );
  } else {
    return <div className="file">
              <span>📄 {explorer.name}</span>
              <div className="buttonContainer">
                <button onClick={() => deleteNode(explorer.id)} >❌</button>
              </div>
            </div>
  }
}
export default Folder;
