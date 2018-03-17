const miniflux = require('../dist/index').default

const Dispatcher = miniflux.Dispatcher
const ActionCreator = miniflux.ActionCreator
const CreateStore = miniflux.CreateStore

const initState = 100
function Reducer(state, action) {
    switch (action.type) {
        case 'INCRIMENT':
            state += 1
            break
        case 'DECREASE':
            state -= 1
            break
        default:
            break
    }
    return state
}

const dispatch = new Dispatcher()
const store = CreateStore(Reducer, initState)
const actionCreator = new ActionCreator(dispatch)
const bindDispatchertoStore = actionCreator.createSubscriber(store)
const actions = {
    asyncstart: actionCreator.createAction('ASYNC:START'),
    asyncend: actionCreator.createAction('INCRIMENT'),
    increase: actionCreator.createAction('INCRIMENT'),
    decrease: actionCreator.createAction('DECREASE')
}
const preload = true
const updateCount = state => {
    console.log(`updateCount: state: ${state}`)
    console.log()
}
const logger = (state, action) => {
    console.log(`logger: state: ${state} action: ${action}`)
}

let middlewears = []
let handlers = []
handlers.push (updateCount)
middlewears.push (logger)

bindDispatchertoStore.subscribe(handlers, preload, middlewears)
// => preload updateCount exec
actions.increase.call(null) // => 101
actions.increase.call(null) // => 102

console.log(`ASYNC START`)
actions.asyncstart.call(null) // => 102
actions.asyncend.call(null) // => 103
