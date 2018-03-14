import {IAction, IHandler, IMiddlewear, IReducer, IStore} from './types/index'

export default class Store<TState> implements IStore {
    private _state: TState
    private _reducer: IReducer

    constructor(reducer, initialState: TState) {
        this.reducer = reducer
        this.state = initialState
    }

    set state(state: TState) {
        this._state = state
    }

    get state(): TState {
        return this._state
    }

    set reducer(reducer: IReducer) {
        if (!reducer) {
            throw Error(`Reducer is nessesary.`)
        }
        this._reducer = reducer
    }

    get reducer(): IReducer {
        return this._reducer
    }

    reduce(action: IAction, handler?: IHandler, middlewear?: IMiddlewear): TState {
        if (!this._reducer) {
            throw Error(`store should has reducer`)
        }

        let state = this.state

        if (middlewear) {
            middlewear.call(null, state, action)
        }

        state = this.reducer.call(null, state, action)

        if (handler) {
            handler.call(null, state)
        }

        this.state = state
        return state 
    }
}