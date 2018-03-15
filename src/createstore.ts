import Store from './store'
import {IReducer, IStore} from '../types/index.d'

export function CreateStore<TState>(reducer: IReducer, initialState: TState): IStore {
    return new Store(reducer, initialState)
}
