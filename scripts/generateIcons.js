const fs = require('fs');
const path = require('path');

function generateIcons() {
  const sourceImage = path.join(__dirname, '../assets/clinicconnect.png');
  const assetsDir = path.join(__dirname, '../assets');
  
  // Check if source image exists
  if (!fs.existsSync(sourceImage)) {
    console.error('Source image not found:', sourceImage);
    return;
  }

  console.log('Copying clinicconnect.png to required icon files...');

  try {
    // Copy the source image to all required icon files
    const sourceBuffer = fs.readFileSync(sourceImage);
    
    // Copy to icon.png
    fs.writeFileSync(path.join(assetsDir, 'icon.png'), sourceBuffer);
    
    // Copy to adaptive-icon.png
    fs.writeFileSync(path.join(assetsDir, 'adaptive-icon.png'), sourceBuffer);
    
    // Copy to splash-icon.png
    fs.writeFileSync(path.join(assetsDir, 'splash-icon.png'), sourceBuffer);
    
    // Copy to favicon.png
    fs.writeFileSync(path.join(assetsDir, 'favicon.png'), sourceBuffer);

    console.log('✅ Icons copied successfully!');
    console.log('Updated files:');
    console.log('- icon.png');
    console.log('- adaptive-icon.png');
    console.log('- splash-icon.png');
    console.log('- favicon.png');
    console.log('');
    console.log('Note: For production, you may want to optimize these images for different sizes.');

  } catch (error) {
    console.error('Error copying icons:', error);
  }
}

generateIcons();