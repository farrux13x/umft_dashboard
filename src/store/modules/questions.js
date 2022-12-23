import axios from 'axios'

const questions = {
    state:()=>({
        allFaq:[]
    }),
    getters:{
        allFaq(state){
            return state.allFaq
        }
    },
    mutations:{
        allFaq(state,payload){
            state.allFaq = payload
        },
        saveFaq(state,payload){
            state.allFaq.faq = state.allFaq.faq.map(direction =>{
                if(direction._id === payload._id){
                    return payload
                }
                return direction
            })
        },
        delFaq(state,payload){
            state.allFaq.faq = state.allFaq.faq.filter(direction => {
                if(direction._id === payload) return false
                return direction
            })
        }
    },
    actions:{
        faq(context,payload){
            axios.post(`${context.getters.url}/faq`,payload)
            .then(res =>{
                context.dispatch('allFaqs')
                console.log(res.data);
            })
        },
        editFaq(context,payload){
            return axios.get(`${context.getters.url}/faq/edit/${payload}`)
        },
        saveFaq(context,payload){
            axios.post(`${context.getters.url}/faq/save`,payload)
            .then(res =>{
                if(res.status === 200){
                    console.log(res.data);
                    context.dispatch('allFaqs')
                }
            })
        },
        delFaq(context,payload){
            axios.delete(`${context.getters.url}/faq/delete/${payload}`)
            .then(res =>{
                console.log(res.data)
                context.commit('delFaq',payload)
            })
        },
        allFaqs(context){
            axios.get(`${context.getters.url}/faq`)
            .then(res =>{
                context.commit('allFaq',res.data)
                console.log(res.data)
            })
        },
    }
}
export  default questions