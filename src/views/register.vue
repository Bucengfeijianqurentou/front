<template>
    <div class="login-container">
        <canvas id="canvas"></canvas>

        <div class="platform-title">
            <h1>区块链资产管理系统</h1>
            <div class="line"></div>
            <h2>Blockchain Asset Management Platform</h2>
        </div>

        <div class="box">
            <div class="square" style="--i:0;"></div>
            <div class="square" style="--i:1;"></div>
            <div class="square" style="--i:2;"></div>
            <div class="square" style="--i:3;"></div>
            <div class="square" style="--i:4;"></div>
            <div class="square" style="--i:5;"></div>

            <div class="container">
                <div class="form">
                    <h2>注册 REGISTER</h2>
                    <form @submit.prevent="register" autocomplete="off">
                        <div class="inputBx">
                            <input type="text" required="required" v-model="ruleForm.username" autocomplete="new-password">
                            <span>用户名 Username</span>
                            <i></i>
                        </div>
                        <div class="inputBx">
                            <input type="password" required="required" v-model="ruleForm.password"
                                autocomplete="new-password">
                            <span>密码 Password</span>
                            <i></i>
                        </div>
                        <div class="inputBx">
                            <input type="password" required="required" v-model="ruleForm.repetitionPassword"
                                autocomplete="new-password">
                            <span>重复密码 Confirm Password</span>
                            <i></i>
                        </div>
                        <div class="inputBx" v-if="tableName === 'yonghu'">
                            <input type="text" required="required" v-model="ruleForm.yonghuName"
                                autocomplete="new-password">
                            <span>用户姓名 Full Name</span>
                            <i></i>
                        </div>
                        <div class="inputBx" v-if="tableName === 'yonghu'">
                            <input type="text" required="required" v-model="ruleForm.yonghuPhone"
                                autocomplete="new-password">
                            <span>手机号码 Phone</span>
                            <i></i>
                        </div>
                        <div class="inputBx" v-if="tableName === 'yonghu'">
                            <input type="text" required="required" v-model="ruleForm.yonghuIdNumber"
                                autocomplete="new-password">
                            <span>身份证号 ID Number</span>
                            <i></i>
                        </div>
                        <div class="inputBx" v-if="tableName === 'yonghu'">
                            <input type="text" required="required" v-model="ruleForm.yonghuEmail"
                                autocomplete="new-password">
                            <span>电子邮箱 Email</span>
                            <i></i>
                        </div>
                        <div class="inputBx">
                            <input type="submit" value="注册" :disabled="loading">
                        </div>
                    </form>
                    <p>已有账号? <a href="javascript:void(0)" @click="close()">立即登录</a></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loading: false,
            ruleForm: {
                username: "",
                password: "",
                repetitionPassword: "",
                yonghuName: "",
                yonghuPhone: "",
                yonghuIdNumber: "",
                yonghuEmail: ""
            },
            tableName: "",
            // Canvas properties
            canvas: null,
            ctx: null,
            circles: [],
            currentCircle: null,
            enableMouseInteraction: true,
            animationFrameId: null
        };
    },
    created() {
        // Reset form data when component is created
        this.ruleForm = {
            username: "",
            password: "",
            repetitionPassword: "",
            yonghuName: "",
            yonghuPhone: "",
            yonghuIdNumber: "",
            yonghuEmail: ""
        };
    },
    mounted() {
        // 获取登录表名
        let table = this.$storage.get("loginTable");
        this.tableName = table;

        // Initialize canvas
        this.initCanvas();

        // Add resize event listener
        window.addEventListener('resize', this.onWindowResize);

        // Initialize title animation
        this.initTitleAnimation();
    },
    beforeUnmount() {
        // Clean up resources
        window.removeEventListener('resize', this.onWindowResize);

        // Stop animation loop
        if (this.animationFrameId) {
            window.cancelAnimationFrame(this.animationFrameId);
        }
    },
    methods: {
        // 关闭注册页面并跳转到登录页面
        close() {
            this.$router.push({ path: "/login" });
        },
        // 注册逻辑
        register() {
            if (!this.ruleForm.username) {
                this.$message.error('账号不能为空');
                return;
            }
            if (!this.ruleForm.password) {
                this.$message.error('密码不能为空');
                return;
            }
            if (!this.ruleForm.repetitionPassword) {
                this.$message.error('重复密码不能为空');
                return;
            }
            if (this.ruleForm.repetitionPassword !== this.ruleForm.password) {
                this.$message.error('密码和重复密码不一致');
                return;
            }
            if (!this.ruleForm.yonghuName && this.tableName === 'yonghu') {
                this.$message.error('用户姓名不能为空');
                return;
            }
            if (this.tableName === 'yonghu' && this.ruleForm.yonghuPhone && (!this.$validate.isMobile(this.ruleForm.yonghuPhone))) {
                this.$message.error('手机应输入手机格式');
                return;
            }
            if (!this.ruleForm.yonghuIdNumber && this.tableName === 'yonghu') {
                this.$message.error('用户身份证号不能为空');
                return;
            }
            if (this.tableName === 'yonghu' && this.ruleForm.yonghuEmail && (!this.$validate.isEmail(this.ruleForm.yonghuEmail))) {
                this.$message.error("邮箱应输入邮件格式");
                return;
            }

            this.loading = true;
            this.$http({
                url: `${this.tableName}/register`,
                method: "post",
                data: this.ruleForm
            }).then(({ data }) => {
                if (data && data.code === 0) {
                    this.$message({
                        message: "注册成功,请登录后在个人中心页面补充个人数据",
                        type: "success",
                        duration: 1500,
                        onClose: () => {
                            this.$router.replace({ path: "/login" });
                        }
                    });
                } else {
                    this.$message.error(data.msg);
                }
            }).catch(err => {
                this.$message.error("请求异常");
                console.error(err);
            }).finally(() => {
                this.loading = false;
            });
        },
        initCanvas() {
            this.canvas = document.getElementById('canvas');
            this.ctx = this.canvas.getContext('2d');

            // Set canvas size
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;

            // Initialize particles
            this.initParticles();

            // Start animation
            this.animate();

            // Add event listeners
            window.addEventListener('mousemove', this.onMouseMove);

            // Add input focus handlers
            const textInputs = document.querySelectorAll('input[type="text"], input[type="password"]');
            textInputs.forEach(input => {
                input.addEventListener('focus', () => this.enableMouseInteraction = false);
                input.addEventListener('blur', () => this.enableMouseInteraction = true);
            });

            // Set initial mouse position
            this.currentCircle.x = this.canvas.width / 2;
            this.currentCircle.y = this.canvas.height / 2;
        },
        initParticles() {
            this.circles = [];
            for (let i = 0; i < 50; i++) { // Reduced number of particles
                this.circles.push(new Circle(
                    Math.random() * this.canvas.width,
                    Math.random() * this.canvas.height
                ));
            }
            this.currentCircle = new CurrentCircle(0, 0);
        },
        animate() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            for (let i = 0; i < this.circles.length; i++) {
                this.circles[i].move(this.canvas.width, this.canvas.height);
                this.circles[i].drawCircle(this.ctx);
                for (let j = i + 1; j < this.circles.length; j++) {
                    this.circles[i].drawLine(this.ctx, this.circles[j], this.currentCircle.x, this.currentCircle.y);
                }
            }

            if (this.currentCircle.x && this.currentCircle.y && this.enableMouseInteraction) {
                this.currentCircle.drawCircle(this.ctx);
                for (let i = 0; i < this.circles.length; i++) {
                    this.currentCircle.drawLine(this.ctx, this.circles[i], this.currentCircle.x, this.currentCircle.y);

                    // 添加粒子聚合效果
                    const dx = this.currentCircle.x - this.circles[i].x;
                    const dy = this.currentCircle.y - this.circles[i].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < this.currentCircle.influenceRadius) {
                        const force = (1 - distance / this.currentCircle.influenceRadius) * 0.03;
                        this.circles[i]._mx += (dx / distance) * force;
                        this.circles[i]._my += (dy / distance) * force;
                    }
                }
            }

            this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
        },
        onMouseMove(e) {
            if (!this.enableMouseInteraction) return;
            const rect = this.canvas.getBoundingClientRect();
            this.currentCircle.x = e.clientX - rect.left;
            this.currentCircle.y = e.clientY - rect.top;
        },
        onWindowResize() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.initParticles();
        },
        initTitleAnimation() {
            const createGlowEffect = () => {
                const chineseTitle = document.querySelector('.platform-title h1');
                if (chineseTitle) {
                    chineseTitle.style.textShadow = '0 0 15px rgba(255, 255, 255, 0.5)';
                    setTimeout(() => {
                        chineseTitle.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.3)';
                    }, 500);
                }
            };

            setInterval(createGlowEffect, 3000);
        }
    }
};

// Particle class
class Circle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = Math.random() * 4 + 2;
        this._mx = (Math.random() * 0.7 - 0.35) * 1.0;
        this._my = (Math.random() * 0.7 - 0.35) * 1.0;
        this.opacity = 0.55;
        this.color = `rgba(255, 255, 255, ${this.opacity})`;
    }

    drawCircle(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = `rgba(180, 160, 255, ${this.opacity})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r + 1.5, 0, Math.PI * 2);
        ctx.closePath();
        const glowGradient = ctx.createRadialGradient(this.x, this.y, this.r * 0.5, this.x, this.y, this.r + 1.5);
        glowGradient.addColorStop(0, `rgba(180, 160, 255, ${this.opacity * 0.6})`);
        glowGradient.addColorStop(1, 'rgba(180, 160, 255, 0)');
        ctx.fillStyle = glowGradient;
        ctx.fill();
    }

    drawLine(ctx, _circle, mouseX, mouseY) {
        let dx = this.x - _circle.x;
        let dy = this.y - _circle.y;
        let d = Math.sqrt(dx * dx + dy * dy);

        const mouseDistanceFromThis = Math.sqrt(Math.pow(this.x - mouseX, 2) + Math.pow(this.y - mouseY, 2));
        const mouseDistanceFromTarget = Math.sqrt(Math.pow(_circle.x - mouseX, 2) + Math.pow(_circle.y - mouseY, 2));
        const isNearMouse = mouseDistanceFromThis < 180 && mouseDistanceFromTarget < 180;

        const maxDistance = isNearMouse ? 180 : 140;

        if (d < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(_circle.x, _circle.y);
            ctx.closePath();

            let opacity = 0.25 * (1 - d / maxDistance);
            if (isNearMouse) {
                opacity = opacity * 1.3;
            }

            const gradient = ctx.createLinearGradient(this.x, this.y, _circle.x, _circle.y);
            gradient.addColorStop(0, `rgba(180, 160, 255, ${opacity})`);
            gradient.addColorStop(1, `rgba(108, 92, 231, ${opacity})`);

            ctx.strokeStyle = gradient;
            ctx.lineWidth = isNearMouse ? 0.6 : 0.4;
            ctx.stroke();
        }
    }

    move(w, h) {
        if (this.x < 0 || this.x > w) this._mx = -this._mx * 0.95;
        if (this.y < 0 || this.y > h) this._my = -this._my * 0.95;

        this._mx = this._mx * 0.999;
        this._my = this._my * 0.999;

        const speed = Math.sqrt(this._mx * this._mx + this._my * this._my);
        if (speed < 0.02) {
            this._mx += (Math.random() - 0.5) * 0.02;
            this._my += (Math.random() - 0.5) * 0.02;
        }

        this.x += this._mx * 1.5;
        this.y += this._my * 1.5;

        this.x = Math.max(0, Math.min(w, this.x));
        this.y = Math.max(0, Math.min(h, this.y));
    }
}

class CurrentCircle extends Circle {
    constructor(x, y) {
        super(x, y);
        this.r = 8;
        this.influenceRadius = 160;
        this.glowIntensity = 0.5;
    }

    drawCircle(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.closePath();

        ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r + 14, 0, Math.PI * 2);
        ctx.closePath();
        const gradient = ctx.createRadialGradient(this.x, this.y, this.r, this.x, this.y, this.r + 14);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r * 0.7, 0, Math.PI * 2);
        ctx.closePath();
        const innerGlow = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r * 0.7);
        innerGlow.addColorStop(0, 'rgba(255, 255, 255, 0.65)');
        innerGlow.addColorStop(1, 'rgba(255, 255, 255, 0.25)');
        ctx.fillStyle = innerGlow;
        ctx.fill();
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Microsoft YaHei", "微软雅黑", "PingFang SC", "Hiragino Sans GB", sans-serif;
}

.login-container {
    background: linear-gradient(-45deg, #6c5ce7, #a367dc, #8e44ad, #9b59b6);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
    overflow: hidden;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}

canvas {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
}

.platform-title {
    position: absolute;
    top: 15%;
    left: 8%;
    color: white;
    text-align: left;
    z-index: 1;
}

.platform-title h1 {
    font-size: 2.8em;
    font-weight: 700;
    text-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
    letter-spacing: 0.05em;
    border-radius: 8px;
}

.platform-title .line {
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, white, transparent);
    margin: 15px 0;
    animation: flowLight 3s linear infinite;
}

@keyframes flowLight {
    0% {
        background-position: -300px 0;
    }

    100% {
        background-position: 300px 0;
    }
}

.platform-title h2 {
    font-size: 1.6em;
    font-weight: 300;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
    letter-spacing: 0.1em;
    border-radius: 8px;
}

.box {
    position: absolute;
    top: 10%;
    right: 10%;
    z-index: 1;
}

.box .square {
    position: absolute;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(5px);
    box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 15px;
    animation: square 10s linear infinite;
    animation-delay: calc(-1s * var(--i));
}

@keyframes square {

    0%,
    100% {
        transform: translateY(-20px);
    }

    50% {
        transform: translateY(20px);
    }
}

.box .square:nth-child(1) {
    width: 100px;
    height: 100px;
    top: -15px;
    right: -45px;
}

.box .square:nth-child(2) {
    width: 150px;
    height: 150px;
    top: 105px;
    left: -125px;
    z-index: 2;
}

.box .square:nth-child(3) {
    width: 60px;
    height: 60px;
    bottom: 85px;
    right: -45px;
    z-index: 2;
}

.box .square:nth-child(4) {
    width: 50px;
    height: 50px;
    bottom: 35px;
    left: -95px;
}

.box .square:nth-child(5) {
    width: 50px;
    height: 50px;
    top: -15px;
    left: -25px;
}

.box .square:nth-child(6) {
    width: 85px;
    height: 85px;
    top: 165px;
    right: -155px;
    z-index: 2;
}

.container {
    position: relative;
    padding: 50px;
    width: 420px;
    min-height: 420px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    border-radius: 24px;
    box-shadow: 0 25px 45px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.2);
    animation: borderGlow 3s ease-in-out infinite;
}

@keyframes borderGlow {

    0%,
    100% {
        border-color: rgba(255, 255, 255, 0.2);
        box-shadow: 0 25px 45px rgba(0, 0, 0, 0.2);
    }

    50% {
        border-color: rgba(255, 255, 255, 0.4);
        box-shadow: 0 25px 45px rgba(0, 0, 0, 0.3), 0 0 15px rgba(255, 255, 255, 0.1);
    }
}

.form {
    width: 100%;
}

.form h2 {
    color: #fff;
    letter-spacing: 2px;
    margin-bottom: 30px;
    text-align: center;
    font-weight: 600;
    border-radius: 8px;
}

.inputBx {
    position: relative;
    width: 100%;
    margin-top: 35px;
}

.inputBx input {
    position: relative;
    width: 100%;
    padding: 20px 10px 10px;
    background: transparent;
    outline: none;
    box-shadow: none;
    border: none;
    color: #fff;
    font-size: 1em;
    letter-spacing: 0.05em;
    transition: 0.5s;
    z-index: 10;
    border-radius: 4px;
}

.inputBx span {
    position: absolute;
    left: 0;
    padding: 20px 0px 10px;
    pointer-events: none;
    font-size: 1em;
    color: #8f8f8f;
    letter-spacing: 0.05em;
    transition: 0.5s;
    border-radius: 8px;
}

.inputBx input:valid~span,
.inputBx input:focus~span {
    color: rgba(255, 255, 255, 0.9);
    transform: translateX(0px) translateY(-34px);
    font-size: 0.75em;
    font-weight: 500;
}

.inputBx i {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
    overflow: hidden;
    transition: 0.5s;
    pointer-events: none;
    z-index: 9;
}

.inputBx input:valid~i,
.inputBx input:focus~i {
    height: 44px;
    background: linear-gradient(115deg, rgba(46, 204, 113, 0.15), rgba(52, 152, 219, 0.15));
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
}

.inputBx input[type="submit"] {
    border: none;
    outline: none;
    padding: 11px 25px;
    background: linear-gradient(135deg, #a367dc, #6c5ce7);
    cursor: pointer;
    border-radius: 12px;
    font-weight: 600;
    width: 120px;
    margin: 15px auto 0;
    display: block;
    transition: all 0.3s ease;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 1px;
    box-shadow: 0 4px 15px rgba(108, 92, 231, 0.3);
}

.inputBx input[type="submit"]:hover {
    background: linear-gradient(135deg, #8e44ad, #a367dc);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(108, 92, 231, 0.4);
}

.inputBx input[type="submit"]:active {
    opacity: 0.8;
}

.inputBx input[type="submit"]:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.form p {
    color: #fff;
    font-size: 15px;
    margin-top: 25px;
    text-align: center;
    border-radius: 4px;
}

.form p a {
    color: #fff;
    text-decoration: underline;
    border-radius: 4px;
}

.form p a:hover {
    background-color: #000;
    background-image: linear-gradient(to right, #434343 0%, black 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}</style>