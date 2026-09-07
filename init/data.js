const sampleListings = [
  {
    "title": "Cozy Beachfront Cottage",
    "description": "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views, sea breezes, and private direct access to the golden beach.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    "price": 3500,
    "location": "Malibu",
    "country": "United States",
    "category": "Beachfront",
    "guests": 4,
    "bedrooms": 2,
    "beds": 2,
    "baths": 2,
    "amenities": [
      "Wifi",
      "Air conditioning",
      "Kitchen",
      "Free parking",
      "Beach access",
      "Dedicated workspace"
    ],
    "geometry": {
      "type": "Point",
      "coordinates": [
        -118.7798,
        34.0259
      ]
    }
  },
  {
    "title": "Modern Loft in Downtown",
    "description": "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers, featuring floor-to-ceiling windows and premium designer furniture.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    "price": 4800,
    "location": "New York City",
    "country": "United States",
    "category": "Iconic Cities",
    "guests": 2,
    "bedrooms": 1,
    "beds": 1,
    "baths": 1,
    "amenities": [
      "Wifi",
      "Air conditioning",
      "Kitchen",
      "Elevator",
      "Dedicated workspace",
      "TV"
    ],
    "geometry": {
      "type": "Point",
      "coordinates": [
        -74.006,
        40.7128
      ]
    }
  },
  {
    "title": "Mountain Retreat",
    "description": "Unplug and unwind in this peaceful mountain cabin. Surrounded by towering pines and alpine trails, it is a perfect sanctuary to recharge and breathe crisp mountain air.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    "price": 5200,
    "location": "Aspen",
    "country": "United States",
    "category": "Mountains",
    "guests": 6,
    "bedrooms": 3,
    "beds": 4,
    "baths": 2,
    "amenities": [
      "Wifi",
      "Indoor fireplace",
      "Kitchen",
      "Free parking",
      "Hot tub",
      "Mountain view"
    ],
    "geometry": {
      "type": "Point",
      "coordinates": [
        -106.8175,
        39.1911
      ]
    }
  },
  {
    "title": "Historic Villa in Tuscany",
    "description": "Experience the timeless charm of Tuscany in this beautifully restored villa. Explore rolling hills, private olive groves, and panoramic sunset terraces.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    "price": 7500,
    "location": "Florence",
    "country": "Italy",
    "category": "Trending",
    "guests": 8,
    "bedrooms": 4,
    "beds": 5,
    "baths": 3,
    "amenities": [
      "Wifi",
      "Pool",
      "Kitchen",
      "Free parking",
      "Wine cellar",
      "Air conditioning"
    ],
    "geometry": {
      "type": "Point",
      "coordinates": [
        11.2558,
        43.7696
      ]
    }
  },
  {
    "title": "Secluded Treehouse Getaway",
    "description": "Live among the lush Pacific Northwest canopy in this handcrafted cedar treehouse. Complete with wraparound viewing deck and wood-burning stove.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    "price": 2800,
    "location": "Portland",
    "country": "United States",
    "category": "Camping",
    "guests": 2,
    "bedrooms": 1,
    "beds": 1,
    "baths": 1,
    "amenities": [
      "Wifi",
      "Indoor fireplace",
      "Free parking",
      "Balcony",
      "Coffee maker"
    ],
    "geometry": {
      "type": "Point",
      "coordinates": [
        -122.6784,
        45.5152
      ]
    }
  },
  {
    "title": "Beachfront Paradise",
    "description": "Step directly onto powdery white sand. Relax under palm trees and take in breathtaking sunsets over turquoise Caribbean waters.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    "price": 6200,
    "location": "Cancun",
    "country": "Mexico",
    "category": "Amazing Pools",
    "guests": 5,
    "bedrooms": 2,
    "beds": 3,
    "baths": 2,
    "amenities": [
      "Wifi",
      "Pool",
      "Air conditioning",
      "Beach access",
      "Kitchen",
      "Free parking"
    ],
    "geometry": {
      "type": "Point",
      "coordinates": [
        -86.8515,
        21.1619
      ]
    }
  },
  {
    "title": "Rustic Cabin by the Lake",
    "description": "Spend your days fishing, boating, and paddleboarding on crystal clear mountain waters, and your evenings cozying up by the crackling campfire.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    "price": 3100,
    "location": "Lake Tahoe",
    "country": "United States",
    "category": "Rooms",
    "guests": 4,
    "bedrooms": 2,
    "beds": 2,
    "baths": 1,
    "amenities": [
      "Wifi",
      "Indoor fireplace",
      "Kitchen",
      "Lake access",
      "Free parking",
      "BBQ grill"
    ],
    "geometry": {
      "type": "Point",
      "coordinates": [
        -120.0324,
        39.0968
      ]
    }
  },
  {
    "title": "Luxury Penthouse with City Views",
    "description": "Indulge in luxury living with panoramic skyline views, private infinity rooftop jacuzzi, and bespoke Italian modern finishes throughout.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    "price": 9500,
    "location": "Los Angeles",
    "country": "United States",
    "category": "Luxury",
    "guests": 4,
    "bedrooms": 2,
    "beds": 2,
    "baths": 2,
    "amenities": [
      "Wifi",
      "Hot tub",
      "Gym",
      "Pool",
      "Air conditioning",
      "Elevator",
      "EV charger"
    ],
    "geometry": {
      "type": "Point",
      "coordinates": [
        -118.2437,
        34.0522
      ]
    }
  },
  {
    "title": "Ski-In/Ski-Out Chalet",
    "description": "Hit the slopes directly from your private ski terrace. This Swiss alpine chalet features a cedar sauna, ski storage, and majestic snow peaks.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    "price": 8200,
    "location": "Verbier",
    "country": "Switzerland",
    "category": "Arctic",
    "guests": 8,
    "bedrooms": 4,
    "beds": 6,
    "baths": 3,
    "amenities": [
      "Wifi",
      "Ski-in/Ski-out",
      "Sauna",
      "Indoor fireplace",
      "Kitchen",
      "Free parking"
    ],
    "geometry": {
      "type": "Point",
      "coordinates": [
        7.2286,
        46.0968
      ]
    }
  },
  {
    "title": "Safari Lodge in the Serengeti",
    "description": "Experience wildlife at your doorstep. Observe grazing gazelles, zebras, and spectacular savannah sunrises from your private open-air veranda.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    "price": 6800,
    "location": "Serengeti",
    "country": "Tanzania",
    "category": "Farms",
    "guests": 4,
    "bedrooms": 2,
    "beds": 2,
    "baths": 2,
    "amenities": [
      "Wifi",
      "Pool",
      "Free breakfast",
      "Outdoor dining",
      "Daily housekeeping"
    ],
    "geometry": {
      "type": "Point",
      "coordinates": [
        34.8333,
        -2.3333
      ]
    }
  },
  {
    "title": "Historic Canal House",
    "description": "Stay in an authentic 17th-century heritage building overlooking the tranquil Prinsengracht canal, walking distance to museums and flower markets.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    "price": 4500,
    "location": "Amsterdam",
    "country": "Netherlands",
    "category": "Iconic Cities",
    "guests": 3,
    "bedrooms": 1,
    "beds": 2,
    "baths": 1,
    "amenities": [
      "Wifi",
      "Kitchen",
      "Dedicated workspace",
      "Waterfront",
      "Heating",
      "Washer"
    ],
    "geometry": {
      "type": "Point",
      "coordinates": [
        4.9041,
        52.3676
      ]
    }
  },
  {
    "title": "Private Island Retreat",
    "description": "Your own private secluded tropical island surrounded by pristine coral reefs. Includes boat transfers, private infinity pool, and personal chef services.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    "price": 15000,
    "location": "Fiji",
    "country": "Fiji",
    "category": "Amazing Pools",
    "guests": 10,
    "bedrooms": 5,
    "beds": 6,
    "baths": 5,
    "amenities": [
      "Wifi",
      "Pool",
      "Air conditioning",
      "Beach access",
      "Free breakfast",
      "Private chef"
    ],
    "geometry": {
      "type": "Point",
      "coordinates": [
        178.065,
        -17.7134
      ]
    }
  },
  {
    "title": "Charming Cottage in the Cotswolds",
    "description": "Escape to the picturesque English countryside. Features honey-colored stone walls, thatched roof, blooming garden, and traditional tearoom charm.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    "price": 3400,
    "location": "Cotswolds",
    "country": "United Kingdom",
    "category": "Farms",
    "guests": 4,
    "bedrooms": 2,
    "beds": 2,
    "baths": 1,
    "amenities": [
      "Wifi",
      "Indoor fireplace",
      "Kitchen",
      "Free parking",
      "Garden view",
      "Heating"
    ],
    "geometry": {
      "type": "Point",
      "coordinates": [
        -1.8433,
        51.9294
      ]
    }
  },
  {
    "title": "Historic Brownstone in Boston",
    "description": "Classic Victorian architecture in charming Back Bay. Gas fireplace, ornate moldings, and walking distance to Newbury Street cafes.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    "price": 3900,
    "location": "Boston",
    "country": "United States",
    "category": "Rooms",
    "guests": 2,
    "bedrooms": 1,
    "beds": 1,
    "baths": 1,
    "amenities": [
      "Wifi",
      "Air conditioning",
      "Kitchen",
      "Dedicated workspace",
      "Washer",
      "TV"
    ],
    "geometry": {
      "type": "Point",
      "coordinates": [
        -71.0589,
        42.3601
      ]
    }
  },
  {
    "title": "Beachfront Bungalow in Bali",
    "description": "Relax on the sun-soaked shores of Seminyak in this open-air bamboo bungalow with direct ocean views and tropical outdoor shower.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1602088113235-229c19758e9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    "price": 2900,
    "location": "Bali",
    "country": "Indonesia",
    "category": "Beachfront",
    "guests": 2,
    "bedrooms": 1,
    "beds": 1,
    "baths": 1,
    "amenities": [
      "Wifi",
      "Pool",
      "Air conditioning",
      "Beach access",
      "Free breakfast",
      "Hammock"
    ],
    "geometry": {
      "type": "Point",
      "coordinates": [
        115.1889,
        -8.4095
      ]
    }
  },
  {
    "title": "Mountain View Cabin in Banff",
    "description": "Wake up to glacier peaks and emerald lakes in the heart of the Canadian Rockies. Close to world-class hiking and ski gondolas.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    "price": 4600,
    "location": "Banff",
    "country": "Canada",
    "category": "Mountains",
    "guests": 5,
    "bedrooms": 2,
    "beds": 3,
    "baths": 2,
    "amenities": [
      "Wifi",
      "Indoor fireplace",
      "Kitchen",
      "Free parking",
      "Mountain view",
      "Hot tub"
    ],
    "geometry": {
      "type": "Point",
      "coordinates": [
        -115.5708,
        51.1784
      ]
    }
  },
  {
    "title": "Art Deco Apartment in Miami",
    "description": "Steps from South Beach neon strip and pastel sands. Vibrant decor, private sun terrace, and breezy ocean vibes.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1533105079780-92b9be482077?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    "price": 4200,
    "location": "Miami",
    "country": "United States",
    "category": "Iconic Cities",
    "guests": 4,
    "bedrooms": 2,
    "beds": 2,
    "baths": 1,
    "amenities": [
      "Wifi",
      "Pool",
      "Air conditioning",
      "Beach access",
      "Elevator",
      "Balcony"
    ],
    "geometry": {
      "type": "Point",
      "coordinates": [
        -80.1918,
        25.7617
      ]
    }
  },
  {
    "title": "Tropical Villa in Phuket",
    "description": "Luxurious modern Thai villa featuring a private plunge pool, outdoor sala, and serene tropical gardens tucked away in Kata Beach.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1470165301023-58dab8118cc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    "price": 5800,
    "location": "Phuket",
    "country": "Thailand",
    "category": "Amazing Pools",
    "guests": 6,
    "bedrooms": 3,
    "beds": 3,
    "baths": 3,
    "amenities": [
      "Wifi",
      "Pool",
      "Air conditioning",
      "Kitchen",
      "Free parking",
      "Outdoor shower"
    ],
    "geometry": {
      "type": "Point",
      "coordinates": [
        98.3923,
        7.8804
      ]
    }
  },
  {
    "title": "Historic Castle in Scotland",
    "description": "Live like royalty in a historic 16th-century fortress in the Scottish Highlands. Features stone turrets, grand banqueting hall, and sprawling private estate.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1585543805890-6051f7829f98?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    "price": 12000,
    "location": "Edinburgh",
    "country": "United Kingdom",
    "category": "Castles",
    "guests": 12,
    "bedrooms": 6,
    "beds": 8,
    "baths": 5,
    "amenities": [
      "Wifi",
      "Indoor fireplace",
      "Kitchen",
      "Free parking",
      "Library",
      "Historic grounds"
    ],
    "geometry": {
      "type": "Point",
      "coordinates": [
        -3.1883,
        55.9533
      ]
    }
  },
  {
    "title": "Desert Oasis in Dubai",
    "description": "Exclusive desert retreat with private temperature-controlled pool, dune buggy excursions, and sunset stargazing over red sand dunes.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    "price": 8900,
    "location": "Dubai",
    "country": "United Arab Emirates",
    "category": "Luxury",
    "guests": 6,
    "bedrooms": 3,
    "beds": 3,
    "baths": 3,
    "amenities": [
      "Wifi",
      "Pool",
      "Air conditioning",
      "Free parking",
      "Desert tour",
      "Hot tub"
    ],
    "geometry": {
      "type": "Point",
      "coordinates": [
        55.2708,
        25.2048
      ]
    }
  },
  {
    "title": "Rustic Log Cabin in Montana",
    "description": "True wilderness experience near Yellowstone National Park. Log-beamed ceilings, mountain stream on the property, and quiet starlit nights.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    "price": 3300,
    "location": "Bozeman",
    "country": "United States",
    "category": "Camping",
    "guests": 4,
    "bedrooms": 2,
    "beds": 2,
    "baths": 1,
    "amenities": [
      "Wifi",
      "Indoor fireplace",
      "Kitchen",
      "Free parking",
      "Mountain view",
      "Fire pit"
    ],
    "geometry": {
      "type": "Point",
      "coordinates": [
        -111.0429,
        45.677
      ]
    }
  },
  {
    "title": "Beachfront Villa in Greece",
    "description": "Perched on the caldera cliffside of Santorini with dazzling white walls, blue domes, and an infinity pool merging seamlessly with the Aegean Sea.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    "price": 7800,
    "location": "Santorini",
    "country": "Greece",
    "category": "Trending",
    "guests": 4,
    "bedrooms": 2,
    "beds": 2,
    "baths": 2,
    "amenities": [
      "Wifi",
      "Pool",
      "Air conditioning",
      "Sea view",
      "Balcony",
      "Free breakfast"
    ],
    "geometry": {
      "type": "Point",
      "coordinates": [
        25.4615,
        36.3932
      ]
    }
  },
  {
    "title": "Eco-Friendly Treehouse Retreat",
    "description": "Immerse yourself in lush rainforests and organic rice fields. Crafted from sustainable bamboo with open-air lounge and natural stone soaking tub.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    "price": 2600,
    "location": "Ubud",
    "country": "Indonesia",
    "category": "Farms",
    "guests": 2,
    "bedrooms": 1,
    "beds": 1,
    "baths": 1,
    "amenities": [
      "Wifi",
      "Pool",
      "Free breakfast",
      "Garden view",
      "Outdoor bath"
    ],
    "geometry": {
      "type": "Point",
      "coordinates": [
        115.2644,
        -8.5069
      ]
    }
  },
  {
    "title": "Historic Cottage in Charleston",
    "description": "Southern hospitality in the historic French Quarter. Features wide piazza porches, gas lanterns, and antique heart-pine floors.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    "price": 3700,
    "location": "Charleston",
    "country": "United States",
    "category": "Rooms",
    "guests": 4,
    "bedrooms": 2,
    "beds": 2,
    "baths": 2,
    "amenities": [
      "Wifi",
      "Air conditioning",
      "Kitchen",
      "Patio",
      "Washer",
      "TV"
    ],
    "geometry": {
      "type": "Point",
      "coordinates": [
        -79.9311,
        32.7765
      ]
    }
  },
  {
    "title": "Modern Apartment in Tokyo",
    "description": "Sleek minimalist design in trendy Shibuya. High-tech smart home features, deep soaking tub, and steps from world-class dining.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    "price": 4900,
    "location": "Tokyo",
    "country": "Japan",
    "category": "Iconic Cities",
    "guests": 2,
    "bedrooms": 1,
    "beds": 1,
    "baths": 1,
    "amenities": [
      "Wifi",
      "Air conditioning",
      "Kitchen",
      "Elevator",
      "Washer",
      "Dryer"
    ],
    "geometry": {
      "type": "Point",
      "coordinates": [
        139.6917,
        35.6895
      ]
    }
  },
  {
    "title": "Lakefront Cabin in New Hampshire",
    "description": "Private boat dock on Lake Winnipesaukee. Screened porch, stone fireplace, and canoes included for morning paddles.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    "price": 3200,
    "location": "Laconia",
    "country": "United States",
    "category": "Rooms",
    "guests": 6,
    "bedrooms": 3,
    "beds": 3,
    "baths": 2,
    "amenities": [
      "Wifi",
      "Indoor fireplace",
      "Kitchen",
      "Free parking",
      "Lake access",
      "Canoe"
    ],
    "geometry": {
      "type": "Point",
      "coordinates": [
        -71.4704,
        43.5279
      ]
    }
  },
  {
    "title": "Luxury Overwater Villa in Maldives",
    "description": "Floor-to-ceiling glass floors over turquoise lagoons, personal infinity pool, slide into the ocean, and private catamaran transfers.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    "price": 18000,
    "location": "North Male Atoll",
    "country": "Maldives",
    "category": "Luxury",
    "guests": 4,
    "bedrooms": 2,
    "beds": 2,
    "baths": 2,
    "amenities": [
      "Wifi",
      "Pool",
      "Air conditioning",
      "Overwater deck",
      "Free breakfast",
      "Spa access"
    ],
    "geometry": {
      "type": "Point",
      "coordinates": [
        73.5089,
        4.223
      ]
    }
  },
  {
    "title": "Ski Chalet in the Swiss Alps",
    "description": "Cozy timber chalet nestled in high alpine wonderland. Hot chocolate on the panoramic deck, sauna after skiing, and views of the Matterhorn.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    "price": 6400,
    "location": "Zermatt",
    "country": "Switzerland",
    "category": "Arctic",
    "guests": 6,
    "bedrooms": 3,
    "beds": 4,
    "baths": 2,
    "amenities": [
      "Wifi",
      "Indoor fireplace",
      "Sauna",
      "Ski storage",
      "Kitchen",
      "Mountain view"
    ],
    "geometry": {
      "type": "Point",
      "coordinates": [
        7.7491,
        45.9763
      ]
    }
  },
  {
    "title": "Secluded Beach House in Costa Rica",
    "description": "Where the rainforest meets the Pacific. Watch toucans and monkeys from your hammock or surf world-famous waves just yards away.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    "price": 3600,
    "location": "Santa Teresa",
    "country": "Costa Rica",
    "category": "Beachfront",
    "guests": 4,
    "bedrooms": 2,
    "beds": 2,
    "baths": 2,
    "amenities": [
      "Wifi",
      "Air conditioning",
      "Kitchen",
      "Beach access",
      "Surfboard",
      "Free parking"
    ],
    "geometry": {
      "type": "Point",
      "coordinates": [
        -85.1672,
        9.6543
      ]
    }
  }
];

module.exports = { data: sampleListings };
