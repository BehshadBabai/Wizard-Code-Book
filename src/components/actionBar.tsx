import { useActions } from '../hooks/useActions';
import './actionBar.css'

interface ActionBarProps {
  id: string
}

const ActionBar: React.FC<ActionBarProps> = ({id}) => {
  const { moveCell, deleteCell } = useActions();
  return (
  <div className='action-bar'>
    <button className='button is-primary is-small' onClick={()=> moveCell(id, 'up')}><i className="fa-solid fa-arrow-up" /></button>
    <button className='button is-primary is-small' onClick={()=> moveCell(id,'down')}><i className="fa-solid fa-arrow-down" /></button>
    <button className='button is-primary is-small' onClick={()=> deleteCell(id)}><i className="fa-solid fa-trash" /></button>
  </div>
  );
}

export default ActionBar;