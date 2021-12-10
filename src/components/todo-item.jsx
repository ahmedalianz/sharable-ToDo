import classNames from 'classnames'
export default function ToDoItem({listItem,i,removeListItem,markListItem,view}) {
    return (
        <li 
        key={listItem.id} 
        className="list-group-item  border-0 mb-2 rounded" style={{backgroundColor: "#f4f6f7"}}>
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
