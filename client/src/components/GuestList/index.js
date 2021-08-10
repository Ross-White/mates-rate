import React from "react";

function GuestList({ guest }) {
  return (
      <div className="border my-1">
        <button className="p-1">{guest.email}</button>
      </div>
  );
}

export default GuestList;
