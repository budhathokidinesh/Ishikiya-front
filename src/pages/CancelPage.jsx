import React from "react";
import { Link } from "react-router-dom";

export const CancelPage = () => {
  return (
    <div className="pt-[18vh]">
      <div class="bg-gray-100 h-auto">
        <div class="bg-white p-6  md:mx-auto">
          <div className="text-red-500 text-4xl text-center font-bold">404</div>
          <div class="text-center">
            <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center">
              Payment Unsuccessfull!
            </h3>
            <p class="text-gray-600 my-2">Please try again.</p>
            <p> Have a great day! </p>
            <div class="py-10 text-center">
              <Link
                to="/"
                class="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
              >
                GO BACK
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CancelPage;
