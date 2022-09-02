import React from 'react';
import Card from "../components/card/Card";


const Home = ({products,  searchValue, setSearchValue, addToCart, addToFavorite, isLoading}) => {
    const renderItems = () => {
        return (isLoading
            ? [...Array(8)]
            : products.filter((product) => product.title.toLowerCase().includes(searchValue.toLowerCase())))
            .map((product, index) =>
                <Card
                    {...product}
                    onPlus={obj => addToCart(obj)}
                    onFavorite={obj=> addToFavorite(obj)}
                    loading={isLoading}
                    key={index}/>
            );
    };
    return (
        <>
            <div className="container">
                <div className="containerTitle">
                    <h1>{searchValue ? `Search by request: "${searchValue}"` : "All sneakers"}</h1>
                    <div className="searchBlock">
                        <img src="./img/search.svg" alt="search"/>
                        {searchValue && <img className="clearBtn"
                                             onClick={()=> setSearchValue('')}
                                             src="./img/remove.svg"
                                             alt="clear"/>}
                        <input className='input'
                               value={searchValue}
                               onChange={e => setSearchValue(e.target.value)}
                               type="text" placeholder='Search...'/>
                    </div>
                </div>
            </div>
            <div className="sneakersItem">
                {renderItems()}
            </div>
        </>
    );
};

export default Home;