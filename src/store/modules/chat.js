import axios from 'axios'

const chat = {
    state: () => ({
        user: [],
    }),
    getters: {
        getUser(state) {
            return state.user
        }
    },
    mutations: {
        setUser(state, payload) {
            payload = payload.map(value => {
                value.msgCount = value.messages.filter(msg => {
                    if (msg.viewing == 0) {
                        return true
                    }
                }).length
                return value
            })
            state.user = payload
        },
        socketMutation(state, payload) {
            console.log('home')
            payload.msgCount = payload.messages.filter(msg => {
                if (msg.viewing == 0) {
                    return true
                }
            }).length
            payload.lastMsg = payload.messages[payload.messages.length - 1]
            let index = state.user.findIndex(val => val._id === payload._id)
            if (index !== -1) {
                let start = state.user.slice(0, index)
                let end = state.user.slice(index + 1)
                state.user = [state.user[index], ...start, ...end]
                state.user.forEach(user => {
                    if (user._id === payload._id) {
                        user.msgCount = payload.msgCount
                        user.lastMsg = payload.lastMsg
                    }
                })
            } else {
                state.user = [payload, ...state.user]
            }
        }
    },
    actions: {
        apiUsers(context) {
            axios.get(`${context.getters.url}/chat/main`)
                .then(res => {
                    context.commit('setUser', res.data)
                })
        }
    }
}

export default chat