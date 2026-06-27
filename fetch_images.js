const fs = require('fs');
const path = require('path');
const https = require('https');

const posesDir = path.join(__dirname, 'frontend/public/poses-for-meditation');
const yogaDir = path.join(__dirname, 'frontend/public/yoga-for-meditation');

// URLs from Unsplash that are highly relevant to Yoga and Meditation
const images = [
  // Poses Set 1
  { url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop', dest: path.join(posesDir, 'easy-1.jpg') },
  { url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop', dest: path.join(posesDir, 'cosmic-2.png') },
  { url: 'https://images.unsplash.com/photo-1528319725582-ddc096101511?q=80&w=800&auto=format&fit=crop', dest: path.join(posesDir, 'thunder-3.png') },
  { url: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=800&auto=format&fit=crop', dest: path.join(posesDir, 'lotus-4.png') },
  { url: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=800&auto=format&fit=crop', dest: path.join(posesDir, 'corpus-5.png') },
  { url: 'https://images.unsplash.com/photo-1552858725-2758b5fb1286?q=80&w=800&auto=format&fit=crop', dest: path.join(posesDir, 'zen-6.png') },
  { url: 'https://images.unsplash.com/photo-1603988363607-e1e4a66962c6?q=80&w=800&auto=format&fit=crop', dest: path.join(posesDir, 'tree-7.png') },
  { url: 'https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?q=80&w=800&auto=format&fit=crop', dest: path.join(posesDir, 'deep-8.png') },

  // Poses Set 2
  { url: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=800&auto=format&fit=crop', dest: path.join(yogaDir, 'bound.-1.png') },
  { url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop', dest: path.join(yogaDir, 'seated-2.png') },
  { url: 'https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?q=80&w=800&auto=format&fit=crop', dest: path.join(yogaDir, 'staff-3.png') },
  { url: 'https://images.unsplash.com/photo-1600881333168-2ef49b341f30?q=80&w=800&auto=format&fit=crop', dest: path.join(yogaDir, 'cow-4.png') },
  { url: 'https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?q=80&w=800&auto=format&fit=crop', dest: path.join(yogaDir, 'camel-5.png') },
  { url: 'https://images.unsplash.com/photo-1524863479829-916d8e77f114?q=80&w=800&auto=format&fit=crop', dest: path.join(yogaDir, 'cobra-6.png') },
  { url: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=800&auto=format&fit=crop', dest: path.join(yogaDir, 'boat-7.png') },
  { url: 'https://images.unsplash.com/photo-1549476464-37392f717541?q=80&w=800&auto=format&fit=crop', dest: path.join(yogaDir, 'seated-twist-8.png') }
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return download(response.headers.location, dest).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  if (!fs.existsSync(posesDir)) fs.mkdirSync(posesDir, { recursive: true });
  if (!fs.existsSync(yogaDir)) fs.mkdirSync(yogaDir, { recursive: true });

  console.log('Downloading 16 high-quality yoga/meditation images...');
  for (let i = 0; i < images.length; i++) {
    const { url, dest } = images[i];
    try {
      await download(url, dest);
      console.log(`[${i + 1}/16] Downloaded to ${path.basename(dest)}`);
    } catch (e) {
      console.error(`Failed to download ${dest}:`, e.message);
    }
  }
  console.log('Done!');
}

run();
