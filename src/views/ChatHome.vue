<template>
    <div>
      <el-container>
        <el-aside width="300px">      
          <AsideSide :getUser="getUser" />
        </el-aside>
      </el-container>
    </div>
  </template>
  
  <script>
  import AsideSide from '../components/ChatAside.vue';
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import { ElNotification } from 'element-plus'
  const {io} = require('socket.io-client')
  
  
    export default {
      data() {
        return {
          socket: null
        }
      },
      methods: {
        ...mapActions([
          'getToggle',
        ]),
        ...mapMutations([
          'socketMutation'
        ])
      },
      created() {
        this.socket = io(this.url)
        this.socket.on('message', (message) => {
          this.socketMutation(message.chat)
          // if(this.$store.getters.active){
          console.log('home')
            if(message.chat._id !== this.$route.params.id ){
              ElNotification({
                title: message.chat.user,
                message: message.chat.lastMsg.message,
              })
              }
          // }
          // this.socket.close()
        })
      },
      computed: {
        ...mapGetters([
          'url',
          'getUser',
        ])
      },
      components: {
        AsideSide,
      },
      mounted(){
        this.$store.dispatch('apiUsers')
        this.getToggle(1)
        // this.$store.dispatch('active',true)
      },
    }
  </script>

<style lang="scss" scoped>
@import '../styles/app.scss';
.el-main {
    --el-main-padding: 0;
}
</style>