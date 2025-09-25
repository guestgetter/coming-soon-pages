import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, '../public');
const QUALITY = 80; // JPEG quality
const MAX_WIDTH = 1200; // Max width for images
const MAX_HEIGHT = 800; // Max height for images

async function optimizeImage(inputPath, outputPath) {
  try {
    const stats = fs.statSync(inputPath);
    const originalSize = (stats.size / 1024 / 1024).toFixed(2);
    
    console.log(`Optimizing: ${path.basename(inputPath)} (${originalSize} MB)`);
    
    await sharp(inputPath)
      .resize(MAX_WIDTH, MAX_HEIGHT, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .jpeg({ quality: QUALITY, progressive: true })
      .toFile(outputPath);
    
    const newStats = fs.statSync(outputPath);
    const newSize = (newStats.size / 1024 / 1024).toFixed(2);
    const savings = ((stats.size - newStats.size) / stats.size * 100).toFixed(1);
    
    console.log(`  → ${path.basename(outputPath)} (${newSize} MB) - ${savings}% smaller`);
    
    return { originalSize, newSize, savings };
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error.message);
    return null;
  }
}

async function optimizeDirectory(dirPath) {
  const items = fs.readdirSync(dirPath);
  
  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      await optimizeDirectory(fullPath);
    } else if (stat.isFile() && /\.(jpg|jpeg|png)$/i.test(item)) {
      const outputPath = fullPath.replace(/\.(jpg|jpeg|png)$/i, '_optimized.jpg');
      await optimizeImage(fullPath, outputPath);
    }
  }
}

async function main() {
  console.log('🚀 Starting image optimization...\n');
  
  try {
    await optimizeDirectory(PUBLIC_DIR);
    console.log('\n✅ Image optimization complete!');
    console.log('\n📝 Next steps:');
    console.log('1. Review the optimized images');
    console.log('2. Replace original images with optimized versions');
    console.log('3. Delete original large images');
  } catch (error) {
    console.error('❌ Optimization failed:', error);
  }
}

main();
