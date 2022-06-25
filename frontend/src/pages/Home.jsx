import React, {useState, useEffect} from 'react'
import Post  from '../components/Post';
import post from '../functions/post';


export default function Home({session}) {
  const [data, setData] = useState(null);
  var openUpdate = {state: null, setState: null}; [openUpdate.state, openUpdate.setState] = useState(false);
  var updateId = {state: null, setState: null}; [updateId.state, updateId.setState] = useState(null);
  const update = {
    open: openUpdate,
    id: updateId
  }
  useEffect(()=>{
    if(data == null){
      post.getAll({setData})
    }
  },[data])
  return (
    <div className="container">
      <Post.Form session={session} data={data} setData={setData}  />
      <Post.Update session={session} data={data} setData={setData}  modal={openUpdate} updateId={updateId} update={update} />
      <Post.FlatList session={session} data={data} setData={setData} openUpdate={openUpdate}  updateId={updateId} update={update}/>
    </div>
  )
}
