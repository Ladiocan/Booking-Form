import { useState } from "react";

export default function useUploadToPinata() {
  const [isLoading, setIsLoading] = useState(false);

  const uploadToPinata = async (canvasRef, formData) => {
    setIsLoading(true);

    const canvas = canvasRef.current;
    const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/png"));
    const file = new File([blob], `voucher_${Date.now()}.png`, { type: "image/png" });

    const body = new FormData();
    body.append("file", file);
    body.append("touristName", formData.touristName); // nou: pentru numele PNG-ului
    body.append("name", `${formData.touristName} - NFT Voucher`);
    body.append("description", `NFT Voucher for ${formData.destination}`);
    body.append("attributes", JSON.stringify([
      { trait_type: "Destination", value: formData.destination },
      { trait_type: "Service Type", value: formData.serviceType },
      { trait_type: "Period", value: `${formData.startDate} - ${formData.endDate}` },
      { trait_type: "People", value: `${formData.adults} Adults / ${formData.children} Children` },
      { trait_type: "Price", value: `${formData.price} ${formData.currency}` }
    ]));

    const response = await fetch("/api/upload", {
      method: "POST",
      body,
    });

    setIsLoading(false);

    if (!response.ok) {
      const err = await response.text();
      console.error("Backend error:", err);
      throw new Error("Failed to upload to Pinata");
    }

    return await response.json();
  };

  return { uploadToPinata, isLoading };
}
