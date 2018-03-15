import {IAction, IHandler, IMiddlewear, IStore, IDispatcher, IBindDispatcherToStore} from '../types/index.d'

export default class Dispatcher implements IDispatcher {
    private _stores: any[] = [];

    register(store: IStore): IBindDispatcherToStore {
        if (!store) {
            throw new Error(`Should provide store.`)
        }
        let handlers: IHandler[] = []
        let middlewears: IMiddlewear[] = []

        const handler = (data) => {
            if (handlers.length <= 0) {
                return
            }
    
            handlers.map(handler => {
                handler.call(this, data)
            })
        }
    
        const middlewear = (data, action) => {
            if (middlewears.length <= 0) {
                return
            }
            middlewears.map(enhancer => {
                enhancer.call(this, data, action)
            })
        }
    
        const removeMiddlewear = middlewear => {
            const index = middlewears.indexOf(middlewear)
            return middlewears.splice(index, 1)
        }
    
        const unsubscribe = callback => {
            const index = handlers.indexOf(callback)
            return handlers.splice(index, 1)
        }
    
        const subscribe = (callbacks, preload, enhancers = []) => {
            callbacks.map(callbak => {
                handlers.push(callbak)
                if (preload !== false) {
                    callbak.call(this, store.state)
                }
            })

            enhancers.map(enhancer => {
                middlewears.push(enhancer)
            })
            
            return {handlers, middlewears}
        }
        this._stores.push({store, handler, middlewear})
        return { subscribe, unsubscribe, removeMiddlewear }
    }

    unregister(store: IStore): void {
        if (!store) {
            throw new Error(`Should provide store.`)
        }

        if (this._stores.length === 0) {
            return
        }
    
        const index = this._stores.indexOf(store)
        this._stores.splice(index, 1)
    }

    dispatch(action: IAction): void {
        if (!action) {
            throw new Error(`Should provide action.`)
        }

        if (this._stores.length === 0) {
            return
        }

        this._stores.map(item => {
            const store = item.store
            const handler = item.handler
            const middlewear = item.middlewear
            store.reduce.call(store, action, handler, middlewear)
        })
    }

    hasStore(): boolean {
        return this._stores.length > 0
    }
}
