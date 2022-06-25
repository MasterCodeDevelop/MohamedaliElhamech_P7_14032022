import React, { useEffect } from 'react'
import comment from '../../functions/comment';
import Card from './Card';
export default function FlatList({postID, data, session}) {
  useEffect(()=>{
      if(data.state == null) {
        comment.getAll({postID, data});
      }
  },[data.state])
  return (
    <div className="flatList">
      {
        (data.state == null)?<></>:
        data.state.map( (dataItem, index) => (
          <Card 
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
