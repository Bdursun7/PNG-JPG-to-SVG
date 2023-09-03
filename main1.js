/////////////////////////////
// Single image converting //
/////////////////////////////

const fs = require('fs');
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

// Example usage
const pngFile = 'input.png';
const svgFile = 'output.svg';

convertPngToSvg(pngFile, svgFile);
