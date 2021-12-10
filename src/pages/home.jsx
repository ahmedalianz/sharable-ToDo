import {useState,useEffect} from 'react'
import ListContainer from '../components/list-container';
import { toast } from 'react-toastify';
import { collection, addDoc,getDocs} from "firebase/firestore"; 
import db from '../fbConfig'
import Spinner from '../components/spinner'
import classNames from 'classnames';
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
          if(doc.data().userId===user.id){
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
return isLoaded? (
<>
  <section className="vh-100 gradient-custom">
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col col-xl-10">
          <div className="card">
            <ul className="nav nav-tabs mb-4 pb-2 position-relative" id="ex1" role="tablist">
              {
                allLists.map(list=>(
                  <li className="nav-item" key={list.id} onClick={()=>{chooseList(list.id)}}>
                    <span className="nav-link">{list.listName}</span>
                  </li>
                ))
              }
              <div className={`mx-2 ${newListTab}`}>
                <input type="text" className='form-control' 
                  placeholder="new list name . ." 
                  value={newListName}
                  onChange={(e)=>setNewListName(e.target.value)}/>
                <i className="fas fa-check ms-2 cursor-pointer" onClick={()=> addNewListTab(newListName)}></i>
              </div>
              <div className={classNames('starter',allLists.length>0?'d-none':'')}>
                <h6 >create your first list here </h6>
                <i className="fas fa-hand-point-down fa-lg"></i>
              </div>
              <i className="far fa-plus-square" onClick={()=>setNewListTab('d-flex align-items-center')}></i>
            </ul>
          {
            allLists.map(list =>(
              <ListContainer 
                list={list}
                key={list.id}
            />
            ))
          }
          </div>
        </div>
      </div>
    </div>
  </section>
</>
):(
  <Spinner/>
)
}