import React from "react";

function GuestList({ guest }) {
  return (
      <div className="border">
        <p className="p-1">{guest.email}</p>
      </div>
  );
}

export default GuestList;
