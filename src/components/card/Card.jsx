import React, {useContext} from 'react';
import styles from "./Card.module.scss"
import ContentLoader from "react-content-loader"
import ThemeContext from "../../context";

const Card = ({id, title, imgUrl, price, onPlus, onFavorite, loading = false}) => {

    const {addedCart, addedFavorite} = useContext(ThemeContext)
    const obj = {id, parentId: id, title, imgUrl, price}

    const onClickFavorite = () => {
        onFavorite(obj)
    }
    const onClickAdd = () => {
        onPlus(obj)
    };

    return (
        <div className={styles.card}>
            {loading ?
                <ContentLoader
                    speed={2}
                    width={180}
                    height={187}
                    viewBox="0 0 150 187"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb">

                    <rect x="0" y="0" rx="10" ry="10" width="150" height="90" />
                    <rect x="0" y="99" rx="3" ry="3" width="150" height="15" />
                    <rect x="0" y="119" rx="3" ry="3" width="90" height="15" />
                    <rect x="0" y="162" rx="8" ry="8" width="80" height="24" />
                    <rect x="118" y="155" rx="8" ry="8" width="32" height="32" />
                </ContentLoader>
                :
                <>
                        {onFavorite &&
                            <div className={styles.favorite}>
                                <img width={15} height={15}
                                 onClick={onClickFavorite}
                                 src={addedFavorite(id) ? "./img/isFavorite.svg" : "./img/like.svg"}
                                 alt="favorite" />
                            </div>
                        }
                    <img width={133} height={112} src={imgUrl} alt="product"/>
                    <p>{title}</p>
                    <div className={styles.cardDescription}>
                        <div className={styles.cardText}>
                            <span>Price:</span>
                            <b>{price} USD</b>
                        </div>
                        {onPlus &&
                            <img style={{cursor: "pointer"}}
                                 onClick={onClickAdd}
                                 src={addedCart(id) ? "./img/selected.svg" : "./img/add.svg"}
                                 alt="add"/>
                        }
                    </div>
                </>
            }
        </div>
    );
};

export default Card;