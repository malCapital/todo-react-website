import React, { useEffect, useState } from 'react';
import './todo.css'
// get items from localStorage
const getLocalItems = ()=>{
  let list = localStorage.getItem('lists');
  console.log(list);
  if(list){
    return JSON.parse(localStorage.getItem('lists'));
  }
  else{
    return [];
  }
}
const Todo = () => {
    const [inputData, setInputData] = useState('');
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null);
    // setitems define what user write
    const  [items, setItems] = useState(getLocalItems());
    const addItem = ()=>{
      if(!inputData){
           alert('Add something')
      } else if(inputData && !toggleSubmit){
        setItems(
          items.map((value) =>{
            if(value.id === isEditItem){
              return {...value, name:inputData}
            }
            return value;
          })
        )
          setToggleSubmit(true);
          setInputData('');
          setIsEditItem(null);
        
      }
      else{
        const allInputData = {id: new Date().getTime().toString(), name: inputData}
        setItems([...items,allInputData]);
        setInputData('')
      }
    }
    // edititem
    const editItem = (id) =>{
     let newEditItem = items.find((value)=>{
              return value.id === id;
     })
     console.log(newEditItem);
     setToggleSubmit(false);
     setInputData(newEditItem.name);
     setIsEditItem(id);
    }
    // delete function define
    const deleteItem =(index) =>{
      console.log(index)
      const updatedItems = items.filter((value) =>{
        return index !== value.id;
      })
      setItems(updatedItems)
    }
    // remove all
    const removeAll =()=>{
      setItems([]);
    }
    // localStorage m items store
    useEffect(()=>{
        localStorage.setItem('lists', JSON.stringify(items))
    },[items])
  return (
    <>
      <div className="main-div">
        <div className="child-div">
            <figure>
                <img src="./images/todo.svg" alt="todopics" />
                <figcaption>Add your List Here</figcaption>
            </figure>
    <div className="addItems">
        <input type="text" placeholder='Add Items...'  value={inputData} onChange={(e)=> setInputData(e.target.value)}/>
       {
        toggleSubmit ? <i className='fa fa-plus add-btn' title='Add item' onClick={addItem}></i> :
        <i className='fa fa-edit add-btn' title='Update item' onClick={addItem}></i>
       }
    </div>
    <div className="showItems">
      {
        items.map((value)=>{
          return (
            <div className="eachItem" key={value.id}>
            <h3>{value.name}</h3>
            <div className="todo-btn">
            <i className='far fa-edit add-btn' title='Edit item' onClick={() => editItem(value.id)}></i>
        <i className='far fa-trash-alt add-btn' title='Delete item' onClick={() => deleteItem(value.id)}></i> 
        </div>
        </div>
          )
        })
      }
       
    </div>
    <div className="showItems">
        <button className='btn effect04' data-sm-link-text="Remove List" onClick={removeAll}><span>Check List</span></button>
    </div>
        </div>
      </div>
    </>
  )
}

export default Todo
