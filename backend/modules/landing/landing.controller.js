const Landing = require('./landing.model');

/**
 * Get all landing page data
 * GET /api/landing
 */
exports.getLandingData = async (req, res) => {
  try {
    let landingData = await Landing.findOne();
    
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
          { id: "01", title: "Systemic Diagnostics", desc: "We analyze your organizational pulse through confidential, culturally-aware assessments to identify latent stressors.", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop" },
          { id: "02", title: "Scalable Protocols", desc: "Deployment of curated wellness frameworks that adapt to team size, location, and operational intensity.", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop" },
          { id: "03", title: "Leadership Synergy", desc: "Equipping managers with high-EQ toolkits to foster psychological safety and resilient decision-making.", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop" }
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
          { id: 1, title: "INNER PEACE", subtitle: "I'm looking to find", image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=800&auto=format&fit=crop", desc: "Calm the mind and soothe the soul through mindful meditation and breathwork." },
          { id: 2, title: "EMOTIONAL HEALING", subtitle: "I'm looking for", image: "https://images.unsplash.com/photo-1499209974431-2761386a123d?q=80&w=800&auto=format&fit=crop", desc: "Process emotions and find balance with ancient healing practices." }
        ],
        academy: {
          title: "Nirvaha Academy",
          subtitle: "Explore deep teachings",
          exploreButtonText: "Explore Courses",
          isLoginRequired: false
        },
        courses: [],
        settings: {
          maintenanceMode: false,
          showCollaborators: true,
          showContactForm: true
        }
      };
    }
    
    res.status(200).json(landingData);
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
    
    // Find the single document and update it, or create if it doesn't exist
    let landingData = await Landing.findOneAndUpdate(
      {}, 
      updateData, 
      { new: true, upsert: true, runValidators: true }
    );
    
    res.status(200).json({
      message: 'Landing page updated successfully',
      data: landingData
    });
  } catch (error) {
    console.error('Error updating landing data:', error);
    res.status(500).json({ error: 'Server error while updating landing data' });
  }
};
