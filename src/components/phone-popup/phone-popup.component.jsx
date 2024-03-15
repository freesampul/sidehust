import { Link } from "react-router-dom";

const PhonePopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-20 flex justify-center items-center bg-white bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-4">
        <ul className="space-y-2">
          <li>
            <Link to="/" className="text-black hover:text-gray-600 block px-4 py-2">Home</Link>
          </li>
          <li>
            <Link to="/lessons" className="text-black hover:text-gray-600 block px-4 py-2">Lessons</Link>
          </li>
          <li>
            <Link to="/checkout" className="text-black hover:text-gray-600 block px-4 py-2">Pricing</Link>
          </li>
        </ul>
        <button onClick={onClose} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Close
        </button>
      </div>
    </div>
  );
}

export default PhonePopup;
