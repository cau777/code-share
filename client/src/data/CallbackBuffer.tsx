import {Queue} from "./Queue";

// Avoid problems when an event needs to be processes in a DOM element, but the listener might not be ready when the event fires
export class CallbackBuffer<T> {
    private readonly buffer = new Queue<T>()
    private listener?: (value: T) => (void | Promise<void>);
    
    public registerListener(effect: (value: T) => void) {
        this.listener = effect;
        this.callBuffer().then();
    }
    
    public call(value: T) {
        this.buffer.enqueue(value);
        this.callBuffer().then();
    }
    
    private async callBuffer() {
        if (this.listener === undefined) return;
        while (this.buffer.length > 0)
            await this.listener(this.buffer.dequeue());
    }
}