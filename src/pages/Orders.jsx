import React, {useState} from 'react';
import axios from "axios";
import Card from "../components/card/Card";


const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    React.useEffect(() => {
        async function fetchOrder() {
            try {
                const {data} = await axios.get('https://62fe967c41165d66bfc2c79d.mockapi.io/orders');
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
                setIsLoading(false)
            } catch (error) {
                alert('Error order');
                console.error(error);
            }
        }
        fetchOrder()
    }, []);

    return (
        <div className="blockCard">
            <div className="blockTitle">
                <h1>My Orders</h1>
            </div>
            <div className="blockItem">
                {(isLoading
                    ? [...Array(4)]
                    : orders).map((product, index) =>
                    <Card {...product} key={index} loading={isLoading}/>
                )}
            </div>
        </div>
    );
};

export default Orders;