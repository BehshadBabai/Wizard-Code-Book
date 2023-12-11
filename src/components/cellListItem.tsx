import { Cell } from '../state';
import CodeCell from './codeCell';
import TextEditor from './textEditor';
import ActionBar from './actionBar';
import './cellListItem.css';
 
interface CellListItemProps {
  cell: Cell  
}

const CellListItem: React.FC<CellListItemProps> = ({cell}) => {

  let child: JSX.Element;

  if (cell.variant === 'code'){
   child = <>
   <div className='action-bar-wrapper'>
      <ActionBar id={cell.id}/>
   </div>
   <CodeCell cell={cell}/>
   </> 
  }
  else {
    child = 
    <>
    <TextEditor cell={cell}/>
    <ActionBar id={cell.id}/>
    </>
  }

  return <div className='cell-list-item'>
      {child}
    </div>;
};

export default CellListItem;