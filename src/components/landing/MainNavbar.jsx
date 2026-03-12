function MainNavbar() {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <h1 className="text-lg font-semibold text-gray-900">SaleAI</h1>

        <ul className="flex items-center gap-6 text-sm text-gray-600">
          <li>
            <a href="#home" className="hover:text-gray-900">
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-gray-900">
              About
            </a>
          </li>
          <li>
            <a href="#features" className="hover:text-gray-900">
              Features
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-gray-900">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default MainNavbar;
