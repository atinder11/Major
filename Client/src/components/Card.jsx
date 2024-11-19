import React from 'react';

function Card() {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center p-10 bg-white">
        <div className="container grid max-w-screen-xl gap-8 lg:grid-cols-2">
          <div className="flex flex-col rounded-md border border-slate-200">
            <div className="h-64">
              <img
                src="https://lh3.googleusercontent.com/3zkP2SYe7yYoKKe47bsNe44yTgb4Ukh__rBbwXwgkjNRe4PykGG409ozBxzxkrubV7zHKjfxq6y9ShogWtMBMPyB3jiNps91LoNH8A=s500"
                className="w-full h-full object-cover rounded-t-md"
                alt="omnichannel"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-medium text-gray-700">Youtube</h3>
              <p className="mt-2 text-slate-500">
              Interpreting user sentiments in YouTube comments to understand audience opinions and engagement trends.
                
              </p>
              <a href="" className="mt-2 inline-flex text-secondary font-bold ">Check Now →</a>
            </div>
          </div>
          <div className="flex flex-col rounded-md border border-slate-200">
            <div className="h-64">
              <img
                src="https://logos-world.net/wp-content/uploads/2020/06/Amazon-Logo.png"
                className="w-full h-full object-cover rounded-t-md"
                alt="live-chat"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-medium text-gray-700">Amazon</h3>
              <p className="mt-2 text-slate-500">
              Focused on analyzing customer sentiments in Amazon reviews to derive insights about product feedback and customer satisfaction.
              </p>
              <a href="" className="mt-2 inline-flex text-secondary font-bold">Check Now →</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
