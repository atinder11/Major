import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { MdComputer } from "react-icons/md";
import FooterImg from "../assets/footer.jpg";

const FooterBg = {
  backgroundImage: `url(${FooterImg})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "bottom center",
};

const Footer = () => {
  return (
    <div style={FooterBg} className="rounded-t-3xl">
      <div className="bg-primary/5">
        <div className="container">
          <div className="grid md:grid-cols-4 md:gap-4 py-5 border-t-2 border-gray-300/10 text-black">
            {/* brand info section */}
            <div className="py-8 px-4 space-y-4">
              <div className="text-2xl flex items-center gap-2 font-bold uppercase">
                <MdComputer className="text-secondary text-4xl" />
                <p className="">
                  Sentiment
                  <br /> Analysis
                </p>
              </div>
              <p>
                Sentiment analysis uses natural language processing to identify
                and categorize emotions in text, such as positive, negative, or
                neutral. It helps businesses gauge customer opinions and improve
                decision-making based on emotional insights.
              </p>
              <div className="flex items-center justify-start gap-5 !mt-6">
                <a href="#" className="hover:text-secondary duration-200">
                  <HiLocationMarker className="text-3xl" />
                </a>
                <a href="#" className="hover:text-secondary duration-200">
                  <FaInstagram className="text-3xl" />
                </a>

                <a href="#" className="hover:text-secondary duration-200">
                  <FaLinkedin className="text-3xl" />
                </a>
              </div>
            </div>
            {/* Footer Links  */}
            <div className="grid grid-cols-2 md:grid-cols-3 md:col-span-3 md:ml-14">
              <div className="py-8 px-4">
                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-5">
                  Important Links
                </h1>
                <ul className="flex flex-col gap-3">
                  <li>
                    <a href="#" className="hover:text-secondary duration-200">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-secondary duration-200">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-secondary duration-200">
                      Contact us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-secondary duration-200">
                      Login
                    </a>
                  </li>
                </ul>
              </div>
              <div className="py-8 px-4">
                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-5">
                  Resources
                </h1>
                <ul className="flex flex-col gap-3">
                  <li>
                    <a href="#" className="hover:text-secondary duration-200">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-secondary duration-200">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-secondary duration-200">
                      FAQs
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-secondary duration-200">
                      Testimonials
                    </a>
                  </li>
                </ul>
              </div>
              <div className="py-8 px-4">
                {/* Google Maps iframe */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.9802606544063!2d77.367587088855!3d28.630353700000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce551491b3ce7%3A0x7335d9fcfd4d9db0!2sJAYPEE%20INSTITUTE%20OF%20INFORMATION%20TECHNOLOGY!5e0!3m2!1sen!2sin!4v1726599475647!5m2!1sen!2sin"
                  width="300"
                  height="300"
                  style={{ border: 10 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
          {/* copyright section  */}
          <div className="mt-8">
            <div className="text-center py-6 border-t-2 border-gray-800/10">
              <span className="text-sm text-black/60">
                {" "}
                @copyright 2024 Sentiment Analysis
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
