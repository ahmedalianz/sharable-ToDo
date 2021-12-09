import classNames from 'classnames'
export default function ToDoItem({listItem,i,removeListItem,markListItem,view}) {
    return (
        <li 
        key={listItem.id} 
        className='list-group-item my-2 list-item'>
            <span>{i+1}</span>
            <div className='d-flex justify-content-between align-items-center ms-2'>
            <div className={classNames(listItem.marked?'text-decoration-line-through':'')}>
                {listItem.text}
            </div>
            <div className={view}>
            <button onClick={() => markListItem(listItem)}
            className={classNames('actions',listItem.marked?'checked':'')}>
              <i className="fas fa-check"></i>
              </button>
            <button onClick={() => removeListItem(listItem)}
            className='actions'>
              <i className="fas fa-trash"></i>
              </button>
            </div>
              </div>
        </li>
)
}
