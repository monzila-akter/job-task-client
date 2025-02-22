import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-blue-400 text-white py-8 mt-10">
      <div className="container mx-auto px-5 text-center md:text-left">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div>
            <h2 className="text-3xl font-bold text-blue-900">
              Task<span className="text-white">Board</span>
            </h2>
            <p className="mt-2 text-sm">
              A simple and efficient task management system to stay organized
              and productive.
            </p>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="https://www.facebook.com/monzila.akter2/" className="hover:text-blue-900 transition">
                <FaFacebookF className="text-xl"/>
              </a>
              <a href="https://x.com/monzila_akter" className="hover:text-blue-900 transition">
                <FaTwitter className="text-xl" />
              </a>
              <a href="https://www.linkedin.com/in/monzila-akter-1446291b4/" className="hover:text-blue-900 transition">
                <FaLinkedinIn className="text-xl" />
              </a>
              <a href="https://github.com/monzila-akter" className="hover:text-blue-900 transition">
                <FaGithub className="text-xl" />
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
            <p className="text-sm font-medium">Email: monzila01727@gmail.com</p>
            <p className="text-sm font-medium">Phone: +017 1600 0840</p>
          </div>
        </div>

        <hr className="my-6 border-white opacity-50" />

        {/* Copyright Text */}
        <p className="text-sm text-center">
          &copy; {new Date().getFullYear()} TaskBoard. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
