import {useState} from 'react'
import {collection, addDoc,getDocs} from "firebase/firestore"; 
import db from '../fbConfig'
export default function Auth() {
    const [name,setName]=useState('')
    const handleSubmit=async(e)=>{
        e.preventDefault()
            try{
                const querySnapshot = await getDocs(collection(db, 'users'));
                querySnapshot.forEach((doc) => {
                  if(doc.data().name===name){
                    localStorage.setItem('user',JSON.stringify({name:doc.data().name,id:doc.id}))
                    window.location.assign('/')
                }
                });
                  const user=await addDoc(collection(db, 'users'), {
                    name,
                  });
                  localStorage.setItem('user',JSON.stringify({name,id:user.id}))
              window.location.assign('/')
            }
            catch(e){
              console.log(e)
            }        
    }
    return (
        <div className="join-block">
            <div className="form-signin bg-light">
              <form onSubmit={(e)=>{handleSubmit(e)}}>
                <h4 className="h3 mb-3 fw-normal">Login</h4>
                <div className="form-floating">
                  <input value={name} 
                    onChange={(e)=>setName(e.target.value)} 
                    type="text" name="name" 
                    placeholder="Name . . ."
                    className="form-control"/>
                  <label htmlFor="name"><i className="fas fa-user user"></i>UserName</label>
                </div>
                <button>Join</button>
              </form>
            </div>
        </div>
    )
}
