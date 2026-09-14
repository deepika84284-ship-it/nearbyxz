export const RAMANATHAPURAM_DISTRICT_DATA = {
  district: "Ramanathapuram",
  districtCode: "RMD",
  taluks: [
    {
      name: "Ramanathapuram",
      panchayats: [
        "Perungulam Panchayat",
        "Ramanathapuram Town",
        "Devipattinam Coastal Panchayat",
        "Mandapam Town Panchayat",
        "Uchipuli Village",
        "Pattinamkattan Panchayat",
        "Chittarkottai",
        "Toruvalur Panchayat",
        "Landai Village",
        "Sakkarakottai",
        "Rettaiyoor",
        "Pullangudi"
      ]
    },
    {
      name: "Paramakudi",
      panchayats: [
        "Paramakudi Town",
        "Emaneswaram",
        "Nainarkoil Panchayat",
        "Parthibanur",
        "Bogalur Panchayat",
        "Venkitankurichi",
        "Sothugudi",
        "Manamadurai Border"
      ]
    },
    {
      name: "Thiruvadanai",
      panchayats: [
        "Thiruvadanai Town",
        "Tondi Coastal Panchayat",
        "Oriyur Pilgrim Village",
        "Mangalakudi",
        "Pandiyur",
        "Vellayapuram",
        "Karangadu"
      ]
    },
    {
      name: "R.S. Mangalam",
      panchayats: [
        "R.S. Mangalam Town",
        "Anandoor Panchayat",
        "Sengudi",
        "Govindamangalam",
        "Pullamadai"
      ]
    },
    {
      name: "Rameswaram",
      panchayats: [
        "Rameswaram Island Town",
        "Pamban Panchayat",
        "Thangachimadam",
        "Dhanushkodi Border",
        "Akkalmadam",
        "Verkottu"
      ]
    },
    {
      name: "Kadaladi",
      panchayats: [
        "Sayalgudi Panchayat",
        "Kadaladi Village",
        "Melaselvanur Bird Sanctuary area",
        "Valinokkam Port Village",
        "Oppilan Coastal",
        "Moolakkarai Patti"
      ]
    },
    {
      name: "Kamuthi",
      panchayats: [
        "Kamuthi Town",
        "Abiramam Town",
        "Peraiyur Panchayat",
        "Kovilangulam",
        "Pakkuvetti",
        "Mudalakkulam",
        "Mushtakurichi"
      ]
    },
    {
      name: "Mudukulathur",
      panchayats: [
        "Mudukulathur Town",
        "Melamudukulathur",
        "Selvanugri",
        "Kakkoor Panchayat",
        "Enathi Village",
        "Theriruveli",
        "Vilangulathur"
      ]
    },
    {
      name: "Kilakarai",
      panchayats: [
        "Kilakarai Town",
        "Erwadi Dargah Panchayat",
        "Maya Kulam Village",
        "Velangudi",
        "Kanjirangudi",
        "Pudupattinam"
      ]
    }
  ]
};

// All flat list of places in Ramnad District for quick search
export const ALL_RAMNAD_PLACES = RAMANATHAPURAM_DISTRICT_DATA.taluks.flatMap(t => 
  t.panchayats.map(p => ({ panchayat: p, taluk: t.name, district: "Ramanathapuram" }))
);

export const INITIAL_USERS = [
  {
    id: "u1",
    name: "Muthu Kumar",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    role: "Seller/Owner",
    district: "Ramanathapuram",
    taluk: "Ramanathapuram",
    panchayat: "Perungulam Panchayat",
    locality: "Near Panchayat Union School",
    isVerified: true,
    isTrustedMember: true,
    overallRating: 4.8,
    reviewCount: 27,
    successfulDeals: 21,
    phone: "+91 98421 *****",
    bio: "Local farmer & equipment provider in Perungulam Panchayat. Renting high quality items to Ramnad neighbours.",
    joinedDate: "Jan 2025"
  },
  {
    id: "u2",
    name: "Anitha Rajan",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    role: "Seller/Owner",
    district: "Ramanathapuram",
    taluk: "Paramakudi",
    panchayat: "Paramakudi Town",
    locality: "Gandhi Statue Street",
    isVerified: true,
    isTrustedMember: true,
    overallRating: 4.9,
    reviewCount: 42,
    successfulDeals: 38,
    phone: "+91 94432 *****",
    bio: "Event gear & photography equipment owner in Paramakudi. Fast responses, clean handovers.",
    joinedDate: "Nov 2024"
  },
  {
    id: "u3",
    name: "Karthik V.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    role: "Customer/Buyer",
    district: "Ramanathapuram",
    taluk: "Ramanathapuram",
    panchayat: "Perungulam Panchayat",
    locality: "East Street",
    isVerified: true,
    isTrustedMember: true,
    overallRating: 4.7,
    reviewCount: 14,
    successfulDeals: 12,
    phone: "+91 97890 *****",
    bio: "College event organizer & farm worker based in Perungulam.",
    joinedDate: "Feb 2025"
  },
  {
    id: "u4",
    name: "Selvam P.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    role: "Seller/Owner",
    district: "Ramanathapuram",
    taluk: "Kadaladi",
    panchayat: "Sayalgudi Panchayat",
    locality: "Bus Stand Road",
    isVerified: true,
    isTrustedMember: true,
    overallRating: 4.6,
    reviewCount: 18,
    successfulDeals: 15,
    phone: "+91 96291 *****",
    bio: "Agricultural water pumps and tools rentals in Sayalgudi.",
    joinedDate: "Dec 2024"
  },
  {
    id: "u5",
    name: "Meena S.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    role: "Customer/Buyer",
    district: "Ramanathapuram",
    taluk: "Ramanathapuram",
    panchayat: "Uchipuli Village",
    locality: "NH Road area",
    isVerified: true,
    isTrustedMember: false,
    overallRating: 5.0,
    reviewCount: 9,
    successfulDeals: 9,
    phone: "+91 91500 *****",
    bio: "Photographer & home baker in Uchipuli.",
    joinedDate: "Mar 2025"
  },
  {
    id: "u6",
    name: "Syed Ibrahim",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200",
    role: "Seller/Owner",
    district: "Ramanathapuram",
    taluk: "Kilakarai",
    panchayat: "Kilakarai Town",
    locality: "East Street Coast",
    isVerified: true,
    isTrustedMember: true,
    overallRating: 4.9,
    reviewCount: 31,
    successfulDeals: 28,
    phone: "+91 98940 *****",
    bio: "Boating & fishing gear provider in Kilakarai town.",
    joinedDate: "Oct 2024"
  },
  {
    id: "u7",
    name: "Ramanathan K.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
    role: "Seller/Owner",
    district: "Ramanathapuram",
    taluk: "Thiruvadanai",
    panchayat: "Tondi Coastal Panchayat",
    locality: "Harbour Road",
    isVerified: true,
    isTrustedMember: true,
    overallRating: 4.8,
    reviewCount: 22,
    successfulDeals: 19,
    phone: "+91 94862 *****",
    bio: "Solar light towers & generator rental in Tondi.",
    joinedDate: "Jan 2025"
  }
];

export const INITIAL_ITEMS = [
  {
    id: "item-1",
    title: "Full HD 4K Cinema Projector & 100\" Screen",
    category: "Electronics & Events",
    price: 300,
    priceUnit: "day",
    type: "Rent",
    ownerId: "u1",
    district: "Ramanathapuram",
    taluk: "Ramanathapuram",
    panchayat: "Perungulam Panchayat",
    distanceKm: 2.4,
    publicLocality: "📍 Perungulam Panchayat",
    exactAddressHidden: "Opposite Panchayat Office, East Street, Perungulam",
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&q=80&w=600",
    description: "High brightness 4500 Lumens HD Cinema projector with 100-inch portable tripod screen, HDMI cable, and high-power Bluetooth speakers. Perfect for village functions, family events, and match streaming.",
    rating: 4.8,
    reviewsCount: 27,
    commonFeedback: [
      "Good Quality",
      "As Described",
      "Fast Response",
      "On Time",
      "Friendly Owner"
    ],
    status: "Available"
  },
  {
    id: "item-2",
    title: "Kubota Power Tiller & Paddy Weeder Attachment",
    category: "Agriculture & Tools",
    price: 800,
    priceUnit: "day",
    type: "Rent",
    ownerId: "u1",
    district: "Ramanathapuram",
    taluk: "Ramanathapuram",
    panchayat: "Perungulam Panchayat",
    distanceKm: 1.8,
    publicLocality: "📍 Perungulam Panchayat",
    exactAddressHidden: "Farm Shed 4, North Agriculture Road, Perungulam",
    image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=600",
    description: "Diesel powered 12HP tiller with mud wheels and weeder. Maintained in excellent condition. Fuel to be filled by renter.",
    rating: 4.9,
    reviewsCount: 15,
    commonFeedback: [
      "Good Quality",
      "As Described",
      "Trusted Person",
      "On Time"
    ],
    status: "Available"
  },
  {
    id: "item-3",
    title: "Heavy-Duty Diesel Water Pump (5 HP with Hoses)",
    category: "Agriculture & Tools",
    price: 450,
    priceUnit: "day",
    type: "Rent",
    ownerId: "u4",
    district: "Ramanathapuram",
    taluk: "Kadaladi",
    panchayat: "Sayalgudi Panchayat",
    distanceKm: 5.1,
    publicLocality: "📍 Sayalgudi Panchayat",
    exactAddressHidden: "Near Sayalgudi Bus Stand Depot",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600",
    description: "5HP high discharge water pump for agricultural field irrigation or well dewatering. Comes with 50 feet suction and delivery hose.",
    rating: 4.6,
    reviewsCount: 12,
    commonFeedback: [
      "Good Quality",
      "On Time",
      "Good Value"
    ],
    status: "Available"
  },
  {
    id: "item-4",
    title: "Sony Alpha A7 III Mirrorless Camera + 85mm F1.8 Lens",
    category: "Photography",
    price: 1200,
    priceUnit: "day",
    type: "Rent",
    ownerId: "u2",
    district: "Ramanathapuram",
    taluk: "Paramakudi",
    panchayat: "Paramakudi Town",
    distanceKm: 8.5,
    publicLocality: "📍 Paramakudi Town",
    exactAddressHidden: "Studio 3, Gandhi Statue Main Road, Paramakudi",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=600",
    description: "Professional full frame mirrorless camera with portrait lens, 2 original batteries, 128GB high speed SD card and bag.",
    rating: 4.9,
    reviewsCount: 34,
    commonFeedback: [
      "As Described",
      "Fast Response",
      "Friendly Owner",
      "Fully Satisfied"
    ],
    status: "Available"
  },
  {
    id: "item-5",
    title: "Waterproof Outdoor Event Canopy Tent (50-100 People)",
    category: "Events & Supplies",
    price: 1500,
    priceUnit: "day",
    type: "Rent",
    ownerId: "u2",
    district: "Ramanathapuram",
    taluk: "Paramakudi",
    panchayat: "Paramakudi Town",
    distanceKm: 9.0,
    publicLocality: "📍 Paramakudi Town",
    exactAddressHidden: "Godown 2, Paramakudi West",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=600",
    description: "Heavy PVC coated waterproof marquee tent. Easy to assemble with steel framework. Includes side curtains.",
    rating: 4.8,
    reviewsCount: 19,
    commonFeedback: [
      "Good Quality",
      "Fast Response",
      "On Time"
    ],
    status: "Available"
  },
  {
    id: "item-6",
    title: "Heavy-Duty Diesel Silent Generator 7.5 KVA",
    category: "Electronics & Events",
    price: 1800,
    priceUnit: "day",
    type: "Rent",
    ownerId: "u7",
    district: "Ramanathapuram",
    taluk: "Thiruvadanai",
    panchayat: "Tondi Coastal Panchayat",
    distanceKm: 14.2,
    publicLocality: "📍 Tondi Coastal Panchayat",
    exactAddressHidden: "Tondi Harbour Road Shed",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600",
    description: "7.5 KVA copper winding silent diesel generator. Suitable for temple festivals, marriage halls, and farm work in Thiruvadanai / Tondi.",
    rating: 4.9,
    reviewsCount: 22,
    commonFeedback: [
      "Good Quality",
      "Trusted Person",
      "On Time"
    ],
    status: "Available"
  },
  {
    id: "item-7",
    title: "High Performance Deep Sea Fishing Net & GPS Tracker",
    category: "Agriculture & Tools",
    price: 600,
    priceUnit: "day",
    type: "Rent",
    ownerId: "u6",
    district: "Ramanathapuram",
    taluk: "Kilakarai",
    panchayat: "Kilakarai Town",
    distanceKm: 11.0,
    publicLocality: "📍 Kilakarai Town",
    exactAddressHidden: "Kilakarai Harbour Dock 2",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=600",
    description: "Nylon monofilament marine gill net with portable marine GPS fish finder tracker unit for Kilakarai coastal fishermen.",
    rating: 4.9,
    reviewsCount: 31,
    commonFeedback: [
      "Good Quality",
      "As Described",
      "Fast Response"
    ],
    status: "Available"
  }
];

export const INITIAL_DEALS = [
  {
    id: "deal-101",
    itemId: "item-1",
    itemTitle: "Full HD 4K Cinema Projector & 100\" Screen",
    itemPrice: 300,
    durationDays: 2,
    totalAmount: 600,
    customerId: "u3",
    customerName: "Karthik V.",
    ownerId: "u1",
    ownerName: "Muthu Kumar",
    panchayat: "Perungulam Panchayat",
    agreedPickupLocation: "Perungulam Panchayat Office Complex Ground",
    pickupDate: "2026-09-15",
    status: "completed",
    createdAt: "2026-09-10",
    customerFeedbackSubmitted: true,
    ownerFeedbackSubmitted: true,
    satisfactionStatus: "😊 Very Satisfied"
  },
  {
    id: "deal-102",
    itemId: "item-4",
    itemTitle: "Sony Alpha A7 III Mirrorless Camera + 85mm F1.8 Lens",
    itemPrice: 1200,
    durationDays: 1,
    totalAmount: 1200,
    customerId: "u5",
    customerName: "Meena S.",
    ownerId: "u2",
    ownerName: "Anitha Rajan",
    panchayat: "Paramakudi Town",
    agreedPickupLocation: "Paramakudi Gandhi Statue Busstop Corner",
    pickupDate: "2026-09-12",
    status: "completed",
    createdAt: "2026-09-11",
    customerFeedbackSubmitted: true,
    ownerFeedbackSubmitted: true,
    satisfactionStatus: "😊 Very Satisfied"
  },
  {
    id: "deal-103",
    itemId: "item-2",
    itemTitle: "Kubota Power Tiller & Paddy Weeder Attachment",
    itemPrice: 800,
    durationDays: 3,
    totalAmount: 2400,
    customerId: "u3",
    customerName: "Karthik V.",
    ownerId: "u1",
    ownerName: "Muthu Kumar",
    panchayat: "Perungulam Panchayat",
    agreedPickupLocation: "North Agriculture Road, Near Co-operative Store",
    pickupDate: "2026-09-14",
    status: "agreed",
    createdAt: "2026-09-13",
    customerFeedbackSubmitted: false,
    ownerFeedbackSubmitted: false
  }
];

export const INITIAL_REVIEWS = [
  {
    id: "rev-201",
    dealId: "deal-101",
    itemId: "item-1",
    itemTitle: "Full HD 4K Cinema Projector & 100\" Screen",
    reviewerId: "u3",
    reviewerName: "Karthik V.",
    reviewerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    ownerId: "u1",
    ownerName: "Muthu Kumar",
    panchayat: "Perungulam Panchayat",
    isVerifiedDeal: true,
    ratings: {
      productQuality: 5,
      productAccuracy: 5,
      ownerBehaviour: 5,
      responseTime: 4,
      onTimeHandover: 5,
      overallSatisfaction: 5
    },
    averageScore: 4.8,
    textFeedback: "Quality was very good. The owner was responsive and gave the item on time. Fully satisfied.",
    selectedTags: [
      "Good Quality",
      "As Described",
      "Fast Response",
      "On Time",
      "Friendly Owner",
      "Fully Satisfied"
    ],
    satisfactionStatus: "😊 Very Satisfied",
    createdAt: "2 days ago",
    flaggedByAdmin: false
  },
  {
    id: "rev-202",
    dealId: "deal-102",
    itemId: "item-4",
    itemTitle: "Sony Alpha A7 III Mirrorless Camera + 85mm F1.8 Lens",
    reviewerId: "u5",
    reviewerName: "Meena S.",
    reviewerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    ownerId: "u2",
    ownerName: "Anitha Rajan",
    panchayat: "Paramakudi Town",
    isVerifiedDeal: true,
    ratings: {
      productQuality: 5,
      productAccuracy: 5,
      ownerBehaviour: 5,
      responseTime: 5,
      onTimeHandover: 5,
      overallSatisfaction: 5
    },
    averageScore: 5.0,
    textFeedback: "Camera body and lens were crystal clear. Fast response and polite behavior during pickup and return.",
    selectedTags: [
      "As Described",
      "Fast Response",
      "Friendly Owner",
      "Trusted Person",
      "Fully Satisfied"
    ],
    satisfactionStatus: "😊 Very Satisfied",
    createdAt: "1 day ago",
    flaggedByAdmin: false
  }
];

export const INITIAL_OWNER_REVIEWS = [
  {
    id: "orev-301",
    dealId: "deal-101",
    ownerId: "u1",
    ownerName: "Muthu Kumar",
    customerId: "u3",
    customerName: "Karthik V.",
    customerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    panchayat: "Perungulam Panchayat",
    tags: ["Genuine Customer", "Polite", "On Time", "Returned Item Safely", "Good Communication"],
    comment: "Karthik handled the projector very carefully and returned it cleanly right on schedule.",
    createdAt: "2 days ago"
  }
];

export const PANCHAYAT_COMMUNITY_STATS = [
  {
    panchayat: "Perungulam Panchayat",
    taluk: "Ramanathapuram",
    activeMembers: 42,
    successfulDeals: 18,
    activeListings: 8,
    activeNeeds: 4,
    averageRating: 4.7,
    topTags: ["On Time", "Friendly Owner", "Good Quality", "Trusted Local"],
    heroBanner: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000",
    description: "Active local sharing community in Perungulam. High trust rating for farm equipment, event electronics, and tools."
  },
  {
    panchayat: "Paramakudi Town",
    taluk: "Paramakudi",
    activeMembers: 65,
    successfulDeals: 32,
    activeListings: 14,
    activeNeeds: 7,
    averageRating: 4.8,
    topTags: ["Fast Response", "As Described", "Polite"],
    heroBanner: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1000",
    description: "Paramakudi hub for photography gear, event setups, and sound systems."
  },
  {
    panchayat: "Sayalgudi Panchayat",
    taluk: "Kadaladi",
    activeMembers: 29,
    successfulDeals: 12,
    activeListings: 6,
    activeNeeds: 3,
    averageRating: 4.6,
    topTags: ["Good Value", "Genuine Customer"],
    heroBanner: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80&w=1000",
    description: "Kadaladi taluk agricultural machinery and water pump rental collective."
  },
  {
    panchayat: "Uchipuli Village",
    taluk: "Ramanathapuram",
    activeMembers: 24,
    successfulDeals: 9,
    activeListings: 5,
    activeNeeds: 2,
    averageRating: 4.9,
    topTags: ["Trusted Person", "On Time"],
    heroBanner: "https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?auto=format&fit=crop&q=80&w=1000",
    description: "Uchipuli local village sharing circle."
  },
  {
    panchayat: "Devipattinam Coastal Panchayat",
    taluk: "Ramanathapuram",
    activeMembers: 36,
    successfulDeals: 14,
    activeListings: 7,
    activeNeeds: 3,
    averageRating: 4.8,
    topTags: ["Good Quality", "Friendly Owner"],
    heroBanner: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1000",
    description: "Devipattinam coastal and pilgrim local equipment rental hub."
  },
  {
    panchayat: "Tondi Coastal Panchayat",
    taluk: "Thiruvadanai",
    activeMembers: 31,
    successfulDeals: 15,
    activeListings: 9,
    activeNeeds: 4,
    averageRating: 4.9,
    topTags: ["Trusted Person", "On Time"],
    heroBanner: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000",
    description: "Tondi coastal port area generators, lighting, and marine equipment group."
  },
  {
    panchayat: "Kilakarai Town",
    taluk: "Kilakarai",
    activeMembers: 58,
    successfulDeals: 28,
    activeListings: 12,
    activeNeeds: 6,
    averageRating: 4.9,
    topTags: ["As Described", "Polite"],
    heroBanner: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=1000",
    description: "Kilakarai town coastal gear, boating accessories, and electronics collective."
  }
];

export const INITIAL_CHAT_MESSAGES = [
  {
    id: "msg-1",
    dealId: "deal-101",
    senderId: "u3",
    senderName: "Karthik V.",
    text: "Projector 2 days rent-ku available-aa?",
    timestamp: "10:30 AM",
    type: "text"
  },
  {
    id: "msg-2",
    dealId: "deal-101",
    senderId: "u1",
    senderName: "Muthu Kumar",
    text: "Yes, available. 100 inch screen-um serthu tharen.",
    timestamp: "10:32 AM",
    type: "text"
  },
  {
    id: "msg-3",
    dealId: "deal-101",
    senderId: "u3",
    senderName: "Karthik V.",
    text: "Perungulam Panchayat side pickup pannikkalama?",
    timestamp: "10:35 AM",
    type: "text"
  },
  {
    id: "msg-4",
    dealId: "deal-101",
    senderId: "u1",
    senderName: "Muthu Kumar",
    text: "Yes, Panchayat office nearby pickup pannikkalam.",
    timestamp: "10:36 AM",
    type: "text"
  },
  {
    id: "msg-5",
    dealId: "deal-101",
    senderId: "system",
    senderName: "NeedNear System",
    text: "Structured Deal Summary Card Created",
    timestamp: "10:37 AM",
    type: "deal_card",
    dealDetails: {
      itemTitle: "Full HD 4K Cinema Projector & 100\" Screen",
      pricePerDay: 300,
      durationDays: 2,
      totalPrice: 600,
      panchayat: "Perungulam Panchayat",
      pickupStatus: "Agreed - Near Panchayat Office Complex Ground",
      dealStatus: "completed"
    }
  }
];

export const PREDEFINED_CUSTOMER_TAGS = [
  "Good Quality",
  "As Described",
  "Fast Response",
  "On Time",
  "Friendly Owner",
  "Trusted Person",
  "Good Value",
  "Fully Satisfied"
];

export const PREDEFINED_OWNER_TAGS = [
  "Genuine Customer",
  "Polite",
  "On Time",
  "Returned Item Safely",
  "Good Communication"
];

export const SATISFACTION_OPTIONS = [
  { value: "Very Satisfied", label: "Very Satisfied", emoji: "😊", color: "#10b981" },
  { value: "Satisfied", label: "Satisfied", emoji: "🙂", color: "#3b82f6" },
  { value: "Neutral", label: "Neutral", emoji: "😐", color: "#f59e0b" },
  { value: "Not Satisfied", label: "Not Satisfied", emoji: "☹️", color: "#ef4444" }
];
