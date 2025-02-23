import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, BarElement } from 'chart.js';
import "daisyui";
import Dashboard from '../components/Dashboard';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, BarElement);

const bestProducts = [
  "Echo Dot - Smart speaker with Alexa",
  "Fire Stick - Streaming device with voice control",
  "Kindle Paperwhite - Waterproof e-reader"
];

const worstProducts = [
  "Old Gen Bluetooth Speaker - Low battery life",
  "Basic VR Headset - Poor resolution and tracking",
  "Generic Smartwatch - Limited functionality"
];

const userEngagement = [
  { date: "Jan", reviews: 30 },
  { date: "Feb", reviews: 45 },
  { date: "Mar", reviews: 60 },
];

const salesData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  datasets: [
    {
      label: "Total Sales",
      data: [5000, 7000, 8500, 9000, 10000],
      borderColor: "#ffcf3a",
      backgroundColor: "rgba(255, 207, 58, 0.2)",
    },
  ],
};

const productSalesData = {
  labels: ["Echo Dot", "Fire Stick", "Kindle Paperwhite"],
  datasets: [
    {
      label: "Sales (Units)",
      data: [1500, 1200, 900],
      backgroundColor: "#ffcf3a",
    },
    {
      label: "Revenue ($)",
      data: [45000, 36000, 27000],
      backgroundColor: "#ffa500",
    },
  ],
};
<Dashboard/>

function AmazonSellerDashboard() {
  return (
    <div className="flex flex-col min-h-screen p-6 bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Amazon Seller Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card bg-white shadow-xl p-6 w-full rounded-xl">
          <h2 className="text-xl font-semibold text-gray-800">Product Management</h2>
          <select className="select select-bordered w-full mt-3">
            <option>Select Product</option>
            <option>Echo Dot</option>
            <option>Fire Stick</option>
          </select>
        </div>

        <div className="card bg-white shadow-xl p-6 w-full rounded-xl">
          <h2 className="text-xl font-semibold text-gray-800">Sentiment Analysis</h2>
          <p className="text-gray-600 mt-3">Overall Sentiment: Positive</p>
          <div className="mt-4">
            <Line data={{ labels: ['Jan', 'Feb', 'Mar'], datasets: [{ label: 'Sentiment Trend', data: [80, 70, 90] }] }} />
          </div>
        </div>

        <div className="card bg-white shadow-xl p-6 w-full rounded-xl">
          <h2 className="text-xl font-semibold text-gray-800">Sales & Profit Overview</h2>
          <Line data={salesData} />
        </div>
      </div>

      <div className="card bg-white shadow-xl p-6 mt-6 w-full rounded-xl overflow-x-auto">
        <h2 className="text-xl font-semibold text-gray-800">Product Sales & Revenue</h2>
        <Bar data={productSalesData} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="card bg-white shadow-xl p-6 w-full rounded-xl">
          <h2 className="text-xl font-semibold text-gray-800">Best Performing Products</h2>
          <ul className="mt-3">
            {bestProducts.map((product, index) => (
              <li key={index} className="text-gray-700">{product}</li>
            ))}
          </ul>
        </div>

        <div className="card bg-white shadow-xl p-6 w-full rounded-xl">
          <h2 className="text-xl font-semibold text-gray-800">Worst Performing Products</h2>
          <ul className="mt-3">
            {worstProducts.map((product, index) => (
              <li key={index} className="text-gray-700">{product}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card bg-white shadow-xl p-6 mt-6 w-full rounded-xl">
        <h2 className="text-xl font-semibold text-gray-800">User Engagement Insights</h2>
        <p className="text-gray-600">Analyzing customer interaction trends over time.</p>
        <ul className="mt-3">
          {userEngagement.map((data, index) => (
            <li key={index} className="text-gray-700">{data.date}: {data.reviews} reviews received</li>
          ))}
        </ul>
      </div>

      <div className="card bg-white shadow-xl p-6 mt-6 w-full flex flex-col sm:flex-row justify-between items-center rounded-xl">
        <div className="flex gap-4">
          <button className="btn bg-[#ffcf3a] text-black font-medium px-4 py-2 rounded-lg">Feedback</button>
          <button className="btn bg-[#ffcf3a] text-black font-medium px-4 py-2 rounded-lg">Export CSV</button>
        </div>
      </div>
    </div>
  );
}

export default AmazonSellerDashboard;
