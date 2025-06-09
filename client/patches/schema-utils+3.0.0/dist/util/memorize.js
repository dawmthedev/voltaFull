"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = memorize;

function memorize(fn) {
  const cache = new Map();
  
  // Return a memoized version of the function
  return (...args) => {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn(...args);
    cache.set(key, result);
    
    return result;
  };
}
