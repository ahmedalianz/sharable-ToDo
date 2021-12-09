import {useState,useEffect} from 'react'
import ListContainer from './list-container';
import { toast } from 'react-toastify';
import classNames from 'classnames' 
import { collection, addDoc,getDocs} from "firebase/firestore"; 
import db from '../fbConfig'
import Share from './share';
export default function Home() {
  const [allLists,setAllLists]=useState([])
  const [isLoaded,setIsLoaded]=useState(false)
  const [newListName,setNewListName]=useState('')
  const [newListTab,setNewListTab]=useState('d-none')
  const addNewListTab=async(listName)=>{
    try{
      if(listName!==''){
        const list=await addDoc(collection(db, 'listsNames'), {
          listName
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
          newAllLists.push({
            id: doc.id,
            listName:doc.data().listName
          })
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
    <div className={
      classNames('d-flex flex-column align-items-center p-3 bg-dark text-white',
      allLists.length>0?'':'d-none')}>
      <h6>share your list here</h6>
      <Share/>
    </div>

</>
)
}