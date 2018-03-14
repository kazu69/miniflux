import { IDispatcher, IBindDispatcherToStore, IStore } from './types/index';
export declare function ActionCreator(dispatcher: IDispatcher): {
    createAction: (type: string) => (payload: any) => void;
    createSubscriber: (store: IStore) => IBindDispatcherToStore;
};
