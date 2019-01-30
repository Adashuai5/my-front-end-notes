function createStore(initState) {
    let state = initState
    let liseners = []

    /* 订阅 */
    function subscribe(lisener) {
        liseners.push(lisener)
    }

    function changeState(newState) {
        state = newState
        /* 发布 */
        for (let i = 0; i < liseners.length; i++) {
            const lisener = liseners[i]
            lisener()
        }
    }

    function getState(){
        return state.counter.number
    }

    return {
        getState,
        changeState,
        subscribe
    }
}

let initState = {
    counter: {
        number: 0
    }
}

let store = createStore(initState)

store.subscribe(() => {
    let state = store.getState()
    console.log(state)
})

store.changeState({
    counter: {
        number: 1
    }
})

