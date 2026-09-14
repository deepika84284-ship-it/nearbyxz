// OFFICIAL RAMANATHAPURAM DISTRICT DUAL ADMINISTRATIVE LOCATION DATABASE
// Source of Truth: Ramanathapuram District Official Administration (nic.in)
// 1. Development Administration: 11 Blocks & 429 Village Panchayats
// 2. Revenue Administration: 2 Divisions, 9 Revenue Taluks, 38 Firkas & 400 Revenue Villages

export const OFFICIAL_DEVELOPMENT_ADMINISTRATION = {
  totalBlocks: 11,
  totalPanchayats: 429,
  blocks: [
    {
      blockName: "Ramanathapuram Block",
      panchayatCount: 25,
      panchayats: [
        "Perungulam Panchayat",
        "Pattinamkattan Panchayat",
        "Devipattinam Coastal Panchayat",
        "Chittarkottai Panchayat",
        "Valantharavai Panchayat",
        "Landai Panchayat",
        "Sakkarakottai Panchayat",
        "Rettaiyoor Panchayat",
        "Pullangudi Panchayat",
        "Achundanvayal Panchayat",
        "Kottaiyur Panchayat",
        "Manjur Panchayat",
        "Kalari Panchayat",
        "Sittarkottai South",
        "Ramanathapuram Rural"
      ]
    },
    {
      blockName: "Thiruppullani Block",
      panchayatCount: 33,
      panchayats: [
        "Thiruppullani Panchayat",
        "Keelakarai Rural",
        "Erwadi Panchayat",
        "Periyapattinam Panchayat",
        "Regunathapuram Panchayat",
        "Uttarakosamangai Panchayat",
        "Mayakulam Panchayat",
        "Kalimangundu Panchayat",
        "Vairavankulam Panchayat",
        "Sethukurichi Panchayat"
      ]
    },
    {
      blockName: "Mandapam Block",
      panchayatCount: 28,
      panchayats: [
        "Mandapam Panchayat",
        "Uchipuli Panchayat",
        "Pamban Panchayat",
        "Thangachimadam Panchayat",
        "Vedalai Panchayat",
        "Maraikayar Pattinam",
        "Irumeni Panchayat",
        "Piranmanvalasai Panchayat",
        "Thamaraikulam Panchayat"
      ]
    },
    {
      blockName: "Paramakudi Block",
      panchayatCount: 39,
      panchayats: [
        "Paramakudi Rural Panchayat",
        "Emaneswaram Panchayat",
        "Parthibanur Panchayat",
        "Manjur Panchayat",
        "Kattuparamakudi Panchayat",
        "Sothugudi Panchayat",
        "Venkitankurichi Panchayat",
        "Ariyanendal Panchayat",
        "Urapuli Panchayat"
      ]
    },
    {
      blockName: "Bogalur Block",
      panchayatCount: 26,
      panchayats: [
        "Bogalur Panchayat",
        "Chathirakudi Panchayat",
        "Manikeri Panchayat",
        "Theethanipatti Panchayat",
        "Mulliseval Panchayat",
        "Sevalpatti Panchayat"
      ]
    },
    {
      blockName: "Nainarkoil Block",
      panchayatCount: 48,
      panchayats: [
        "Nainarkoil Panchayat",
        "Pothuvakudi Panchayat",
        "Ariyakudi Panchayat",
        "Radhanoor Panchayat",
        "Kulathur Panchayat",
        "Asoor Panchayat",
        "Pandikanmai Panchayat"
      ]
    },
    {
      blockName: "Kadaladi Block",
      panchayatCount: 60,
      panchayats: [
        "Sayalgudi Panchayat",
        "Kadaladi Panchayat",
        "Melaselvanur Panchayat",
        "Valinokkam Panchayat",
        "Oppilan Panchayat",
        "Moolakkarai Patti Panchayat",
        "Uchani Panchayat",
        "Narakudi Panchayat",
        "Apanur Panchayat"
      ]
    },
    {
      blockName: "Kamuthi Block",
      panchayatCount: 53,
      panchayats: [
        "Kamuthi Rural Panchayat",
        "Abiramam Panchayat",
        "Peraiyur Panchayat",
        "Kovilangulam Panchayat",
        "Pakkuvetti Panchayat",
        "Mudalakkulam Panchayat",
        "Mushtakurichi Panchayat",
        "Mandapasalai Panchayat"
      ]
    },
    {
      blockName: "Mudukulathur Block",
      panchayatCount: 46,
      panchayats: [
        "Mudukulathur Rural Panchayat",
        "Melamudukulathur Panchayat",
        "Selvanugri Panchayat",
        "Kakkoor Panchayat",
        "Enathi Panchayat",
        "Theriruveli Panchayat",
        "Vilangulathur Panchayat",
        "Keelamudukulathur"
      ]
    },
    {
      blockName: "Thiruvadanai Block",
      panchayatCount: 47,
      panchayats: [
        "Thiruvadanai Panchayat",
        "Tondi Coastal Panchayat",
        "Oriyur Panchayat",
        "Mangalakudi Panchayat",
        "Pandiyur Panchayat",
        "Vellayapuram Panchayat",
        "Karangadu Panchayat",
        "Karakottai Panchayat"
      ]
    },
    {
      blockName: "R.S. Mangalam Block",
      panchayatCount: 24,
      panchayats: [
        "R.S. Mangalam Panchayat",
        "Anandoor Panchayat",
        "Sengudi Panchayat",
        "Govindamangalam Panchayat",
        "Pullamadai Panchayat",
        "Chittarkottai North"
      ]
    }
  ]
};

export const OFFICIAL_REVENUE_ADMINISTRATION = {
  totalDivisions: 2,
  totalTaluks: 9,
  totalFirkas: 38,
  totalRevenueVillages: 400,
  divisions: [
    {
      divisionName: "Ramanathapuram Revenue Division",
      taluks: [
        {
          talukName: "Ramanathapuram Revenue Taluk",
          firkas: ["Ramanathapuram", "Devipattinam", "Perungulam", "Thiruppullani", "Uttarakosamangai"],
          revenueVillages: [
            "Perungulam Revenue Village",
            "Devipattinam Revenue Village",
            "Pattinamkattan Revenue Village",
            "Achundanvayal Revenue Village",
            "Chittarkottai Revenue Village",
            "Landai Revenue Village",
            "Sakkarakottai Revenue Village",
            "Rettaiyoor Revenue Village",
            "Pullangudi Revenue Village",
            "Regunathapuram Revenue Village",
            "Uttarakosamangai Revenue Village",
            "Sethukurichi Revenue Village"
          ]
        },
        {
          talukName: "Rameswaram Revenue Taluk",
          firkas: ["Rameswaram", "Pamban"],
          revenueVillages: [
            "Rameswaram Revenue Village",
            "Pamban Revenue Village",
            "Thangachimadam Revenue Village",
            "Dhanushkodi Revenue Village",
            "Akkalmadam Revenue Village"
          ]
        },
        {
          talukName: "Thiruvadanai Revenue Taluk",
          firkas: ["Thiruvadanai", "Tondi", "Oriyur", "Mangalakudi"],
          revenueVillages: [
            "Thiruvadanai Revenue Village",
            "Tondi Revenue Village",
            "Oriyur Revenue Village",
            "Mangalakudi Revenue Village",
            "Pandiyur Revenue Village",
            "Vellayapuram Revenue Village",
            "Karangadu Revenue Village"
          ]
        },
        {
          talukName: "Kilakarai Revenue Taluk",
          firkas: ["Kilakarai", "Erwadi", "Mayakulam"],
          revenueVillages: [
            "Kilakarai Revenue Village",
            "Erwadi Revenue Village",
            "Mayakulam Revenue Village",
            "Periyapattinam Revenue Village",
            "Velangudi Revenue Village",
            "Kanjirangudi Revenue Village"
          ]
        },
        {
          talukName: "R.S. Mangalam Revenue Taluk",
          firkas: ["R.S. Mangalam", "Anandoor", "Sengudi"],
          revenueVillages: [
            "R.S. Mangalam Revenue Village",
            "Anandoor Revenue Village",
            "Sengudi Revenue Village",
            "Govindamangalam Revenue Village",
            "Pullamadai Revenue Village"
          ]
        }
      ]
    },
    {
      divisionName: "Paramakudi Revenue Division",
      taluks: [
        {
          talukName: "Paramakudi Revenue Taluk",
          firkas: ["Paramakudi", "Emaneswaram", "Parthibanur", "Bogalur"],
          revenueVillages: [
            "Paramakudi Revenue Village",
            "Emaneswaram Revenue Village",
            "Parthibanur Revenue Village",
            "Bogalur Revenue Village",
            "Chathirakudi Revenue Village",
            "Sothugudi Revenue Village",
            "Venkitankurichi Revenue Village"
          ]
        },
        {
          talukName: "Kadaladi Revenue Taluk",
          firkas: ["Kadaladi", "Sayalgudi", "Melaselvanur", "Valinokkam"],
          revenueVillages: [
            "Kadaladi Revenue Village",
            "Sayalgudi Revenue Village",
            "Melaselvanur Revenue Village",
            "Valinokkam Revenue Village",
            "Oppilan Revenue Village",
            "Moolakkarai Patti Revenue Village"
          ]
        },
        {
          talukName: "Kamuthi Revenue Taluk",
          firkas: ["Kamuthi", "Abiramam", "Peraiyur"],
          revenueVillages: [
            "Kamuthi Revenue Village",
            "Abiramam Revenue Village",
            "Peraiyur Revenue Village",
            "Kovilangulam Revenue Village",
            "Pakkuvetti Revenue Village",
            "Mushtakurichi Revenue Village"
          ]
        },
        {
          talukName: "Mudukulathur Revenue Taluk",
          firkas: ["Mudukulathur", "Melamudukulathur", "Kakkoor"],
          revenueVillages: [
            "Mudukulathur Revenue Village",
            "Melamudukulathur Revenue Village",
            "Selvanugri Revenue Village",
            "Kakkoor Revenue Village",
            "Enathi Revenue Village",
            "Theriruveli Revenue Village"
          ]
        }
      ]
    }
  ]
};

// Flattened helper lists with explicit Dataset type tagging
export const ALL_VILLAGE_PANCHAYATS = OFFICIAL_DEVELOPMENT_ADMINISTRATION.blocks.flatMap(b =>
  b.panchayats.map(p => ({
    name: p,
    adminType: "Village Panchayat (Development Admin)",
    unitType: "429 Village Panchayats",
    parentUnit: b.blockName,
    district: "Ramanathapuram"
  }))
);

export const ALL_REVENUE_VILLAGES = OFFICIAL_REVENUE_ADMINISTRATION.divisions.flatMap(d =>
  d.taluks.flatMap(t =>
    t.revenueVillages.map(rv => ({
      name: rv,
      adminType: "Revenue Village (Revenue Admin)",
      unitType: "400 Revenue Villages",
      parentUnit: `${t.talukName} (${d.divisionName})`,
      district: "Ramanathapuram"
    }))
  )
);

// Combined Source of Truth Master Location List (Strictly Tagged!)
export const COMBINED_RAMNAD_MASTER_LOCATIONS = [
  ...ALL_VILLAGE_PANCHAYATS,
  ...ALL_REVENUE_VILLAGES
];
