<template>
  <div id="app">
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里好! -->
    <router-view></router-view>
  </div>
</template>

<script>


// export default {
//   name: 'App',
// }
export default {
  mounted() {
    // this.initWebSocket()
  },
  name: 'App',
  components: {},
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true,
      websock: null,
    };
  },
  methods: {
    initWebSocket: function () {
      // WebSocket与普通的请求所用协议有所不同，ws等同于http，wss等同于https
      // var userId = store.getters.userInfo.id;
      // var url = "ws://192.169.43.62:8081/webSocket/admin";
      var url = "ws://47.92.228.229:8081/webSocket";
      console.log(url);
      this.websock = new WebSocket(url);
      this.websock.onopen = this.websocketOnopen;
      this.websock.onerror = this.websocketOnerror;
      this.websock.onmessage = this.websocketOnmessage;
      this.websock.onclose = this.websocketOnclose;
    },

    websocketOnopen: function () {
      console.log("WebSocket连接成功");
      //心跳检测重置
      //this.heartCheck.reset().start();
    },
    websocketOnerror: function (e) {
      console.log("WebSocket连接发生错误");
      this.reconnect();
    },
    websocketOnmessage: function (e) {
      console.log('监听关闭' + e)
      console.log("-----接收消息-------", e.data);
      var data = eval("(" + e.data + ")"); //解析对象
    },
    websocketOnclose: function (e) {
      console.log("connection closed (" + e.code + ")");
      this.reconnect();
    },
    websocketSend(text) { // 数据发送
      try {
        this.websock.send(text);
      } catch (err) {
        console.log("send failed (" + err.code + ")");
      }
    },

    reconnect() {
      var that = this;
      if (that.lockReconnect) return;
      that.lockReconnect = true;
      //没连接上会一直重连，设置延迟避免请求过多
      setTimeout(function () {
        console.info("尝试重连...");
        that.initWebSocket();
        that.lockReconnect = false;
      }, 5000);
    },
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      })
    }
  }
}
</script>
<style lang="less">
html,
body,
h3,
p {
  margin: 0;
  padding: 0;
}
</style>