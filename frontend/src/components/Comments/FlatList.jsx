import React, { useEffect } from 'react'
import comment from '../../functions/comment';
import Comment from './Comment';
export default function FlatList({postID, data, session}) {
  useEffect(()=>{
      if(data.state == null) {
        comment.getAll({postID, data});
      }
  },[postID, data])
  return (
    <div className="flatList">
      {
        (data.state == null)?<></>:
        data.state.map( (dataItem, index) => (
          <Comment 
            dataItem={dataItem}
            key={index}
            index={index}
            data={data}
            session={session}
          />
        ))
      }
    </div>
  )
}
