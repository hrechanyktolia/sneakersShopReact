import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import ThemeContext from "../context";


const Header = ({onClickCart}) => {
    const {totalSum} = useContext(ThemeContext)
    return (
        <div>
            <header>
                <div className="headerLeft">
                    <Link to="/">
                        <img width={40} height={40} src="./img/logo.png" alt="logo"/>
                    </Link>
                    <div className="headerInfo">
                        <h3>REACT SNEAKERS</h3>
                        <p>Sneaker shop</p>
                    </div>
                </div>
                <ul className='headerRight'>
                    <li onClick={onClickCart}>
                        <img width={20} height={20} src="./img/bag.svg" alt="cart"/>
                        <span>{totalSum} USD</span>
                    </li>
                    <li>
                        <Link to="/favorites">
                            <img src="./img/like.svg" alt="favorites"/>
                        </Link>
                    </li>
                    <li>
                        <Link to="/orders">
                            <img width={20} height={20} src="./img/user.svg" alt="user"/>
                        </Link>
                    </li>
                </ul>
            </header>
        </div>
    );
};

export default Header;