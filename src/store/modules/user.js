import axios from 'axios'
const {
    io
} = require('socket.io-client')

const user = {
    state: () => ({
        chat: {},
        other: []
    }),
    getters: {
        getChat(state) {
            return state.chat
        },
        getOther(state) {
            return state.other
        }
    },
    mutations: {
        setChat(state, payload) {
            state.chat = payload
            payload.messages = payload.messages.map(msg => {
                msg.class = msg.from == 0 ? 'left' : 'right'
                return msg
            })
            state.chat.status = state.chat.status == 0 ? 'Телеграм' : 'Сайт'
        },
        setOther(state, payload) {
            state.other = payload
        },
        socketOtherMutation(state, payload) {
            payload.msgCount = payload.messages.filter(msg => {
                if (msg.viewing == 0) {
                    return true
                }
            }).length
            payload.lastMsg = payload.messages[payload.messages.length - 1]
            let index = state.other.findIndex(val => val._id === payload._id)
            if (index !== -1) {
                let start = state.other.slice(0, index)
                let end = state.other.slice(index + 1)
                state.other = [state.other[index], ...start, ...end]
                state.other.forEach(user => {
                    if (user._id == payload._id) {
                        user.msgCount = payload.msgCount
                        user.lastMsg = payload.lastMsg
                    }
                })
                console.log(payload)
            } else {
                state.other = [payload, ...state.other]
            }
        },
        socketChatMessage(state, payload) {
            state.chat.messages.push(payload)
            state.chat.messages = state.chat.messages.map(msg => {
                msg.class = msg.from == 0 ? 'left' : 'right'
                return msg
            })
        }
    },
    actions: {
        apiChat(context, payload) {
            axios.get(`${context.getters.url}/chat/chat/${payload}`)
            .then(res => {
                let {
                    chat,
                    other
                } = res.data
                context.commit('setChat', chat)
                context.commit('setOther', other)
            })
        },
        apiResMessage(context, payload) {
            axios.post(`${context.getters.url}/chat/response`, payload)
                .then(res => {
                    const socket = io(context.getters.url)
                    socket.emit('chatMessage', res.data.chat)
                })
        },
    }
}

export default user