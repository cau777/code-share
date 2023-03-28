// Queue data structure implemented as an Object
export class Queue<T> {
    private elements: {[key: number]: T} = {};
    private head = 0;
    private tail = 0;
    
    public enqueue(element: T) {
        this.elements[this.tail] = element;
        this.tail++;
    }
    
    public dequeue() {
        const item = this.elements[this.head];
        delete this.elements[this.head];
        this.head++;
        return item;
    }
    
    public peek() {
        return this.elements[this.head];
    }
    
    public get length() {
        return this.tail - this.head;
    }
    
    public get isEmpty() {
        return this.length === 0;
    }
}
