<template>
    <div class="home">
        <div class="section">
            <div class="section-title">在线学习视频</div>
            <ul class="steps_list">
                <li class="steps_item" v-for="(item, index) in move" :v-key="index">
                    <h3 class="step_title">视频{{ index + 1 }}</h3>
                    <div class="steps_video">
                        <video-player class="vjs-custom-skin" style="width: 500px; border-radius: 15px;" ref="stepVideo"
                            :playsinline="true" :options="playerOptions[index]" @play="onPlayerPlay($event, index)">
                        </video-player>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'
export default {
    components: {
        videoPlayer
    },
    data() {
        return {
            playerOptions: [],
            move: [
                "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
                "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
                "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
            ],
            currentPlayer: null
        }
    },

    created() {
        this.handlePlayerOptions()
    },
    methods: {
        onPlayerPlay(player, index) {
            //解决视频可以多个并行播放的问题，实现唯一视频播放，使用中间变量存放当前播放视频，播放其他视频时，暂停当前视频即可
            if (this.currentPlayer) {
                this.currentPlayer.pause()
            }
            this.currentPlayer = player
        },
        handlePlayerOptions() {
            for (var i = 0; i < this.move.length; i++) {
                let option = {
                    playbackRates: [1.0, 2.0, 3.0], //播放速度
                    autoplay: false, //如果true,浏览器准备好时开始回放。
                    muted: false, // 默认情况下将会消除任何音频。
                    loop: false, // 导致视频一结束就重新开始。
                    preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                    language: "zh-CN",
                    aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                    fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                    sources: [
                        {
                            type: "video/mp4",
                            src: this.move[i]//url地址
                        }
                    ],
                    poster: "", //封面地址
                    notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    controlBar: {
                        timeDivider: true,
                        durationDisplay: true,
                        remainingTimeDisplay: false,
                        fullscreenToggle: true //全屏按钮
                    }
                };
                this.playerOptions.push(option);
            }
        }
    }
}

</script>
<style lang="scss" scoped>
@import '../assets/css/home.scss';

.steps_list {
    .steps_item {
        margin-bottom: 20px;
        width: 65%;

        .step_title {
            font-size: 16px;
            margin-bottom: 10px;
        }

        .steps_video {
            border-radius: 5px;
            overflow: hidden;
            margin-bottom: 10px;
        }
    }
}
</style>