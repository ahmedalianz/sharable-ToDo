import {useState,useEffect} from 'react'
import ToDoItem from './todo-item';
import { useParams } from 'react-router-dom';
import {collection,getDocs} from "firebase/firestore"; 
import db from '../fbConfig'
export default function ListView() {
    const {id,listName}=useParams()
    console.log(id,listName)
    const [listItems,setListItems]=useState([])
    const [isLoaded,setIsLoaded]=useState(false)
    useEffect(()=>{
        async function getToDos(){
          try{
            const querySnapshot = await getDocs(collection(db, listName));
            let newlistItems=listItems;
            querySnapshot.forEach((doc) => {
              if(doc.data().userId ==id){
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
    return (
        <div className="items widget">
        <h3 className='text-center'>{listName}</h3>
        <ul className='list-group container-sm mt-2'>
          {isLoaded && listItems.map((listItem,index) =>
            <ToDoItem 
              key={listItem.id} 
              listItem={listItem} 
              i={index}
              view='d-none'
            />
          )}
        </ul>
      </div>
        )
}
