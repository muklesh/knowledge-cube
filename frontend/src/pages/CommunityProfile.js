import React from "react";

const CommunityProfile = ({ user, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full grid grid-cols-3 items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-md col-start-2">
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
          <p className="text-gray-600">{`contact admin at ${user.email}`}</p>
          <p className="text-gray-600">{`Or drop a message at ${user.phone}`}</p>{" "}
          <br />
          <h4 className="text-gray-800 text-center font-semibold">About this community</h4>
          <p className="text-gray-600">
            Enim fugiat eu ea id labore eu commodo incididunt quis tempor
            incididunt velit pariatur irure.Mollit sunt sit cillum exercitation
            cillum.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommunityProfile;
