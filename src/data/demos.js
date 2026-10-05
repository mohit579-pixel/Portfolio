// Sample data used by the live demos on the project pages.

// Dental: appointment slots per day.
export const SLOTS = ['09:00', '10:30', '12:00', '14:00', '15:30', '17:00'];
// "day-slot" keys. 0 = taken by someone else, 1 = yours.
export const INITIAL_BOOKINGS = { '0-1': 0, '1-3': 0, '2-0': 0, '3-4': 0, '2-5': 0 };

// Mantionify: price in lakhs, x/y = map position in %.
export const LISTINGS = [
  {
    id: 1,
    title: 'Garden-facing 2 BHK',
    kind: 'Flat',
    loc: 'Baner',
    price: 95,
    beds: 2,
    area: 1050,
    x: 30,
    y: 40,
  },
  {
    id: 2,
    title: 'Corner plot',
    kind: 'Plot',
    loc: 'Hinjewadi',
    price: 62,
    beds: 0,
    area: 1800,
    x: 72,
    y: 24,
  },
  {
    id: 3,
    title: 'Studio near the metro',
    kind: 'Studio',
    loc: 'Kothrud',
    price: 38,
    beds: 1,
    area: 420,
    x: 46,
    y: 72,
  },
  {
    id: 4,
    title: 'House with a terrace',
    kind: 'House',
    loc: 'Aundh',
    price: 210,
    beds: 4,
    area: 2600,
    x: 18,
    y: 70,
  },
  {
    id: 5,
    title: '3 BHK with city view',
    kind: 'Flat',
    loc: 'Viman Nagar',
    price: 148,
    beds: 3,
    area: 1600,
    x: 78,
    y: 62,
  },
  {
    id: 6,
    title: 'Compact 1 BHK',
    kind: 'Flat',
    loc: 'Wakad',
    price: 52,
    beds: 1,
    area: 640,
    x: 56,
    y: 30,
  },
];
export const PROPERTY_KINDS = ['Flat', 'House', 'Plot', 'Studio'];

// Wanderlust: price per night in rupees.
export const STAYS = [
  {
    id: 1,
    name: 'Lakeview Stay',
    loc: 'Udaipur',
    price: 4200,
    tags: ['Lake view', 'Breakfast', 'Wi-Fi'],
    desc: 'Rooms facing the water, a short walk from the old city.',
    reviews: [
      {
        author: 'Aarav',
        stars: 5,
        text: 'Quiet, clean and a great sunrise view.',
        date: 'Sep 2026',
      },
      { author: 'Meera', stars: 4, text: 'Loved the deck in the evening.', date: 'Aug 2026' },
    ],
  },
  {
    id: 2,
    name: 'Old Town Inn',
    loc: 'Jaipur',
    price: 2800,
    tags: ['Central', 'Rooftop', 'Wi-Fi'],
    desc: 'A heritage building close to the markets.',
    reviews: [
      { author: 'Rohan', stars: 4, text: 'Great location and friendly staff.', date: 'Jul 2026' },
      { author: 'Isha', stars: 3, text: 'Rooms are small but comfortable.', date: 'Jun 2026' },
    ],
  },
  {
    id: 3,
    name: 'Hill Cabin',
    loc: 'Manali',
    price: 3600,
    tags: ['Mountain view', 'Fireplace', 'Parking'],
    desc: 'A wooden cabin with a fireplace and valley views.',
    reviews: [
      { author: 'Kabir', stars: 5, text: 'Perfect for a quiet weekend.', date: 'Sep 2026' },
    ],
  },
  {
    id: 4,
    name: 'Backwater Villa',
    loc: 'Kochi',
    price: 5200,
    tags: ['Pool', 'Breakfast', 'Boat rides'],
    desc: 'A private villa beside the backwaters.',
    reviews: [
      {
        author: 'Nisha',
        stars: 5,
        text: 'The boat ride at dawn was the best part.',
        date: 'Aug 2026',
      },
      { author: 'Dev', stars: 5, text: 'Worth every rupee.', date: 'May 2026' },
    ],
  },
  {
    id: 5,
    name: 'Beach Hut',
    loc: 'Goa',
    price: 2400,
    tags: ['Beachfront', 'Cafe', 'Wi-Fi'],
    desc: 'Simple huts a few steps from the sand.',
    reviews: [
      { author: 'Tara', stars: 3, text: 'Fun and basic, a bit noisy at night.', date: 'Jul 2026' },
    ],
  },
  {
    id: 6,
    name: 'Desert Camp',
    loc: 'Jaisalmer',
    price: 3200,
    tags: ['Camp fire', 'Dinner', 'Camel ride'],
    desc: 'Tents under the stars with an evening show.',
    reviews: [],
  },
];
