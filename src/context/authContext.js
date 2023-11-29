import { createContext, useState } from "react";
import { useEffect } from "react";
export const AuthContext=createContext();

const AuthProvider=({children})=>{
    const [auth,setAuth]=useState({
        token:null,
        email:""
    })
    useEffect(()=>{
        const data=localStorage.getItem('auth')
        if(data){
            const parseData=JSON.parse(data)
            setAuth({
                ...auth,
                token:parseData.token,
                email:parseData.email
                
            })
        }
        },[])
return(
    <AuthContext.Provider value={{auth,setAuth}}>{children}</AuthContext.Provider>
    
)
}

export default AuthProvider;