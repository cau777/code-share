export class SingleRequestManager {
    private busy = false;
    private queue?: () => Promise<void>;
    
    public constructor() {
    }
    
    public call(promise: () => Promise<void>) {
        if (this.busy) {
            this.queue = promise;
            return;
        }
        
        this.busy = true;
        promise().then(() => {
            this.busy = false;
            const queue = this.queue;
            this.queue = undefined;
            if (queue)
                this.call(queue);
        });
    }
}