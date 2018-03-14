import test from 'ava'
import sinon from 'sinon'

import {CreateStore} from '../dist/createstore'
import Store from '../dist/store'

test('CreateStore returns `Store` instace', t => {
    const reducer = (state, action) => {}
    const store = CreateStore.call(null, reducer)
    t.true(store instanceof Store)
})
