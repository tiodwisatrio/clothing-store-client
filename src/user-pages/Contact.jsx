import React, { useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Lottie from "react-lottie";
import LottieContact from "../lottie/lottie-contact.json";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    if (name === "") {
      toast.error("Please enter your name");
      return;
    } else if (email === "") {
      toast.error("Please enter your email");
      return;
    } else if (email !== "" && !email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    } else if (message === "") {
      toast.error("Please enter your message");
      return;
    } else if (!name && !email && !message) {
      toast.error("Please fill all the fields");
      return;
    } else {
      emailjs
        .sendForm(
          "service_enk49vc",
          "template_9uonjal",
          form.current,
          "O8lqlTVuYUa20Xtwm"
        )
        .then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );
      setName("");
      setEmail("");
      setMessage("");
      toast.success("Message sent successfully");
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LottieContact,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Navbar />
      <>
        <div className="w-full rounded text-white flex flex-col-reverse md:flex-row mt-6 px-4 py-4 gap-y-8 md:gap-x-10">
          <form
            ref={form}
            onSubmit={sendEmail}
            className="w-[100%] md:w-[50%] shadow-lg bg-white"
            data-aos="fade-top"
            data-aos-easing="linear"
            data-aos-duration="300"
            data-aos-delay="300"
          >
            <h1 className="text-lg text-slate-800 m-3 font-semibold">
              Contact Us
            </h1>

            <div className="w-full grid grid-cols-2">
              <div className="p-3 flex flex-col gap-y-2">
                <label className="text-[14px] text-slate-800">Full Name</label>
                <input
                  type="text"
                  placeholder="your name..."
                  name="user_name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="placeholder:text-[13px] text-[13px]  px-2 py-2 rounded-sm text-teal-600 border focus:outline-none focus:border-teal-500 shadow-sm "
                />
              </div>
              <div className="p-3 flex flex-col gap-y-2">
                <label className="text-[14px] text-slate-800">Email</label>
                <input
                  type="text"
                  placeholder="your email..."
                  name="user_email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="placeholder:text-[13px] text-[13px]  px-2 py-2 rounded-sm text-teal-600 border focus:outline-none focus:border-teal-500 shadow-sm "
                />
              </div>
            </div>

            <div className="p-3 flex flex-col gap-y-2 ">
              <label className="text-[14px] text-slate-800">Message</label>
              <textarea
                rows={7}
                cols={10}
                type="text"
                placeholder="your messages..."
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="placeholder:text-[13px] text-[13px]  px-2 py-2 rounded-sm text-teal-600 border focus:outline-none focus:border-teal-500 shadow-sm "
              />
            </div>
            <div className="p-3 mt-4">
              <button className="w-full bg-teal-700 rounded py-3 transition-all duration-600 hover:bg-teal-800">
                Send
              </button>
            </div>
          </form>
          <div className="lg:-translate-y-7 sm:mt-10">
            <Lottie options={defaultOptions} />
          </div>
        </div>
      </>
    </div>
  );
};

export default Contact;
