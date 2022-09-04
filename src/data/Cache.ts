export class Cache<TKey, TValue> {
    private readonly elements: Map<TKey, TValue>;
    
    public constructor(private readonly maxSize: number) {
        this.elements = new Map();
    }
    
    public isCached(key: TKey) {
        return this.elements.has(key);
    }
    
    public getCached(key: TKey) {
        return this.elements.get(key);
    }
    
    public setCached(key: TKey, value: TValue) {
        this.elements.delete(key);
        this.elements.set(key, value);
        
        for (let keyToDelete of this.elements.keys()) {
            if (this.elements.size < this.maxSize) {
                break;
            }
            this.elements.delete(keyToDelete);
        }
    }
    
    public getCachedOr(key: TKey, lazy: () => TValue) {
        if (this.isCached(key)) {
            // console.log("Used cache for", key);
            return this.getCached(key)!;
        }
        
        let value = lazy();
        this.setCached(key, value);
        return value;
    }
}