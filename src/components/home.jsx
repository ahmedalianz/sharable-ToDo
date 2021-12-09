import {useState,useEffect} from 'react'
import ListContainer from './list-container';
import { toast } from 'react-toastify';
import classNames from 'classnames' 
import { collection, addDoc,getDocs} from "firebase/firestore"; 
import db from '../fbConfig'
export default function Home() {
  const [allLists,setAllLists]=useState([])
  const [isLoaded,setIsLoaded]=useState(false)
  const [newListName,setNewListName]=useState('')
  const [newListTab,setNewListTab]=useState('d-none')
  const user=JSON.parse(localStorage.getItem('user'))
  const addNewListTab=async(listName)=>{
    try{
      if(listName!==''){
        const list=await addDoc(collection(db, 'listsNames'), {
          listName,
          userId:user.id,
        });  
        setAllLists([...allLists,{id:list.id,listName,selected:'d-none'}])
        setNewListName('')
        setNewListTab('d-none')
        toast.success('List created ,choose it and start adding')
      }  
    }
    catch(e){
      console.log(e)
    }
  }
  useEffect(()=>{
    async function getListNames(){
      try{
        const querySnapshot = await getDocs(collection(db, 'listsNames'));
        let newAllLists=allLists;
        querySnapshot.forEach((doc) => {
          if(doc.data().userId==user.id){
            newAllLists.push({
              id: doc.id,
              listName:doc.data().listName
            })  
            if(newAllLists.length>0){ // to show only the first list at start up
              newAllLists.map(list=>{
                list.selected='d-none'
                return list
              })
              newAllLists[0].selected=''
              }
          }
        });
        setAllLists(newAllLists);
        setIsLoaded(true)
      }
      catch(e){
        console.log(e)
      }
    }
    getListNames()
  },[])

  const chooseList=(id) => {
    const lists=allLists.map(list=>{
      list.selected='d-none'
      return list
    })
    lists.find(list=>list.id === id).selected=''
    setAllLists(lists)
  }
return (
<>
  <div className='list-tabs widget'>
    <h3 className={classNames(allLists.length>0?'d-none':'')}>add list name here =={'>'}</h3>
    {
    allLists.map(list=>(
    <button 
      className='list-single-tab mx-2'
      key={list.id}
      onClick={()=>{chooseList(list.id)}}>
        {list.listName}
    </button>
    ))
    }
    <div className={`mx-2 ${newListTab}`}>
      <input type="text" placeholder="new list name . ." value={newListName}
        onChange={(e)=>setNewListName(e.target.value)}
      />
      <i className="fas fa-check ms-2" onClick={()=> addNewListTab(newListName)}></i>
    </div>
    <i className="fas fa-plus" onClick={()=>setNewListTab('')}></i>
  </div>
  
    {
      isLoaded && allLists.map(list =>(
        <ListContainer 
        list={list}
        key={list.id}
        />
      ))
    }

</>
)
}