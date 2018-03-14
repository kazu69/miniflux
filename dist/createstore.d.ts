import { IReducer, IStore } from './types/index';
export declare function CreateStore<TState>(reducer: IReducer, initialState: TState): IStore;
