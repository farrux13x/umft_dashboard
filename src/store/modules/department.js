import axios from 'axios'

const department = {
    state:()=>({
        allDepartment:[]
    }),
    getters:{
        allDepartment(state){
            return state.allDepartment
        }
    },
    mutations:{
        allDepartment(state,payload){
            state.allDepartment =payload
        },
        saveDirection(state,payload){
            state.allDepartment.direction = state.allDepartment.direction.map(direction =>{
                if(direction._id === payload._id){
                    return payload
                }
                return direction
            })
        },
        delDepartment(state,payload){
            state.allDepartment.direction = state.allDepartment.direction.filter(direction => {
                if(direction._id === payload) return false
                return direction
            })
        }
    },
    actions:{
        department(context,payload){
            axios.post(`${context.getters.url}/direction`,payload)
            .then(res =>{
                context.dispatch('allDepartments')
                console.log(res.data);
            })
        },
        img(context,payload){
            axios.post(`${context.getters.url}/direction/poster`,payload)
            .then(res =>{
                context.dispatch('allDepartments')
                console.log(res.data);
            })
        },
        editDirection(context,payload){
            // return context.dispatch('getAxios',`direction/get/${payload}`)
            return axios.get(`${context.getters.url}/direction/get/${payload}`)
        },
        saveDirection(context,payload){
            axios.post(`${context.getters.url}/direction/save`,payload)
            .then(res =>{
                if(res.status === 200){
                    console.log(res.data);
                context.dispatch('allDepartments')

                }
            })
        },
        delDepartment(context,payload){
            axios.delete(`${context.getters.url}/direction/delete/${payload}`)
            .then(res =>{
                console.log(res.data)
                context.commit('delDepartment',payload)
            })
        },
        allDepartments(context){
            axios.get(`${context.getters.url}/direction`)
            .then(res =>{
                context.commit('allDepartment',res.data)
                console.log(res.data)
            })
        },
        del(context,payload){
            axios.post(`${context.getters.url}/direction/delete/poster`,payload)
            .then(res =>{
                console.log(res.data)
                // context.commit('delDepartment',payload)
            })
        }
    }
}
export  default department