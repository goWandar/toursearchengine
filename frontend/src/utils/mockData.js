const mockTours = [
  // Kenya Tours
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1477949775154-d739b82400b3?q=80&w=2948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Kenya Luxury Safari Extravaganza",
    price: 1200,
    location: "Kenya",
    type: "Luxury",
    duration: 12,
    accommodationType: "lodge",
    places: ["Masai Mara", "Amboseli", "Tsavo West", "Samburu"],
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1477949775154-d739b82400b3?q=80&w=2948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Kenya Wildlife Explorer",
    price: 2800,
    location: "Kenya",
    type: "Mid-range",
    duration: 8,
    accommodationType: "lodge",
    places: ["Masai Mara", "Lake Nakuru", "Amboseli"],
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1477949775154-d739b82400b3?q=80&w=2948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Kenya Budget Safari Adventure",
    price: 1200,
    location: "Kenya",
    type: "Budget",
    duration: 5,
    accommodationType: "camp",
    places: ["Masai Mara", "Lake Naivasha"],
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1477949775154-d739b82400b3?q=80&w=2948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Kenya Exclusive Wilderness Retreat",
    price: 7500,
    location: "Kenya",
    type: "Luxury",
    duration: 10,
    accommodationType: "lodge",
    places: ["Lewa Wildlife Conservancy", "Masai Mara", "Meru National Park"],
  },

  // Tanzania Tours
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1598975314523-9afadd6316c8?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGFuemFuaWElMjBzYWZhcml8ZW58MHx8MHx8fDA%3D",
    title: "Tanzania Serengeti Luxury Safari",
    price: 6000,
    location: "Tanzania",
    type: "Luxury",
    duration: 11,
    accommodationType: "lodge",
    places: ["Serengeti", "Ngorongoro Crater", "Tarangire", "Lake Manyara"],
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1598975314523-9afadd6316c8?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGFuemFuaWElMjBzYWZhcml8ZW58MHx8MHx8fDA%3D",
    title: "Tanzania Classic Safari",
    price: 3200,
    location: "Tanzania",
    type: "Mid-range",
    duration: 7,
    accommodationType: "camp",
    places: ["Serengeti", "Ngorongoro Crater", "Tarangire"],
  },
  {
    id: 7,
    image:
      "https://images.unsplash.com/photo-1598975314523-9afadd6316c8?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGFuemFuaWElMjBzYWZhcml8ZW58MHx8MHx8fDA%3D",
    title: "Tanzania Budget Explorer",
    price: 1500,
    location: "Tanzania",
    type: "Budget",
    duration: 6,
    accommodationType: "camp",
    places: ["Serengeti", "Ngorongoro Crater"],
  },

  // South Africa Tours
  {
    id: 8,
    image:
      "https://plus.unsplash.com/premium_photo-1664304310991-b43610000fc2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "South Africa Luxury Escape",
    price: 5800,
    location: "South Africa",
    type: "Luxury",
    duration: 14,
    accommodationType: "lodge",
    places: [
      "Kruger National Park",
      "Cape Town",
      "Garden Route",
      "Johannesburg",
    ],
  },
  {
    id: 9,
    image:
      "https://plus.unsplash.com/premium_photo-1664304310991-b43610000fc2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "South Africa Diverse Discovery",
    price: 3500,
    location: "South Africa",
    type: "Mid-range",
    duration: 10,
    accommodationType: "lodge",
    places: ["Kruger National Park", "Cape Town", "Durban"],
  },
  {
    id: 10,
    image:
      "https://plus.unsplash.com/premium_photo-1664304310991-b43610000fc2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "South Africa Budget Safari & City",
    price: 1800,
    location: "South Africa",
    type: "Budget",
    duration: 8,
    accommodationType: "camp",
    places: ["Kruger National Park", "Johannesburg", "Soweto"],
  },

  // Botswana Tours
  {
    id: 11,
    image:
      "https://images.unsplash.com/photo-1503889678302-211ae988b095?q=80&w=2946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Botswana Delta & Desert Luxury",
    price: 7200,
    location: "Botswana",
    type: "Luxury",
    duration: 12,
    accommodationType: "lodge",
    places: ["Okavango Delta", "Chobe National Park", "Kalahari Desert"],
  },
  {
    id: 12,
    image:
      "https://images.unsplash.com/photo-1503889678302-211ae988b095?q=80&w=2946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Botswana Wildlife Encounter",
    price: 4200,
    location: "Botswana",
    type: "Mid-range",
    duration: 9,
    accommodationType: "camp",
    places: ["Okavango Delta", "Moremi Game Reserve", "Chobe National Park"],
  },
  {
    id: 13,
    image:
      "https://images.unsplash.com/photo-1503889678302-211ae988b095?q=80&w=2946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Botswana Budget Safari Adventure",
    price: 2200,
    location: "Botswana",
    type: "Budget",
    duration: 7,
    accommodationType: "camp",
    places: ["Okavango Delta", "Chobe National Park"],
  },

  // Additional tours with varied durations and prices
  {
    id: 14,
    image:
      "https://images.unsplash.com/photo-1477949775154-d739b82400b3?q=80&w=2948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Kenya Savannah Short Escape",
    price: 1600,
    location: "Kenya",
    type: "Mid-range",
    duration: 4,
    accommodationType: "lodge",
    places: ["Masai Mara", "Lake Nakuru"],
  },
  {
    id: 15,
    image:
      "https://images.unsplash.com/photo-1598975314523-9afadd6316c8?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGFuemFuaWElMjBzYWZhcml8ZW58MHx8MHx8fDA%3D",
    title: "Tanzania Exclusive Wilderness",
    price: 8500,
    location: "Tanzania",
    type: "Luxury",
    duration: 15,
    accommodationType: "lodge",
    places: ["Serengeti", "Ngorongoro Crater", "Ruaha", "Selous"],
  },
  {
    id: 16,
    image:
      "https://plus.unsplash.com/premium_photo-1664304310991-b43610000fc2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "South Africa Quick Safari",
    price: 900,
    location: "South Africa",
    type: "Budget",
    duration: 3,
    accommodationType: "camp",
    places: ["Pilanesberg National Park"],
  },
  {
    id: 17,
    image:
      "https://images.unsplash.com/photo-1503889678302-211ae988b095?q=80&w=2946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Botswana Extended Explorer",
    price: 5500,
    location: "Botswana",
    type: "Mid-range",
    duration: 14,
    accommodationType: "lodge",
    places: [
      "Okavango Delta",
      "Chobe National Park",
      "Makgadikgadi Pans",
      "Central Kalahari",
    ],
  },
  {
    id: 18,
    image:
      "https://images.unsplash.com/photo-1477949775154-d739b82400b3?q=80&w=2948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Kenya Ultimate Luxury",
    price: 1000,
    location: "Kenya",
    type: "Luxury",
    duration: 13,
    accommodationType: "lodge",
    places: ["Amboseli"],
  },
];
