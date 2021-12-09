import {useState,useEffect} from 'react'
import { toast } from 'react-toastify';
import ToDoItem from './todo-item';
import {  doc,collection, addDoc,getDocs,deleteDoc,updateDoc} from "firebase/firestore"; 
import db from '../fbConfig'
export default function ListContainer({list}) {
  const [text,setText]=useState('')
  const [listItems,setListItems]=useState([])
  const [isLoaded,setIsLoaded]=useState(false)
  useEffect(()=>{
    async function getToDos(){
      try{
        const querySnapshot = await getDocs(collection(db, list.listName));
        let newlistItems=listItems;
        querySnapshot.forEach((doc) => {
          newlistItems.push({
            id: doc.id,
            text:doc.data().text,
            marked:doc.data().marked,
          })
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
        marked:false
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
      listItems.find(li => li.id==listItem.id).marked=true
      toast.success('List Item is Marked Done')
    }
    catch(e){
      console.log(e)
    }
  }
return (
<div className={`${list.selected}`}>
  <div className="widget to-do">
    <h1 className='text-center'>Sharable To-Do List</h1>
    <form className='form-group' onSubmit={(e)=>addListItem(e)}>
      <input onChange={e=>setText(e.target.value)}
      value={text}
      type="text"
      className="form-control"
      required
      placeholder="Enter item here . . ."/>
      <div className="d-flex justify-content-end my-2">
        <button className='btn btn-primary'>Add to list</button>
      </div>
    </form>

  </div>
  <div className="items widget">
    <h3 className='text-center'>{list.listName}</h3>
    <ul className='list-group container-sm mt-2'>
      {isLoaded && listItems.map((listItem,index) =>
        <ToDoItem 
          key={listItem.id} 
          listItem={listItem} 
          i={index} 
          removeListItem={removeListItem} 
          markListItem={markListItem} 
        />
      )}
    </ul>
  </div>
</div>
)
}