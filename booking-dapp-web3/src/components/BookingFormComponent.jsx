import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function BookingFormComponent() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <div className="glass-card w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center glow-text">NFT Booking Details</h2>
      <form className="space-y-4">

        {/* Destination */}
        <input type="text" placeholder="Destination" />

        {/* Service Type */}
        <select defaultValue="">
          <option value="" disabled hidden>Select Service Type</option>
          <option value="Hotel">Hotel</option>
          <option value="Tour Package">Tour Package</option>
          <option value="Rent a Car">Rent a Car</option>
          <option value="Flight">Flight</option>
          <option value="Voucher">Special Voucher</option>
        </select>

        {/* Dates */}
        <div className="flex w-full gap-2">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Start Date"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            placeholderText="End Date"
          />
        </div>

        {/* Adults & Children */}
        <div className="flex space-x-2">
          <input
            type="number"
            min="1"
            placeholder="Adults"
            onInput={(e) => {
              if (parseInt(e.target.value) < 1) e.target.value = "1";
            }}
          />
          <input
            type="number"
            min="0"
            placeholder="Children"
            onInput={(e) => {
              if (parseInt(e.target.value) < 0) e.target.value = "0";
            }}
          />
        </div>

        {/* Tourist name */}
        <input type="text" placeholder="Tourist Name" />

        {/* Additional info */}
        <textarea placeholder="Additional info" rows="3"></textarea>

        {/* Price */}
        <input type="number" placeholder="Total Price (€)" />

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-4">
          <button type="button" className="futuristic-btn w-5/12">Mint NFT</button>
          <button type="button" className="futuristic-btn w-5/12">Draft NFT</button>
        </div>
      </form>
    </div>
  );
}
