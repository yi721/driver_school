//canvasCode.vue代码
<template>
    <canvas id="canvas" width="100" height="38" @click="createCode" />
</template>
<script>
export default {
    props: {
        validateCode: { // 父组件传过来的验证码
            type: String,
            default: function () {
                return ''
            }
        },
    },
    data() {
        return {
            sCode: "A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0,q,w,e,r,t,y,u,i,o,p,a,s,d,f,g,h,j,k,l,z,x,c,v,b,n,m",
            codeStr: '', // 当前code码
        }
    },
    mounted: function () {
        this.createCode()
    },
    methods: {
        // 得到随机的颜色值
        randomColor() {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            return "rgb(" + r + "," + g + "," + b + ")";
        },
        // 生成二维码
        createCode() {
            this.codeStr = ''
            const canvas_width = document.getElementById('canvas').clientWidth;
            const canvas_height = document.getElementById('canvas').clientHeight;
            const canvas = document.getElementById("canvas");// 获取到canvas的对象，演员
            const context = canvas.getContext("2d");// 获取到canvas画图的环境，演员表演的舞台
            canvas.width = canvas_width;
            canvas.height = canvas_height;
            const aCode = this.sCode.split(",");
            const aLength = aCode.length;// 获取到数组的长度
            for (let i = 0; i <= 3; i++) {
                const j = Math.floor(Math.random() * aLength);// 获取到随机的索引值
                const deg = Math.random() * 30 * Math.PI / 180;// 产生0~30之间的随机弧度
                const txt = aCode[j];// 得到随机的一个内容
                this.codeStr += txt;
                const x = 10 + i * 20;// 文字在canvas上的x坐标
                const y = 20 + Math.random() * 8;// 文字在canvas上的y坐标
                context.font = "bold 23px 微软雅黑";
                context.translate(x, y);
                context.rotate(deg);
                context.fillStyle = this.randomColor();
                context.fillText(txt, 0, 0);
                context.rotate(-deg);
                context.translate(-x, -y);
            }
            for (var i = 0; i <= 5; i++) { // 验证码上显示线条
                context.strokeStyle = this.randomColor();
                context.beginPath();
                context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
                context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
                context.stroke();
            }
            for (let i = 0; i <= 30; i++) { // 验证码上显示小点
                context.strokeStyle = this.randomColor();
                context.beginPath();
                var x = Math.random() * canvas_width;
                var y = Math.random() * canvas_height;
                context.moveTo(x, y);
                context.lineTo(x + 1, y + 1);
                context.stroke();
            }
            this.$emit('update:validateCode', this.codeStr)// 通过vue.async实现子组件修改父组件数据
        }
    }
}
</script>
<style scoped>
#canvas {
    border: 1px solid #aba5a5;
}
</style>
