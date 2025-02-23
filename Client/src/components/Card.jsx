import React from "react";
import { Link } from "react-router-dom";

function Card() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-white">
      <div className="container grid max-w-screen-xl gap-8 sm:grid-cols-1 md:grid-cols-2">
        <div className="card card-compact bg-base-100 w-full shadow-xl border border-slate-200">
          <figure>
            <img
              src="https://lh3.googleusercontent.com/3zkP2SYe7yYoKKe47bsNe44yTgb4Ukh__rBbwXwgkjNRe4PykGG409ozBxzxkrubV7zHKjfxq6y9ShogWtMBMPyB3jiNps91LoNH8A=s500"
              alt="Youtube"
              className="w-full h-80 sm:h-64 md:h-90 object-cover"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-xl sm:text-lg md:text-2xl font-medium text-gray-700">
              Youtube
            </h2>
            <p className="text-base sm:text-sm md:text-lg text-slate-500">
              Interpreting user sentiments in YouTube comments to understand
              audience opinions and engagement trends.
            </p>
            <div className="card-actions justify-end">
              <Link
                to="/youtube"
                className="btn bg-[#ffcf3a] text-black font-bold"
              >
                Check Now →
              </Link>
            </div>
          </div>
        </div>

        <div className="card card-compact bg-base-100 w-full shadow-xl border border-slate-200">
          <figure>
            <img
              src="https://logos-world.net/wp-content/uploads/2020/06/Amazon-Logo.png"
              alt="Amazon"
              className="w-full h-80 sm:h-64 md:h-90 object-cover"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-xl sm:text-lg md:text-2xl font-medium text-gray-700">
              Amazon
            </h2>
            <p className="text-base sm:text-sm md:text-lg text-slate-500">
              Focused on analyzing customer sentiments in Amazon reviews to
              derive insights about product feedback and customer satisfaction.
            </p>
            <div className="card-actions justify-end">
              <Link
                to="/amazon"
                className="btn bg-[#ffcf3a] text-black font-bold"
              >
                Check Now →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
