<template>
    <div class="message">
      <div class="message__header">
        <div>
          <div class="user__name">{{getChat.user}}</div>
          <div class="user__time">{{getChat.status}}</div>
        </div>
      </div>
      <div class="message__chat">
        <div :class="`message__${msg.class}`" v-for="msg in getChat.messages" :key="msg">
          <div v-if="msg.message">{{msg.message}}</div>
          <el-image
            v-else
            style="width: 100px; height: 100px"
            :zoom-rate="1.2"
            :src="`${url}${msg.img}`"
            :preview-src-list="[`${url}${msg.img}`]"
            :initial-index="4"
            fit="cover"
          />
        </div>
      </div>
      <form @submit.prevent="sendMessage" id="scroll" class="message__footer">
          <input type="text" placeholder="Yozing..." v-model="input">
          <button type="submit" @click="scrollToEnd">Jonatish</button>
      </form>
    </div>
  </template>
  
  <script>
    export default {
      props: ['getChat'],
      data() {
        return {
          input: '',
          count: ''
        }
      },
      methods: {
        scrollToEnd() {
                  var container = document.querySelector(".message__chat");
                  var scrollHeight = container.scrollHeight;
                  container.scrollTop = scrollHeight;
              },
        sendMessage(){
          if(this.input !== ''){
            this.$store.dispatch('apiResMessage', {
            message: this.input,
            _id: this.getChat._id
          })
          this.input = ''
          }
        }
      },
      mounted() {
              this.scrollToEnd();
          },
      computed:{
        url(){
          return this.$store.getters.url
        }
      },
          updated() {
              this.scrollToEnd();
          },
    }
  </script>

<style lang="scss" scoped>
@import '../styles/app.scss';
</style>