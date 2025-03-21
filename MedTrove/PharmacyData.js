// pharmacyData.js
// This file contains predefined pharmacy data for Islamabad

// Define predefined pharmacy data
const PREDEFINED_PHARMACIES = [
  {
    place_id: 'barq_pharmacy',
    name: 'Barq Pharmacy',
    vicinity: 'opposite PAEC General Hospital, H-11/4, Islamabad',
    rating: 4.3,
    geometry: {
      location: {
        lat: 33.6509,
        lng: 72.9986
      }
    }
  },
  {
    place_id: 'al_marwa_pharmacy',
    name: 'AL Marwa Pharmacy',
    vicinity: 'near jamia masjid salman farsi, I-10/2, Pakistan town phase 1, Islamabad',
    rating: 4.1,
    geometry: {
      location: {
        lat: 33.6526,
        lng: 73.0364
      }
    }
  },
  {
    place_id: 'walton_pharmacy',
    name: 'Walton Pharmacy',
    vicinity: 'I-10 Markaz, Islamabad',
    rating: 4.4,
    geometry: {
      location: {
        lat: 33.6508,
        lng: 73.0370
      }
    }
  },
  {
    place_id: 'wecare_pharmacy',
    name: 'WeCare Pharmacy',
    vicinity: 'Shop 5,6, Shaukat Plaza, Korang Road, near Faysal Bank, I-10 Markaz, Islamabad',
    rating: 4.2,
    geometry: {
      location: {
        lat: 33.6506,
        lng: 73.0385
      }
    }
  },
  {
    place_id: 'sk_sons_pharmacy',
    name: 'SK Son\'s Pharmacy',
    vicinity: 'G-11 Markaz, Islamabad',
    rating: 4.5,
    geometry: {
      location: {
        lat: 33.6651,
        lng: 73.0015
      }
    }
  },
  {
    place_id: 'lucky_pharmacy',
    name: 'Lucky Pharmacy',
    vicinity: 'Bela Rd, G-10 Markaz, Islamabad',
    rating: 4.0,
    geometry: {
      location: {
        lat: 33.6748,
        lng: 73.0136
      }
    }
  },
  {
    place_id: 'dwatson_pharmacy',
    name: 'DWatson Chemist',
    vicinity: 'G-13/1, Islamabad',
    rating: 4.6,
    geometry: {
      location: {
        lat: 33.6803,
        lng: 72.9649
      }
    }
  }
];

// Export the array of pharmacy names for backwards compatibility
export const pharmacyNames = [
  'MedPoint Pharmacy',
  'HealthCare Pharmacy',
  'City Pharmacy',
  'Family Pharmacy',
  'Care Plus Pharmacy',
  'Metro Pharmacy',
  'Wellness Pharmacy',
  'Community Pharmacy',
  'Life Aid Pharmacy',
  'Green Cross Pharmacy'
];

// Function to generate mock pharmacy data - now returns predefined pharmacies
export const generateMockPharmacies = (latitude, longitude, radius) => {
  // Simply return the predefined list of pharmacies
  // We're ignoring the parameters but keeping them for API compatibility
  return PREDEFINED_PHARMACIES;
};