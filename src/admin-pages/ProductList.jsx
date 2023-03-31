import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import toRupiah from "@develoka/angka-rupiah-js";
import { AiOutlineSearch } from "react-icons/ai";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const convertToRupiah = (angka) => {
    return toRupiah(angka, { formal: false, Symbol: "Rp" });
  };

  const navigate = useNavigate();

  // Fungsi yang memfilter data product berdasarkan masukkan dari user
  const handleSearch = (e) => {
    const query = e.target.value;
    setQuery(query);
  };

  // Fungsi untuk memfilter data product dan menampilkan hasilnya
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  const getProducts = async () => {
    const response = await axios.get(`http://localhost:5000/products`);
    setProducts(response.data);
  };

  useEffect(() => {
    getProducts();
    checkToken();
  }, []);

  // Check jika token tidak ada, maka redirect ke halaman login
  const checkToken = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  };

  const deleteProduct = async (id) => {
    try {
      if (window.confirm("Yakin ingin menghapus ini?")) {
        await axios.delete(`http://localhost:5000/products/${id}`);
        toast.success("Product berhasil dihapus", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
        });
        getProducts();
      } else {
        toast.error("Product batal dihapus", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
        });
      }
    } catch (error) {
      toast.error("Product gagal dihapus", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    if (!localStorage.getItem("token")) {
      navigate("/login");
      toast.success("Logout Berhasil", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      });
    } else {
      navigate("/productlist");
    }
  };

  return (
    <div className="container">
      <div className="header mb-10 mt-5">
        <h1 className="font-bold text-xl text-center text-teal-600">
          GrowthStreet
        </h1>
        <p className="text-center text-[12px] text-slate-700 mt-1 mb-5">
          Keep it simple, stay stylish with our minimal streetwear✨
        </p>
        <div className="flex items-center justify-center m-4">
          <Link
            to={"/addproduct"}
            className="bg-teal-600 text-center text-white px-3 py-2 rounded border-none w-36 text-sm"
          >
            Add Product
          </Link>

          {/* Button untuk Logout */}
          <Link
            to={"/login"}
            onClick={handleLogout}
            className="bg-rose-600 text-center text-white px-3 py-2 rounded border-none w-36 text-sm ml-3"
          >
            Logout
          </Link>
        </div>

        <div className="flex justify-center gap-x-3">
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

      <div className="columns w-full flex flex-row flex-wrap gap-8 items-center justify-center ">
        {filteredProducts.map((product) => (
          <div key={product.id}>
            <div className="card w-[250px] flex flex-col rounded-md  pb-4  shadow-2xl  bg-white">
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
                <Link
                  to={`/editproduct/${product.id}`}
                  className="bg-orange-600 w-full py-2 rounded font-medium"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="bg-rose-600 w-full py-2 rounded font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
