import { createContext, useState, useEffect } from 'react'


const addCartItem = (cartItems, productToAdd) => {
  // Find if cartItems contains productToAdd
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  )

  // If found, increment quantity 
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id 
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem  
    )
  }
  
  // Return new array with modified cartItems / new cart items
  return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const removeCartItem = (cartItems, cartItemToRemove) => {
  // Find the cart item to remove 
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  )
  
  // Check quantity equal to 1, if it is remove that item from the cart 
  if (existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
  }
    
  // Return back cart items with matching cart item with reduce quantity 
  return cartItems.map((cartItem) => 
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  )
}

const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id)
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  clearCartItem: () => {},
  cartCount: 0,
  cartTotal: 0,
})

export const CartProvider = ({children}) => {
  const [ isCartOpen, setIsCartOpen ] = useState(false)
  const [ cartItems, setCartItems ] = useState([])
  const [ cartCount, setCartCount ] = useState(0)
  const [ cartTotal, setCartTotal ] = useState(0)

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, currentCartItem) => 
        total + currentCartItem.quantity, 0
    )
    
      setCartCount(newCartCount)
      
  }, [cartItems])

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    )
    setCartTotal(newCartTotal)
  }, [cartItems])

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd))
  }

  const removeItemToCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove))
  }

  const clearItemFromCart = (cartItemToClear) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear))
  }
  
  const value = { 
    isCartOpen, 
    setIsCartOpen, 
    addItemToCart, 
    removeItemToCart,
    clearItemFromCart,
    cartItems, 
    cartCount,
    cartTotal,
  }
  
  return (
    <CartContext.Provider value={ value }>{ children }</CartContext.Provider>
  )
}