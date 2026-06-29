const mongoose = require('mongoose');
const Page = require('./models/Page');
require('dotenv').config();

const items = [
    { 
        id: "agni-the-sacred-fire",
        title: "Agni - The Sacred Fire", 
        story: "Agni is the element of transformation.\nIt burns away the impurities of the ego.\nIn its light, we find the path to our true self.\nThe fire of awareness illuminates the dark corners of the mind.",
        description: "Agni, the ancient Vedic deity of fire, represents the pure energy of transformation and illumination. Beyond the physical flame, Agni symbolizes the spiritual fire within—the light of consciousness that burns away ignorance and purifies the soul. In ancient texts, Agni is revered as the ultimate messenger between humanity and the divine, carrying our offerings and intentions to the higher realms.",
        whyTheyMatter: "Agni teaches us the necessity of destruction for the sake of rebirth. In our modern lives, embracing the fire of Agni means actively burning away old habits, toxic attachments, and limiting beliefs. It is the vital spark that initiates deep personal and spiritual transformation."
    },
    { 
        id: "dharma-the-righteous-path",
        title: "Dharma - The Righteous Path", 
        story: "Dharma is the moral order of the universe.\nIt is the duty that aligns us with our highest purpose.\nWhen we follow our dharma, we find effortless peace.\nLiving in harmony with truth is the ultimate goal.",
        description: "Dharma is a complex and multifaceted concept in ancient Indian philosophy, often translated as duty, righteousness, or moral order. It is the cosmic law that upholds the universe and the individual's role within it. Discovering one's Dharma means finding the unique purpose for which one was born, aligning personal actions with the greater good of society and the cosmos.",
        whyTheyMatter: "In a world often driven by chaotic desires and external validation, Dharma provides an unwavering inner compass. It matters because it shifts our focus from 'what do I want?' to 'what is my duty?' bringing profound meaning, stability, and lasting fulfillment to our actions."
    },
    { 
        id: "indriya-nigraha-sensory-control",
        title: "Indriya Nigraha - Sensory Control", 
        story: "Master the senses to master the mind.\nIndriya Nigraha is the art of conscious withdrawal.\nNot through suppression, but through deep understanding.\nWhen the senses turn inward, the soul finds its home.",
        description: "Indriya Nigraha translates to the mastery or withdrawal of the senses. Ancient yogis understood that the senses are like wild horses pulling the chariot of the mind in multiple directions. Indriya Nigraha is not about forceful suppression, but about developing the conscious ability to direct sensory energy inward, transitioning from external distraction to internal stillness (Pratyahara).",
        whyTheyMatter: "Today's digital age bombards our senses with unprecedented levels of stimulation, leading to anxiety, short attention spans, and chronic stress. Indriya Nigraha is the ultimate antidote, empowering us to reclaim our attention and preserve our mental energy."
    },
    { 
        id: "manas-shuddhi-mental-clarity",
        title: "Manas Shuddhi - Mental Clarity", 
        story: "Purifying the mind is like cleaning a temple.\nRemove the dust of desire and the smoke of anger.\nOnly a pure heart can hold the divine flame,\nradiating peace to every corner of existence.",
        description: "Manas Shuddhi refers to the systematic purification of the mind. According to ancient wisdom, the mind accumulates 'impurities' (Mala) such as greed, anger, jealousy, and delusion through worldly interactions. Manas Shuddhi involves practices like self-reflection, chanting, and selfless service that cleanse the subconscious, allowing the true nature of the self—pure consciousness—to shine through.",
        whyTheyMatter: "A turbulent mind distorts reality, leading to suffering and poor decision-making. Manas Shuddhi is essential because true happiness and wisdom cannot take root in an unpurified mind. It is the foundation for any serious spiritual journey."
    },
    { 
        id: "jawaharlal-nehru-visionary-wisdom",
        title: "Jawaharlal Nehru - Visionary Wisdom", 
        story: "Wisdom is the ability to see the unity in diversity.\nLeadership is the service of the human spirit.\nThrough education and self-reflection, we build a better world.\nThe mind that is open to truth is the mind that is free.",
        description: "Jawaharlal Nehru, the first Prime Minister of independent India, was not just a political leader but a profound thinker, historian, and visionary. Deeply influenced by both Western liberalism and Eastern philosophy, Nehru's writings reflect a deep understanding of human history and the necessary evolution of consciousness. He championed scientific temper alongside cultural heritage.",
        whyTheyMatter: "Nehru's vision demonstrates how ancient philosophical roots can be harmonized with modern democratic and scientific ideals. His life's work reminds us that true leadership requires intellectual depth, a global perspective, and a commitment to the collective evolution of humanity."
    },
    { 
        id: "samarth-ramdas-path-of-devotion",
        title: "Samarth Ramdas - Path of Devotion", 
        story: "Devotion to the master is the bridge to the infinite.\nThrough surrender, the disciple becomes one with the light.\nChant the names of the divine to quiet the restless heart.\nIn the service of the master, we find the highest joy.",
        description: "Samarth Ramdas was a revered 17th-century Indian saint, philosopher, and poet. Known for his unwavering devotion (Bhakti) to Lord Rama and his powerful spiritual discourses (Dasbodh), he emphasized the integration of spiritual practice with active, worldly duty. He was the spiritual guru of Chhatrapati Shivaji Maharaj, blending martial spirit with spiritual depth.",
        whyTheyMatter: "Samarth Ramdas breaks the stereotype that spirituality requires abandoning the world. He taught that active participation in society, fighting injustice, and maintaining absolute devotion to the Divine are all facets of a single, unified spiritual path."
    },
    { 
        id: "sadvritta-ethical-living",
        title: "Sadvritta - Ethical Living", 
        story: "Right conduct is the foundation of a spiritual life.\nTreat all beings with compassion and kindness.\nIntegrity in thought, word, and deed brings lasting harmony.\nYour actions are the seeds of your future destiny.",
        description: "Sadvritta is an ancient Ayurvedic and Yogic concept meaning 'noble conduct' or the 'rules of good living'. It outlines a comprehensive code of ethics that encompasses personal hygiene, social behavior, moral integrity, and psychological well-being. Sadvritta asserts that health and spiritual progress are impossible without a foundation of ethical living.",
        whyTheyMatter: "In a fast-paced world focused on personal gain, Sadvritta brings us back to the fundamentals of human decency. It teaches that our physical health, mental peace, and spiritual growth are directly tied to how we treat others and how honestly we live our lives."
    },
    { 
        id: "saradhi-the-divine-guide",
        title: "Saradhi - The Divine Guide", 
        story: "The guide is the lighthouse in the storm of existence.\nFollowing the lead of wisdom brings us to the shore of truth.\nSurrender the reins of your life to the master within.\nEvery step taken in trust is a step closer to liberation.",
        description: "Saradhi literally means 'charioteer'. In the epic Mahabharata, Lord Krishna serves as the Saradhi to the warrior Arjuna, guiding him through the moral and physical battlefield of Kurukshetra. Symbolically, Saradhi represents the inner divine guide—the higher intellect or the soul—that steers the chariot of the body through the chaotic journey of life.",
        whyTheyMatter: "We all face moments of profound confusion and moral dilemmas. The concept of Saradhi reminds us that we are not alone. By surrendering the 'reins' of our ego to our higher, inner wisdom, we can navigate life's most difficult battles with grace and clarity."
    },
    { 
        id: "vyayama-sacred-movement",
        title: "Vyayama - Sacred Movement", 
        story: "The body is the temple of the living soul.\nThrough discipline and movement, we prepare for stillness.\nStrength and flexibility are the tools of the spiritual warrior.\nHonoring the body is honoring the creation itself.",
        description: "Vyayama is the ancient Indian science of physical exercise and movement, deeply intertwined with Ayurveda and Yoga. Unlike modern fitness that often focuses solely on aesthetics, Vyayama views the body as a sacred vessel. Physical discipline, breath coordination, and mindful movement are utilized to balance the doshas, clear energetic channels (Nadis), and prepare the body to sit comfortably in deep meditation.",
        whyTheyMatter: "Physical stagnation leads to mental stagnation. Vyayama reminds us that spiritual growth cannot bypass the physical body. By treating exercise as a sacred duty rather than a chore, we honor our physical form and build the necessary vitality to pursue higher spiritual goals."
    },
    { 
        id: "satmya-holistic-adaptability",
        title: "Satmya - Holistic Adaptability", 
        story: "Satmya is the art of adapting to one's environment.\nIt represents the body's natural resilience.\nThrough conscious habits, we build lasting vitality.\nHarmony with our surroundings brings enduring health.",
        description: "In Ayurveda, Satmya refers to suitability or habituation. It is the concept of adapting to one's environment, diet, and lifestyle to maintain equilibrium. Satmya recognizes that what is medicine for one may be poison for another, emphasizing the profound uniqueness of each individual's constitution and their deeply ingrained habits.",
        whyTheyMatter: "Modern life demands constant adaptation. Understanding Satmya empowers us to build deep resilience by recognizing what truly suits our unique mind-body complex, leading to sustainable health and an unshakeable sense of groundedness amidst constant change."
    },
    { 
        id: "bramhacharya-energy-mastery",
        title: "Bramhacharya - Energy Mastery", 
        story: "Bramhacharya is the preservation of vital energy.\nIt focuses the mind on higher spiritual goals.\nBy channeling our desires, we gain profound clarity.\nTrue power lies in self-mastery and inner focus.",
        description: "Often misunderstood merely as celibacy, Bramhacharya (literally 'behavior that leads to Brahman' or divine consciousness) is the yogic practice of right use of energy. It involves directing our vital life force (Prana) away from external sensory gratification and channeling it toward profound spiritual growth, creative expression, and inner healing.",
        whyTheyMatter: "In a world designed to drain our attention and vital energy, Bramhacharya is the ultimate practice of energetic sovereignty. It allows us to reclaim our power, focus our scattered minds, and channel our passions into fulfilling our highest potential."
    },
    { 
        id: "dhinacharya-daily-routine",
        title: "Dhinacharya - Daily Routine", 
        story: "Dhinacharya aligns our daily rhythm with nature.\nIt brings balance to body, mind, and spirit.\nA structured day builds a foundation for peace.\nSmall habits shape the trajectory of our lives.",
        description: "Dinacharya is the Ayurvedic concept of a daily routine designed to maintain physical and mental hygiene. By aligning our waking, eating, and sleeping habits with the natural cycles of the sun and the rhythms of nature, Dinacharya creates a predictable foundation that stabilizes the nervous system and optimizes biological functions.",
        whyTheyMatter: "An unpredictable lifestyle creates a chaotic mind. Dinacharya acts as an anchor. By grounding our days in healthy, consistent rituals, we eliminate decision fatigue, drastically reduce stress, and create the optimal environment for our bodies to heal and thrive."
    },
    { 
        id: "civilizational-wisdom",
        title: "Civilizational Wisdom", 
        story: "Our ancient civilization holds profound truths.\nPassed down through generations of seekers.\nDiscover the timeless wisdom that shapes our world.\nEmbracing our roots gives wings to our future.",
        description: "Civilizational Wisdom encompasses the collective spiritual, philosophical, and practical knowledge accumulated by humanity over millennia. In the context of the Vedic tradition, it is the unbroken transmission of understanding regarding the cosmos, human nature, and the ultimate reality. It is a vast reservoir of timeless principles that guide humanity through the ages.",
        whyTheyMatter: "To move forward with clarity, we must understand where we come from. Civilizational Wisdom provides a deeply rooted framework of values that protects us from the fleeting trends of modern society. It grounds our progress in timeless truths, ensuring that technological advancement is matched by spiritual maturity."
    },
    { 
        id: "ritucharya-seasonal-harmony",
        title: "Ritucharya - Seasonal Harmony", 
        story: "Ritucharya guides us through the cycles of nature.\nAdjusting to the seasons keeps the body in perfect harmony.\nAs the earth changes, so must our daily habits.\nEmbrace the natural flow to maintain vibrant health.",
        description: "Ritucharya translates to seasonal regimen. In Ayurveda, the changing of seasons (Ritus) profoundly impacts the human body and mind. Ritucharya is the practice of adjusting one's diet, daily routine, and lifestyle practices to harmonize with the shifting energies of nature, preventing seasonal diseases and maintaining continuous equilibrium.",
        whyTheyMatter: "Modern living often disconnects us from nature's cycles, leading to imbalances and seasonal illnesses. Ritucharya matters because it reinstates our intrinsic bond with the Earth. By adapting to the seasons, we harness nature's support rather than fighting against its currents, ensuring year-round vitality."
    }
];

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nirvaha');
        console.log('Connected to DB.');
        
        for (const item of items) {
            const existing = await Page.findOne({ slug: item.id });
            if (!existing) {
                const contentHtml = `
                    <div style="font-family: sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px;">
                        <h1 style="color: #1b4332;">${item.title}</h1>
                        <blockquote style="font-style: italic; border-left: 4px solid #86efac; padding-left: 15px; color: #555;">
                            ${item.story.replace(/\n/g, '<br>')}
                        </blockquote>
                        <h2 style="color: #1b4332; margin-top: 30px;">Description</h2>
                        <p>${item.description}</p>
                        <h2 style="color: #1b4332; margin-top: 30px;">Why it Matters</h2>
                        <p>${item.whyTheyMatter}</p>
                    </div>
                `;
                await Page.create({
                    title: item.title,
                    slug: item.id,
                    content: contentHtml,
                    isActive: true
                });
                console.log(`Created page: ${item.title}`);
            } else {
                console.log(`Page already exists: ${item.title}`);
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
