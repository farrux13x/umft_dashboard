import axios from 'axios'

const page = {
    state:()=>({
        allPage:[]
    }),
    getters:{
        allPage(state){
            return state.allPage
        }
    },
    mutations:{
        allPage(state,payload){
            state.allPage =payload
        },
        savePage(state,payload){
            state.allPage.page = state.allPage.page.map(direction =>{
                if(direction._id === payload._id){
                    return payload
                }
                return direction
            })
        },
        delPage(state,payload){
            state.allPage.page = state.allPage.page.filter(direction => {
                if(direction._id === payload) return false
                return direction
            })
        }
    },
    actions:{
        page(context,payload){
            axios.post(`${context.getters.url}/newpage`,payload)
            .then(res =>{
                context.dispatch('allPages')
                console.log(res.data);
            })
        },
        editPage(context,payload){
            // return context.dispatch('getAxios',`direction/get/${payload}`)
            return axios.get(`${context.getters.url}/page/edit/${payload}`)
        },
        savePage(context,payload){
            axios.post(`${context.getters.url}/page/save`,payload)
            .then(res =>{
                if(res.status === 200){
                    console.log(res.data);
                    context.dispatch('allPages')
                }
            })
        },
        delPage(context,payload){
            axios.delete(`${context.getters.url}/page/delete/${payload}`)
            .then(res =>{
                console.log(res.data)
                context.commit('delPage',payload)
            })
        },
        allPages(context){
            axios.get(`${context.getters.url}/page`)
            .then(res =>{
                context.commit('allPage',res.data)
                console.log(res.data)
            })
        },
        delPageImg(context,payload){
            axios.post(`${context.getters.url}/page/delete/image`,payload)
            .then(res =>{
                console.log(res.data)
                // context.commit('delPage',payload)
            })
        }
    }
}
export  default page