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

