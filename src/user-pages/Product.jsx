import React, { useState, useEffect } from "react";
import axios from "axios";
import toRupiah from "@develoka/angka-rupiah-js";
import Navbar from "../components/Navbar";
import { AiOutlineSearch } from "react-icons/ai";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");

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
                  <div className="flex justify-center w-full">
                    <button
                      onClick={() => sendProductToWhatsAppById(product.id)}
                      className="bg-teal-700 rounded px-8 py-3 font-medium w-full"
                    >
                      Beli Sekarang
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
