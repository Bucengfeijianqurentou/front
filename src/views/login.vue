<template>
  <div class="login-container">
    <!-- Three.js canvas will be appended here -->
    <canvas ref="threeJsCanvas"></canvas>
    
    <div class="platform-title">
      <h1>区块链资产管理系统</h1>
      <div class="line"></div>
      <h2>Blockchain Asset Management Platform</h2>
    </div>

    <div class="box">
      <form autocomplete="off" @submit.prevent="login">
        <h2>Sign in</h2>
        <div class="inputBox">
          <input type="text" required="required" v-model="rulesForm.username">
          <span>Username</span>
          <i></i>
        </div>
        <div class="inputBox">
          <input type="password" required="required" v-model="rulesForm.password">
          <span>Password</span>
          <i></i>
        </div>
        <div class="userTypeBox">
          <div 
            class="user-type-option" 
            :class="{ active: rulesForm.role === '用户' }" 
            id="userOption"
            @click="rulesForm.role = '用户'"
          >
            <div class="radio-dot"></div>
            <div class="user-type-label">User</div>
          </div>
          <div 
            class="user-type-option" 
            :class="{ active: rulesForm.role === '管理员' }" 
            id="adminOption"
            @click="rulesForm.role = '管理员'"
          >
            <div class="radio-dot"></div>
            <div class="user-type-label">Administrator</div>
          </div>
        </div>
        <div class="links">
          <a href="javascript:void(0)">Forgot Password?</a>
          <a href="javascript:void(0)" @click="register('yonghu')">Signup</a>
        </div>
        <input type="submit" value="Login" :disabled="loading">
      </form>
    </div>
  </div>
</template>

<script>
import menu from "@/utils/menu";
import * as THREE from 'three';

export default {
  data() {
    return {
      loading: false,
      rulesForm: {
        username: "",
        password: "",
        role: "用户", // Default to User role
      },
      menus: [],
      tableName: "",
      // Three.js properties
      scene: null,
      camera: null,
      renderer: null,
      plane: null,
      clock: null,
      animationFrameId: null
    };
  },
  mounted() {
    // Load menu data
    let menus = menu.list();
    this.menus = menus;
    
    // Initialize Three.js scene
    this.initThreeJS();
    
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
    
    // Dispose renderer to free memory
    if (this.renderer) {
      this.renderer.dispose();
    }
  },
  methods: {
    login() {
      if (!this.rulesForm.username) {
        this.$message.error("请输入用户名");
        return;
      }
      if (!this.rulesForm.password) {
        this.$message.error("请输入密码");
        return;
      }
      if (!this.rulesForm.role) {
        this.$message.error("请选择角色");
        return;
      }

      // Set tableName based on role
      this.tableName = this.rulesForm.role === "管理员" ? "users" : "yonghu";

      this.loading = true;
      this.$http({
        url: `${this.tableName}/login?username=${this.rulesForm.username}&password=${this.rulesForm.password}`,
        method: "post"
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.$storage.set("Token", data.token);
          this.$storage.set("role", this.rulesForm.role);
          this.$storage.set("sessionTable", this.tableName);
          this.$storage.set("adminName", this.rulesForm.username);
          this.$router.replace({ path: "/index/" });
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
    register(tableName) {
      this.$storage.set("loginTable", tableName);
      this.$router.push({path:'/register'})
    },
    initThreeJS() {
      // Setup sizes
      const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
      };

      // Create scene
      this.scene = new THREE.Scene();

      // Create camera
      this.camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
      this.camera.position.z = 10;
      this.camera.position.y = 1.1;
      this.camera.position.x = 0;
      this.scene.add(this.camera);

      // Create plane geometry with shader material
      const planeGeometry = new THREE.PlaneGeometry(20, 20, 150, 150);
      const planeMaterial = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uElevation: { value: 0.482 },
          ucolor: { value: new THREE.Color(0x45f3ff) },
          bsize: { value: 3 }
        },
        vertexShader: `
          uniform float uTime;
          uniform float uElevation;

          attribute float aSize;
          uniform float bsize;

          varying float vPositionY;
          varying float vPositionZ;

          void main() {
            vec4 modelPosition = modelMatrix * vec4(position, 1.0);
            modelPosition.y = sin(modelPosition.x - uTime) * sin(modelPosition.z * 0.6 + uTime) * uElevation;

            vec4 viewPosition = viewMatrix * modelPosition;
            gl_Position = projectionMatrix * viewPosition;

            gl_PointSize = 2.0 * aSize;
            gl_PointSize *= ( 1.0 / - viewPosition.z ) * bsize;

            vPositionY = modelPosition.y;
            vPositionZ = modelPosition.z;
          }
        `,
        fragmentShader: `
          varying float vPositionY;
          varying float vPositionZ;
          uniform vec3 ucolor;

          void main() {
            float strength = (vPositionY + 0.25) * 0.3;
            gl_FragColor = vec4(ucolor, strength);
          }
        `,
        transparent: true,
      });

      // Create random sizes for each point
      const planeSizesArray = new Float32Array(planeGeometry.attributes.position.count);
      for (let i = 0; i < planeSizesArray.length; i++) {
        planeSizesArray[i] = Math.random() * 4.0;
      }
      planeGeometry.setAttribute('aSize', new THREE.BufferAttribute(planeSizesArray, 1));
      
      // Create points from geometry and material
      this.plane = new THREE.Points(planeGeometry, planeMaterial);
      this.plane.rotation.x = -Math.PI * 0.4;
      this.scene.add(this.plane);

      // Create renderer
      this.renderer = new THREE.WebGLRenderer({ 
        alpha: true,
        canvas: this.$refs.threeJsCanvas 
      });
      this.renderer.setClearColor(0x000000, 0);
      this.renderer.setSize(sizes.width, sizes.height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));

      // Create clock
      this.clock = new THREE.Clock();
      
      // Start animation loop
      this.animate();
    },
    animate() {
      const elapsedTime = this.clock.getElapsedTime();
      
      // Update shader uniforms
      if (this.plane && this.plane.material) {
        this.plane.material.uniforms.uTime.value = elapsedTime;
      }
      
      // Render scene
      this.renderer.render(this.scene, this.camera);
      
      // Continue animation loop
      this.animationFrameId = window.requestAnimationFrame(this.animate.bind(this));
    },
    onWindowResize() {
      const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
      };
      
      // Update camera
      this.camera.aspect = sizes.width / sizes.height;
      this.camera.updateProjectionMatrix();
      
      // Update renderer
      this.renderer.setSize(sizes.width, sizes.height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    },
    initTitleAnimation() {
      const createGlowEffect = () => {
        const chineseTitle = document.querySelector('.platform-title h1');
        if (chineseTitle) {
          chineseTitle.style.textShadow = '0 0 15px rgba(69, 243, 255, 0.8)';
          setTimeout(() => {
            chineseTitle.style.textShadow = '0 0 10px rgba(69, 243, 255, 0.7)';
          }, 500);
        }
      };
      
      setInterval(createGlowEffect, 3000);
    }
  }
};
</script>

<style scoped>
/* Import Poppins font */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
/* Import Noto Sans SC for Chinese text */
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

.login-container {
  display: flex;
  min-height: 100vh;
  background: #23242a;
  overflow: hidden;
  position: relative;
}

canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

/* Platform Title Styles */
.platform-title {
  position: absolute;
  top: 15%;
  left: 8%;
  z-index: 10;
  perspective: 1000px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.platform-title h1 {
  color: #45f3ff;
  font-size: 2.8em;
  font-weight: 700;
  text-shadow: 0 0 10px rgba(69, 243, 255, 0.7);
  white-space: nowrap;
  position: relative;
  font-family: 'Noto Sans SC', sans-serif;
  margin-bottom: 10px;
}

.platform-title h2 {
  color: #45f3ff;
  font-size: 1.6em;
  font-weight: 500;
  text-shadow: 0 0 8px rgba(69, 243, 255, 0.6);
  white-space: nowrap;
  letter-spacing: 0.05em;
  text-align: left;
}

.platform-title .line {
  position: relative;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #45f3ff, transparent);
  margin: 5px 0 15px;
  background-size: 600px 2px;
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

/* Login Box Styles - Frosted Glass Effect */
.box {
  position: absolute;
  top: 15%;
  right: 10%;
  width: 380px;
  height: 500px;
  border-radius: 8px;
  overflow: hidden;
  z-index: 10;
  backdrop-filter: blur(5px);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  border: 1px solid rgba(69, 243, 255, 0.18);
}

.box::before {
  content: '';
  z-index: 1;
  position: absolute;
  top: -50%;
  left: -50%;
  width: 380px;
  height: 500px;
  transform-origin: bottom right;
  background: linear-gradient(0deg, transparent, rgba(69, 243, 255, 0.7), rgba(69, 243, 255, 0.7));
  animation: animate 6s linear infinite;
}

.box::after {
  content: '';
  z-index: 1;
  position: absolute;
  top: -50%;
  left: -50%;
  width: 380px;
  height: 500px;
  transform-origin: bottom right;
  background: linear-gradient(0deg, transparent, rgba(69, 243, 255, 0.7), rgba(69, 243, 255, 0.7));
  animation: animate 6s linear infinite;
  animation-delay: -3s;
}

@keyframes animate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

form {
  position: absolute;
  inset: 2px;
  background: rgba(40, 41, 45, 0.8);
  padding: 40px;
  border-radius: 8px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(5px);
}

h2 {
  color: #45f3ff;
  font-weight: 500;
  text-align: center;
  letter-spacing: 0.1em;
  margin-bottom: 10px;
}

.inputBox {
  position: relative;
  width: 300px;
  margin-top: 35px;
}

.inputBox input {
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
}

.inputBox span {
  position: absolute;
  left: 0;
  padding: 20px 0px 10px;
  pointer-events: none;
  font-size: 1em;
  color: #8f8f8f;
  letter-spacing: 0.05em;
  transition: 0.5s;
}

.inputBox input:valid~span,
.inputBox input:focus~span {
  color: #45f3ff;
  transform: translateX(0px) translateY(-34px);
  font-size: 0.75em;
}

.inputBox i {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: #45f3ff;
  border-radius: 4px;
  overflow: hidden;
  transition: 0.5s;
  pointer-events: none;
  z-index: 9;
}

.inputBox input:valid~i,
.inputBox input:focus~i {
  height: 44px;
}

/* User Type Selection with Dot Toggle - Side by Side */
.userTypeBox {
  position: relative;
  width: 300px;
  margin-top: 35px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
}

.user-type-option {
  display: flex;
  flex: 1;
  align-items: center;
  cursor: pointer;
  padding: 8px 10px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.user-type-option:hover {
  background-color: rgba(69, 243, 255, 0.05);
}

.radio-dot {
  position: relative;
  width: 18px;
  height: 18px;
  border: 2px solid #8f8f8f;
  border-radius: 50%;
  margin-right: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: border-color 0.3s ease;
}

.radio-dot::after {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: transparent;
  transition: all 0.3s ease;
}

.user-type-option.active .radio-dot {
  border-color: #45f3ff;
}

.user-type-option.active .radio-dot::after {
  background: #45f3ff;
  box-shadow: 0 0 6px #45f3ff;
}

.user-type-label {
  color: #8f8f8f;
  font-size: 0.95em;
  transition: color 0.3s ease;
}

.user-type-option.active .user-type-label {
  color: #45f3ff;
}

.links {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.links a {
  margin: 10px 0;
  font-size: 0.75em;
  color: #8f8f8f;
  text-decoration: none;
  transition: color 0.3s ease;
}

.links a:hover,
.links a:nth-child(2) {
  color: #45f3ff;
}

input[type="submit"] {
  border: none;
  outline: none;
  padding: 11px 25px;
  background: #45f3ff;
  cursor: pointer;
  border-radius: 4px;
  font-weight: 600;
  width: 100px;
  margin-top: 10px;
  transition: all 0.3s ease;
}

input[type="submit"]:hover {
  box-shadow: 0 0 10px rgba(69, 243, 255, 0.5);
}

input[type="submit"]:active {
  opacity: 0.8;
}

input[type="submit"]:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>