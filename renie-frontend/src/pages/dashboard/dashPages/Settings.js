import React, { useState, useEffect } from "react";

const Settings = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setUserId(parsedUserData.id);
      setUserData(parsedUserData);
    }
  }, []);

  const handleUpdate = async (event) => {
    event.preventDefault();

    const body = {};
    if (name) body.name = name;
    if (email) body.email = email;

    if (Object.keys(body).length === 0) {
      alert("No changes to update");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/user/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "An error occurred");
      } else {
        // Update local storage values
        const updatedUserData = { ...userData, ...body };
        localStorage.setItem("userData", JSON.stringify(updatedUserData));
        setUserData(updatedUserData);

        alert("Update successful");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while updating the user");
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen font-mono p-4 sm:p-8">
        <div className="bg-[#CDE8E5] flex flex-col items-start justify-center gap-5 p-5 border-2 border-black rounded-lg shadow-[4px_4px_black] w-full max-w-md">
          <div className="text-2xl font-black text-gray-800 mb-6">
            ⚙️ Settings,
            <br />
            <span className="text-lg font-semibold text-gray-600">
              Enter details to update
            </span>
          </div>
          <div>
            <form onSubmit={handleUpdate}>
              <div className="text-lg font-semibold text-gray-800">
                <span className="mt-10">
                  Name :
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full sm:w-64 h-10 rounded-md border-2 border-black shadow-[4px_4px_black] text-base font-semibold text-gray-800 px-2.5 outline-none focus:border-[#7AB2B2] mt-2 sm:mt-0 lg:ml-6"
                  />
                </span>
              </div>
              <div className="text-lg font-semibold text-gray-800 mt-5">
                <span className="mt-10">
                  Email :
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full sm:w-64 h-10 rounded-md border-2 border-black shadow-[4px_4px_black] text-base font-semibold text-gray-800 px-2.5 outline-none focus:border-[#7AB2B2] mt-2 sm:mt-0 lg:ml-4"
                  />
                </span>
              </div>
              <div className="flex items-center">
                <button
                  type="submit"
                  className="w-full sm:w-40 h-10 mx-auto mt-12 rounded-md border-2 border-black bg-white shadow-[4px_4px_black] text-lg font-semibold text-gray-800 cursor-pointer active:shadow-none active:translate-x-1 active:translate-y-1"
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

export default Settings;
