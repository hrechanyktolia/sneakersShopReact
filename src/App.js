import React, {useEffect, useState} from 'react';
import {Route, Routes} from "react-router-dom";
import axios from "axios";
import ThemeContext from "./context.js";
import ShopCart from "./components/ShopCart";
import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";


const App = () => {
  const [showCart, setShowCart] = useState(false)
  const [products, setProducts] = useState([])
  const [productsCart, setProductsCart] = useState([])
  const [productsFavorite, setProductsFavorite] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, favoriteResponse, productsResponse] = await Promise.all([
          axios.get('https://62fe967c41165d66bfc2c79d.mockapi.io/cartShop'),
          axios.get('https://62fe967c41165d66bfc2c79d.mockapi.io/favorite'),
          axios.get('https://62fe967c41165d66bfc2c79d.mockapi.io/products')
        ])
        setIsLoading(false)
        setProductsCart(cartResponse.data)
        setProductsFavorite(favoriteResponse.data)
        setProducts(productsResponse.data)

      }catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [])


  const addToCart = async (obj) => {
    try {
      const findItem = productsCart.find(elem => Number(elem.parentId) === Number(obj.id))
      if (findItem) {
        setProductsCart(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)))
        await axios.delete(`https://62fe967c41165d66bfc2c79d.mockapi.io/cartShop/${findItem.id}`)
      } else {
        const {data} = await axios.post('https://62fe967c41165d66bfc2c79d.mockapi.io/cartShop', obj)
        setProductsCart(prev => [...prev, data])
      }
    } catch (e) {
      alert('Error! Product not added to cart')
      console.log(e)
    }
  }

  const removeItem = (id) => {
    try {
      axios.delete(`https://62fe967c41165d66bfc2c79d.mockapi.io/cartShop/${id}`)
      setProductsCart(prev =>prev.filter(item => item.id !== id))
    }catch (e) {
      console.log(e)
    }
  }

  const addToFavorite = async (obj) => {
    try {
      const findFavorite = productsFavorite.find(elem => Number(elem.parentId) === Number(obj.id))
      if (findFavorite) {
        setProductsFavorite(prev =>prev.filter(item => Number(item.parentId) !== Number(obj.id)))
        await axios.delete(`https://62fe967c41165d66bfc2c79d.mockapi.io/favorite/${findFavorite.id}`)
      } else {
        const {data} = await axios.post('https://62fe967c41165d66bfc2c79d.mockapi.io/favorite', obj)
        setProductsFavorite(prev => [...prev, data])
        setProductsFavorite(prev =>
        prev.map(item => {
          if (item.parentId === data.parent) {
            return {...item, id: data.id }
          } else {
            return item
          }
        }))
      }
    } catch (e) {
      alert("Error! Product not added to favorites!")
      console.log(e)
    }
  }

  const closeCart = () => {
    setShowCart(false)
  }

  const addedCart = (id) => {
    return productsCart.some(elem => Number(elem.parentId) === Number(id))
  }

  const addedFavorite = (id) => {
    return productsFavorite.some(elem => Number(elem.parentId) === Number(id))
  }

  const totalSum = productsCart.reduce((sum, obj) => sum + obj.price, 0)


  return (
      <ThemeContext.Provider value={{products, productsCart, setProductsCart, productsFavorite, totalSum,
        closeCart, addedCart, addedFavorite, addToFavorite}}>
        <div className="App">
          {showCart ? <ShopCart
              items={productsCart}
              closeCart = {closeCart}
              onDeleteCartItem={removeItem}/> : null}

          <Header onClickCart = {() => setShowCart(true)}/>

          <Routes>
            <Route path="/" exact element={<Home
                products={products}
                productsCart={productsCart}
                productsFavorite={productsFavorite}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                addToCart={addToCart}
                isLoading={isLoading}
                addToFavorite={addToFavorite}/>
            }/>
            <Route path="/favorites" exact element={<Favorites/>}/>
            <Route path="/orders" exact element={<Orders/>}/>
          </Routes>
        </div>
      </ThemeContext.Provider>
  );
};


export default App;
