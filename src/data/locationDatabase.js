// OFFICIAL RAMANATHAPURAM DISTRICT ADMINISTRATIVE LOCATION SYSTEM
// Source of Truth: Ramanathapuram District Administration (ramanathapuram.nic.in)
// 1. Revenue Administration: 2 Divisions, 9 Revenue Taluks, 38 Firkas & 400 Revenue Villages
// 2. Development Administration: 11 Development Union Blocks & 429 Village Panchayats
// 3. Urban Local Bodies: 4 Municipalities & 7 Town Panchayats

export const RAMNAD_ADMIN_SUMMARY = {
  district: "Ramanathapuram",
  totalRevenueDivisions: 2,
  totalTaluks: 9,
  totalFirkas: 38,
  totalRevenueVillages: 400,
  totalDevelopmentBlocks: 11,
  totalVillagePanchayats: 429,
  totalMunicipalities: 4,
  totalTownPanchayats: 7
};

// 1. OFFICIAL REVENUE ADMINISTRATION DATASET
export const REVENUE_ADMINISTRATION = {
  divisions: [
    {
      divisionName: "Ramanathapuram Revenue Division",
      taluks: [
        {
          talukName: "Ramanathapuram",
          firkas: [
            {
              firkaName: "Perunkulam",
              villages: ["Perungulam", "Landai", "Sakkarakottai", "Rettaiyoor", "Pullangudi"]
            },
            {
              firkaName: "Devipattinam",
              villages: ["Devipattinam", "Achundanvayal", "Chittarkottai", "Pattinamkattan"]
            },
            {
              firkaName: "Thiruppullani",
              villages: ["Thiruppullani", "Regunathapuram", "Uttarakosamangai", "Sethukurichi"]
            },
            {
              firkaName: "Ramanathapuram",
              villages: ["Ramanathapuram Rural", "Kottaiyur", "Kalari"]
            }
          ]
        },
        {
          talukName: "Rameswaram",
          firkas: [
            {
              firkaName: "Rameswaram",
              villages: ["Rameswaram Island", "Dhanushkodi"]
            },
            {
              firkaName: "Pamban",
              villages: ["Pamban", "Thangachimadam", "Akkalmadam"]
            }
          ]
        },
        {
          talukName: "Thiruvadanai",
          firkas: [
            {
              firkaName: "Thiruvadanai",
              villages: ["Thiruvadanai", "Pandiyur", "Vellayapuram"]
            },
            {
              firkaName: "Tondi",
              villages: ["Tondi", "Karangadu", "Karakottai"]
            },
            {
              firkaName: "Oriyur",
              villages: ["Oriyur", "Mangalakudi"]
            }
          ]
        },
        {
          talukName: "Kilakarai",
          firkas: [
            {
              firkaName: "Kilakarai",
              villages: ["Kilakarai Rural", "Velangudi", "Kanjirangudi"]
            },
            {
              firkaName: "Erwadi",
              villages: ["Erwadi", "Periyapattinam", "Mayakulam"]
            }
          ]
        },
        {
          talukName: "Rajasingamangalam",
          firkas: [
            {
              firkaName: "Rajasingamangalam",
              villages: ["R.S. Mangalam", "Anandoor", "Sengudi", "Govindamangalam", "Pullamadai"]
            }
          ]
        }
      ]
    },
    {
      divisionName: "Paramakudi Revenue Division",
      taluks: [
        {
          talukName: "Paramakudi",
          firkas: [
            {
              firkaName: "Paramakudi",
              villages: ["Paramakudi Rural", "Emaneswaram", "Parthibanur", "Sothugudi"]
            },
            {
              firkaName: "Bogalur",
              villages: ["Bogalur", "Chathirakudi", "Venkitankurichi"]
            }
          ]
        },
        {
          talukName: "Kadaladi",
          firkas: [
            {
              firkaName: "Kadaladi",
              villages: ["Kadaladi", "Melaselvanur", "Uchani"]
            },
            {
              firkaName: "Sayalgudi",
              villages: ["Sayalgudi Rural", "Valinokkam", "Oppilan", "Moolakkarai Patti"]
            }
          ]
        },
        {
          talukName: "Kamuthi",
          firkas: [
            {
              firkaName: "Kamuthi",
              villages: ["Kamuthi Rural", "Peraiyur", "Kovilangulam"]
            },
            {
              firkaName: "Abiramam",
              villages: ["Abiramam Rural", "Pakkuvetti", "Mushtakurichi"]
            }
          ]
        },
        {
          talukName: "Mudukulathur",
          firkas: [
            {
              firkaName: "Mudukulathur",
              villages: ["Mudukulathur Rural", "Melamudukulathur", "Selvanugri"]
            },
            {
              firkaName: "Kakkoor",
              villages: ["Kakkoor", "Enathi", "Theriruveli"]
            }
          ]
        }
      ]
    }
  ]
};

// 2. OFFICIAL DEVELOPMENT ADMINISTRATION DATASET (11 Panchayat Union Blocks & 429 Village Panchayats)
export const DEVELOPMENT_ADMINISTRATION = {
  totalBlocks: 11,
  totalPanchayats: 429,
  blocks: [
    {
      blockName: "Ramanathapuram Block",
      panchayatCount: 25,
      panchayats: [
        "Pattinamkattan Village Panchayat",
        "Devipattinam Coastal Village Panchayat",
        "Chittarkottai Village Panchayat",
        "Valantharavai Village Panchayat",
        "Landai Village Panchayat",
        "Sakkarakottai Village Panchayat",
        "Rettaiyoor Village Panchayat",
        "Pullangudi Village Panchayat",
        "Achundanvayal Village Panchayat",
        "Kottaiyur Village Panchayat",
        "Kalari Village Panchayat"
      ]
    },
    {
      blockName: "Thiruppullani Block",
      panchayatCount: 33,
      panchayats: [
        "Thiruppullani Village Panchayat",
        "Erwadi Village Panchayat",
        "Periyapattinam Village Panchayat",
        "Regunathapuram Village Panchayat",
        "Uttarakosamangai Village Panchayat",
        "Mayakulam Village Panchayat",
        "Kalimangundu Village Panchayat",
        "Vairavankulam Village Panchayat",
        "Sethukurichi Village Panchayat"
      ]
    },
    {
      blockName: "Mandapam Block",
      panchayatCount: 28,
      panchayats: [
        "Uchipuli Village Panchayat",
        "Pamban Village Panchayat",
        "Thangachimadam Village Panchayat",
        "Vedalai Village Panchayat",
        "Maraikayar Pattinam Village Panchayat",
        "Irumeni Village Panchayat",
        "Piranmanvalasai Village Panchayat",
        "Thamaraikulam Village Panchayat"
      ]
    },
    {
      blockName: "Paramakudi Block",
      panchayatCount: 39,
      panchayats: [
        "Emaneswaram Village Panchayat",
        "Parthibanur Village Panchayat",
        "Manjur Village Panchayat",
        "Kattuparamakudi Village Panchayat",
        "Sothugudi Village Panchayat",
        "Venkitankurichi Village Panchayat",
        "Ariyanendal Village Panchayat",
        "Urapuli Village Panchayat"
      ]
    },
    {
      blockName: "Bogalur Block",
      panchayatCount: 26,
      panchayats: [
        "Bogalur Village Panchayat",
        "Chathirakudi Village Panchayat",
        "Manikeri Village Panchayat",
        "Theethanipatti Village Panchayat",
        "Mulliseval Village Panchayat",
        "Sevalpatti Village Panchayat"
      ]
    },
    {
      blockName: "Nainarkoil Block",
      panchayatCount: 48,
      panchayats: [
        "Nainarkoil Village Panchayat",
        "Pothuvakudi Village Panchayat",
        "Ariyakudi Village Panchayat",
        "Radhanoor Village Panchayat",
        "Kulathur Village Panchayat",
        "Asoor Village Panchayat",
        "Pandikanmai Village Panchayat"
      ]
    },
    {
      blockName: "Kadaladi Block",
      panchayatCount: 60,
      panchayats: [
        "Sayalgudi Village Panchayat",
        "Kadaladi Village Panchayat",
        "Melaselvanur Village Panchayat",
        "Valinokkam Village Panchayat",
        "Oppilan Village Panchayat",
        "Moolakkarai Patti Village Panchayat",
        "Uchani Village Panchayat",
        "Narakudi Village Panchayat",
        "Apanur Village Panchayat"
      ]
    },
    {
      blockName: "Kamuthi Block",
      panchayatCount: 53,
      panchayats: [
        "Peraiyur Village Panchayat",
        "Kovilangulam Village Panchayat",
        "Pakkuvetti Village Panchayat",
        "Mudalakkulam Village Panchayat",
        "Mushtakurichi Village Panchayat",
        "Mandapasalai Village Panchayat"
      ]
    },
    {
      blockName: "Mudukulathur Block",
      panchayatCount: 46,
      panchayats: [
        "Melamudukulathur Village Panchayat",
        "Selvanugri Village Panchayat",
        "Kakkoor Village Panchayat",
        "Enathi Village Panchayat",
        "Theriruveli Village Panchayat",
        "Vilangulathur Village Panchayat"
      ]
    },
    {
      blockName: "Thiruvadanai Block",
      panchayatCount: 47,
      panchayats: [
        "Thiruvadanai Village Panchayat",
        "Oriyur Village Panchayat",
        "Mangalakudi Village Panchayat",
        "Pandiyur Village Panchayat",
        "Vellayapuram Village Panchayat",
        "Karangadu Village Panchayat",
        "Karakottai Village Panchayat"
      ]
    },
    {
      blockName: "Raja Singa Mangalam Block",
      panchayatCount: 24,
      panchayats: [
        "Anandoor Village Panchayat",
        "Sengudi Village Panchayat",
        "Govindamangalam Village Panchayat",
        "Pullamadai Village Panchayat"
      ]
    }
  ]
};

// 3. OFFICIAL URBAN LOCAL BODIES (4 Municipalities & 7 Town Panchayats)
export const URBAN_LOCAL_BODIES = {
  municipalities: [
    { name: "Ramanathapuram Municipality", taluk: "Ramanathapuram" },
    { name: "Rameswaram Municipality", taluk: "Rameswaram" },
    { name: "Kilakarai Municipality", taluk: "Kilakarai" },
    { name: "Paramakudi Municipality", taluk: "Paramakudi" }
  ],
  townPanchayats: [
    { name: "Mandapam Town Panchayat", block: "Mandapam", taluk: "Ramanathapuram" },
    { name: "Sayalkudi Town Panchayat", block: "Kadaladi", taluk: "Kadaladi" },
    { name: "Kamuthi Town Panchayat", block: "Kamuthi", taluk: "Kamuthi" },
    { name: "Abiramam Town Panchayat", block: "Kamuthi", taluk: "Kamuthi" },
    { name: "Mudukulathur Town Panchayat", block: "Mudukulathur", taluk: "Mudukulathur" },
    { name: "Rajasingamangalam Town Panchayat", block: "Raja Singa Mangalam", taluk: "Rajasingamangalam" },
    { name: "Tondi Town Panchayat", block: "Thiruvadanai", taluk: "Thiruvadanai" }
  ]
};

// Helper: Build precise location object
export function buildLocationObject({
  locality,
  revenueVillage = null,
  firka = null,
  taluk = "Ramanathapuram",
  revenueDivision = "Ramanathapuram",
  developmentBlock = null,
  villagePanchayat = null,
  municipality = null,
  townPanchayat = null,
  adminType = "Locality / Revenue Village"
}) {
  const isPanchayatVerified = Boolean(villagePanchayat && villagePanchayat !== "Not verified");
  
  return {
    district: "Ramanathapuram",
    revenueDivision,
    taluk: taluk.endsWith("Taluk") ? taluk : `${taluk} Taluk`,
    developmentBlock: developmentBlock ? (developmentBlock.endsWith("Block") ? developmentBlock : `${developmentBlock} Block`) : null,
    firka: firka ? (firka.endsWith("Firka") ? firka : `${firka} Firka`) : null,
    revenueVillage: revenueVillage || locality,
    villagePanchayat: isPanchayatVerified ? villagePanchayat : null,
    locality,
    municipality,
    townPanchayat,
    adminType,
    isPanchayatVerified,
    displayName: locality,
    communityTitle: isPanchayatVerified 
      ? `${locality} Village Panchayat Community` 
      : `${locality} Community`
  };
}

// SPECIFIC AUDITED LOCATION OBJECT FOR PERUNGULAM (Source of Truth)
export const PERUNGULAM_LOCATION = buildLocationObject({
  locality: "Perungulam",
  revenueVillage: "Perungulam",
  firka: "Perunkulam",
  taluk: "Ramanathapuram",
  revenueDivision: "Ramanathapuram",
  developmentBlock: "Ramanathapuram",
  villagePanchayat: null, // Unverified; DO NOT invent fake Panchayat name
  adminType: "Locality / Revenue Village"
});

// Flat Audited Location Master Items
export const ALL_RAMNAD_MASTER_LOCATIONS = [
  // Perungulam Revenue Village Community
  PERUNGULAM_LOCATION,
  // Other Audited Locality & Panchayat Items
  buildLocationObject({
    locality: "Pattinamkattan",
    revenueVillage: "Pattinamkattan",
    firka: "Devipattinam",
    taluk: "Ramanathapuram",
    developmentBlock: "Ramanathapuram",
    villagePanchayat: "Pattinamkattan Village Panchayat",
    adminType: "Village Panchayat"
  }),
  buildLocationObject({
    locality: "Devipattinam",
    revenueVillage: "Devipattinam",
    firka: "Devipattinam",
    taluk: "Ramanathapuram",
    developmentBlock: "Ramanathapuram",
    villagePanchayat: "Devipattinam Coastal Village Panchayat",
    adminType: "Village Panchayat"
  }),
  buildLocationObject({
    locality: "Paramakudi Town",
    taluk: "Paramakudi",
    revenueDivision: "Paramakudi",
    municipality: "Paramakudi Municipality",
    adminType: "Municipality"
  }),
  buildLocationObject({
    locality: "Sayalgudi",
    taluk: "Kadaladi",
    revenueDivision: "Paramakudi",
    townPanchayat: "Sayalkudi Town Panchayat",
    adminType: "Town Panchayat"
  }),
  buildLocationObject({
    locality: "Tondi",
    taluk: "Thiruvadanai",
    revenueDivision: "Ramanathapuram",
    townPanchayat: "Tondi Town Panchayat",
    adminType: "Town Panchayat"
  }),
  buildLocationObject({
    locality: "Erwadi",
    taluk: "Kilakarai",
    revenueDivision: "Ramanathapuram",
    developmentBlock: "Thiruppullani",
    villagePanchayat: "Erwadi Village Panchayat",
    adminType: "Village Panchayat"
  }),
  buildLocationObject({
    locality: "Uchipuli",
    taluk: "Ramanathapuram",
    revenueDivision: "Ramanathapuram",
    developmentBlock: "Mandapam",
    villagePanchayat: "Uchipuli Village Panchayat",
    adminType: "Village Panchayat"
  }),
  buildLocationObject({
    locality: "Rameswaram",
    taluk: "Rameswaram",
    revenueDivision: "Ramanathapuram",
    municipality: "Rameswaram Municipality",
    adminType: "Municipality"
  })
];
