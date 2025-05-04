import React, { useState, useEffect } from "react";
import { Line, Bar, Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import "daisyui";
import Dashboard from "../components/Dashboard";
import { useLocation } from "react-router-dom";
import axios from "axios";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Tooltip,
  Legend,
  Title
);

// const bestProducts = [
//   "Echo Dot - Smart speaker with Alexa",
//   "Fire Stick - Streaming device with voice control",
//   "Kindle Paperwhite - Waterproof e-reader",
// ];

// const worstProducts = [
//   "Old Gen Bluetooth Speaker - Low battery life",
//   "Basic VR Headset - Poor resolution and tracking",
//   "Generic Smartwatch - Limited functionality",
// ];

// const userEngagement = [
//   { date: "Jan", reviews: 30 },
//   { date: "Feb", reviews: 45 },
//   { date: "Mar", reviews: 60 },
// ];

// const salesData = {
//   labels: ["Jan", "Feb", "Mar", "Apr", "May"],
//   datasets: [
//     {
//       label: "Total Sales",
//       data: [5000, 7000, 8500, 9000, 10000],
//       borderColor: "#ffcf3a",
//       backgroundColor: "rgba(255, 207, 58, 0.2)",
//     },
//   ],
// };

// const productSalesData = {
//   labels: ["Echo Dot", "Fire Stick", "Kindle Paperwhite"],
//   datasets: [
//     {
//       label: "Sales (Units)",
//       data: [1500, 1200, 900],
//       backgroundColor: "#ffcf3a",
//     },
//     {
//       label: "Revenue ($)",
//       data: [45000, 36000, 27000],
//       backgroundColor: "#0063ff",
//     },
//   ],
// };
<Dashboard />;

function AmazonSellerDashboard() {
  const location = useLocation();
  const receivedData = location.state?.data;
  const productNames =
    receivedData?.products?.map((product) => product[0]) || [];
  const bestProducts = receivedData?.products?.slice(0, 3).map((p) => p[0]);
  const worstProducts = receivedData?.products?.slice(-3).map((p) => p[0]);
  const filtered_bar = receivedData?.products?.filter(
    (product) => parseFloat(product[7]) > 0
  );
  const filtered_scatter =
    receivedData?.products?.filter((p) => p[1] && p[7]) || [];
  const labels = filtered_bar.map((product) => product[0]);
  const sales = filtered_bar.map((product) => parseFloat(product[7]));
  const revenue = filtered_bar.map((product) => parseFloat(product[8]));
  const [selectedProduct, setSelectedProduct] = useState("");
  const [sentimentTrend, setSentimentTrend] = useState(null);
  const [userEngagement, setUserEngagement] = useState([]);

  const handleExportPDF = () => {
    window.print();
  };

  const productSalesData = {
    labels: labels,
    datasets: [
      {
        label: "Sales (Units)",
        data: sales,
        backgroundColor: "#ffcf3a",
        yAxisID: "y",
      },
      {
        label: "Revenue (₹)", // use ₹ if you're showing Indian Rupees
        data: revenue,
        backgroundColor: "#0063ff",
        yAxisID: "y1",
      },
    ],
  };

  const scatterChartData = {
    datasets: [
      {
        label: "Rating vs Sales",
        data: filtered_scatter.map((p) => ({
          x: parseFloat(p[1]),
          y: parseFloat(p[7]),
        })),
        backgroundColor: "#34d399",
      },
    ],
  };

  const scatterChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Rating vs Sales Scatter Plot",
        font: {
          size: 18,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Rating: ${context.raw.x}, Sales: ${context.raw.y}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Product Rating",
        },
        min: 0,
        max: 5,
      },
      y: {
        title: {
          display: true,
          text: "Sales",
        },
        beginAtZero: true,
      },
    },
  };

  const sendLinkToBackend = async (link) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/product-data", {
        product_link: link,
      });
      console.log("Received product details:", response.data);
      setSentimentTrend(response.data.sentiment_trend);
      setUserEngagement(response.data.user_engagement);
    } catch (error) {
      console.error("Error sending product link:", error);
    }
  };

  const handleProductChange = (e) => {
    const selectedName = e.target.value;
    setSelectedProduct(selectedName);
    const productObj = receivedData?.products?.find(
      (product) => product[0] === selectedName
    );

    if (productObj) {
      const productLink = productObj[4];
      sendLinkToBackend(productLink);
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-6 bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
        Amazon Seller Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card bg-white shadow-xl p-6 w-full rounded-xl">
          <h2 className="text-xl font-semibold text-gray-800">
            Product Management
          </h2>
          <select
            className="select select-bordered w-full mt-3"
            value={selectedProduct}
            onChange={handleProductChange}
          >
            <option value="">Select Product</option>
            {productNames.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className="card bg-white shadow-xl p-6 w-full rounded-xl">
          <h2 className="text-xl font-semibold text-gray-800">
            Sentiment Analysis
          </h2>
          <div className="mt-4">
            {sentimentTrend && (
              <Line
                data={{
                  labels: sentimentTrend.labels,
                  datasets: sentimentTrend.datasets.map((dataset, idx) => ({
                    ...dataset,
                    borderColor: ["#10b981", "#ef4444", "#fbbf24"][idx],
                    backgroundColor: ["#10b98144", "#ef444444", "#fbbf2444"][
                      idx
                    ],
                    fill: true,
                  })),
                }}
              />
            )}
          </div>
        </div>

        <div className="card bg-white shadow-xl p-6 w-full rounded-xl overflow-x-auto">
          <h2 className="text-xl font-semibold text-gray-800">
            Sales & Profit Overview
          </h2>
          <Scatter data={scatterChartData} options={scatterChartOptions} />
        </div>
      </div>

      <div className="card bg-white shadow-xl p-6 mt-6 w-full rounded-xl overflow-x-auto">
        <h2 className="text-xl font-semibold text-gray-800">
          Product Sales & Revenue
        </h2>
        <div
          style={{
            width: `${productSalesData.labels.length * 150}px`,
            height: "400px",
          }}
        >
          <Bar
            data={productSalesData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "top",
                },
              },
              scales: {
                x: {
                  ticks: {
                    maxRotation: 45,
                    minRotation: 45,
                    callback: function (val, index) {
                      const label = this.getLabelForValue(val);
                      return label.length > 25
                        ? label.slice(0, 25) + "..."
                        : label;
                    },
                  },
                },
                y: {
                  type: "linear",
                  position: "left",
                  title: {
                    display: true,
                    text: "Sales (Units)",
                  },
                },
                y1: {
                  type: "linear",
                  position: "right",
                  grid: {
                    drawOnChartArea: false,
                  },
                  title: {
                    display: true,
                    text: "Revenue (₹)",
                  },
                },
              },
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="card bg-white shadow-xl p-6 w-full rounded-xl">
          <h2 className="text-xl font-semibold text-gray-800">
            Best Performing Products
          </h2>
          <ul className="list-disc pl-5 mt-3">
            {bestProducts.map((product, index) => (
              <li key={index} className="text-gray-700">
                {product}
              </li>
            ))}
          </ul>
        </div>

        <div className="card bg-white shadow-xl p-6 w-full rounded-xl">
          <h2 className="text-xl font-semibold text-gray-800">
            Worst Performing Products
          </h2>
          <ul className="list-disc pl-5 mt-3">
            {worstProducts.map((product, index) => (
              <li key={index} className="text-gray-700">
                {product}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card bg-white shadow-xl p-6 mt-6 w-full rounded-xl">
        <h2 className="text-xl font-semibold text-gray-800">
          User Engagement Insights
        </h2>
        <p className="text-gray-600">
          Analyzing customer interaction trends over time.
        </p>
        <ul className="mt-3">
          {userEngagement.map((data, index) => (
            <li key={index} className="text-gray-700">
              {data.date}: {data.reviews} reviews received
            </li>
          ))}
        </ul>
      </div>

      <div className="card bg-white shadow-xl p-6 mt-6 w-full flex flex-col sm:flex-row justify-between items-center rounded-xl">
        <div className="flex gap-4">
          <button className="btn bg-[#0063ff] text-black font-medium px-4 py-2 rounded-lg">
            Feedback
          </button>
          <button
            className="btn bg-[#0063ff] text-black font-medium px-4 py-2 rounded-lg"
            onClick={handleExportPDF}
          >
            Export in PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default AmazonSellerDashboard;
