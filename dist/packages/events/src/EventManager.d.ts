import SubscriberAggregator from "./SubscriberAggregator";
import Emittery from "emittery";
interface IinitOptions {
    emitter: Emittery;
    logger: Array<Object>;
    muteLogging: boolean;
    subscribers: any;
}
declare class EventManager {
    emitter: Emittery;
    subscriberAggregators: SubscriberAggregator[];
    initializationOptions: IinitOptions;
    constructor(eventManagerOptions: any);
    emit(event: any, data: any | null): Promise<void>;
    initializeDefaultSubscribers(initializationOptions: any): void;
    initializeUserSubscribers(initializationOptions: any): void;
    updateSubscriberOptions(newOptions: any): void;
}
export default EventManager;
