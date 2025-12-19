const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src/constant/kode-wilayah.json');
const rawData = fs.readFileSync(filePath, 'utf-8');
const data = JSON.parse(rawData);

const allRegions = data.DATA;
const enrichedData = {};

Object.keys(allRegions).forEach((key) => {
  const parts = key.split('.');

  // Only process level 4 (Village/Kelurahan)
  if (parts.length === 4) {
    const provinceCode = parts[0];
    const cityCode = parts[0] + '.' + parts[1];
    const districtCode = parts[0] + '.' + parts[1] + '.' + parts[2];

    const province = allRegions[provinceCode];
    const city = allRegions[cityCode];
    const district = allRegions[districtCode];
    const village = allRegions[key];

    if (province && city && district && village) {
      // Format: Village, District, City, Province
      // Capitalize first letter of each word for readability if needed, but original data is mixed casing.
      // Assuming original data is readable.
      // Often city/regency names in Indonesia start with "KAB. " or "KOTA ". We can keep them or clean them.
      // Let's keep them distinctive.

      const fullName = `${village}, ${district}, ${city}, ${province}`;
      enrichedData[key] = fullName;
    } else {
      // Fallback if parents missing (shouldn't happen in standard data)
      enrichedData[key] = village;
    }
  }
});

const newData = {
  DATA: enrichedData,
};

fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));
