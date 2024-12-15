import { createContext,  useEffect,  useState } from "react";
import { food_list } from "../../assets/assets";
import PropTypes from "prop-types";  // Import PropTypes
import axios from "axios"

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000"
  const [token, setToken] = useState("");
  const [foodList, setFoodList] = useState([]);



  const addToCart = async (itemId) => {
    try {
      // Optimistically update the cart state
      setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
  
      if (token) {
        // Send the addition request to the backend
        const response = await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
  
        // Optionally, sync with the server's response (if backend returns updated cart data)
        if (response.data.success && response.data.cart) {
          setCartItems(response.data.cart);
        }
      }
    } catch (error) {
      console.error("Failed to add item to cart:", error);
  
      // Revert local state change if the request fails
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    }
  };
  

  const removeFromCart = async (itemId)=>{
    setCartItems((prev)=>({...prev, [itemId]:prev[itemId]-1}))
    if(token) {
      await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
    }
  }
  const getTotalCartAmount=()=>{
    let totalAmount = 0;
    for(const item in cartItems){
      if(cartItems [item]>0){
        let itemInfo = food_list.find((product)=>product._id === item)
        totalAmount += itemInfo.price* cartItems[item]
      }
      
    }
    return totalAmount;
  }
  const fetchFoodList = async () => {
    const response = await axios.get(`${url}/api/food/list`); // Correct syntax
    setFoodList(response.data.data);
  };

 

  useEffect(()=>{
    async function loadData() {
      await fetchFoodList();
      if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"));
     
      }
      
    }
    loadData();
  },[])
  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };
  
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

// Add PropTypes validation for children
StoreContextProvider.propTypes = {
  children: PropTypes.node.isRequired  // Define children as a required prop
};

export default StoreContextProvider;
