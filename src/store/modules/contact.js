import axios from "axios"

const contact = {
    state:()=>({
        contacts:[]
    }),
    getters:{
        contacts(state){
            return state.contacts
        }
    },
    mutations:{
        contacts(state,payload){
            state.contacts = payload
        },
        delContacts(state,payload){
            state.contacts.contact = state.contacts.contact.filter(contact =>{
                if(contact._id === payload) return false
                return contact
            })
        }
    },
    actions:{
        allContacts(context){
            axios.get(`${context.getters.url}/contact`)
            .then(res =>{
                    console.log(res.data)
                    context.commit('contacts', res.data)
            })
        },
        delContacts(context,payload){
            axios.delete(`${context.getters.url}/contact/delete/${payload}`)
            .then( 
                context.commit('delContacts',payload)
            )
        },
        statusContacts(context,payload){
            return axios.get(`${context.getters.url}/contact/status/${payload}`)
            .then(
                context.dispatch('allContacts')
            )
            
        }
    }
}

export default contact