'use client';

import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import MintNFTModal from './MintNFTModal';
import DraftNFTModal from './DraftNFTModal';
import { FormDataProps } from '../types/FormDataProps';

export default function BookingFormComponent() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showMintModal, setShowMintModal] = useState(false);
  const [showDraftModal, setShowDraftModal] = useState(false);

  const [formData, setFormData] = useState<FormDataProps>({
    destination: '',
    serviceType: '',
    hotelName: '',
    hotelStars: '',
    flightCompany: '',
    flightNumber: '',
    rentCompany: '',
    carType: '',
    voucherService: '',
    voucherType: '',
    packageHotel: '',
    packageFlight: '',
    adults: 1,
    children: 0,
    touristName: '',
    additionalInfo: '',
    price: '',
    currency: 'EUR',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    if (startDate) {
      setFormData((prev) => ({
        ...prev,
        startDate: startDate.toISOString().split('T')[0]
      }));
    }
  }, [startDate]);

  useEffect(() => {
    if (endDate) {
      setFormData((prev) => ({
        ...prev,
        endDate: endDate.toISOString().split('T')[0]
      }));
    }
  }, [endDate]);

  return (
    <div className="glass-card w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center glow-text">NFT Booking Details</h2>
      <form className="space-y-4">

        <input
          type="text"
          placeholder="Destination"
          value={formData.destination}
          onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
          className="w-full"
        />

        <select
          value={formData.serviceType}
          onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
          className="w-full"
        >
          <option value="" disabled hidden>Select Service Type</option>
          <option value="Hotel">Hotel</option>
          <option value="Flight">Flight</option>
          <option value="Tour Package">Tour Package</option>
          <option value="Rent a Car">Rent a Car</option>
          <option value="Voucher">Special Voucher</option>
        </select>

        {/* CONDITIONALS */}
        {formData.serviceType === 'Hotel' && (
          <div className="space-y-2">
            <input type="text" placeholder="Hotel Name" value={formData.hotelName} onChange={(e) => setFormData({ ...formData, hotelName: e.target.value })} className="w-full" />
            <input type="number" placeholder="Stars" min="1" max="5" value={formData.hotelStars} onChange={(e) => setFormData({ ...formData, hotelStars: e.target.value })} className="w-full" />
          </div>
        )}

        {formData.serviceType === 'Flight' && (
          <div className="space-y-2">
            <input type="text" placeholder="Company" value={formData.flightCompany} onChange={(e) => setFormData({ ...formData, flightCompany: e.target.value })} className="w-full" />
            <input type="text" placeholder="Flight Number" value={formData.flightNumber} onChange={(e) => setFormData({ ...formData, flightNumber: e.target.value })} className="w-full" />
          </div>
        )}

        {formData.serviceType === 'Tour Package' && (
          <div className="space-y-2">
            <input type="text" placeholder="Hotel Name" value={formData.packageHotel} onChange={(e) => setFormData({ ...formData, packageHotel: e.target.value })} className="w-full" />
            <input type="text" placeholder="Flight Company" value={formData.packageFlight} onChange={(e) => setFormData({ ...formData, packageFlight: e.target.value })} className="w-full" />
          </div>
        )}

        {formData.serviceType === 'Rent a Car' && (
          <div className="space-y-2">
            <input type="text" placeholder="Company" value={formData.rentCompany} onChange={(e) => setFormData({ ...formData, rentCompany: e.target.value })} className="w-full" />
            <input type="text" placeholder="Car Type" value={formData.carType} onChange={(e) => setFormData({ ...formData, carType: e.target.value })} className="w-full" />
          </div>
        )}

        {formData.serviceType === 'Voucher' && (
          <div className="space-y-2">
            <input type="text" placeholder="Service Name" value={formData.voucherService} onChange={(e) => setFormData({ ...formData, voucherService: e.target.value })} className="w-full" />
            <input type="text" placeholder="Service Type" value={formData.voucherType} onChange={(e) => setFormData({ ...formData, voucherType: e.target.value })} className="w-full" />
          </div>
        )}

        <div className="space-y-2">
          <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Start Date"
            minDate={new Date()}
            className="w-full"
          />
          <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            placeholderText="End Date"
            minDate={startDate || new Date()}
            className="w-full"
          />
        </div>

        {/* Adults & Children */}
        <div className="flex space-x-2">
          <input
            type="number"
            min={1}
            value={formData.adults}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setFormData({
                ...formData,
                adults: isNaN(value) || value < 1 ? 1 : value
              });
            }}
            onFocus={(e) => e.target.select()}
            className="flex-1"
          />

          <input
            type="number"
            min={0}
            value={formData.children}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setFormData({
                ...formData,
                children: isNaN(value) || value < 0 ? 0 : value
              });
            }}
            onFocus={(e) => e.target.select()}
            className="flex-1"
          />
        </div>
        <input
          type="text"
          name="touristName"
          placeholder="Tourist Name"
          value={formData.touristName}
          onChange={(e) => setFormData({ ...formData, touristName: e.target.value })}
          className="w-full"
        />

        <textarea
          placeholder="Additional info"
          className="resize-y min-h-[40px] w-full"
          value={formData.additionalInfo}
          onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
        ></textarea>

        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="Amount"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="flex-1"
          />
          <select
            value={formData.currency}
            onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
            className="flex-1"
          >
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="GBP">GBP</option>
            <option value="RON">RON</option>
            <option value="CHF">CHF</option>
            <option value="JPY">JPY</option>
            <option value="CAD">CAD</option>
            <option value="AUD">AUD</option>
          </select>
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <button type="button" className="futuristic-btn w-5/12" onClick={() => setShowMintModal(true)}>Mint NFT</button>
          <button type="button" className="futuristic-btn w-5/12" onClick={() => setShowDraftModal(true)}>Draft NFT</button>
        </div>
      </form>

      {showMintModal && (
        <MintNFTModal onClose={() => setShowMintModal(false)} formData={formData} />
      )}

      {showDraftModal && (
        <DraftNFTModal
          onClose={() => setShowDraftModal(false)}
          formData={formData}
          onContinueMint={() => {
            setShowDraftModal(false);
            setShowMintModal(true);
          }}
        />
      )}
    </div>
  );
}
