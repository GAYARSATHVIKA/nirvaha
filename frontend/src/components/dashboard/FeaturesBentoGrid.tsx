import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';
import BACKEND_CONFIG from '@/config/backend';

const defaultFeatures = [
    {
        title: "AI Spiritual Chatbot (ZenChat)",
        description: "An intelligent conversational AI assistant designed to provide spiritual guidance, wellness advice, and personalized recommendations. The chatbot leverages artificial intelligence to understand user queries and provide thoughtful, contextual responses related to meditation, wellness, spirituality, and personal growth.",
        image: "/Productivity Flow.jpg",
        color: "#ce93d8"
    },
    {
        title: "Meditation Platform",
        description: "A comprehensive meditation and mindfulness platform offering various meditation techniques including Mudra-based practices, guided meditation sessions, breathing exercises, and wellness programs. Features categorized content, progress tracking, and personalized recommendations.",
        image: "/guided_meditation_pop.png",
        color: "#1a5d47"
    },
    {
        title: "Sound Healing",
        description: "A specialized module dedicated to sound-based wellness practices. Includes sound healing sessions, binaural beats, frequency-based healing audio, and related wellness content to explore different sound healing modalities and integrate them into your wellness routine.",
        image: "/cozy Bed.webp",
        color: "#7986cb"
    },
    {
        title: "Community Rooms",
        description: "Safe spaces within the community where users can engage in anonymous discussions on wellness topics, share experiences, seek advice, and support others without revealing their identity. Promotes open communication and support within a secure environment.",
        image: "/Meditation at Sunrise.png",
        color: "#e57373"
    },
    {
        title: "Companion Mode",
        description: "A feature connecting users with experienced mentors, wellness guides, and spiritual teachers. Users can request guidance, book sessions, access mentorship programs, and receive personalized wellness recommendations from qualified companions.",
        image: "/energy_balance_yoga.png",
        color: "#ffb74d"
    },
    {
        title: "Certification & Training Modules",
        description: "Structured educational programs offering certifications in various wellness disciplines. Users can enroll in courses, complete modules, earn certifications, and become certified practitioners in areas such as meditation instruction, sound healing facilitation, and wellness coaching.",
        image: "/breathwork_indoor.png",
        color: "#4fc3f7"
    },
    {
        title: "Marketplace",
        description: "An integrated marketplace for wellness products including meditation aids, sound healing devices, wellness supplements, books, and related items. Users can browse products, make purchases, and have items delivered directly to them, enhancing their wellness journey.",
        image: "/SpiritualJourneyKit.png",
        color: "#1a5d47"
    },
    {
        title: "User Dashboard",
        description: "A personalized dashboard providing users with an overview of their wellness journey. The dashboard displays progress metrics, meditation statistics, upcoming sessions, community activity, marketplace orders, and personalized recommendations based on user behavior and preferences.",
        image: "/user_with_laptop.png",
        color: "#ce93d8"
    }
];

export const FeaturesBentoGrid = () => {
    const [features, setFeatures] = useState<any[]>(defaultFeatures);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const fetchFeatures = async () => {
            try {
                const res = await axios.get(`${BACKEND_CONFIG.API_BASE_URL}/api/pages`);
                if (res.data && res.data.length > 0) {
                    setFeatures(res.data.map((page: any) => ({
                        title: page.title,
                        description: page.description || 'No description available.',
                        image: page.image || '/Productivity Flow.jpg',
                        color: page.color || '#ce93d8'
                    })));
                }
            } catch (error) {
                console.error("Error fetching features:", error);
            }
        };
        fetchFeatures();
    }, []);

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % features.length);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + features.length) % features.length);
    };

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        setActiveIndex(value);
    };

    // Get visible cards (previous, current, next)
    const getVisibleCards = () => {
        const cards = [];
        for (let i = -2; i <= 2; i++) {
            const idx = (activeIndex + i + features.length) % features.length;
            cards.push({ ...features[idx], position: i, originalIndex: idx });
        }
        return cards;
    };

    return (
        <section className="min-h-screen flex flex-col justify-center py-8 bg-[#EEF7F1] relative overflow-hidden">
            <div className="w-full px-6 md:px-12 lg:px-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                {/* LEFT SIDE: Cards Carousel & Controls */}
                <div className="w-full lg:w-[55%] flex flex-col items-center">
                    {/* Cards Carousel */}
                    <div className="relative h-[450px] w-full flex items-center justify-center">
                    <div className="relative flex items-center justify-center w-full">
                        {getVisibleCards().map((card, idx) => {
                            const position = card.position;
                            const isActive = position === 0;
                            const absPos = Math.abs(position);

                            return (
                                <motion.div
                                    key={`${card.originalIndex}-${position}`}
                                    className="absolute rounded-[2rem] overflow-hidden shadow-2xl cursor-pointer"
                                    style={{
                                        width: isActive ? '360px' : '300px',
                                        height: isActive ? '420px' : '360px',
                                        zIndex: 10 - absPos,
                                    }}
                                    initial={false}
                                    animate={{
                                        x: position * 150,
                                        scale: isActive ? 1 : 0.85 - absPos * 0.05,
                                        opacity: absPos > 1 ? 0.3 : isActive ? 1 : 0.7,
                                        rotateY: position * -8,
                                    }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    onClick={() => setActiveIndex(card.originalIndex)}
                                >
                                    {/* Card Background Color */}
                                    <div
                                        className="absolute inset-0"
                                        style={{ backgroundColor: card.color }}
                                    />

                                    {/* Card Image */}
                                    <img
                                        src={card.image}
                                        alt={card.title}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Slider Controls */}
                <div className="flex items-center justify-center gap-4 mt-8 w-full max-w-[500px]">
                    {/* Left Arrow */}
                    <button
                        onClick={handlePrev}
                        className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-[#1a5d47] transition-colors flex-shrink-0"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    {/* Gradient Slider Track with Avatar */}
                    <div className="relative w-full h-3 rounded-full overflow-visible"
                        style={{
                            background: `linear-gradient(to right, #f59e0b, #fbbf24, #fb923c, #f97316, #ef4444, #ec4899, #d946ef, #a855f7)`
                        }}
                    >
                        {/* Avatar that moves along the track */}
                        <motion.div
                            className="absolute w-14 h-14 rounded-full border-4 border-white overflow-hidden shadow-xl z-10"
                            style={{ top: '-22px' }}
                            initial={false}
                            animate={{
                                left: `calc(${(activeIndex / (features.length - 1)) * 100}% - 28px)`
                            }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        >
                            <img
                                src={features[activeIndex].image}
                                alt=""
                                className="w-full h-full object-cover"
                            />
                        </motion.div>

                        {/* Dot Indicators */}
                        <div className="absolute inset-0 flex items-center justify-between px-2">
                            {features.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveIndex(idx)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === activeIndex
                                        ? 'bg-white scale-125 shadow-md'
                                        : 'bg-white/60 hover:bg-white/80'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right Arrow */}
                    <button
                        onClick={handleNext}
                        className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-[#1a5d47] transition-colors flex-shrink-0"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
                </div>

                {/* RIGHT SIDE: Feature Content */}
                <div className="w-full lg:w-[45%] text-center lg:text-left flex flex-col justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            whileHover={{ y: -10, scale: 1.03 }}
                            transition={{ duration: 0.3 }}
                            className="cursor-pointer"
                        >
                            <h3
                                className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F131A] mb-6 tracking-wide"
                                style={{ fontFamily: "'Cinzel', serif" }}
                            >
                                {features[activeIndex].title}
                            </h3>
                            <p
                                className="text-[#5f6f65] text-lg md:text-xl leading-relaxed font-medium"
                                style={{ fontFamily: "'Poppins', sans-serif" }}
                            >
                                {features[activeIndex].description}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};
