import { createContext, useEffect, useState } from "react";

export const MenuContext=createContext();
const MenuProvider=({children})=>{
    const [menu,setMenu]=useState([])
    useEffect(()=>{
        try {
        const fetch_data=async()=>{
            const Fetch_Menu=await fetch("http://localhost:7878/menu",{
                method:"GET",
            });
            const data= await Fetch_Menu.json();
            setMenu(data.allmenu)
        }
        fetch_data();
        console.log(menu)
       } catch (error) {
        console.log(error)
       }
    },[])    
    return(
    <MenuContext.Provider value={{menu}}>{children}</MenuContext.Provider>
    )
}
export default MenuProvider;