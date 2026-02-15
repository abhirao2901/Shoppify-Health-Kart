// Test utilities for Product Detail Page
const TEST_PRODUCTS = [
  'p001', // Whey Protein
  'p003', // Omega 3
  'p005', // Vitamin D3
  'p008', // Creatine
  'p010'  // Collagen
];

/**
 * Test PDP routing and image loading
 */
export const testProductDetailPages = async (baseUrl = 'http://localhost:8080') => {
  const results = {
    routing: [],
    images: [],
    seo: [],
    performance: []
  };

  for (const productId of TEST_PRODUCTS) {
    try {
      // Test PDP URL accessibility
      const pdpUrl = `${baseUrl}/product/${productId}`;
      const response = await fetch(pdpUrl);
      
      results.routing.push({
        productId,
        url: pdpUrl,
        status: response.status,
        success: response.status === 200,
        headers: Object.fromEntries(response.headers.entries())
      });

      if (response.status === 200) {
        const html = await response.text();
        
        // Test SEO elements
        const hasTitle = html.includes('<title>');
        const hasDescription = html.includes('name="description"');
        const hasOGTags = html.includes('property="og:');
        const hasStructuredData = html.includes('application/ld+json');
        
        results.seo.push({
          productId,
          hasTitle,
          hasDescription,
          hasOGTags,
          hasStructuredData,
          score: [hasTitle, hasDescription, hasOGTags, hasStructuredData].filter(Boolean).length
        });
      }
    } catch (error) {
      results.routing.push({
        productId,
        url: `${baseUrl}/product/${productId}`,
        status: 0,
        success: false,
        error: error.message
      });
    }
  }

  return results;
};

/**
 * Test image loading for products
 */
export const testProductImages = async () => {
  const images = [
    'https://images.unsplash.com/photo-1583500178301-c24d33f88ecd',
    'https://images.unsplash.com/photo-1593095948071-474c5cc2989d',
    'https://images.unsplash.com/photo-1559757175-4d7e6d61a2c2',
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae',
    'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2'
  ];

  const results = [];

  for (const imageUrl of images) {
    try {
      const fullUrl = `${imageUrl}?w=400&h=400&fit=crop&crop=center&auto=format&q=80`;
      const response = await fetch(fullUrl, { method: 'HEAD' });
      
      results.push({
        url: imageUrl,
        status: response.status,
        success: response.status === 200,
        contentType: response.headers.get('content-type'),
        cacheControl: response.headers.get('cache-control')
      });
    } catch (error) {
      results.push({
        url: imageUrl,
        status: 0,
        success: false,
        error: error.message
      });
    }
  }

  return results;
};

/**
 * Run complete test suite
 */
export const runCompleteTest = async (baseUrl) => {
  console.log('🧪 Running Product Detail Page Tests...\n');
  
  const routing = await testProductDetailPages(baseUrl);
  const images = await testProductImages();
  
  // Routing Results
  console.log('📍 Routing Test Results:');
  routing.routing.forEach(result => {
    const status = result.success ? '✅' : '❌';
    console.log(`${status} ${result.url} - Status: ${result.status}`);
  });
  
  const routingSuccessRate = routing.routing.filter(r => r.success).length / routing.routing.length * 100;
  console.log(`\n📊 Routing Success Rate: ${routingSuccessRate.toFixed(1)}%\n`);
  
  // SEO Results
  console.log('🔍 SEO Test Results:');
  routing.seo.forEach(result => {
    console.log(`Product ${result.productId}: ${result.score}/4 SEO elements present`);
  });
  
  const avgSEOScore = routing.seo.reduce((sum, r) => sum + r.score, 0) / routing.seo.length;
  console.log(`\n📊 Average SEO Score: ${avgSEOScore.toFixed(1)}/4\n`);
  
  // Image Results
  console.log('🖼️  Image Loading Test Results:');
  images.forEach(result => {
    const status = result.success ? '✅' : '❌';
    console.log(`${status} ${result.url} - Status: ${result.status}`);
  });
  
  const imageSuccessRate = images.filter(r => r.success).length / images.length * 100;
  console.log(`\n📊 Image Success Rate: ${imageSuccessRate.toFixed(1)}%\n`);
  
  return {
    routing: routingSuccessRate,
    seo: avgSEOScore,
    images: imageSuccessRate,
    details: { routing, images }
  };
};
