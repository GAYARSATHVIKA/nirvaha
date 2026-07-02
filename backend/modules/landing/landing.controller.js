const Landing = require('./landing.model');

/**
 * Get all landing page data
 * GET /api/landing
 */
exports.getLandingData = async (req, res) => {
  try {
    let landingData = await Landing.findOne().lean();
    
    // If no landing data exists, return a default structure
    if (!landingData) {
      landingData = {
        hero: {
          title: "Find Your Inner Harmony",
          subtitle: "AI-powered wellness",
          buttonText: "Start Journey",
          imageUrl: "image.png"
        },
        partners: [
          { value: "50,000+", label: "Active Members", icon: "👥" },
          { value: "200+", label: "Expert Guides", icon: "🌟" },
          { value: "10,000+", label: "Sessions Completed", icon: "🧘" },
          { value: "4.9★", label: "Average Rating", icon: "⭐" }
        ],
        pillars: [
          { id: "01", title: "Systemic Diagnostics", desc: "We analyze your organizational pulse through confidential, culturally-aware assessments to identify latent stressors.", image: "/pillar_systemic_diagnostics.png" },
          { id: "02", title: "Scalable Protocols", desc: "Deployment of curated wellness frameworks that adapt to team size, location, and operational intensity.", image: "/pillar_scalable_protocols.png" },
          { id: "03", title: "Leadership Synergy", desc: "Equipping managers with high-EQ toolkits to foster psychological safety and resilient decision-making.", image: "/pillar_leadership_synergy.png" },
          { id: "04", title: "Cultural Integration", desc: "Weaving emotional intelligence into the daily fabric of operations, transforming wellness from a perk to a practice.", image: "/pillar_cultural_integration.png" },
          { id: "05", title: "Impact & ROI", desc: "Real-time analytics measuring engagement, retention shifts, and emotional capital growth.", image: "/pillar_impact_roi.png" }
        ],
        library: [
          { 
              id: "agni-the-sacred-fire",
              title: "Agni - The Sacred Fire", 
              category: "Transformation", 
              image: "/agni.jpg", 
              duration: "15 min",
              story: "Agni is the element of transformation.\nIt burns away the impurities of the ego.\nIn its light, we find the path to our true self.\nThe fire of awareness illuminates the dark corners of the mind."
          },
          { 
              id: "sadvritta-ethical-living",
              title: "Sadvritta - Ethical Living", 
              category: "Ethics", 
              image: "/sadvrita.jpg", 
              duration: "Practice",
              story: "Right conduct is the foundation of a spiritual life.\nTreat all beings with compassion and kindness.\nIntegrity in thought, word, and deed brings lasting harmony.\nYour actions are the seeds of your future destiny."
          },
          { 
              id: "satmya-holistic-adaptability",
              title: "Satmya - Holistic Adaptability", 
              category: "Adaptability", 
              image: "/satmya.jpg", 
              duration: "10 min",
              story: "Satmya is the art of adapting to one's environment.\nIt represents the body's natural resilience.\nThrough conscious habits, we build lasting vitality.\nHarmony with our surroundings brings enduring health."
          },
          { 
              id: "bramhacharya-energy-mastery",
              title: "Bramhacharya - Energy Mastery", 
              category: "Discipline", 
              image: "/bramhacharya.jpg", 
              duration: "Series",
              story: "Bramhacharya is the preservation of vital energy.\nIt focuses the mind on higher spiritual goals.\nBy channeling our desires, we gain profound clarity.\nTrue power lies in self-mastery and inner focus."
          },
          { 
              id: "dhinacharya-daily-routine",
              title: "Dhinacharya - Daily Routine", 
              category: "Lifestyle", 
              image: "/dhinacharya.jpg", 
              duration: "Practice",
              story: "Dhinacharya aligns our daily rhythm with nature.\nIt brings balance to body, mind, and spirit.\nA structured day builds a foundation for peace.\nSmall habits shape the trajectory of our lives."
          },
          { 
              id: "manas-shuddhi-mental-clarity",
              title: "Manas Shuddhi - Mental Clarity", 
              category: "Mind", 
              image: "/manas shuddhi.jpg", 
              duration: "20 min",
              story: "Purifying the mind is like cleaning a temple.\nRemove the dust of desire and the smoke of anger.\nOnly a pure heart can hold the divine flame,\nradiating peace to every corner of existence."
          },
          { 
              id: "saradhi-the-divine-guide",
              title: "Saradhi - The Divine Guide", 
              category: "Guidance", 
              image: "/saradhi.jpg", 
              duration: "Journey",
              story: "The guide is the lighthouse in the storm of existence.\nFollowing the lead of wisdom brings us to the shore of truth.\nSurrender the reins of your life to the master within.\nEvery step taken in trust is a step closer to liberation."
          },
          { 
              id: "vyayama-sacred-movement",
              title: "Vyayama - Sacred Movement", 
              category: "Discipline", 
              image: "/vyayama.jpg", 
              duration: "Movement",
              story: "The body is the temple of the living soul.\nThrough discipline and movement, we prepare for stillness.\nStrength and flexibility are the tools of the spiritual warrior.\nHonoring the body is honoring the creation itself."
          },
          { 
              id: "indriya-nigraha-sensory-control",
              title: "Indriya Nigraha - Sensory Control", 
              category: "Senses", 
              image: "/indriya.jpg", 
              duration: "10 min",
              story: "Master the senses to master the mind.\nIndriya Nigraha is the art of conscious withdrawal.\nNot through suppression, but through deep understanding.\nWhen the senses turn inward, the soul finds its home."
          },
          { 
              id: "civilizational-wisdom",
              title: "Civilizational Wisdom", 
              category: "Heritage", 
              image: "/civilizational.jpg", 
              duration: "Lecture",
              story: "Our ancient civilization holds profound truths.\nPassed down through generations of seekers.\nDiscover the timeless wisdom that shapes our world.\nEmbracing our roots gives wings to our future."
          },
          { 
              id: "ritucharya-seasonal-harmony",
              title: "Ritucharya - Seasonal Harmony", 
              category: "Nature", 
              image: "/ritucharya.jpg", 
              duration: "Series",
              story: "Ritucharya is the wisdom of seasonal living.\nAdapting to nature's cycles brings robust health.\nAs the earth shifts, so must our practices.\nFlowing with the seasons is the secret to longevity."
          }
        ],
        goals: [
          { id: 1, title: "INNER PEACE", subtitle: "I'm looking to find", image: "/nirvaha1.png", desc: "Calm the mind and soothe the soul through mindful meditation and breathwork." },
          { id: 2, title: "EMOTIONAL HEALING", subtitle: "I'm looking for", image: "/nirvaha2.png", desc: "Process emotions and find balance with ancient healing practices." },
          { id: 3, title: "PHYSICAL VITALITY", subtitle: "I'm looking to boost", image: "/nirvaha3.png", desc: "Energize the body and spirit with holistic wellness techniques." },
          { id: 4, title: "SPIRITUAL CONNECTION", subtitle: "I'm looking for a", image: "/nirvaha4.png", desc: "Deepen connection to self and universe through sacred wisdom." },
          { id: 5, title: "STRESS RELIEF", subtitle: "I'm seeking", image: "/nirvaha5.png", desc: "Release tension and restore harmony with proven relaxation methods." }
        ],
        academy: {
          title: "Nirvaha Academy",
          subtitle: "Explore deep teachings",
          exploreButtonText: "Explore Courses",
          isLoginRequired: false
        },
        unveil: [
          {
            image: "/image 01.png",
            title: "About Us",
            subtitle: "Ancient Wisdom, Modern Science",
            desc: "Nirvaha is more than a platform—it's a sanctuary where timeless spiritual practices meet modern tools to find your inner balance.",
            btn: "Read Our Stories",
            route: "/stories"
          },
          {
            image: "/image 02.png",
            title: "Our Vision",
            subtitle: "Neuroscience Meets Spirit",
            desc: "We leverage cutting-edge tech to quantify spiritual growth, making the intangible measurable for modern seekers.",
            btn: "Explore Tech",
            route: "/certifications"
          },
          {
            image: "/image 03.png",
            subtitle: "Personalized AI Guidance",
            title: "AI Guide",
            desc: "Experience the convergence of technology and tranquility with an AI guide that learns and grows with your spirit.",
            btn: "Meet Your Guide",
            route: "/dashboard/chatbot"
          },
          {
            image: "/image 04.png",
            title: "Harmony",
            subtitle: "A Sanctuary for the Soul",
            desc: "Find your center in a chaotic world. Our guided sessions are designed to align your mind, body, and breath.",
            btn: "Start Healing",
            route: "/dashboard/meditation"
          },
          {
            image: "/image 05.png",
            title: "Growth",
            subtitle: "The Power of Together",
            desc: "Join a global circle of seekers and healers. Together, we create a resonance that heals the world.",
            btn: "Join the Circle",
            route: "/dashboard/community"
          }
        ],
        courses: [],
        settings: {
          maintenanceMode: false,
          showCollaborators: true,
          showContactForm: true
        }
      };
    }

    let responseData = landingData;
    if (landingData && landingData.toObject) {
      responseData = landingData.toObject();
    }

    // Fallback: If document exists but is missing the unveil array
    if (responseData && (!responseData.unveil || responseData.unveil.length === 0)) {
      responseData.unveil = [
        {
          image: "/image 01.png",
          title: "About Us",
          subtitle: "Ancient Wisdom, Modern Science",
          desc: "Nirvaha is more than a platform—it's a sanctuary where timeless spiritual practices meet modern tools to find your inner balance.",
          btn: "Read Our Stories",
          route: "/stories"
        },
        {
          image: "/image 02.png",
          title: "Our Vision",
          subtitle: "Neuroscience Meets Spirit",
          desc: "We leverage cutting-edge tech to quantify spiritual growth, making the intangible measurable for modern seekers.",
          btn: "Explore Tech",
          route: "/certifications"
        },
        {
          image: "/image 03.png",
          subtitle: "Personalized AI Guidance",
          title: "AI Guide",
          desc: "Experience the convergence of technology and tranquility with an AI guide that learns and grows with your spirit.",
          btn: "Meet Your Guide",
          route: "/dashboard/chatbot"
        },
        {
          image: "/image 04.png",
          title: "Harmony",
          subtitle: "A Sanctuary for the Soul",
          desc: "Find your center in a chaotic world. Our guided sessions are designed to align your mind, body, and breath.",
          btn: "Start Healing",
          route: "/dashboard/meditation"
        },
        {
          image: "/image 05.png",
          title: "Growth",
          subtitle: "The Power of Together",
          desc: "Join a global circle of seekers and healers. Together, we create a resonance that heals the world.",
          btn: "Join the Circle",
          route: "/dashboard/community"
        }
      ];
    }

    // Fallback: If document exists but is missing the pillars array
    if (responseData && (!responseData.pillars || responseData.pillars.length === 0)) {
      responseData.pillars = [
          { id: "01", title: "Systemic Diagnostics", desc: "We analyze your organizational pulse through confidential, culturally-aware assessments to identify latent stressors.", image: "/pillar_systemic_diagnostics.png" },
          { id: "02", title: "Scalable Protocols", desc: "Deployment of curated wellness frameworks that adapt to team size, location, and operational intensity.", image: "/pillar_scalable_protocols.png" },
          { id: "03", title: "Leadership Synergy", desc: "Equipping managers with high-EQ toolkits to foster psychological safety and resilient decision-making.", image: "/pillar_leadership_synergy.png" },
          { id: "04", title: "Cultural Integration", desc: "Weaving emotional intelligence into the daily fabric of operations, transforming wellness from a perk to a practice.", image: "/pillar_cultural_integration.png" },
          { id: "05", title: "Impact & ROI", desc: "Real-time analytics measuring engagement, retention shifts, and emotional capital growth.", image: "/pillar_impact_roi.png" }
      ];
    }

    // Fallback: If document exists but is missing the inspirations array
    if (responseData && (!responseData.inspirations || responseData.inspirations.length === 0)) {
      responseData.inspirations = [
          { id: 1, quote: "Breathe. You are exactly where you need to be.", chant: "Cosmic OM Chant", link: "/healing-music", author: "Aisha Patel", avatar: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?q=80&w=150&auto=format&fit=crop" },
          { id: 2, quote: "Stillness is where healing begins.", chant: "Gayatri Resonance", link: "/healing-music", author: "Arjun Verma", avatar: "/arjun verma.png" },
          { id: 3, quote: "Let go of what no longer serves you.", chant: "Soma Lunar Nectar", link: "/healing-music", author: "Rohan Sharma", avatar: "/rohan.jpg" },
          { id: 4, quote: "Every breath is a new beginning.", chant: "Brahma Nada", link: "/healing-music", author: "Aditya Rao", avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=150&auto=format&fit=crop" },
          { id: 5, quote: "Your peace is your power.", chant: "Maha Mrityunjaya", link: "/healing-music", author: "Priya Desai", avatar: "/priya.jpg" },
          { id: 6, quote: "Find beauty in the present moment.", chant: "Anahata Heart Frequency", link: "/healing-music", author: "Kavya Iyer", avatar: "/kavya.png" }
      ];
    }
    
    res.status(200).json(responseData);
  } catch (error) {
    console.error('Error fetching landing data:', error);
    res.status(500).json({ error: 'Server error while fetching landing data' });
  }
};

/**
 * Update landing page data (Admin only)
 * PUT /api/admin/landing
 */
exports.updateLandingData = async (req, res) => {
  try {
    const updateData = req.body;
    delete updateData._id;
    delete updateData.__v;
    
    // Find the single document and update it, or create if it doesn't exist
    let landingData = await Landing.findOneAndUpdate(
      {}, 
      updateData, 
      { new: true, upsert: true, runValidators: true }
    );
    
    // Clear the cache so that the new data is fetched immediately
    const { clearCache } = require('../../utils/cache');
    await clearCache();
    
    res.status(200).json({
      message: 'Landing page updated successfully',
      data: landingData
    });
  } catch (error) {
    console.error('Error updating landing data:', error);
    res.status(500).json({ error: 'Server error while updating landing data' });
  }
};

/**
 * Add a new daily inspiration (For Users)
 * POST /api/landing/inspirations
 */
exports.addInspiration = async (req, res) => {
  try {
    const { quote } = req.body;
    if (!quote) {
      return res.status(400).json({ error: 'Quote content is required' });
    }

    const userName = req.user.name || 'Anonymous Seeker';
    const userAvatar = req.user.profilePicture || '';

    // Create new inspiration object
    const newInspiration = {
      id: Date.now(),
      quote: quote,
      chant: '',
      link: '',
      author: userName,
      avatar: userAvatar
    };

    // Find the document and append to inspirations
    const landingData = await Landing.findOneAndUpdate(
      {},
      { $push: { inspirations: newInspiration } },
      { new: true, upsert: true }
    );

    // Clear the cache
    const { clearCache } = require('../../utils/cache');
    await clearCache();

    res.status(200).json({
      message: 'Inspiration added successfully',
      inspiration: newInspiration
    });
  } catch (error) {
    console.error('Error adding inspiration:', error);
    res.status(500).json({ error: 'Server error while adding inspiration' });
  }
};
