import { useContext } from "react";
import './FoodDisplay.css';
import { StoreContext } from '../context/StoreContent';
import FoodItem from "../FoodItem/FoodItem";

function FoodDisplay({ category }) {
  const { food_list } = useContext(StoreContext);

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((item) => {
          if (category === "All" || category === item.category) {
            // Add 'return' inside the if block to ensure it properly returns the component
            return (
              <FoodItem 
                key={item._id}
                id={item._id}
                name={item.name}
                image={item.image}
                price={item.price}
                description={item.description}
                category={item.category}
              />
            );
          }
          // No need for an else; implicitly returns undefined for unmatched items.
          return null; // Explicitly handle the fallback case (optional).
        })}
      </div>
    </div>
  );
}

export default FoodDisplay;
