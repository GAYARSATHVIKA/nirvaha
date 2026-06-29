const mongoose = require('mongoose');
const Page = require('./models/Page');
require('dotenv').config();

const features = [
    {
        title: "AI Spiritual Chatbot (ZenChat)",
        description: "An intelligent conversational AI assistant designed to provide spiritual guidance, wellness advice, and personalized recommendations. The chatbot leverages artificial intelligence to understand user queries and provide thoughtful, contextual responses related to meditation, wellness, spirituality, and personal growth.",
        image: "/Productivity Flow.jpg",
    },
    {
        title: "Meditation Platform",
        description: "A comprehensive meditation and mindfulness platform offering various meditation techniques including Mudra-based practices, guided meditation sessions, breathing exercises, and wellness programs. Features categorized content, progress tracking, and personalized recommendations.",
        image: "/guided_meditation_pop.png",
    },
    {
        title: "Sound Healing",
        description: "A specialized module dedicated to sound-based wellness practices. Includes sound healing sessions, binaural beats, frequency-based healing audio, and related wellness content to explore different sound healing modalities and integrate them into your wellness routine.",
        image: "/cozy Bed.webp",
    },
    {
        title: "Community Rooms",
        description: "Safe spaces within the community where users can engage in anonymous discussions on wellness topics, share experiences, seek advice, and support others without revealing their identity. Promotes open communication and support within a secure environment.",
        image: "/Meditation at Sunrise.png",
    },
    {
        title: "Companion Mode",
        description: "A feature connecting users with experienced mentors, wellness guides, and spiritual teachers. Users can request guidance, book sessions, access mentorship programs, and receive personalized wellness recommendations from qualified companions.",
        image: "/energy_balance_yoga.png",
    },
    {
        title: "Certification & Training Modules",
        description: "Structured educational programs offering certifications in various wellness disciplines. Users can enroll in courses, complete modules, earn certifications, and become certified practitioners in areas such as meditation instruction, sound healing facilitation, and wellness coaching.",
        image: "/breathwork_indoor.png",
    },
    {
        title: "Marketplace",
        description: "An integrated marketplace for wellness products including meditation aids, sound healing devices, wellness supplements, books, and related items. Users can browse products, make purchases, and have items delivered directly to them, enhancing their wellness journey.",
        image: "/SpiritualJourneyKit.png",
    },
    {
        title: "User Dashboard",
        description: "A personalized dashboard providing users with an overview of their wellness journey. The dashboard displays progress metrics, meditation statistics, upcoming sessions, community activity, marketplace orders, and personalized recommendations based on user behavior and preferences.",
        image: "/user_with_laptop.png",
    }
];

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nirvaha');
        console.log('Connected to DB.');
        
        // Remove pages I just added by mistake (Library cards)
        const librarySlugs = [
            "agni-the-sacred-fire",
            "dharma-the-righteous-path",
            "indriya-nigraha-sensory-control",
            "manas-shuddhi-mental-clarity",
            "jawaharlal-nehru-visionary-wisdom",
            "samarth-ramdas-path-of-devotion",
            "sadvritta-ethical-living",
            "saradhi-the-divine-guide",
            "vyayama-sacred-movement",
            "satmya-holistic-adaptability",
            "bramhacharya-energy-mastery",
            "dhinacharya-daily-routine",
            "civilizational-wisdom",
            "ritucharya-seasonal-harmony"
        ];

        await Page.deleteMany({ slug: { $in: librarySlugs } });
        console.log('Deleted old library cards from pages.');

        for (const feature of features) {
            const slug = feature.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            const existing = await Page.findOne({ slug });
            if (!existing) {
                const contentHtml = `
                    <div style="font-family: sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px;">
                        <h1 style="color: #1b4332;">${feature.title}</h1>
                        <img src="${feature.image}" alt="${feature.title}" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />
                        <h2 style="color: #1b4332;">Description</h2>
                        <p>${feature.description}</p>
                    </div>
                `;
                await Page.create({
                    title: feature.title,
                    slug: slug,
                    content: contentHtml,
                    isActive: true
                });
                console.log(`Created page: ${feature.title}`);
            } else {
                console.log(`Page already exists: ${feature.title}`);
            }
        }
        
        console.log('Done!');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seed();
