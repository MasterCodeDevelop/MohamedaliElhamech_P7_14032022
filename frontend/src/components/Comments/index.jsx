import React,{useState} from 'react'
import Form from './Form';
import FlatList from './FlatList';
export default function Comments({postID, session}) {
  var data = {state:null, setState:null}; [data.state, data.setState] = useState(undefined);
  return (
    <div className="comments">
      <Form postID={postID} data={data}  session={session} />
      <FlatList postID={postID} data={data} session={session} />
    </div>
  )
}
   
