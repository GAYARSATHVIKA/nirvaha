require('dotenv').config();
const mongoose = require('mongoose');
const TrustedNetwork = require('./models/TrustedNetwork');

const ADS_DATA = [
  {
    category: 'Music',
    creator: 'JioSaavn',
    image: "/about/ADS/vedic chants.png",
    websiteUrl: "https://www.jiosaavn.com/album/powerful-vedic-chants/A3owXFDaI4Q_",
    title: "Vedic Chants",
    description: "Powerful Vedic Chants by Priests of Kashi — sacred suktas on JioSaavn.",
    theme: "Sacred Vedic Frequencies",
    accent: "#C4A35A",
    accentDim: "rgba(196,163,90,0.15)",
    sounds: [
      {
        id: "v1",
        label: "Purush Sukta",
        icon: "🕉️",
        description: "Ancient Vedic hymn for cosmic consciousness",
        url: "/audio/stress/Tibetan-Bowls.mp3",
      },
      {
        id: "v2",
        label: "Mahamrityunjay Mantra",
        icon: "🧘",
        description: "The great liberation mantra for healing",
        url: "/audio/meditation/Sacred-Sound-Bath.mp3",
      },
      {
        id: "v3",
        label: "Shanti Sukta",
        icon: "🕊️",
        description: "Powerful Sanskrit chants for universal peace",
        url: "/audio/meditation/Tibetan-Bowl-Journey.mp3",
      },
      {
        id: "v4",
        label: "Gayatri Mantra",
        icon: "☀️",
        description: "Sacred chant for wisdom and enlightenment",
        url: "/audio/meditation/Crystal-Frequency-Healing.mp3",
      },
      {
        id: "v5",
        label: "Rudra Chamakam",
        icon: "🔥",
        description: "Vedic hymn invoking cosmic energies",
        url: "/audio/emotional/Healing-Bowls.mp3",
      },
      {
        id: "v6",
        label: "Om Chanting",
        icon: "🕉️",
        description: "Primordial sound of the universe",
        url: "/audio/meditation/Indoor-Calm-Meditation.mp3",
      },
      {
        id: "v7",
        label: "Saraswati Vandana",
        icon: "🎶",
        description: "Prayer for knowledge and arts",
        url: "/audio/emotional/Chakra-Harmony.mp3",
      },
      {
        id: "v8",
        label: "Durga Suktam",
        icon: "🛡️",
        description: "Vedic prayer for protection and strength",
        url: "/audio/emotional/Sacred-Geometry.mp3",
      },
      {
        id: "v9",
        label: "Sacred Sound Bath",
        icon: "🥣",
        description: "Deep resonance healing bowl soundscape",
        url: "/audio/focus/Clear-Mind-Frequencies.mp3",
      },
    ],
    displayOrder: 1,
    isActive: true
  },
  {
    category: 'Meditation',
    creator: 'JioSaavn',
    image: "/about/ADS/med spotify.png",
    websiteUrl: "https://www.jiosaavn.com/album/peace-of-mind/ZMr0o3I8EuQ_",
    title: "JioSaavn Meditation",
    description: "Peace of Mind by Peaceful Music Orchestra — calming meditation on JioSaavn.",
    theme: "Mindful Soundscapes",
    accent: "#7A9384",
    accentDim: "rgba(122,147,132,0.15)",
    sounds: [
      {
        id: "m1",
        label: "Peace of Mind",
        icon: "🌿",
        description: "Peaceful Music Orchestra · Peace of Mind · JioSaavn",
        url: "/audio/meditation/Nature-Meditation.mp3",
      },
      {
        id: "m2",
        label: "Nirvana — Meditation Music",
        icon: "🧘",
        description: "Peaceful Music Orchestra · Peace of Mind · JioSaavn",
        url: "/audio/meditation/Deep-Breath-Meditation.mp3",
      },
      {
        id: "m3",
        label: "Ambient for Inner Peace",
        icon: "🌙",
        description: "Peaceful Music Orchestra · Peace of Mind · JioSaavn",
        url: "/audio/sleep/Moonlight-Lullaby.mp3",
      },
      {
        id: "m4",
        label: "Deep Breath Meditation",
        icon: "💨",
        description: "Guided breathing rhythms for calm",
        url: "/audio/focus/Minimal-Nature-Sounds.mp3",
      },
      {
        id: "m5",
        label: "Sunrise Meditation",
        icon: "🌅",
        description: "Gentle music for morning awareness",
        url: "/audio/stress/Ocean-Waves-Calm.mp3",
      },
      {
        id: "m6",
        label: "Yoga Nidra Flow",
        icon: "🧘",
        description: "Deep relaxation and sleep meditation",
        url: "/audio/sleep/Starlit-Delta-Waves.mp3",
      },
      {
        id: "m7",
        label: "Forest Stream",
        icon: "🌲",
        description: "Nature sounds for mindfulness focus",
        url: "/audio/stress-nature.mp3",
      },
      {
        id: "m8",
        label: "Raindrops for Calm",
        icon: "🌧️",
        description: "Gentle rain sounds for stress relief",
        url: "/audio/stress/Gentle-Rain-Drops.mp3",
      },
      {
        id: "m9",
        label: "Soft Meadow Breeze",
        icon: "🍃",
        description: "Calm wind and nature ambiance",
        url: "/audio/anxiety/Soft-Meadow-Breeze.mp3",
      },
    ],
    displayOrder: 2,
    isActive: true
  },
];

async function seed() {
  try {
    if (!process.env.MONGODB_URI) {
      console.log('Using local DB');
      await mongoose.connect('mongodb://127.0.0.1:27017/nirvaha');
    } else {
      await mongoose.connect(process.env.MONGODB_URI);
    }
    console.log('Connected to DB');

    // await TrustedNetwork.deleteMany({});
    
    for (const ad of ADS_DATA) {
      const existing = await TrustedNetwork.findOne({ title: ad.title });
      if (!existing) {
        await TrustedNetwork.create(ad);
        console.log(`Added ${ad.title}`);
      } else {
        console.log(`${ad.title} already exists. Updating...`);
        await TrustedNetwork.updateOne({ title: ad.title }, ad);
      }
    }
    console.log('Seeding completed.');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seed();
