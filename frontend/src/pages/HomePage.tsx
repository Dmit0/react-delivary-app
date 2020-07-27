import React from 'react';
import {NavBar} from '../components/navbar/navbar'
import {Banners} from '../components/content/banners'
import {Restaurant} from '../components/content/restaurant'
import '../css/content.css';
import '../css/styles.css';



let res=[
  {id:1,name:"burger"},
  {id:2,name:"burger"},
  {id:3,name:"burger"},
  {id:4,name:"burger"},
  {id:5,name:"burger"},
  {id:6,name:"burger"},
  {id:7,name:"burger"},
  {id:8,name:"burger"},
  {id:9,name:"burger"},
  {id:10,name:"burger"},
 
]

export const HomePage = () => {
  
  
  return (
    <div className="App">
      <NavBar/>
      
      <div className="App__content">
        <Banners/>
        <div className="App__content-main">
        {res.map(item=>(         
           <Restaurant />   
        ))}
        </div>
      </div>
      <div className="App__footer"></div>
    </div>
  );
}


