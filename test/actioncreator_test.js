import test from 'ava'
import sinon from 'sinon'

import {ActionCreator} from '../dist/actioncreator'
import Dispatcher from '../dist/dispatcher'
import Store from '../dist/store'

test('ActionCreator returns function of `createAction`, `createSubscriber1', t => {
    const dispatcher = new Dispatcher()
    const actionCreator = ActionCreator(dispatcher)
    t.is(typeof actionCreator.createAction, 'function')
    t.is(typeof actionCreator.createSubscriber, 'function')
})

test('createAction called `dispatch`', t => {
    const dispatcher = new Dispatcher()
    const actionCreator = ActionCreator(dispatcher)
    const createAction = actionCreator.createAction
    t.throws(() => { createAction() }, `Should provide action type property.`)
    const spy = sinon.spy(dispatcher, 'dispatch')
    createAction('action_type')(1)
    t.true(spy.calledOnce)
})

test('createSubscriber register to `Store`', t => {
    const reducer = (state, action) => {}
    const store = new Store(reducer)
    const dispatcher = new Dispatcher()
    const actionCreator = ActionCreator(dispatcher)
    const createSubscriber = actionCreator.createSubscriber
    t.throws(() => { createSubscriber() }, `Should provide store.`)
    const spy = sinon.spy(dispatcher, 'register')
    createSubscriber(store)
    t.true(spy.calledOnce)
})
