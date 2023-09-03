//////////////////////////////////////////////////////////////////////////////
////////////////////////// Multiple image converting /////////////////////////
// First take images and put it into toConvert file then run "node main.js" //
//////////// Result will be load to toConvert file after the run /////////////
//////////////////////////////////////////////////////////////////////////////

const fs = require('fs');
const path = require('path');
const potrace = require('potrace');

function convertPngToSvg(pngFilePath, svgFilePath) {
  const bitmap = fs.readFileSync(pngFilePath);
  
  potrace.trace(bitmap, (err, svg) => {
    if (err) {
      console.error('Error converting PNG to SVG:', err);
      return;
    }
    
    fs.writeFile(svgFilePath, svg, (err) => {
      if (err) {
        console.error('Error writing SVG file:', err);
        return;
      }
      
      console.log('PNG to SVG conversion successful!');
    });
  });
}

function convertPngFilesToSvg() {
  const directoryPath = './toConvert'; // Path to the "toConvert" folder
  
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }
    
    files.forEach((file) => {
      const extension = path.extname(file);
      
      if (extension === '.png') {
        const pngFile = path.join(directoryPath, file);
        const svgFile = path.join(directoryPath, `${path.basename(file, extension)}.svg`);
        
        convertPngToSvg(pngFile, svgFile);
      }
    });
  });
}

// Example usage
convertPngFilesToSvg();
