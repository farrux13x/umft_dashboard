import { createStore } from 'vuex'

import department from './modules/department'
import page from './modules/page'
import questions from './modules/questions'
import contact from './modules/contact'
import setting from './modules/setting'

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
    setting,
    contact,
    questions
  }
})
