import { createContext, useContext, useReducer, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

// Cart Context
const CartContext = createContext();

// Cart actions
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  APPLY_DISCOUNT: 'APPLY_DISCOUNT',
  REMOVE_DISCOUNT: 'REMOVE_DISCOUNT',
  SET_CART: 'SET_CART'
};

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);
      
      if (existingItem) {
        // Update quantity if item exists
        const newQuantity = existingItem.quantity + quantity;
        // Check stock limit
        if (newQuantity > product.stock) {
          return state; // Don't add if exceeds stock
        }
        
        return {
          ...state,
          items: state.items.map(item =>
            item.id === product.id 
              ? { ...item, quantity: newQuantity }
              : item
          )
        };
      } else {
        // Add new item
        if (quantity > product.stock) {
          return state; // Don't add if exceeds stock
        }
        
        return {
          ...state,
          items: [
            ...state.items,
            {
              ...product,
              quantity,
              addedAt: new Date().toISOString()
            }
          ]
        };
      }
    }

    case CART_ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.productId)
      };

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { productId, quantity } = action.payload;
      
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.id !== productId)
        };
      }
      
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id === productId) {
            // Check stock limit
            const newQuantity = Math.min(quantity, item.stock);
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
      };
    }

    case CART_ACTIONS.CLEAR_CART:
      return {
        ...state,
        items: []
      };

    case CART_ACTIONS.APPLY_DISCOUNT:
      return {
        ...state,
        discount: action.payload.discount
      };

    case CART_ACTIONS.REMOVE_DISCOUNT:
      return {
        ...state,
        discount: null
      };

    case CART_ACTIONS.SET_CART:
      return action.payload;

    default:
      return state;
  }
};

// Initial cart state
const initialCartState = {
  items: [],
  discount: null
};

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [cartFromStorage, setCartToStorage] = useLocalStorage('healthSupplementsCart', initialCartState);
  const [cartState, dispatch] = useReducer(cartReducer, cartFromStorage);

  // Sync cart state with localStorage
  useEffect(() => {
    setCartToStorage(cartState);
  }, [cartState, setCartToStorage]);

  // Cart actions
  const addToCart = (product, quantity = 1) => {
    dispatch({
      type: CART_ACTIONS.ADD_ITEM,
      payload: { product, quantity }
    });
  };

  const removeFromCart = (productId) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_ITEM,
      payload: { productId }
    });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { productId, quantity }
    });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  const applyDiscount = (discount) => {
    dispatch({
      type: CART_ACTIONS.APPLY_DISCOUNT,
      payload: { discount }
    });
  };

  const removeDiscount = () => {
    dispatch({ type: CART_ACTIONS.REMOVE_DISCOUNT });
  };

  // Cart calculations
  const getItemCount = () => {
    return cartState.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getSubtotal = () => {
    return cartState.items.reduce((total, item) => {
      const discountedPrice = item.discount > 0 
        ? item.price * (1 - item.discount / 100)
        : item.price;
      return total + (discountedPrice * item.quantity);
    }, 0);
  };

  const getDiscountAmount = () => {
    if (!cartState.discount) return 0;
    const subtotal = getSubtotal();
    return subtotal * (cartState.discount.percentage / 100);
  };

  const getTaxAmount = () => {
    const subtotal = getSubtotal();
    const discount = getDiscountAmount();
    const taxableAmount = subtotal - discount;
    return taxableAmount * 0.05; // 5% tax
  };

  const getTotal = () => {
    const subtotal = getSubtotal();
    const discount = getDiscountAmount();
    const tax = getTaxAmount();
    return subtotal - discount + tax;
  };

  const isInCart = (productId) => {
    return cartState.items.some(item => item.id === productId);
  };

  const getCartItem = (productId) => {
    return cartState.items.find(item => item.id === productId);
  };

  const value = {
    // State
    cartItems: cartState.items,
    discount: cartState.discount,
    
    // Actions
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyDiscount,
    removeDiscount,
    
    // Calculations
    getItemCount,
    getSubtotal,
    getDiscountAmount,
    getTaxAmount,
    getTotal,
    isInCart,
    getCartItem,
    
    // Formatters
    formatPrice: (price) => `$${(price / 100).toFixed(2)}`
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { CART_ACTIONS };
