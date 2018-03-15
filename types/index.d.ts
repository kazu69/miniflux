export interface IDispatcher {
    register(store: IStore): IBindDispatcherToStore;
    unregister(store: IStore): void;
    dispatch(action: IAction): void;
}

export interface IStore {
    state: any;
    reduce(action: IAction, handler: IHandler, enhancer: IMiddlewear): void;
}

export interface IAction {
    type: string;
    payload: any;
}

export interface IMiddlewear {
    (state: any, action: IAction): void;
}

export interface IBindDispatcherToStore {
    subscribe(callbacks: IHandler[], preload: any, enhancers: IMiddlewear[])
    unsubscribe(callback: IHandler);
    removeMiddlewear(middlewear: IMiddlewear);
}

export interface IHandler {
    (data: any): void;
}

export interface IReducer {
    (state: any, action: IAction): any
}

export declare function ActionCreator(dispatcher: IDispatcher): {
    createAction: (type: string) => (payload: any) => void;
    createSubscriber: (store: IStore) => IBindDispatcherToStore;
}

export declare function CreateStore<TState>(reducer: IReducer, initialState: TState): IStore

export class Dispatcher implements IDispatcher {
    private _stores;
    register(store: IStore): IBindDispatcherToStore;
    unregister(store: IStore): void;
    dispatch(action: IAction): void;
    hasStore(): boolean;
}

export class Store<TState> implements IStore {
    private _state;
    private _reducer;
    constructor(reducer: any, initialState: TState);
    state: TState;
    reducer: IReducer;
    reduce(action: IAction, handler?: IHandler, middlewear?: IMiddlewear): TState;
}

