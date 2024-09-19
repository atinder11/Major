import React from "react";
import SentimentImg1 from "../assets/sentiment1.jpeg";
import SentimentImg2 from "../assets/sentiment2.jpg";

const Aboutus = () => {
  const banners = [
    {
      image: SentimentImg1,
      tag: "ANALYZE WITH PRECISION",
      title: "Real-time Opinion Analysis Tool",
      subtitle:
        "Our Opinion Analysis tool provides accurate insights into text data by evaluating the tone, attitude, and emotions expressed. Whether you're analyzing customer reviews or social media feedback, our tool helps you gauge public opinion effortlessly.",
      link: "#",
      reverse: false, // First section normal
    },
    {
      image: SentimentImg2,
      tag: "UNDERSTAND Opinion ",
      title: "Unlock Hidden Insights from Text Data",
      subtitle:
        "Harness the power of machine learning and natural language processing (NLP) to analyze text sentiment. Our project offers a scalable solution to interpret positive, negative, and neutral Opinion from various data sources like product reviews, surveys, and more.",
      link: "#",
      reverse: true, // Second section reversed
    },
  ];

  return (
    <div className="bg-[#f9f9f9] pb-14">
      <br />
      <div className="container mx-auto">
        {banners.map((banner, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
          >
            {/* Banner Image section */}
            <div
              className={`flex justify-start items-center ${
                banner.reverse ? "md:order-last md:justify-end" : ""
              }`}
            >
              <img
                src={banner.image}
                alt="Sentiment Analysis"
                className="w-[400px] h-full object-cover"
              />
            </div>
            {/* Banner text section */}
           
            <div className="flex flex-col justify-center text-center md:text-left space-y-4 lg:max-w-[500px]">
              <p className="text-sm text-orange-600 font-semibold capitalize">
                {banner.tag}
              </p>
              <h2 className="text-xl lg:text-2xl font-semibold capitalize">
                {banner.title}
              </h2>
              <p className="text-sm text-slate-500">{banner.subtitle}</p>
              <div className="flex justify-center md:justify-start">
                <a href={banner.link} className="primary-btn mt-5">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Aboutus;
