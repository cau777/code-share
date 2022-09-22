import {Queue} from "./Queue";

export class CallbackBuffer<T> {
    private readonly buffer = new Queue<T>()
    private effect?: (value: T) => (void | Promise<void>);
    
    public registerEffect(effect: (value: T) => void) {
        this.effect = effect;
        this.callBuffer().then();
    }
    
    public call(value: T) {
        this.buffer.enqueue(value);
        this.callBuffer().then();
    }
    
    private async callBuffer() {
        if (this.effect === undefined) return;
        while (this.buffer.length > 0)
            await this.effect(this.buffer.dequeue());
    }
}