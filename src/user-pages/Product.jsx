import React, { useState, useEffect } from "react";
import axios from "axios";
import toRupiah from "@develoka/angka-rupiah-js";
import Navbar from "../components/Navbar";
import { AiOutlineSearch } from "react-icons/ai";
import { FaCartPlus } from "react-icons/fa";
import Lottie from "react-lottie";
import LottieCart from "../lottie/lottie-cart.json";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");

  console.log(products);

  // Carts
  const [items, setItems] = useState([]);

  // Function to add an item to the cart
  const addToCart = (item) => {
    const existingItem = items.find((i) => i.id === item.id);
    if (existingItem) {
      const updatedItems = items.map((i) => {
        if (i.id === item.id) {
          return { ...i, quantity: i.quantity + 1 };
        }
        return i;
      });
      setItems(updatedItems);
    } else {
      setItems([...items, { ...item, quantity: 1 }]);
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LottieCart,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  // Function to remove an item from the cart
  // const removeFromCart = (item) => {
  //   const updatedItems = items.filter((i) => i.id !== item.id);
  //   setItems(updatedItems);
  // };

  // Render the cart items
  const renderCartItems = () => {
    if (items.length === 0) {
      return <Lottie options={defaultOptions} height={200} width={200} />;
    }

    return (
      <div className="w-full flex flex-col gap-y-4 ">
        <div className=" h-[60vh]">
          {items.map((item, index) => {
            return (
              <div key={index} className="">
                <div className="flex flex-row items-center gap-x-1">
                  <img src={item.url} alt={item.name} className="w-24" />
                  <div className="flex flex-col gap-y-1">
                    <p className="text-[12px] opacity-90">{item.name}</p>
                    <h4 className="text-[15px] text-teal-800 font-semibold">
                      {convertToRupiah(item.price)}
                    </h4>
                    <div className="flex flex-row w-20 items-center justify-between mt-1">
                      <button
                        onClick={() => decreaseProductQuantity(item.id)}
                        className="bg-rose-500 px-2 py-[1px] text-white rounded"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => increaseProductQuantity(item.id)}
                        className="bg-teal-700 px-2 py-[1px] text-white rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const increaseProductQuantity = (id) => {
    const existingItem = items.find((i) => i.id === id);
    if (existingItem) {
      const updatedItems = items.map((i) => {
        if (i.id === id) {
          return { ...i, quantity: i.quantity + 1 };
        }
        return i;
      });
      setItems(updatedItems);
    }
  };

  const decreaseProductQuantity = (id) => {
    const existingItem = items.find((i) => i.id === id);
    if (existingItem) {
      if (existingItem.quantity === 1) {
        const updatedItems = items.filter((item) => item.id !== id);
        setItems(updatedItems);
      } else {
        const updatedItems = items.map((i) => {
          if (i.id === id) {
            return { ...i, quantity: i.quantity - 1 };
          }
          return i;
        });
        setItems(updatedItems);
      }
    }
  };

  const calculateTotalPrice = () => {
    return items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

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

  const handleCheckout = () => {
    const totalPrice = calculateTotalPrice();
    const message = `Hi saya mau membeli product di bawah ini : \n\n${items.map(
      (item) => `${item.name} - ${item.quantity} pcs\n`
    )}\nTotal Price: $${totalPrice} \n\nTerima Kasih`;

    const whatsappLink = `https://wa.me/6288972061745?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappLink, "_blank");
  };

  return (
    <>
      <Navbar />
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
          <div className="flex flex-col-reverse justify-center items-center md:items-start md:flex-row w-full gap-x-3">
            {/* productlist */}
            <div className="flex flex-row w-3/4 flex-wrap gap-3  justify-center shadow-lg px-2 py-2 rounded">
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
                        <p className="text-slate-500 text-[12px]">
                          144 Terjual
                        </p>
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
                          className="bg-teal-700 rounded font-medium w-3/4 py-3 transition-all duration-200 hover:bg-teal-800"
                        >
                          Beli Sekarang
                        </button>
                        <button
                          onClick={() => addToCart(product)}
                          // onClick={() => saveProductToCart(product.id)}
                          className="bg-orange-600 rounded font-medium w-1/4 py-4 text-[13px] flex items-center justify-center transition-all duration-300 hover:bg-orange-700"
                        >
                          <FaCartPlus className="w-16" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* carts */}
            <div className="w-full md:w-1/4 h-full bg-white shadow-lg rounded px-3 py3">
              <h1>Carts</h1>
              {renderCartItems()}
              <div className="flex flex-row justify-between mt-8 items-center">
                <h1>Total Price :</h1>
                {/* <h1>{calculateTotalPrice()}</h1> */}
                <h1 className="font-semibold">
                  {convertToRupiah(calculateTotalPrice())}
                </h1>
              </div>
              <button
                onClick={handleCheckout}
                className="bg-teal-700 w-full py-4 rounded mt-5 text-white mb-5 transition-all duration-200 hover:bg-teal-800"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <div>
        <h1>Carts</h1>
        <div>
          <h2>Cart</h2>
          {renderCartItems()}
        </div>
      </div> */}
    </>
  );
};

export default Product;
