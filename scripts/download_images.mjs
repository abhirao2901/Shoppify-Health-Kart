// FILE: scripts/download_images.mjs
import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const assetsDir = path.join(root, 'src', 'assets', 'products');

// Ensure assets directory exists
await fs.mkdir(assetsDir, { recursive: true });

const assets = [
  {
    slug: "whey-protein-isolate-chocolate-2lb",
    baseName: "whey-protein-isolate-chocolate-2lb",
    alt: "Whey protein powder scoop with jar, chocolate tone",
    srcUrl: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    slug: "plant-based-protein-vanilla",
    baseName: "plant-based-protein-vanilla",
    alt: "Plant-Based Protein, Vanilla, protein powder container",
    srcUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    slug: "omega-3-fish-oil-1000mg",
    baseName: "omega-3-fish-oil-1000mg",
    alt: "Omega 3 fish oil softgel capsules on white",
    srcUrl: "https://images.unsplash.com/photo-1550572017-edd951b55104?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    slug: "multivitamin-complete-daily",
    baseName: "multivitamin-complete-daily",
    alt: "Multivitamin Complete Daily, tablet bottle",
    srcUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    slug: "vitamin-d3-2000-iu",
    baseName: "vitamin-d3-2000-iu",
    alt: "Vitamin D3, 2000 IU, capsule bottle",
    srcUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    slug: "vitamin-c-1000mg",
    baseName: "vitamin-c-1000mg",
    alt: "Vitamin C, 1000mg, tablet bottle",
    srcUrl: "https://images.unsplash.com/photo-1576602976047-174e57a47881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    slug: "ashwagandha-extract-600mg",
    baseName: "ashwagandha-extract-600mg",
    alt: "Ashwagandha Extract, 600mg, capsule bottle",
    srcUrl: "https://images.unsplash.com/photo-1550572017-edd951b55104?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    slug: "creatine-monohydrate-powder",
    baseName: "creatine-monohydrate-powder",
    alt: "Creatine Monohydrate Powder, container",
    srcUrl: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    slug: "pre-workout-energy-formula",
    baseName: "pre-workout-energy-formula",
    alt: "Pre-Workout Energy Formula, powder container",
    srcUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    slug: "collagen-peptides-powder",
    baseName: "collagen-peptides-powder",
    alt: "Collagen Peptides Powder, container",
    srcUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    slug: "probiotic-50-billion-cfu",
    baseName: "probiotic-50-billion-cfu",
    alt: "Probiotic, 50 Billion CFU, capsule bottle",
    srcUrl: "https://images.unsplash.com/photo-1550572017-edd951b55104?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    slug: "magnesium-glycinate",
    baseName: "magnesium-glycinate",
    alt: "Magnesium Glycinate, tablet bottle",
    srcUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    slug: "zinc-50mg",
    baseName: "zinc-50mg",
    alt: "Zinc, 50mg, tablet bottle",
    srcUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    slug: "melatonin-5mg",
    baseName: "melatonin-5mg",
    alt: "Melatonin, 5mg, tablet bottle",
    srcUrl: "https://images.unsplash.com/photo-1576602976047-174e57a47881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    slug: "turmeric-curcumin-1000mg",
    baseName: "turmeric-curcumin-1000mg",
    alt: "Turmeric Curcumin, 1000mg, capsule bottle",
    srcUrl: "https://images.unsplash.com/photo-1550572017-edd951b55104?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    slug: "b-complex-vitamins",
    baseName: "b-complex-vitamins",
    alt: "B-Complex Vitamins, tablet bottle",
    srcUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    slug: "glucosamine-chondroitin",
    baseName: "glucosamine-chondroitin",
    alt: "Glucosamine Chondroitin, tablet bottle",
    srcUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    slug: "iron-folic-acid",
    baseName: "iron-folic-acid",
    alt: "Iron + Folic Acid, tablet bottle",
    srcUrl: "https://images.unsplash.com/photo-1576602976047-174e57a47881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    slug: "electrolyte-hydration-powder",
    baseName: "electrolyte-hydration-powder",
    alt: "Electrolyte Hydration Powder, container",
    srcUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    slug: "fiber-supplement-powder",
    baseName: "fiber-supplement-powder",
    alt: "Fiber Supplement Powder, container",
    srcUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  }
];

async function download(url, destPath) {
  try {
    console.log(`Downloading: ${url}`);
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText}`);
    }
    
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(destPath, buffer);
    return true;
  } catch (error) {
    console.error(`Failed to download ${url}:`, error.message);
    return false;
  }
}

function getExtensionFromUrl(url) {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname.toLowerCase();
    
    if (pathname.includes('.jpg') || pathname.includes('.jpeg')) return 'jpg';
    if (pathname.includes('.png')) return 'png';
    if (pathname.includes('.webp')) return 'webp';
    
    // Default to jpg for Unsplash images
    return 'jpg';
  } catch {
    return 'jpg';
  }
}

const manifest = { bySlug: {} };
let successCount = 0;
let failCount = 0;

console.log(`Starting download of ${assets.length} product images...`);

for (const asset of assets) {
  try {
    console.log(`\nProcessing: ${asset.slug}`);
    
    const ext = getExtensionFromUrl(asset.srcUrl);
    const origPath = path.join(assetsDir, `${asset.baseName}.orig.${ext}`);
    const webpPath = path.join(assetsDir, `${asset.baseName}.webp`);
    const thumbPath = path.join(assetsDir, `${asset.baseName}-thumb.webp`);
    
    // Download original image
    const downloadSuccess = await download(asset.srcUrl, origPath);
    if (!downloadSuccess) {
      failCount++;
      continue;
    }
    
    // Process with Sharp to create WebP versions
    try {
      // Create main WebP (max 1200x1200)
      await sharp(origPath)
        .resize({ 
          width: 1200, 
          height: 1200, 
          fit: 'contain', 
          background: { r: 255, g: 255, b: 255, alpha: 1 }
        })
        .webp({ quality: 82 })
        .toFile(webpPath);
      
      // Create thumbnail WebP (400x400)
      await sharp(origPath)
        .resize({ 
          width: 400, 
          height: 400, 
          fit: 'contain', 
          background: { r: 255, g: 255, b: 255, alpha: 1 }
        })
        .webp({ quality: 80 })
        .toFile(thumbPath);
      
      // Add to manifest
      manifest.bySlug[asset.slug] = {
        image: `/src/assets/products/${asset.baseName}.webp`,
        fallback: `/src/assets/products/${asset.baseName}.orig.${ext}`,
        thumbnail: `/src/assets/products/${asset.baseName}-thumb.webp`,
        alt: asset.alt
      };
      
      successCount++;
      console.log(`✓ Successfully processed: ${asset.slug}`);
      
    } catch (sharpError) {
      console.error(`✗ Sharp processing failed for ${asset.slug}:`, sharpError.message);
      failCount++;
    }
    
  } catch (error) {
    console.error(`✗ Failed to process ${asset.slug}:`, error.message);
    failCount++;
  }
}

// Write manifest file
try {
  const manifestPath = path.join(root, 'src', 'data', 'images-manifest.json');
  await fs.writeFile(
    manifestPath,
    JSON.stringify(manifest, null, 2),
    'utf8'
  );
  console.log(`\n✓ Manifest written to: ${manifestPath}`);
} catch (error) {
  console.error(`✗ Failed to write manifest:`, error.message);
}

console.log(`\n=== SUMMARY ===`);
console.log(`✓ Successfully processed: ${successCount} images`);
console.log(`✗ Failed: ${failCount} images`);
console.log(`📁 Images saved to: ${assetsDir}`);
console.log(`📄 Manifest updated: src/data/images-manifest.json`);

if (successCount > 0) {
  console.log(`\nRun 'npm run dev' to see the updated images in your app!`);
}
