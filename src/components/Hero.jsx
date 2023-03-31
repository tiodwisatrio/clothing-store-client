import React from "react";
import Lottie from "react-lottie";
import LottieShop from "../lottie/lottie-shop.json";
import { Link } from "react-router-dom";

const Hero = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LottieShop,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <div className="w-full  rounded text-white grid grid-cols-1 md:grid-cols-2 mt-6 px-4 py-4">
        <div className="">
          <h1
            className="text-slate-900 text-3xl md:text-5xl p-3 leading-tight w-full font-semibold"
            data-aos="fade-right"
            data-aos-easing="linear"
            data-aos-duration="500"
            data-aos-delay="500"
          >
            Discover limited
            <br />
            wear without
            <br />
            limitation
          </h1>
          <p
            className="p-3 tracking-wide text-slate-500 text-[12px] md:text-sm"
            data-aos="fade-right"
            data-aos-easing="linear"
            data-aos-duration="500"
            data-aos-delay="700"
          >
            Generate your street style for the whole
            <br />
            world to discover, and find a street style
            <br />
            that works for you
          </p>
          <div
            className="button flex flex-col md:flex-row gap-4  w-full mt-6 p-2"
            data-aos="fade-right"
            data-aos-easing="linear"
            data-aos-duration="500"
            data-aos-delay="900"
          >
            <Link to="/products">
              <button className="primary-btn w-full md:w-[200px] h-12 bg-teal-600 text-white font-medium rounded">
                Buy Now
              </button>
            </Link>
            <Link to="/contact">
              <button className="secondary-btn w-full md:w-[200px] h-12 border-6 border-teal-600 text-teal-600 rounded -mt-3 md:mt-0">
                Hubungi Kami
              </button>
            </Link>
          </div>
        </div>

        <div
          className="lg:-mt-5 -ml-10 md:ml-0"
          data-aos="fade"
          data-aos-easing="linear"
          data-aos-duration="500"
          data-aos-delay="500"
        >
          <Lottie options={defaultOptions} height={480} width={480} />
        </div>
      </div>
    </>
  );
};

export default Hero;
