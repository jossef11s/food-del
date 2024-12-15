import PropTypes from 'prop-types';
import { assets } from '../../assets/assets';
import './FoodItem.css';
import { useContext } from 'react';
import { StoreContext } from '../context/StoreContent';

function FoodItem({ id, name, price, description, image }) {

   const {cartItems,addToCart,removeFromCart}= useContext(StoreContext)
  return (
    <div className='food_item' key={id}>
      <div className='food-item-img-container'>
        <img className='food-item-image' src={image} alt='' />
        
        {!cartItems[id]
          ?<img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} alt=''/>
          :<div className='food-item-counter' >
              <img onClick={()=> removeFromCart(id)} src={assets.remove_icon_red} alt=''/>
              <p>{cartItems[id]}</p>
              <img onClick={()=> addToCart(id)} src={assets.add_icon_green} alt=''/>

          </div>
        }
      </div>
      <div className='food-item-info'>
        <div className='food-item-name-rating'>
          <p>{name}</p>
          <img src={assets.rating_starts} alt='' />
        </div>
        <p className='food-item-desc'>{description}</p>
        <p className='food-item-price'>${price}</p>
      </div>
    </div>
  );
}

// Define PropTypes for the component
FoodItem.propTypes = {
  id: PropTypes.string.isRequired, // Assuming id is a string
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default FoodItem;
