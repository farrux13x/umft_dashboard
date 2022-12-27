import { createStore } from 'vuex'

import department from './modules/department'
import page from './modules/page'
import questions from './modules/questions'
import contact from './modules/contact'
import setting from './modules/setting'
import chat from './modules/chat'
import user from './modules/user'

export default createStore({
  state: {
    url:'http://5.182.26.89:4000',
    toggle:0
  },
  getters: {
    url(state){
      return state.url
    },
    toggle(state){
      return state.toggle
    }
  },
  mutations: {
    toggle(state,payload){
      state.toggle = payload
    }
  },
  actions: {
    getToggle(context,payload){
      context.commit('toggle', payload)
      console.log(payload)
    }
  },
  modules: {
    department,
    page,
    setting,
    contact,
    chat,
    user,
    questions
  }
})
