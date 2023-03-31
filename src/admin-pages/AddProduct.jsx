import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    checkToken();
  }, []);

  // Check jika token tidak ada, maka redirect ke halaman login
  const checkToken = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  };

  // Fungsi yang memuat gambar yang diupload
  const loadImage = (e) => {
    const image = e.target.files[0];
    //   validasi ukuran image yang diupload tidak lebih dari 5MB
    if (image.size > 1024 * 1024 * 5) {
      setFile("");
      toast.error("Ukuran file terlalu besar", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      });

      return;
    } else {
      setFile(image);
      setPreview(URL.createObjectURL(image));
    }
  };

  // Fungsi yang menyimpan data product ke database
  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("file", file);
    try {
      await axios.post("http://localhost:5000/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/productlist");
      toast.success("Product berhasil ditambahkan", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      });
    } catch (error) {
      if (title === "") {
        toast.error("Nama product tidak boleh kosong", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
        });
      } else if (price === "") {
        toast.error("Harga product tidak boleh kosong", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
        });
      } else if (file === "") {
        toast.error("Gambar product tidak boleh kosong", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
        });
      } else {
        toast.error("Product gagal ditambahkan", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
        });
      }
    }
  };

  return (
    <div className=" flex justify-center p-5">
      <div className="bg-white rounded-md px-5 py-5 w-full md:w-1/2 shadow-lg">
        <h1 className="text-center font-semibold text-teal-600 text-xl mb-8">
          Add Product
        </h1>
        <form onSubmit={saveProduct} className="flex flex-col gap-y-4">
          <div className="field flex flex-col">
            <label className="label ">Nama Product</label>
            <input
              type="text"
              className="title mt-2 px-2 py-2 rounded-md border-2 border-gray-300 text-sm placeholder-gray-400 focus:outline-none focus:border-teal-600 focus:border-transparent"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Product Name"
            />
          </div>

          <div className="field flex flex-col">
            <label className="label">Harga Product</label>
            <input
              type="number"
              className="title mt-2 px-2 py-2 rounded-md border-2 border-gray-300 text-sm placeholder-gray-400 focus:outline-none focus:border-teal-600 focus:border-transparent"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Product Price"
            />
          </div>

          <div className="field">
            <label className="label">Gambar Product</label>
            <div className="control">
              <div className="file mt-2">
                <label className="file-label">
                  <input
                    type="file"
                    className="file-input"
                    onChange={loadImage}
                  />
                </label>
              </div>
            </div>
          </div>

          {preview ? (
            <figure>
              <img src={preview} alt="Preview" />
            </figure>
          ) : (
            ""
          )}

          <div className="field mt-8 text-center text-[16px] font-medium bg-teal-600 text-white rounded">
            <div className="control px-2 py-3">
              <button className="button is-success text-center tracking-wide font-semibold">
                Save
              </button>
            </div>
          </div>
          <Link to={"/productlist"} className="text-center mt-4 text-sm ">
            Kembali
          </Link>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
