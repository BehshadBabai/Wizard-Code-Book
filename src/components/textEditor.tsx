import MDEditor from "@uiw/react-md-editor";
import { useEffect, useRef, useState } from "react";
import { Cell } from "../state";
import './textEditor.css';
import {useActions} from '../hooks/useActions';

interface textEditorProps {
  cell: Cell  
}

const TextEditor: React.FC<textEditorProps> = ({cell}) => {
  const [editing, setEditing] = useState(false);
  const Ref = useRef<HTMLDivElement | null>(null);
  const { updateCell } = useActions();

  useEffect(()=>{
    const listener = (event: MouseEvent) => {
      if(Ref.current && event.target && !Ref.current.contains(event.target as Node)){
        setEditing(false);
      }
    }
    document.addEventListener('click', listener, {capture: true});

    return () => {
      document.removeEventListener('click',listener,{capture: true});
    }
  },[]);
  
  if(editing) {
    return <div className="text-editor" ref={Ref}>
      <MDEditor value={cell.content} onChange={(v)=>{
        updateCell(cell.id, v || '');
      }}/>
    </div>
  }

  return <div className="text-editor card" onClick={()=>{setEditing(true)}}>
    <div className="card-content">
      <MDEditor.Markdown source={cell.content || 'Click to Edit'}/>
    </div>
  </div>
}

export default TextEditor;