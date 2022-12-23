import { createStore } from 'vuex'

import department from './modules/department'
import page from './modules/page'
import questions from './modules/questions'

export default createStore({
  state: {
    url:'http://5.182.26.89:4000'
  },
  getters: {
    url(state){
      return state.url
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    department,
    page,
    questions
  }
})
