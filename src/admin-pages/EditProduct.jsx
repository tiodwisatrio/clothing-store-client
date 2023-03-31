import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const EditProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductById();
    checkToken();
  }, []);

  // Check jika token tidak ada, maka redirect ke halaman login
  const checkToken = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  };

  // Fungsi yang memuat data product berdasarkan id
  const getProductById = async () => {
    const response = await axios.get(`http://localhost:5000/products/${id}`);
    setTitle(response.data.name);
    setPrice(response.data.price);
    setFile(response.data.image);
    setPreview(response.data.url);
  };

  // Fungsi yang memuat gambar yang diupload
  const loadImage = (e) => {
    const image = e.target.files[0];
    //   validasi ukuran image yang diupload tidak lebih dari 5MB
    if (image.size > 1024 * 1024 * 5) {
      setFile("");
      alert("File size too large");
      return;
    } else {
      setFile(image);
      setPreview(URL.createObjectURL(image));
    }
  };

  // Fungsi yang mengupdate data product di database
  const updateProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("file", file);
    try {
      await axios.patch(`http://localhost:5000/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (title === "") {
        toast.error("Nama product tidak boleh kosong", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
        });
      } else if (price === "") {
        toast.error("Harga product tidak boleh kosong", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
        });
      } else if (file === "") {
        toast.error("Gambar product tidak boleh kosong", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
        });
      } else {
        navigate("/productlist");
        toast.success("Product berhasil diupdate", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
        });
      }
    } catch (error) {
      toast.success("Product gagal diupdate", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className=" flex justify-center p-5">
      <div className="bg-white rounded-md px-5 py-5 w-full md:w-1/2 shadow-lg">
        <h1 className="text-center font-semibold text-teal-600 text-xl mb-8">
          Update Product
        </h1>
        <form onSubmit={updateProduct} className="flex flex-col gap-y-4">
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

          <div
            onClick={updateProduct}
            className="cursor-pointer field mt-8 text-center text-[16px] font-medium bg-teal-600 text-white rounded"
          >
            <div className="control px-2 py-3">
              <button className="button is-success text-center tracking-wide font-semibold">
                Update
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

export default EditProduct;
