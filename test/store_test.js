import test from 'ava'
import sinon from 'sinon'

import {ActionCreator} from '../dist/actioncreator'
import Dispatcher from '../dist/dispatcher'
import Store from '../dist/store'

test('store has state property', t => {
    const reducer = (state, action) => {}
    const store = new Store(reducer)
    store.state = 1
    t.is(store.state, 1)
})

test('store has reducer property', t => {
    const reducer = (state, action) => {}
    const store = new Store(reducer)
    t.is(store.reducer, reducer)
})

test('store contruct with reducer', t => {
    t.throws(() => { new Store() }, `Reducer is nessesary.`)
})

test('reduce returns updated state', t => {
    const initialState = 1
    const reducer = (state, action) => {
        return ++state
    }
    const action = {
        type: 'UPDATE',
    }
    const store = new Store(reducer, initialState)
    t.is(store.reduce(action), 2)
})

test('reduce called with handler, middlewear', t => {
    const initialState = 1
    const reducer = (state, action) => {
        return ++state
    }
    const handlerSpy = sinon.spy()
    const middlewearSpy = sinon.spy()
    const action = {
        type: 'UPDATE',
    }

    const store = new Store(reducer, initialState)
    const updatedState = initialState + 1
    store.reduce(action, handlerSpy, middlewearSpy)

    t.true(middlewearSpy.withArgs(initialState, action).calledOnce)
    t.true(handlerSpy.withArgs(updatedState).calledOnce)
})
