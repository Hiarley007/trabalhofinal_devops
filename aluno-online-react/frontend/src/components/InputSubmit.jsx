import React from "react"
function InputSubmit({ texto }) {
  return (
    <button
      type="submit"
      className="bg-gray-500 rounded-lg mt-6 p-3 bg-gray-900 text-white hover:bg-gray-300 duration-500 hover:text-black px-3 font-semibold"
    >
      {texto}
    </button>
  );
}

export default InputSubmit;