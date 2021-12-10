import {useState,useEffect} from 'react'
import { toast } from 'react-toastify';
import ToDoItem from './todo-item';
import classNames from 'classnames' 
import {  doc,collection, addDoc,getDocs,deleteDoc,updateDoc} from "firebase/firestore"; 
import db from '../fbConfig'
import Share from './share';
import Spinner from './spinner';
export default function ListContainer({list}) {
  const [text,setText]=useState('')
  const [listItems,setListItems]=useState([])
  const [isLoaded,setIsLoaded]=useState(false)
  const user=JSON.parse(localStorage.getItem('user'))
  useEffect(()=>{
    async function getToDos(){
      try{
        const querySnapshot = await getDocs(collection(db, list.listName));
        let newlistItems=listItems;
        querySnapshot.forEach((doc) => {
          if(doc.data().userId ===user.id){
            newlistItems.push({
              id: doc.id,
              text:doc.data().text,
              marked:doc.data().marked,
            })  
          }
        });
        setListItems(newlistItems)
        setIsLoaded(true)
      }
      catch(e){
        console.log(e)
      }
    }
    getToDos()
  },[])
  const addListItem=async(e)=>{
    e.preventDefault()
    try{
      const todo=await addDoc(collection(db, list.listName), {
        text,
        marked:false,
        userId:user.id
      });
      setListItems([...listItems,{
        id:todo.id,
        text,
        marked:false
      }])
      toast.info('Item has been Added')
      setText('')  
    }
    catch(e){
      console.log(e)
    }
  }
  const removeListItem=async(listItem)=>{
    try{
      await deleteDoc(doc(db, list.listName, listItem.id));
      setListItems(listItems.filter(li=>li.id!==listItem.id))
      toast.warning('Item has been Removed')
    }
    catch(e){
      console.log(e)
    }
  }
  const markListItem=async(listItem)=>{
    try{
      const todoRef = doc(db, list.listName,listItem.id);
      await updateDoc(todoRef, { marked:true});
      listItems.find(li => li.id===listItem.id).marked=true
      toast.success('List Item is Marked Done')
    }
    catch(e){
      console.log(e)
    }
  }
return isLoaded?(
          <div className={`${list.selected}`}>
            <div className="card-body">
              <h3 className='text-center'>Sharable To-Do List</h3>

              <form className="d-flex justify-content-center align-items-center form-group mb-4" onSubmit={(e)=>addListItem(e)}> 
                <div className="form-outline flex-fill">
                  <input type="text" value={text}
                    className="form-control" required
                    placeholder="Enter item here . . ."
                    onChange={e=>setText(e.target.value)}/>
                </div>
                <button className="btn btn-primary ms-2">Add to list</button>
              </form>

              <div>
                <h5 className='text-center'>{list.listName}</h5>
                <div>
                  <ul className="list-group mb-0">
                  {
                    listItems.map((listItem,index) =>
                    <ToDoItem 
                      key={listItem.id} 
                      listItem={listItem} 
                      i={index} 
                      removeListItem={removeListItem} 
                      markListItem={markListItem} 
                      view=''
                    />)
                  }
                  </ul>
                </div>
              </div>
            </div>
            <div className={
              classNames('d-flex flex-column align-items-center p-3 bg-dark text-white',
              list?'':'d-none')}>
              <h6>share This list here</h6>
              <button className='btn btn-danger' 
                onClick={()=>{localStorage.removeItem('user');window.location.assign('/')}}>
                  Log out
              </button>
              <Share
                listName={list.listName}
                userId={user.id}
              />
            </div>
          </div>
):(
  <Spinner/>
)
}