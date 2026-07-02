require('dotenv').config();
const mongoose = require('mongoose');
const Landing = require('./modules/landing/landing.model');

mongoose.connect(process.env.MONGODB_URI)
.then(async () => {
    console.log('Connected to DB');
    const existing = await Landing.findOne();
    if (existing) {
        existing.inspirations = [
            { id: 1, quote: "Breathe. You are exactly where you need to be.", chant: "Cosmic OM Chant", link: "/healing-music", author: "Aisha Patel", avatar: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?q=80&w=150&auto=format&fit=crop" },
            { id: 2, quote: "Stillness is where healing begins.", chant: "Gayatri Resonance", link: "/healing-music", author: "Arjun Verma", avatar: "/arjun verma.png" },
            { id: 3, quote: "Let go of what no longer serves you.", chant: "Soma Lunar Nectar", link: "/healing-music", author: "Rohan Sharma", avatar: "/rohan.jpg" },
            { id: 4, quote: "Every breath is a new beginning.", chant: "Brahma Nada", link: "/healing-music", author: "Aditya Rao", avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=150&auto=format&fit=crop" },
            { id: 5, quote: "Your peace is your power.", chant: "Maha Mrityunjaya", link: "/healing-music", author: "Priya Desai", avatar: "/priya.jpg" },
            { id: 6, quote: "Find beauty in the present moment.", chant: "Anahata Heart Frequency", link: "/healing-music", author: "Kavya Iyer", avatar: "/kavya.png" }
        ];
        await existing.save();
        console.log('Updated existing document with inspirations');
    }
    process.exit(0);
})
.catch(err => {
    console.error(err);
    process.exit(1);
});
