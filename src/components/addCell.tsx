import './addCell.css';
import { useActions } from '../hooks/useActions';

interface AddCellProps {
  prevCellId: string | null;
  forceVisible?: boolean
}

const AddCell: React.FC<AddCellProps> = ({ prevCellId, forceVisible }) => {
  const { insertCellAfter } = useActions();
  return <div className={`add-cell ${forceVisible && 'force-visible'}`}>
    <div className='add-buttons'>
      <button className='button is-rounded is-primary is-small' onClick={()=> insertCellAfter(prevCellId, 'code')}>
        <span className='icon is-small'>
          <i className='fas fa-plus'/>
        </span>
        <span>
        <i className='fa-solid fa-code'/>
        </span>
      </button>
      <button className='button is-rounded is-primary is-small' onClick={()=> insertCellAfter(prevCellId, 'text')}>
      <span className='icon is-small'>
          <i className='fas fa-plus'/>
        </span>
        <span>
        <i className='fa-solid fa-comment'/>
        </span>
      </button>
    </div>
    <div className='divider'></div>
  </div>;
} 

export default AddCell;