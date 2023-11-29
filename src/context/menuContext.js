import { createContext, useEffect, useState } from "react";

export const MenuContext=createContext();
const MenuProvider=({children})=>{
    const [menu,setMenu]=useState([])
    useEffect(()=>{
        try {
        const fetchdata=async()=>{
            const Fetch_Menu=await fetch("https://foodservers.onrender.com/menu",{
                method:"GET",
            });
            const data= await Fetch_Menu.json();
            setMenu(data.allmenu)
        }
        fetchdata();
        // console.log(menu)
       } catch (error) {
        console.log(error)
       }
    },[])    
    return(
    <MenuContext.Provider value={{menu}}>{children}</MenuContext.Provider>
    )
}
export default MenuProvider;