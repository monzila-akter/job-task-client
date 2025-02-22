import { useContext } from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router";
import { AuthContext } from "../../provider/AuthProvider";


const Navbar = () => {
    const {user, logOut} = useContext(AuthContext)
    return (
        <div className="bg-blue-400">
          <div className="navbar container mx-auto px-5 py-3">
  <div className="navbar-start">
    <Link className=" text-3xl font-bold text-blue-900" to="/">
    Task<span className="text-white">Board</span>
    </Link>
  </div>
  <div className="navbar-end space-x-3">
  {
    user ? (
        <div className="relative group">
          <img
            className="w-12 h-12 rounded-full border-2 border-white object-cover cursor-pointer"
            src={user?.photoURL}
            alt="User Profile"
          />
          <div
            className="absolute bottom-[-50px] left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-sm font-bold px-4 py-2 rounded-lg shadow-lg scale-0 group-hover:scale-100 transition-all duration-500 ease-in-out z-10 w-48"
          >
            <span className="text-lg">{user?.displayName}</span>
          </div>
        </div>
      ) : <div className="bg-transparent w-12 h-12 border-4 border-white rounded-full flex justify-center items-center">
    <FaUser className="text-xl text-white"></FaUser>
</div>
  }
    
        {
            user ? <button onClick={logOut} className="btn bg-white text-lg font-semibold" >Sign Out</button>: <Link className="btn bg-white text-lg font-semibold" to="/login">Sign In</Link>
        }
    
    
  </div>
</div>
        </div>
    );
};

export default Navbar;