import React, {useContext} from 'react';
import ThemeContext from "../context";

const Info = ({image, title, description}) => {
    const {closeCart} = useContext(ThemeContext)
    return (
        <div className="cartEmpty">
            <img width={120} src={image} alt="cart empty"/>
            <h2>{title}</h2>
            <p>{description}</p>
            <button onClick={closeCart} className="greenButton">Back</button>
        </div>
    );
};
export default Info;