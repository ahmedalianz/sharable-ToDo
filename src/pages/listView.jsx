import {useState,useEffect} from 'react'
import ToDoItem from '../components/todo-item';
import { Link, useParams } from 'react-router-dom';
import {collection,getDocs} from "firebase/firestore"; 
import db from '../fbConfig'
import Spinner from '../components/spinner'
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
    return isLoaded?(
          <div className="gradient-custom vh-100">
            <div className="container py-5 h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-xl-10">
                  <div className="card">
                    <h3 className='text-center p-3'>{listName}</h3>
                    <ul className='list-group container mb-0"'>
                      {listItems.map((listItem,index) =>
                      <ToDoItem 
                        key={listItem.id} 
                        listItem={listItem} 
                        i={index}
                        view='d-none'
                      />
                      )}
                    </ul>
                    <div className='p-4 d-flex flex-column align-items-center p-3 bg-dark text-white'>
                      <span> join us To Create & Share your own lists</span>
                      <Link to='/'>
                      <button className='btn btn-danger'>Join</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ):(
          <Spinner/>
        )
}
