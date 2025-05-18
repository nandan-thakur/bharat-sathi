// src/utils/dataLoader.js

export const loadAllData = async () => {
  const totalParts = 9; // Based on your image showing 9 parts
  let combinedData = [];
  
  try {
    // Load parts sequentially to avoid memory issues
    for (let i = 1; i <= totalParts; i++) {
      try {
        // Dynamic import for each part
        const module = await import(`../data/part_${i}.json`);
        if (module.default && Array.isArray(module.default)) {
          combinedData = [...combinedData, ...module.default];
          console.log(`Loaded part_${i}.json: ${module.default.length} items`);
        }
      } catch (error) {
        console.error(`Error loading part_${i}.json:`, error);
      }
    }
    
    console.log(`Total items loaded: ${combinedData.length}`);
    return combinedData;
  } catch (error) {
    console.error('Failed to load data parts:', error);
    return [];
  }
};
