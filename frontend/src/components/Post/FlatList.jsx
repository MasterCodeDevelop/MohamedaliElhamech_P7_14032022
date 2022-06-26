import React,{useState, useEffect} from 'react'
import Card from './Card'
import { post, Alert } from '../../functions';

export default function FlatList({session, data, setData}) {

    return (
      <div className="post-flatList">
        {(data== null)?
            <></>
        :(data.length == 0)?
            <div className="post-card-void card">
                Aucun post
            </div>
        :
            data.map( (dataItem, index) => (
                <Card 
                    data = {data}
                    setData = {setData}
                    dataItem={dataItem}
                    key={index}
                    index={index}
                    session={session}
                />
            ))
          }
      </div>
  )
}
