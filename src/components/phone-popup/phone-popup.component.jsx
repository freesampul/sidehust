import { Link } from "react-router-dom";


const PhonePopup = () => {
  return (
    <div className="w-full h-full fixed z-20 flex justify-center items-center bg-white">
          <li>
              <ul>
                  <Link to="/" className="text-black hover:text-gray-600 px-3 py-2">Home</Link>
              </ul>
              <ul>
                  <Link to="/lessons" className="text-black hover:text-gray-600 px-3 py-2">Lessons</Link>
                  </ul> <ul>
                  <Link to="/checkout" className="text-black hover:text-gray-600 px-3 py-2">Pricing</Link>
              </ul>
          </li>
    </div>
  );
}

export default PhonePopup;
