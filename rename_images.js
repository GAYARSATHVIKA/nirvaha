const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'frontend', 'public');
const posesOld = path.join(publicDir, 'poses for medittaion');
const posesNew = path.join(publicDir, 'poses-for-meditation');
const yogaOld = path.join(publicDir, 'yoga for meditation');
const yogaNew = path.join(publicDir, 'yoga-for-meditation');

// Rename directories
if (fs.existsSync(posesOld)) fs.renameSync(posesOld, posesNew);
if (fs.existsSync(yogaOld)) fs.renameSync(yogaOld, yogaNew);

// Rename files inside
function renameFilesInDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file.includes(' ')) {
      const newFile = file.replace(/ /g, '-');
      fs.renameSync(path.join(dir, file), path.join(dir, newFile));
    }
  }
}

renameFilesInDir(posesNew);
renameFilesInDir(yogaNew);

console.log("Renamed directories and files successfully.");
