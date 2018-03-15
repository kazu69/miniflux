import {IDispatcher, IBindDispatcherToStore, IStore} from '../types/index.d'

export function ActionCreator(dispatcher: IDispatcher) {
    const createAction = (type: string) => {
        if (!type) {
            throw new Error(`Should provide action type property.`)
        } else {
            return (payload: any) => {
                return dispatcher.dispatch({type, payload})
            }
        }
    }

    const createSubscriber = (store: IStore): IBindDispatcherToStore => {
        if (!store) {
            throw new Error(`Should provide store.`)
        }
        return dispatcher.register(store)
    }

    return { createAction, createSubscriber }
}
