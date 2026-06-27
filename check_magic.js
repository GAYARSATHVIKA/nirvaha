const fs = require('fs');

function checkMagic(file) {
  const buffer = Buffer.alloc(4);
  const fd = fs.openSync(file, 'r');
  fs.readSync(fd, buffer, 0, 4, 0);
  fs.closeSync(fd);
  console.log(file, buffer.toString('hex'));
}

checkMagic('frontend/public/yoga-for-meditation/camel-5.png');
checkMagic('frontend/public/poses-for-meditation/easy-1.jpg');
