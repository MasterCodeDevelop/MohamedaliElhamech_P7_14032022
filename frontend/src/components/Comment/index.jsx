import React,{useState} from 'react'
import Form from './Form';
import FlatList from './FlatList';
export default function Comment({postID, session}) {
  var data = {state:null, setState:null}; [data.state, data.setState] = useState(undefined);
  return (
    <>
      <Form postID={postID} data={data}  session={session} />
      <FlatList postID={postID} data={data} session={session} />
    </>
  )
}
   
