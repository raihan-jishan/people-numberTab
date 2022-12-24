 import { useEffect, useState } from 'react';
 import {db} from "./firebase";
 import {collection, getDocs, addDoc, deleteDoc, doc} from 'firebase/firestore'
import './App.css';
import "./styles/Custom.css";
function App() {
  const [newName, setNewName] = useState("");
  const [newText, setNewText] = useState("");
  const [newType, setNewType] = useState("");
  const [users,setUsers] = useState([]);
  const userCollectionRef = collection(db,"users");
  //  caeateUser function

  const createUser = async() => {
    await addDoc(userCollectionRef, {name: newName, text: newText, type:newType})
  }
  //  delete user function 
  const deleteUser = async  (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };
  useEffect(() => {
       // get user function -- ollping ellemnts 
        const getUsers = async () => {
          const data = await getDocs(userCollectionRef);
        setUsers(data.docs.map((doc) => ({
            ...doc.data(), id: doc.id})))
        }
        getUsers();
  }, [userCollectionRef])
  return (
    <div>
      <div className='ApplicationTitle'> 
      <h1>PeopleNumber Tab</h1>
      </div>
      <div>
        <div className='inputTags'> 
      <input placeholder='add Name' onChange={(event) => {
        setNewName(event.target.value);
        
        }}/>
      <input placeholder='add Number' 
      onChange={(event) => {
        setNewText(event.target.value);
      }}
      
      />
      {/*  onother input */}
      <input placeholder='type' onChange={(event)=> {
        setNewType(event.target.value)
      }} />

      {/*  create user button */}
      <button className='createBtn' onClick={createUser}>Add user <img src="https://cdn-icons-png.flaticon.com/512/1091/1091916.png" alt='there was an server side error!' width={20}/> 
      </button>
      </div>
   
     
        {users.map((user) => {
          return (
            <div> 
              <div className='dataTable'>
            <h3>Name: {user.name}</h3>
            <h3>Number:{user.text}</h3>
            <h3>Type:{user.type}</h3>
           
             {/*  delete user button */}
        <button className='deleteBtn' onClick={() =>{
          deleteUser(user.id)
        
        }}
        >
          Delete user
          <img src="https://cdn-icons-png.flaticon.com/128/3221/3221845.png" alt='there was an server side error!' width={20}/>
        </button>
        </div>
          </div>
          )
          } )}

          
          
      </div>
          
    </div>
    
  );
}

export default App;
