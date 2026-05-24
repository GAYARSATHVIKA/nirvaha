import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import DecorativeShapes from './DecorativeShapes';

const categoryThemes: Record<string, { accent: string; gradient: string; overlay: string; shadow: string }> = {
    Transformation: {
        accent: '#93d6ad',
        gradient: 'linear-gradient(180deg, rgba(16, 62, 43, 0.85) 0%, rgba(12, 22, 15, 0.85) 100%)',
        overlay: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 75%)',
        shadow: '0 32px 90px rgba(32, 70, 51, 0.32)'
    },
    Purpose: {
        accent: '#c8a8ff',
        gradient: 'linear-gradient(180deg, rgba(44, 18, 72, 0.88) 0%, rgba(9, 10, 27, 0.88) 100%)',
        overlay: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 80%)',
        shadow: '0 32px 90px rgba(56, 24, 100, 0.32)'
    },
    Senses: {
        accent: '#8fd6ff',
        gradient: 'linear-gradient(180deg, rgba(11, 33, 45, 0.88) 0%, rgba(6, 13, 19, 0.88) 100%)',
        overlay: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 75%)',
        shadow: '0 32px 90px rgba(14, 49, 74, 0.32)'
    },
    Mind: {
        accent: '#c8f1ff',
        gradient: 'linear-gradient(180deg, rgba(13, 29, 44, 0.88) 0%, rgba(7, 13, 22, 0.88) 100%)',
        overlay: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 70%)',
        shadow: '0 32px 90px rgba(23, 63, 101, 0.3)'
    },
    Wisdom: {
        accent: '#ffd38d',
        gradient: 'linear-gradient(180deg, rgba(53, 38, 5, 0.92) 0%, rgba(8, 6, 3, 0.92) 100%)',
        overlay: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.72) 70%)',
        shadow: '0 32px 90px rgba(80, 56, 10, 0.28)'
    },
    Devotion: {
        accent: '#ffb2d8',
        gradient: 'linear-gradient(180deg, rgba(51, 8, 43, 0.9) 0%, rgba(9, 5, 18, 0.9) 100%)',
        overlay: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 76%)',
        shadow: '0 32px 90px rgba(85, 40, 76, 0.3)'
    },
    Ethics: {
        accent: '#a8dcff',
        gradient: 'linear-gradient(180deg, rgba(10, 27, 38, 0.9) 0%, rgba(6, 12, 18, 0.9) 100%)',
        overlay: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 74%)',
        shadow: '0 32px 90px rgba(19, 53, 86, 0.3)'
    },
    Guidance: {
        accent: '#ffe294',
        gradient: 'linear-gradient(180deg, rgba(59, 45, 9, 0.92) 0%, rgba(7, 6, 2, 0.92) 100%)',
        overlay: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.68) 72%)',
        shadow: '0 32px 90px rgba(94, 74, 15, 0.28)'
    },
    Discipline: {
        accent: '#c4c8ff',
        gradient: 'linear-gradient(180deg, rgba(11, 19, 41, 0.9) 0%, rgba(4, 8, 18, 0.9) 100%)',
        overlay: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 74%)',
        shadow: '0 32px 90px rgba(26, 38, 84, 0.28)'
    }
};

const defaultLibraryItems = [
    { 
        id: "agni-the-sacred-fire",
        title: "Agni - The Sacred Fire", 
        category: "Transformation", 
        image: "/agni.png", 
        duration: "15 min",
        story: "Agni is the element of transformation.\nIt burns away the impurities of the ego.\nIn its light, we find the path to our true self.\nThe fire of awareness illuminates the dark corners of the mind."
    },
    { 
        id: "dharma-the-righteous-path",
        title: "Dharma - The Righteous Path", 
        category: "Purpose", 
        image: "/dharma.png", 
        duration: "Series",
        story: "Dharma is the moral order of the universe.\nIt is the duty that aligns us with our highest purpose.\nWhen we follow our dharma, we find effortless peace.\nLiving in harmony with truth is the ultimate goal."
    },
    { 
        id: "indriya-nigraha-sensory-control",
        title: "Indriya Nigraha - Sensory Control", 
        category: "Senses", 
        image: "/indriya.png", 
        duration: "10 min",
        story: "Master the senses to master the mind.\nIndriya Nigraha is the art of conscious withdrawal.\nNot through suppression, but through deep understanding.\nWhen the senses turn inward, the soul finds its home."
    },
    { 
        id: "manas-shuddhi-mental-clarity",
        title: "Manas Shuddhi - Mental Clarity", 
        category: "Mind", 
        image: "/manas.png", 
        duration: "20 min",
        story: "Purifying the mind is like cleaning a temple.\nRemove the dust of desire and the smoke of anger.\nOnly a pure heart can hold the divine flame,\nradiating peace to every corner of existence."
    },
    { 
        id: "jawaharlal-nehru-visionary-wisdom",
        title: "Jawaharlal Nehru - Visionary Wisdom", 
        category: "Wisdom", 
        image: "/nehru.png", 
        duration: "Lecture",
        story: "Wisdom is the ability to see the unity in diversity.\nLeadership is the service of the human spirit.\nThrough education and self-reflection, we build a better world.\nThe mind that is open to truth is the mind that is free."
    },
    { 
        id: "samarth-ramdas-path-of-devotion",
        title: "Samarth Ramdas - Path of Devotion", 
        category: "Devotion", 
        image: "/ramdas.png", 
        duration: "Music",
        story: "Devotion to the master is the bridge to the infinite.\nThrough surrender, the disciple becomes one with the light.\nChant the names of the divine to quiet the restless heart.\nIn the service of the master, we find the highest joy."
    },
    { 
        id: "sadvritta-ethical-living",
        title: "Sadvritta - Ethical Living", 
        category: "Ethics", 
        image: "/sadvritta.png", 
        duration: "Practice",
        story: "Right conduct is the foundation of a spiritual life.\nTreat all beings with compassion and kindness.\nIntegrity in thought, word, and deed brings lasting harmony.\nYour actions are the seeds of your future destiny."
    },
    { 
        id: "saradhi-the-divine-guide",
        title: "Saradhi - The Divine Guide", 
        category: "Guidance", 
        image: "/saradhi.png", 
        duration: "Journey",
        story: "The guide is the lighthouse in the storm of existence.\nFollowing the lead of wisdom brings us to the shore of truth.\nSurrender the reins of your life to the master within.\nEvery step taken in trust is a step closer to liberation."
    },
    { 
        id: "vyayama-sacred-movement",
        title: "Vyayama - Sacred Movement", 
        category: "Discipline", 
        image: "/vyayama.png", 
        duration: "Movement",
        story: "The body is the temple of the living soul.\nThrough discipline and movement, we prepare for stillness.\nStrength and flexibility are the tools of the spiritual warrior.\nHonoring the body is honoring the creation itself."
    },
];


type ItemPalette = {
    accent: string;
    accentRgb: string;
    glow: string;
    overlay: string;
    border: string;
    progress: string;
    infoText: string;
};

function hexToRgb(hex: string) {
    const clean = hex.replace('#', '');
    const bigint = parseInt(clean, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
}

function rgbToHsl(r: number, g: number, b: number) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h, s, l };
}

function quantizeRgb(r: number, g: number, b: number) {
    const step = 24;
    return [Math.round(r / step) * step, Math.round(g / step) * step, Math.round(b / step) * step];
}

function isNeutralColor(r: number, g: number, b: number) {
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    return max - min < 30 || max > 240 && min > 220;
}

function derivePaletteFromColors(colors: Array<[number, number, number]>) {
    if (!colors.length) {
        return null;
    }
    const [primary, secondary] = colors;
    const accentRgb = primary.join(', ');
    return {
        accent: `rgba(${accentRgb}, 0.86)`,
        accentRgb,
        glow: `rgba(${accentRgb}, 0.16)`,
        overlay: `radial-gradient(circle at 15% 16%, rgba(${accentRgb},0.2), transparent 30%), linear-gradient(180deg, rgba(0,0,0,0.22), rgba(0,0,0,0.9))`,
        border: `rgba(${accentRgb}, 0.24)`,
        progress: `rgba(${accentRgb}, 0.72)`,
        infoText: '#f8fafc',
    } as ItemPalette;
}

async function extractPaletteFromImage(imageSrc: string): Promise<ItemPalette | null> {
    return new Promise(resolve => {
        const image = new Image();
        image.crossOrigin = 'anonymous';
        image.src = imageSrc;

        image.onload = () => {
            const width = 100;
            const height = Math.round((image.height / image.width) * 100) || 100;
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                resolve(null);
                return;
            }
            ctx.drawImage(image, 0, 0, width, height);
            const data = ctx.getImageData(0, 0, width, height).data;
            const buckets = new Map<string, { count: number; rgb: [number, number, number] }>();

            for (let i = 0; i < data.length; i += 4) {
                const alpha = data[i + 3];
                if (alpha < 64) continue;
                const [r, g, b] = quantizeRgb(data[i], data[i + 1], data[i + 2]);
                if (isNeutralColor(r, g, b)) continue;
                const key = `${r},${g},${b}`;
                const bucket = buckets.get(key);
                if (bucket) {
                    bucket.count += 1;
                } else {
                    buckets.set(key, { count: 1, rgb: [r, g, b] });
                }
            }

            const sorted = Array.from(buckets.values())
                .sort((a, b) => b.count - a.count)
                .slice(0, 4);

            if (!sorted.length) {
                resolve(null);
                return;
            }

            const colors = sorted.map(bucket => bucket.rgb);
            const primary = colors[0];
            const second = colors.find((rgb) => {
                const hsl = rgbToHsl(...rgb);
                return hsl.s > 0.14 && hsl.l > 0.13 && hsl.l < 0.88;
            }) || colors[1] || colors[0];

            resolve(derivePaletteFromColors([primary, second]));
        };

        image.onerror = () => resolve(null);
    });
}

function fallbackPalette(theme: { accent: string; gradient: string; overlay: string; shadow: string }): ItemPalette {
    const accentRgb = hexToRgb(theme.accent);
    return {
        accent: `rgba(${accentRgb}, 0.88)`,
        accentRgb,
        glow: `rgba(${accentRgb}, 0.16)`,
        overlay: `linear-gradient(180deg, rgba(${accentRgb}, 0.12), rgba(0,0,0,0.88))`,
        border: `rgba(${accentRgb}, 0.24)`,
        progress: `rgba(${accentRgb}, 0.72)`,
        infoText: '#f8fafc',
    };
}

const LibraryCarousel: React.FC = () => {
    const navigate = useNavigate();
    const [libraryItems, setLibraryItems] = useState(defaultLibraryItems);
    const [palettes, setPalettes] = useState<Record<string, ItemPalette>>({});

    // Load library items from localStorage
    useEffect(() => {
        const savedLibrary = localStorage.getItem("nirvaha_library");
        if (savedLibrary) {
            try {
                const parsed = JSON.parse(savedLibrary);
                // Merge with default items to ensure stories are present
                const merged = defaultLibraryItems.map(def => {
                    const saved = parsed.find((p: any) => p.title === def.title);
                    return saved ? { ...def, ...saved } : def;
                });
                setLibraryItems(merged);
            } catch (e) {
                console.error("Failed to load library items from localStorage", e);
                setLibraryItems(defaultLibraryItems);
            }
        }
    }, []);

    // Generate palette values from each thumbnail image
    useEffect(() => {
        let active = true;

        const loadPalettes = async () => {
            const entries = await Promise.all(libraryItems.map(async (item) => {
                const theme = categoryThemes[item.category] ?? categoryThemes.Mind;
                const extracted = await extractPaletteFromImage(item.image);
                const palette = extracted ?? fallbackPalette(theme);
                return [item.id, palette] as const;
            }));

            if (!active) return;
            setPalettes(Object.fromEntries(entries));
        };

        loadPalettes();
        return () => { active = false; };
    }, [libraryItems]);

    // Alternate distribution for balanced, unique rows
    const row1Items = libraryItems.filter((_, idx) => idx % 2 === 0);
    const row2Items = libraryItems.filter((_, idx) => idx % 2 === 1);

    return (
        <section className="w-full pt-4 pb-12 bg-[#eaf5ef] overflow-hidden relative">
            <DecorativeShapes variant={4} />
            <div className="max-w-7xl pl-4 sm:pl-6 lg:pl-8 pr-4 mb-8 relative z-10">
                <div className="text-left">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F131A] mb-5 uppercase leading-tight"
                        style={{ fontFamily: "'Cinzel', serif" }}
                    >
                        EXPLORE OUR VAST LIBRARY
                    </motion.h2>
                    <p className="text-lg sm:text-xl text-[#595e67] max-w-3xl leading-relaxed" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300 }}>
                        Dive into a curated collection of ancient wisdom and modern practices designed for your inner journey.
                        <span className="font-medium text-[#1a5d47] ml-1">Discover your path inward.</span>
                    </p>
                </div>
            </div>

            <style>{`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .carousel-track-1 {
                    animation: scroll 70s linear infinite;
                }
                .carousel-track-2 {
                    animation: scroll 50s linear infinite;
                }
                .carousel-track-1:hover, .carousel-track-2:hover {
                    animation-play-state: paused;
                }
            `}</style>

            {/* Row 1 */}
            <div className="flex gap-6 mb-6 w-full overflow-hidden">
                <div className="flex gap-6 pl-4 carousel-track-1 w-max">
                    {[...row1Items, ...row1Items].map((item, idx) => {
                        const theme = categoryThemes[item.category] ?? categoryThemes.Mind;
                        const palette = palettes[item.id] ?? fallbackPalette(theme);
                        return (
                        <motion.div
                            key={`r1-${idx}`}
                            whileHover={{ scale: 1.02, y: -5 }}
                            transition={{ duration: 0.3 }}
                            className="relative flex-shrink-0 w-[425px] h-[225px] rounded-2xl overflow-hidden shadow-xl cursor-pointer group"
                            style={{ boxShadow: `${theme.shadow}, 0 0 90px ${palette.glow}`, border: `1px solid ${palette.border}` }}
                            onClick={() => navigate(`/library/${item.id}`)}
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/e2e8f0/1a5d47?text=Nirvaha' }}
                            />
                            <div className="absolute inset-0" style={{ background: palette.overlay }} />
                            <div className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-80" style={{ background: `radial-gradient(600px 400px at 14% 18%, rgba(${palette.accentRgb},0.18), rgba(0,0,0,0) 30%)` }} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="mb-3 flex items-center justify-between gap-3">
                                    <span className="inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] backdrop-blur-sm" style={{ background: `linear-gradient(90deg, rgba(${palette.accentRgb},0.18), rgba(${palette.accentRgb},0.06))`, border: `1px solid rgba(${palette.accentRgb},0.28)`, color: palette.infoText }}>
                                        {item.category}
                                    </span>
                                    <span className="text-[11px] uppercase tracking-[0.35em] text-white/70" style={{ textShadow: `0 2px 8px rgba(${palette.accentRgb},0.2)` }}>{item.duration}</span>
                                </div>
                                <h3 className="text-white text-2xl font-bold leading-tight" style={{ fontFamily: "'Cinzel', serif" }}>{item.title}</h3>
                            </div>
                            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/80 to-transparent opacity-90" />
                            <div className="absolute left-4 bottom-4 h-2 w-24 rounded-full overflow-hidden" aria-hidden>
                                <div style={{ width: '36%', background: palette.progress }} className="h-full transition-all duration-500" />
                            </div>
                        </motion.div>
                    );
                    })}
                </div>
            </div>

            {/* Row 2 */}
            <div className="flex gap-6 w-full overflow-hidden">
                <div className="flex gap-6 pl-4 carousel-track-2 w-max">
                    {[...row2Items].reverse().concat([...row2Items].reverse()).map((item, idx) => {
                        const theme = categoryThemes[item.category] ?? categoryThemes.Mind;
                        const palette = palettes[item.id] ?? fallbackPalette(theme);
                        return (
                        <motion.div
                            key={`r2-${idx}`}
                            whileHover={{ scale: 1.02, y: -5 }}
                            transition={{ duration: 0.3 }}
                            className="relative flex-shrink-0 w-[425px] h-[225px] rounded-2xl overflow-hidden shadow-xl cursor-pointer group"
                            style={{ boxShadow: `${theme.shadow}, 0 0 90px ${palette.glow}`, border: `1px solid ${palette.border}` }}
                            onClick={() => navigate(`/library/${item.id}`)}
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/e2e8f0/1a5d47?text=Nirvaha' }}
                            />
                            <div className="absolute inset-0" style={{ background: palette.overlay }} />
                            <div className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-80" style={{ background: `radial-gradient(600px 400px at 88% 86%, rgba(${palette.accentRgb},0.16), rgba(0,0,0,0) 28%)` }} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="mb-3 flex items-center justify-between gap-3">
                                    <span className="inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] backdrop-blur-sm" style={{ background: `linear-gradient(90deg, rgba(${palette.accentRgb},0.18), rgba(${palette.accentRgb},0.06))`, border: `1px solid rgba(${palette.accentRgb},0.28)`, color: palette.infoText }}>
                                        {item.category}
                                    </span>
                                    <span className="text-[11px] uppercase tracking-[0.35em] text-white/70" style={{ textShadow: `0 2px 8px rgba(${palette.accentRgb},0.2)` }}>{item.duration}</span>
                                </div>
                                <h3 className="text-white text-2xl font-bold leading-tight" style={{ fontFamily: "'Cinzel', serif" }}>{item.title}</h3>
                            </div>
                            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/80 to-transparent opacity-90" />
                            <div className="absolute left-4 bottom-4 h-2 w-24 rounded-full overflow-hidden" aria-hidden>
                                <div style={{ width: '48%', background: palette.progress }} className="h-full transition-all duration-500" />
                            </div>
                        </motion.div>
                    );
                    })}
                </div>
            </div>



        </section>
    );
};

export default LibraryCarousel;
