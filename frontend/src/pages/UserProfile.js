import React from "react";

const UserProfile = ({ user, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-md">
        
        <div className="text-center">
        <button
          onClick={onClose}
          className="relative text-red-600 hover:text-gray-800"
        >
          Close
        </button>
          <img
            src={user.picture.large}
            alt={`${user.name.first} ${user.name.last}`}
            className="w-20 h-20 rounded-full mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold">
            {`${user.name.first} ${user.name.last} Community`}
          </h2>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-600">{user.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
