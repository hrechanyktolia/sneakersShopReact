import React, {useContext, useState} from 'react';
import axios from "axios";
import ThemeContext from "../context";
import Info from "./Info";


const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const ShopCart = ({onDeleteCartItem, items=[]}) => {
    const [orderComplete, setOrderComplete] = useState(false)

    const {closeCart, productsCart, setProductsCart, totalSum} = useContext((ThemeContext))

    const clickOrder = async () => {
        try {
            await axios.post('https://62fe967c41165d66bfc2c79d.mockapi.io/orders', {
                items: productsCart,
            });
            setOrderComplete(true)
            setProductsCart([])

            for (let i = 0; i < productsCart.length; i++) {
                const item = productsCart[i]
                console.log(item)
                await axios.delete(`https://62fe967c41165d66bfc2c79d.mockapi.io/cartShop/${item.id}`)
                await delay(500)
            }
        } catch (error) {
            alert('Error creating order')
        }
    }

    return (
        <div className="overlay">
            <div className="drawer">
                <h3>Shopping cart <img className="removeBtn" onClick={closeCart} src="./img/remove.svg" alt="close"/></h3>
                {items.length > 0 ?
                    <div>
                        <div className="items">
                            {items.map(item =>
                                <div key={item.id} className="cartItem">
                                    <img width={70} height={70} src={item.imgUrl} alt="sneaker"/>
                                    <div className="cartTitle">
                                        <p>{item.title}</p>
                                        <b>{item.price} USD</b>
                                    </div>
                                    <img className="removeBtn" onClick={() =>onDeleteCartItem(item.id)} src="./img/remove.svg" alt="remove"/>
                                </div>
                            )}
                        </div>
                        <div className="footerBlock">
                            <div className="footerText">
                                <span>Total price:</span>
                                <b>{totalSum} USD</b>
                            </div>
                            <button onClick={clickOrder} className="greenButton">Checkout</button>
                        </div>
                    </div> :
                    <Info
                        image={orderComplete ? "./img/orderComplete.jpg" : "./img/cartEmpty.png"}
                        title={orderComplete ? "Order completed!" : "Cart is empty"}
                        description={orderComplete
                            ? "Your order will be transferred to the dispatch service. Expect for notification"
                            : "Add at least one pair of sneakers to place an order!"}
                    />
                }
            </div>
        </div>
    );
};

export default ShopCart;