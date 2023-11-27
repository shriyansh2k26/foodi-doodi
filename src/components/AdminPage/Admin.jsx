import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import './admin.css'
import '../../utils.css'
export default function Admin() {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [description, setDes] = useState("")
  const [price, setPrice] = useState("")
  const [id, setId] = useState("")
  const handleAddMenu = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:7878/addmenu', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image, title, description, price, id, category
      })
    })
    const data = await response.json();
    setImage("")
    setPrice("")
    setTitle("")
    setDes("")
    setId("")
    setCategory("")
  }
  const [mode, setMode] = useState('add');
  const switchMode = (newMode) => {
    setMode(newMode);
  };
  const EditComponent=()=>{
    return<>
    <h1>Edit</h1>
    </>
  }

  const AddComponent = () => {
    return (<>
    
    </>)
  }
  return (
    <div>
      <Navbar />
      <div className=" flex jus-center">
      <button onClick={() => switchMode('add')}>Add </button>
      <button onClick={() => switchMode('edit')}>Edit </button>
      </div>
      {mode === 'add' ?<>
      <div class="menu-item">
        <label for="item-name">Id :</label>
        <input type="text" onChange={(e) => { setId(e.target.value) }} value={id} id="item-name" />
      </div>
      <div class="menu-item">
        <label for="item-name">Item Name:</label>
        <input type="text" onChange={(e) => { setTitle(e.target.value) }} value={title} id="item-name" />
      </div>
      <div class="menu-item">
        <label for="item-img">Image Url:</label>
        <input type="text" onChange={(e) => { setImage(e.target.value) }} value={image} id="item-img" />
      </div>
      <div class="menu-item">
        <label for="itemdes">Category:</label>
        <input type="text" onChange={(e) => { setCategory(e.target.value) }} value={category} id="item-des" />
      </div>
      <div class="menu-item">
        <label for="itemdes">Description:</label>
        <input type="text" onChange={(e) => { setDes(e.target.value) }} value={description} id="item-des" />
      </div>
      <div class="menu-item">
        <label for="item-price">Item Price:</label>
        <input type="text" onChange={(e) => { setPrice(e.target.value) }} value={price} id="item-price" />
      </div>

      <div class="menu-item">
        <button onClick={handleAddMenu}>Add Item</button>
      </div></>: <EditComponent />}
    </div>


  )
}
