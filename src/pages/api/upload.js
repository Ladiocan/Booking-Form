import { IncomingForm } from 'formidable';
import fs from 'fs';
import FormData from 'form-data';
import fetch from 'node-fetch';

export const config = { api: { bodyParser: false } };

const PINATA_JWT = process.env.PINATA_JWT;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Form parsing error', details: err.message });
    }

    try {
      const file = files.file[0];
      const fileStream = fs.createReadStream(file.filepath);

      // File name
      const rawName = fields.name?.[0] || 'voucher';
      const cleanedName = rawName.replace(/[^a-z0-9]/gi, '_');
      const timestamp = Date.now();
      const baseName = `${cleanedName} ${timestamp}`;

      // Upload image
      const imageFormData = new FormData();
      imageFormData.append('file', fileStream, `${baseName}.png`);

      const imageRes = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${PINATA_JWT}`
        },
        body: imageFormData
      });

      const imageResult = await imageRes.json();
      if (!imageRes.ok) throw new Error(imageResult.error || "Image upload failed");

      const imageCID = imageResult.IpfsHash;

      // Upload metadata
      const metadata = {
        name: fields.name?.[0] || 'NFT Voucher',
        description: fields.description?.[0] || 'Voucher NFT',
        image: `ipfs://${imageCID}`,
        attributes: JSON.parse(fields.attributes?.[0] || '[]')
      };

      const metadataRes = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${PINATA_JWT}`
        },
        body: JSON.stringify({
          pinataMetadata: {
            name: `${baseName}_meta.json`
          },
          pinataContent: metadata
        })
      });

      const metadataResult = await metadataRes.json();
      if (!metadataRes.ok) throw new Error(metadataResult.error || "Metadata upload failed");

      res.status(200).json({
        image: `ipfs://${imageCID}`,
        metadata: `ipfs://${metadataResult.IpfsHash}`
      });

    } catch (error) {
      console.error("Pinata upload failed:", error);
      res.status(500).json({ error: 'Pinata upload failed', details: error.message });
    }
  });
}
