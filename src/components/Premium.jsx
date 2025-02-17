// import React from 'react'

// const Premium = () => {
//     return (
//       <div className="m-10">
//         <div className="flex w-full">
//           <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
//             <h1 className="font-bold text-3xl">Silver Membership</h1>
//             <ul>
//               <li>- Chat with other people</li>
//               <li>- 180 connection Requests per day</li>
//               <li>- Blue Tick</li>
//               <li>- 3 months</li>
//             </ul>
//             <button className="btn btn-secondary">Buy Silver</button>
//           </div>

//           <div className="divider divider-horizontal">OR</div>

//           <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
//             <h1 className="font-bold text-3xl">Gold Membership</h1>
//             <ul>
//               <li>- Chat with other people</li>
//               <li>- Infinite connection Requests per day</li>
//               <li>- Blue Tick</li>
//               <li>- 6 months</li>
//             </ul>
//             <button className="btn btn-primary">Buy Gold</button>
//           </div>
//         </div>
//       </div>
//     );
//   };

// export default Premium

import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);
  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    const res = await axios.get(BASE_URL + "/premium/verify", {
      withCredentials: true,
    });

    if (res.data.isPremium) {
      setIsUserPremium(true);
    }
  };

  const handleBuyClick = async (type) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      {
        membershipType: type,
      },
      { withCredentials: true }
    );

    const { amount, keyId, currency, notes, orderId } = order.data;

    const options = {
      key: keyId,
      amount,
      currency,
      name: "Dev Zunder",
      description: "Connect to other developers",
      order_id: orderId,
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.emailId,
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
      handler: verifyPremiumUser,
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return isUserPremium ? (
    "You are already a premium user"
  ) : (
    <div className="m-10">
      <div className="flex w-full gap-6 justify-center">
        {/* Silver Membership Card */}
        <div className="card bg-base-300 rounded-box h-96 w-96 p-6 shadow-lg transform transition duration-300 hover:scale-105">
          <h1 className="font-bold text-3xl text-gray-400 text-center mb-4">
            Silver Membership
          </h1>
          <ul className="text-gray-500 space-y-2 mb-6">
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-blue-500" /> Chat with other people
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-blue-500" /> 180 Connection
              Requests/day
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-blue-500" /> Blue Tick
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-blue-500" /> 3 Months
            </li>
          </ul>
          <button
            onClick={() => handleBuyClick("silver")}
            className="btn btn-primary w-full text-lg font-semibold mt-24"
          >
            Buy Silver
          </button>
        </div>

        {/* OR Divider */}
        <div className="divider divider-horizontal text-lg font-semibold">
          OR
        </div>

        {/* Gold Membership Card */}
        <div className="card bg-base-300 rounded-box h-96 w-96 p-6 shadow-lg transform transition duration-300 hover:scale-105">
          <h1 className="font-bold text-3xl text-yellow-600 text-center mb-4">
            Gold Membership
          </h1>
          <ul className="text-gray-500 space-y-2 mb-6">
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-yellow-500" /> Chat with other
              people
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-yellow-500" /> Infinite Connection
              Requests/day
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-yellow-500" /> Blue Tick
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-yellow-500" /> 6 Months
            </li>
          </ul>
          <button
            onClick={() => handleBuyClick("gold")}
            className="btn btn-secondary w-full text-lg font-semibold mt-24"
          >
            Buy Gold
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
