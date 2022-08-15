import Subscriber from "./Subscriber";
declare class SubscriberAggregator {
    subscribers: Subscriber[];
    constructor(initializationOptions: any);
    initializeSubscribers(initializationOptions: any): void;
    updateSubscriberOptions(newOptions: any): void;
}
export default SubscriberAggregator;
