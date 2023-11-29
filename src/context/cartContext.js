import { useContext } from "react";
import { createContext, useState } from "react";
import { MenuContext } from "./menuContext";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const { menu, setMenu } = useContext(MenuContext);
    // ADD TO CART FUNCTIOn
    const addToCart = (id, item) => {
        const newItem={...item,amount:1}
        const findItem = cart.find((item) => {
            return item.id === id
        })
        if (findItem) {
            console.log("item already in cart")
        }
        else {
            setCart([...cart, newItem])
        }

    }
    // INCREASE THE AMt
    const increase=(item,id)=>{
        const newItem={...item,amount:1}

        console.log(newItem)
        const findItem=cart.find((item)=>{
            return item.id===id
        })
        if(findItem){
          const newCart=cart.map((item)=>{
            if(item.id===id){
                return {...item,amount:item.amount+1}
            }
            else{
                return item
            }
          })
          setCart(newCart)
        }
        else{
        setCart([...cart,newItem])
        }
    }
    // DECREASE AMT
    const decrease=(item,id)=>{
        if(item.amount===1){
            deleteItem(id);
        }
        else{
            const newItem={amount:1,...item}
            const findItem=cart.find((item)=>{
                return item.id===id
            })
            if(findItem){
              const newCart=cart.map((item)=>{
                if(item.id===id){
                    return {...item,amount:item.amount-1}
                }
                else{
                    return item
                }
              })
              setCart(newCart)
            }
            else{
            setCart([...cart,newItem])
            }
        }
        
    }
    // Delete ITem
    const deleteItem=(id)=>{
        let newCart=cart.filter((item)=>{
            return item.id!==id
        })
        setCart(newCart)
    }

    return (<CartContext.Provider value={{ cart, setCart, addToCart,decrease,increase,deleteItem }}>{children}</CartContext.Provider>)
}

export default CartProvider;