import React, { useState, useEffect } from "react";
import axios from "axios";
import toRupiah from "@develoka/angka-rupiah-js";
import Navbar from "../components/Navbar";
import { AiOutlineSearch } from "react-icons/ai";
import { FaCartPlus } from "react-icons/fa";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState([]);

  // check if user doing reload page, the cart will be saved
  useEffect(() => {
    const checkCart = localStorage.getItem("cart");
    if (checkCart) {
      setCart(JSON.parse(checkCart));
    }
  }, []);

  // Make function that get product id and save the product to cart table in database and save to local storage
  const addCart = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/products/${id}`);
      const product = response.data;
      const data = {
        id_product: product.id,
        quantity: 1,
      };
      await axios.post(`http://localhost:5000/cart`, data);
      setCart([...cart, product]);
      alert("Product added to cart");
    } catch (error) {
      console.log(error.message);
    }
  };

  const addToCart = async (id) => {
    try {
      //     // make function that if user doing reload page, the cart will be saved
      const checkCart = localStorage.getItem("cart");
      if (checkCart) {
        setCart(JSON.parse(checkCart));
      }
      const response = await axios.get(`http://localhost:5000/products/${id}`);
      const product = response.data;

      // Check if product add 2 or 3 times, multiply quantity and price
      const checkProduct = cart.find((product) => product.id === id);
      if (checkProduct) {
        const newCart = cart.map((product) => {
          const quantity = 1;
          if (product.id === id) {
            return {
              ...product,
              // quantity: quantity + quantity,
              // Making quantity increment by 1 and more
              quantity: quantity + 1,
              price: product.price + product.price,
            };
          }
          return product;
        });
        setCart(newCart);
        return;
      }

      setCart([...cart, product]);
      console.log(cart);
    } catch (error) {
      console.log(error.message);
    }
  };

  // const deleteFromCart = (id) => {
  //   try {
  //     const newCart = cart.filter((product) => product.id !== id);
  //     setCart(newCart);
  //   } catch (error) {}
  // };

  //! Masih salah di sini
  const handlePlusButton = (id) => {
    try {
      const newCart = cart.map((product) => {
        if (product.id === id) {
          return {
            ...product,
            quantity: product.quantity + 1,
            price: product.price + product.price,
          };
        }
        return product;
      });
      setCart(newCart);
    } catch (error) {
      console.log(error.message);
    }
  };

  //! Masih salah di sini!
  const handleMinusButton = (id) => {
    const newCart = cart.map((product) => {
      if (product.id === id && product.quantity > 1 && product.price > 1) {
        return {
          ...product,
          price: product.price - product.price,
          quantity: product.quantity - 1,
        };
      } else if (product.id === id && product.quantity === 1) {
        return {
          ...product,
          price: product.price,
          quantity: product.quantity,
        };
      }
      return product;
    });
    setCart(newCart);
  };

  // const handleMinusButton = (id) => {
  //   try {
  //     const newCart = cart.map((product) => {
  //       if (product.id === id && product.quantity > 1) {
  //         return {
  //           ...product,
  //           quantity: product.quantity - 1,
  //           price: product.price - product.price,
  //         };
  //       } else if (product.id === id && product.quantity === 1) {
  //         return {
  //           ...product,
  //           quantity: product.quantity,
  //           price: product.price
  //         };
  //       }
  //       return product;
  //     });
  //     setCart(newCart);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  const sendProductToWhatsAppById = async (id) => {
    const response = await axios.get(`http://localhost:5000/products/${id}`);
    const name = response.data.name;
    const price = response.data.price;
    const phone = "6288972061745";
    const text = `Hi, GrowthStreet👋 Saya tertarik dengan produk *${name}* yang dijual dengan harga *Rp ${price}*. Terima Kasih✨`;
    const url = `https://api.whatsapp.com/send?phone=${phone}&text=${text}`;
    window.open(url, "_blank");
  };

  // Fungsi untuk mengambil data product dari API
  const getProducts = async () => {
    const response = await axios.get(`http://localhost:5000/products`);
    setProducts(response.data);
  };

  const convertToRupiah = (angka) => {
    return toRupiah(angka, { formal: false, Symbol: "Rp" });
  };

  // Fungsi untuk mencari data product berdasarkan masukkan dari user
  const handleSearch = (e) => {
    const query = e.target.value;
    setQuery(query);
  };

  // Fungsi untuk memfilter data product dan menampilkan hasilnya
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  // Fungsi bawaan react yg merender ulang component ketika ada perubahan state
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="bg-white shadow-lg rounded w-full p-4 flex flex-col justify-end">
        <h2 className="text-xl font-bold mt-10">Cart</h2>
        <div className="list-disc list-inside">
          {cart.map((product) => (
            <div key={product.id} className="flex flex-row items-center gap-2">
              <img
                src={product.url}
                alt="images"
                className="w-20 h-auto object-cover"
              />
              <div className="flex flex-col justify-center">
                <p>Product Name : {product.name}</p>
                <h2>Price : {convertToRupiah(product.price)}</h2>
                <div>
                  <button
                    onClick={() => handleMinusButton(product.id)}
                    className="bg-red-500 px-2 py-1 rounded text-white"
                  >
                    -
                  </button>
                  <h1>{product.quantity}</h1>
                  <button
                    onClick={() => handlePlusButton(product.id)}
                    className="bg-teal-600 px-2 py-1 rounded text-white"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container">
        <div className="header mb-10 mt-5">
          <h1
            className="font-bold text-xl text-center text-teal-600"
            data-aos="fade"
            data-aos-easing="linear"
            data-aos-duration="300"
            data-aos-delay="300"
          >
            GrowthStreet
          </h1>
          <p
            className="text-center text-[12px] text-slate-700 mt-1 mb-5"
            data-aos="fade"
            data-aos-easing="linear"
            data-aos-duration="300"
            data-aos-delay="500"
          >
            Keep it simple, stay stylish with our minimal streetwear✨
          </p>
          <div
            className="flex justify-center gap-x-3"
            data-aos="fade"
            data-aos-easing="linear"
            data-aos-duration="300"
            data-aos-delay="700"
          >
            <div className="flex items-center justify-center rounded text-sm placeholder:text-sm outline-none bg-transparent border-2 border-gray-200 px-2 py-2">
              <AiOutlineSearch className="mx-2 text-slate-500" />
              <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="search product..."
                className=" outline-none"
              />
            </div>

            <button className="bg-teal-600 px-4 py-2 rounded text-white text-sm">
              Search
            </button>
          </div>
        </div>
        <div
          className="columns w-full flex flex-row flex-wrap gap-8 items-center justify-center"
          data-aos="fade"
          data-aos-easing="linear"
          data-aos-duration="300"
          data-aos-delay="900"
        >
          {filteredProducts.map((product) => (
            <div key={product.id}>
              <div className="card bg-white w-[250px] flex flex-col rounded-md  pb-4  shadow-2xl ">
                {/* card image */}
                <div className="card-image">
                  <img
                    src={product.url}
                    alt="image"
                    className="object-cover w-full h-48"
                  />
                </div>
                {/* card content */}
                <div className="card-content m-3 ">
                  <div className="flex flex-row items-center justify-between">
                    <span className="text-[10px] bg-violet-500 px-2 py-1 text-white font-semibold rounded-full">
                      Best Product
                    </span>
                    <p className="text-slate-500 text-[12px]">144 Terjual</p>
                  </div>
                  <p className="text-[14px] mt-3">{product.name}</p>
                  <h1 className="mt-2 font-semibold text-[20px]">
                    {convertToRupiah(product.price)}
                  </h1>
                </div>
                {/* card action */}
                <div className="card-action flex flex-row gap-x-3 text-center w-full h-[9] justify-between px-3 text-white text-sm mt-4">
                  {/* <BuyNowButton /> */}
                  <div className="flex items-center justify-between w-full gap-x-2 h-full">
                    <button
                      onClick={() => sendProductToWhatsAppById(product.id)}
                      className="bg-teal-700 rounded font-medium w-3/4 py-3"
                    >
                      Beli Sekarang
                    </button>
                    <button
                      onClick={() => addToCart(product.id)}
                      // onClick={() => saveProductToCart(product.id)}
                      className="bg-orange-600 rounded font-medium w-1/4 py-4 text-[13px] flex items-center justify-center"
                    >
                      <FaCartPlus className="w-16" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
