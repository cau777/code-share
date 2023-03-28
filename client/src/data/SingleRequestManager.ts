// Simple class to allow only one Promise to be processed at any time.
// It only has space for one queued request, so a couple situations can happen:
// * If the instance is not busy, the request is processed immediately
// * If the instance is busy and there's no queued request, the new request is placed in the queue to be processed after the first one finishes
// * If the instance is busy and one request is already queued, the queue is overridden by the new request
export class SingleRequestManager {
    private busy = false;
    private next?: () => Promise<void>;
    
    public constructor() {
    }
    
    public call(promise: () => Promise<void>) {
        if (this.busy) {
            this.next = promise;
            return;
        }
        
        this.busy = true;
        promise().then(() => {
            this.busy = false;
            const queue = this.next;
            this.next = undefined;
            if (queue)
                this.call(queue);
        });
    }
}