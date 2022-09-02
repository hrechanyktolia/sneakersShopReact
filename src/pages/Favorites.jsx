import React, {useContext} from 'react';
import ThemeContext from "../context";
import Card from "../components/card/Card";


const Favorites = () => {
    const {productsFavorite, addToFavorite} = useContext(ThemeContext)
    return (
        <div className="blockCard" >
            <div className="blockTitle">
                <h1>Favorites</h1>
            </div>
            <div className="blockItem">
                {productsFavorite.map((product, index) =>
                    <Card {...product}
                          key={index}
                          favorite={true}
                          onFavorite={addToFavorite}/>
                )}
            </div>
        </div>
    );
};

export default Favorites;