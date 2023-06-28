import Image from '../assets/img/汽车.png';
export const mixin = {
    methods: {
        //获取图片地址
        attachImageUrl(srcUrl) {
            return srcUrl ? this.$store.state.configure.Host + srcUrl : Image;
        },
        //根据模糊查询获取在线学习信息
        getStudy() {
            if (!this.$route.query.keywords) {
                this.notify('您输入的内容为空', 'warning')
            } else {
                // likeStudyOfName(this.$route.query.keywords) 调用模糊查询api
            }
        }
    }
}