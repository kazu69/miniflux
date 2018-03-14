import test from 'ava'
import sinon from 'sinon'

import {ActionCreator} from '../dist/actioncreator'
import Dispatcher from '../dist/dispatcher'
import Store from '../dist/store'

test('register returns function of `subscribe`, `unsubscribe` and `removeMiddlewear`', t => {
    const reducer = (state, action) => {}
    const store = new Store(reducer)
    const dispatcher = new Dispatcher()
    const subscriber = dispatcher.register(store)

    t.is(typeof subscriber.subscribe, 'function')
    t.is(typeof subscriber.unsubscribe, 'function')
    t.is(typeof subscriber.removeMiddlewear, 'function')
})

test('register throw error, if store provided', t => {
    const dispatcher = new Dispatcher()
    t.throws(() => { dispatcher.register() }, `Should provide store.`)
})

test('unregister is remove registed store from Dispatcher', t => {
    const reducer = (state, action) => {}
    const store = new Store(reducer)
    const dispatcher = new Dispatcher()
    dispatcher.register(store)
    dispatcher.unregister(store)
    t.false(dispatcher.hasStore())
})

test('unregister throw error, if store provided', t => {
    const dispatcher = new Dispatcher()
    t.throws(() => { dispatcher.unregister() }, `Should provide store.`)
})
