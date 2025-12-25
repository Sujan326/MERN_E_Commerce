import { createContext, useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fees = 10;

  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});

  const addToCart = async (itemId, size) => {
    // Check if size is selected before adding to cart
    if (!size) {
      toast.warn("Select Product Size");
      return;
    }

    // Make a copy of the current cart so we don't modify the original directly
    let cartData = structuredClone(cartItems);

    // Check if this product already exists in the cart
    if (cartData[itemId]) {
      // If the product exists, check if the selected size is already added
      if (cartData[itemId][size]) {
        // Size exists → increase the quantity by 1
        cartData[itemId][size] += 1;
      } else {
        // Size doesn't exist → add this size with quantity 1
        cartData[itemId][size] = 1;
      }
    } else {
      // Product doesn't exist → create the product first
      cartData[itemId] = {};
      // Add the selected size with quantity 1
      cartData[itemId][size] = 1;
    }

    // Update the cart state with the new values
    setCartItems(cartData);
  };

  const getCartCount = () => {
    let totalCount = 0;

    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    }
    return totalCount;
  };

  const updateCartQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;

    setCartItems(cartData);
  };

  const getCartAmount = () => {
    let totalAmount = 0;

    // loop through cartItems nothing but _id
    for (const items in cartItems) {
      // find the information about product using items(_id)
      let itemInfo = products.find((product) => product._id === items);
      /* loop through quantity of the cartItems like: {
          "aaaab": {  --> _id
            "M": 1    --> size: quantity
          }
        }
      */
      for (const item in cartItems[items]) {
        try {
          // if quantity > 0, calculate the total
          if (cartItems[items][item] > 0) {
            // price * quantity =  totalAmount
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    }
    return totalAmount;
  };

  const value = {
    products,
    currency,
    delivery_fees,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateCartQuantity,
    getCartAmount,
    navigate
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
