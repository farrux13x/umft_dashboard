import axios from "axios"

const setting = {
    state:()=>({
        settings:{
            settings:[{}]
        },
        countSetting:2
    }),
    getters:{
        settings(state){
            return state.settings
        },
        countSetting(state){
            return state.countSetting
        }
    },
    mutations:{
        settings(state,payload){
            state.settings = payload
        },
        delSetting(state,payload){
            state.settings.settings = state.settings.settings.filter(setting =>{
                if(setting._id === payload) return false
                return setting
            })
        },
        countSetting(state,payload){
            state.countSetting = payload
        }
    },
    actions:{
        allSettings(context){
            axios.get(`${context.getters.url}/settings`)
            .then(res=>{
                context.commit('settings', res.data)
                console.log(res.data);
            })
        },
        countSettings(context){
            axios.get(`${context.getters.url}/settings/count`)
            .then(res=>{
                context.commit('countSetting', res.data)
                console.log(res.data)
            })
        },
        addSettings(context,payload){
            axios.post(`${context.getters.url}/settings`, payload)
            .then(res =>{
                console.log(res.data);
                context.dispatch('allSettings')
            })
        },
        delSettings(context,payload){
            axios.delete(`${context.getters.url}/settings/delete/${payload}`)
            .then(res =>{
                console.log(res.data);
                context.commit('delSetting', payload)
            })
        },
        editSettings(context,payload){
            return axios.get(`${context.getters.url}/settings/edit/${payload}`)
        },
        saveSettings(context,payload){
            axios.post(`${context.getters.url}/settings/save`,payload)
            .then(res => {
                console.log(res.data);
                console.log('sa');
                context.dispatch('allSettings')
            })
        }
    }
}

export default setting