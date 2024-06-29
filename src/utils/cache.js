class LRUCache {
    constructor(limit = 10) {
      this.limit = limit;
      this.cache = new Map();
      this.keys = [];
    }
  
    get(key) {
      if (this.cache.has(key)) {
        const index = this.keys.indexOf(key);
        this.keys.splice(index, 1);
        this.keys.push(key);
        return this.cache.get(key);
      }
      return null;
    }
  
    put(key, value) {
      if (this.cache.has(key)) {
        this.cache.set(key, value);
        const index = this.keys.indexOf(key);
        this.keys.splice(index, 1);
        this.keys.push(key);
      } else {
        if (this.keys.length === this.limit) {
          const leastUsedKey = this.keys.shift();
          this.cache.delete(leastUsedKey);
        }
        this.cache.set(key, value);
        this.keys.push(key);
      }
    }
  
    size() {
      return this.cache.size;
    }
  }
  
  const movieCache = new LRUCache(10); // Initialize cache with a limit of 10 items
  export const getFromCache = (key) => {
    return movieCache.get(key);
  };
  
  export const putIntoCache = (key, value) => {
    movieCache.put(key, value);
  };
  
  export const cacheSize = () => {
    return movieCache.size();
  };
  