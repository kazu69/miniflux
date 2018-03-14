import { IAction, IStore, IDispatcher, IBindDispatcherToStore } from './types/index';
export default class Dispatcher implements IDispatcher {
    private _stores;
    register(store: IStore): IBindDispatcherToStore;
    unregister(store: IStore): void;
    dispatch(action: IAction): void;
    hasStore(): boolean;
}
