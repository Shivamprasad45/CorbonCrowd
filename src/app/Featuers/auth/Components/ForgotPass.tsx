"use client";

import React from "react";

const Forgot = () => {
  return (
    <div>
      <div className="bg-white h-full w-screen font-sans  mt-24 text-gray-900">
        <div className="md:w-2/3 mx-auto w-full pb-16 sm:max-w-screen-sm md:max-w-screen-md lg:w-1/3 lg:max-w-screen-lg xl:max-w-screen-xl">
          <form className="shadow-lg mb-4 rounded-lg border border-gray-100 py-10 px-8">
            <div className="mb-4">
              <label className="mb-2 block text-sm font-bold">E-mail</label>
              <input
                className="shadow-sm w-full cursor-text appearance-none rounded border border-gray-300 py-2 px-3 leading-tight outline-none ring-blue-500 focus:ring"
                id="email"
                type="email"
                placeholder="email"
              />
              <span className="my-2 block"></span>
            </div>

            <div className="mb-6">
              <label className="mb-2 flex text-sm">
                <div className="text-gray-800"></div>
              </label>
            </div>
            <div className="flex items-center">
              <div className="flex-1"></div>
              <button
                className="cursor-pointer rounded bg-blue-600 py-2 px-8 text-center text-lg font-bold  text-white"
                type="submit"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
