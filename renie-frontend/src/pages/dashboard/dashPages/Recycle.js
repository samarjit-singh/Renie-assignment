import React, { useEffect, useState } from "react";
import axios from "axios";
import confetti from "canvas-confetti";

const Recycle = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [compartment, setCompartment] = useState("");
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setEmail(parsedUserData.email);
      setUserName(parsedUserData.name);
      setUserId(parsedUserData.id);
    }
  }, []);

  const handleCompartmentClick = (name) => {
    setCompartment(name);
  };

  const handleQuantityChange = (event) => {
    const value = event.target.value;
    if (value >= 0) {
      setQuantity(value);
    } else {
      setQuantity(0);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (quantity <= 0 || compartment === "") {
      alert("Please select a compartment and enter a valid quantity.");
      return;
    }

    const data = {
      userId: userId,
      compartment: compartment,
      quantity: parseInt(quantity, 10),
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/transaction",
        data
      );
      if (response.status === 201) {
        console.log("Transaction successful");
        setCompartment("");
        setQuantity(0);
        triggerConfetti();
      } else {
        console.error("Transaction failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const triggerConfetti = () => {
    confetti({
      angle: 90,
      spread: 360,
      startVelocity: 30,
      elementCount: 100,
      dragFriction: 0.12,
      duration: 1500,
      stagger: 3,
      width: "10px",
      height: "10px",
      colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
    });
  };

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen font-mono">
        <div className="bg-[#CDE8E5] flex flex-col items-start justify-center gap-5 p-5 border-2 border-black rounded-lg shadow-[4px_4px_black]">
          <div className="text-2xl font-black text-gray-800 mb-6">
            ♻️ Recycle,
            <br />
            <span className="text-lg font-semibold text-gray-600">
              enter details
            </span>
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-800">
              Name : {userName}
            </p>
            <p className="text-lg font-semibold text-gray-800 mt-5">
              Email : {email}
            </p>
            <form onSubmit={handleSubmit}>
              <div className="text-lg font-semibold text-gray-800">
                <span className="flex items-center justify-between gap-5 h-16">
                  Compartment :
                  <li className="flex gap-5">
                    <ul
                      onClick={() => handleCompartmentClick("plastic")}
                      className={`cursor-pointer w-10 h-10 rounded-full border-2 border-black shadow-[4px_4px_black] text-2xl text-gray-800 flex justify-center items-center ${
                        compartment === "plastic" ? "bg-gray-400" : ""
                      }`}
                    >
                      🛍️
                    </ul>
                    <ul
                      onClick={() => handleCompartmentClick("paper")}
                      className={`cursor-pointer w-10 h-10 rounded-full border-2 border-black shadow-[4px_4px_black] text-2xl text-gray-800 flex justify-center items-center ${
                        compartment === "paper" ? "bg-gray-400" : ""
                      }`}
                    >
                      📜
                    </ul>
                    <ul
                      onClick={() => handleCompartmentClick("tetrapak")}
                      className={`cursor-pointer w-10 h-10 rounded-full border-2 border-black shadow-[4px_4px_black] text-2xl text-gray-800 flex justify-center items-center ${
                        compartment === "tetrapak" ? "bg-gray-400" : ""
                      }`}
                    >
                      🧃
                    </ul>
                    <ul
                      onClick={() => handleCompartmentClick("cans")}
                      className={`cursor-pointer w-10 h-10 rounded-full border-2 border-black shadow-[4px_4px_black] text-2xl text-gray-800 flex justify-center items-center ${
                        compartment === "cans" ? "bg-gray-400" : ""
                      }`}
                    >
                      🥫
                    </ul>
                  </li>
                </span>
                <span className="mt-10">
                  Quantity :{" "}
                  <input
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-64 h-10 rounded-md border-2 border-black shadow-[4px_4px_black] text-base font-semibold text-gray-800 px-2.5 outline-none focus:border-[#7AB2B2]"
                  />
                </span>
              </div>
              <div className="flex items-center">
                <button
                  type="submit"
                  className="w-40 h-10 mx-auto mt-12 rounded-md border-2 border-black bg-white shadow-[4px_4px_black] text-lg font-semibold text-gray-800 cursor-pointer active:shadow-none active:translate-x-1 active:translate-y-1"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recycle;
