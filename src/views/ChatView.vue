<template>
    <div>
      <el-container>
        <el-aside width="300px">      
          <AsideSide :getUser="getOther" />
        </el-aside>
        <el-container>
          <el-main>
            <MessageBox :getChat="getChat" />
          </el-main>
        </el-container>
      </el-container>
    </div>
  </template>
  
  <script>
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  const {io} = require('socket.io-client')
  import AsideSide from '../components/ChatAside.vue';
  import MessageBox from '../components/MessageBox.vue';
  import { ElNotification } from 'element-plus'
  
    export default {
      data(){
        return{
          socket: null,
          id: ''
        }
      },
      computed: {
        ...mapGetters([
          'getChat',
          'getOther',
          'active',
          'url'
        ])
      },
      methods:{
        ...mapMutations([
          'socketChatMessage',
          'socketOtherMutation',
          'socketViewing'
        ]),
          ...mapActions([
          'getToggle',
          'apiChat',
          'socketView'
        ]),
      },
      created(){
        this.socket = io(this.url)
        this.socket.once('chatMessage', (message) =>{
          if(message._id == this.$route.params.id){
            let question = message.messages.pop()
            this.socketChatMessage(question)
            // this.socket.close()
          }
        })
        this.socket.once('message', (message) => {
          console.log(message)
          // if(!this.$store.getters.active){
            if(message.chat._id == this.$route.params.id){
              this.apiChat(message.chat._id)
            } else{
              this.socketOtherMutation(message.chat)
              ElNotification({
                title: message.chat.user,
                message: message.chat.lastMsg.message,
              })
            }
          // }
            // this.socket.close()
        })
      },
      watch: {
        $route(to){
          this.$store.dispatch('apiChat', to.params.id)
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          })
        }
      },
      mounted(){
        this.id = this.$route.params.id
        this.getToggle(1)
        // this.$store.dispatch('active',false)
        this.$store.dispatch('apiChat', this.id)
      },
      components: {
        AsideSide,
        MessageBox
      },
    }
  </script>

  <style lang="scss" scoped>
  @import '../styles/app.scss';
  .el-main {
    --el-main-padding: 0;
}
  </style>