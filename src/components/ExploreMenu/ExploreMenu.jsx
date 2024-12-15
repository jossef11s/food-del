
import PropTypes from "prop-types"; // Import PropTypes
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore our menu</h1>
      <p className="explore-menu-text">Choose from a diverse menu</p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => (
          <div
            key={index}
            onClick={() =>
              setCategory((prev) =>
                prev === item.menu_name ? "all" : item.menu_name
              )
            }
            className="explore-menu-list-item"
          >
            <img
              className={category === item.menu_name ? "active" : ""}
              src={item.menu_image}
              alt={item.menu_name}
            />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
};

// Define PropTypes
ExploreMenu.propTypes = {
  category: PropTypes.string.isRequired, // `category` is a required string
  setCategory: PropTypes.func.isRequired, // `setCategory` is a required function
};

export default ExploreMenu;
