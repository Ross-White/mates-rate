import React from 'react'
import { useState } from 'react'

const GuestListForm = ({ addGuest }) => {
    const [value, setValue] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!value) return;
      addGuest(value);
      setValue("");
    };

    return (
        <form>
          <label className="mb-2 tracking-wide font-bold text-lg text-gray-800">
            Invite guest via email
          </label>
          <input
            type="email"
            className="border rounded border-gray-100 py-2 px-3 text-grey-darkest md:mr-2"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button onClick={handleSubmit}>Add guest</button>
        </form>
      );
}

export default GuestListForm
