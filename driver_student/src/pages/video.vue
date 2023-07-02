<template>
    <div class="home">
        <div class="section">
            <div class="section-title">在线学习视频</div>
            <el-aside class="the-aside" :width="isCollapse ? '64px' : '300px'">
                <el-button style="margin-right: 10px;" icon="el-icon-menu" size="mini" @click="handle()"></el-button>
                <h2 class="title">播放列表</h2>
                <ul class="menus">
                    <li v-for="(item, index) in listOfVideo" :key="index"
                        @click="toplay(item.id, item.url, item.pic, index, item.name)">
                        {{ item.name }}
                    </li>
                </ul>
            </el-aside>

            <el-collapse :margin="isCollapse ? '0 auto' : '20%'">
                <video-player class="video-player vjs-custom-skin" style="width: 65%;margin:0 auto;overflow: hidden;border-radius: 20px; box-shadow(0 0 5px 1px rgba(0, 0, 0, 0.1));
  position: relative;" :playsinline="true" :options="playerOptions"></video-player></el-collapse>

        </div>
    </div>
</template>

<script>

export default {
    components: {},
    data() {
        return {
            isCollapse: true,
            listOfVideo: [{
                id: '1',
                url: '',
                pic: '',
                name: '科一视频',

            }],
            playerOptions: {
                playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                autoplay: false, //如果true,浏览器准备好时开始回放。
                muted: false, // 默认情况下将会消除任何音频。
                loop: false, // 导致视频一结束就重新开始。
                preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: 'zh-CN',
                aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [{
                    type: "video/mp4",
                    src: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" //url地址
                }],
                poster: "", //你的封面地址
                // width: document.documentElement.clientWidth,
                notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                controlBar: {
                    timeDivider: true,
                    durationDisplay: true,
                    remainingTimeDisplay: false,
                    fullscreenToggle: true  //全屏按钮
                }
            },
        }
    },
    methods: {
        handle() {
            this.isCollapse = !this.isCollapse;
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../assets/css/home.scss';
@import '../assets/css/the-aside.scss';
</style>
