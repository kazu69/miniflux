import { IAction, IHandler, IMiddlewear, IReducer, IStore } from './types/index';
export default class Store<TState> implements IStore {
    private _state;
    private _reducer;
    constructor(reducer: any, initialState: TState);
    state: TState;
    reducer: IReducer;
    reduce(action: IAction, handler?: IHandler, middlewear?: IMiddlewear): TState;
}
