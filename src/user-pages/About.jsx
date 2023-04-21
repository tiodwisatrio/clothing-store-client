import React from "react";
import Navbar from "../components/Navbar";
import Lottie from "react-lottie";
import LottieAbout from "../lottie/lottie-about.json";
import { Link } from "react-router-dom";

const About = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LottieAbout,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Navbar />
      <>
        <div className="w-full  rounded text-white flex flex-col-reverse md:flex-row p-4 mt-10">
          <div className="w-[100%] md:w-[50%] mt-5">
            <h1
              className="text-slate-900 text-[16px] p-3  w-full font-medium -mb-4 opacity-60"
              data-aos="fade"
              data-aos-easing="linear"
              data-aos-duration="300"
              data-aos-delay="300"
            >
              About GrowthStreet
            </h1>

            <h1
              className="text-slate-900 text-5xl p-3 leading-tight w-full font-semibold"
              data-aos="fade"
              data-aos-easing="linear"
              data-aos-duration="300"
              data-aos-delay="500"
            >
              Less is More
              <br />
              Quality is Everything
              <br />
            </h1>
            <p
              className="p-3 tracking-wide text-slate-500 text-sm"
              data-aos="fade"
              data-aos-easing="linear"
              data-aos-duration="300"
              data-aos-delay="700"
            >
              We offer the best collection of clothes for you who prioritize
              quality and simple yet modern style. Enjoy a calm and relaxing
              shopping experience in our store, and discover clothing products
              that can be worn in various occasions,
            </p>
            <div
              className="button flex flex-row w-full mt-10 p-2"
              data-aos="fade"
              data-aos-easing="linear"
              data-aos-duration="300"
              data-aos-delay="900"
            >
              <button className="w-full primary-btn h-12 bg-teal-600 text-white font-medium rounded">
                <Link to="/contact">Contact Us</Link>
              </button>
            </div>
          </div>
          <div className="lg:-mt-5 -ml-28 md:ml-0">
            <Lottie options={defaultOptions} height={480} width={480} />
          </div>
        </div>
      </>
    </div>
  );
};

export default About;
