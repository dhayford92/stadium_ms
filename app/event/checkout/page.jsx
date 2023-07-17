import React from 'react'

export default function CheckOut() {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <div className="flex flex-col md:flex-row m-5">
            <div className="md:w-2/3">
                <h2 className="text-2xl font-bold mb-4">Checkout</h2>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="address" className="block text-gray-600 font-semibold mb-1">
                            Address
                        </label>
                        <input
                            type="text"
                            id="address"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                        />
                    </div>
                    <div>
                    <label htmlFor="card" className="block text-gray-600 font-semibold mb-1">
                        Card Number
                    </label>
                    <input
                        type="text"
                        id="card"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                    />
                    </div>
                    <div className="flex justify-between">
                    <div>
                        <label htmlFor="expiry" className="block text-gray-600 font-semibold mb-1">
                        Expiry Date
                        </label>
                        <input
                        type="text"
                        id="expiry"
                        className="w-32 px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="cvv" className="block text-gray-600 font-semibold mb-1">
                        CVV
                        </label>
                        <input
                        type="text"
                        id="cvv"
                        className="w-32 px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                        />
                    </div>
                    </div>
                    <button
                    type="submit"
                    className="button">
                    Place Order
                    </button>
                </form>
            </div>
            <div className="md:w-1/3 mt-8 md:mt-0 md:ml-8">
            <div className="bg-white rounded-md shadow-lg p-4">
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                <div className="flex items-center justify-between mb-2">
                <span>Product 1</span>
                <span>$10</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                <span>Product 2</span>
                <span>$15</span>
                </div>
                <hr className="my-2" />
                <div className="flex items-center justify-between">
                <span>Total</span>
                <span>$25</span>
                </div>
            </div>
            </div>
      </div>

    </div>
  )
}
