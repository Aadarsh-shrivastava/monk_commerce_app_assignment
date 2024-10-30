import { Link } from "react-router-dom";

function NavigationBar() {
  return (
    <header className="text-gray-900 bg-gray-100 body-font border border-b border-gray-300">
      <div className="container flex flex-wrap p-2 flex-col md:flex-row items-center">
        <Link to={"/"}>
          <div className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
            <img
              src="https://s3.ap-south-1.amazonaws.com/assets.ynos.in/startup-logos/YNOS428022.jpg"
              className="h-12 w-12 "
            />
            <span className="mx-5 text-gray-900">Monk Upsell & Cross-sell</span>
          </div>
        </Link>
      </div>
    </header>
  );
}

export default NavigationBar;
