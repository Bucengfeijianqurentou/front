<template>
  <div class="home-page">
    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="nav-left">
        <img src="../assets/logo.svg" alt="Logo" class="logo">
        <span class="brand-name">BlockAsset</span>
      </div>
      <div class="nav-center">
        <a href="#home" class="nav-item">首页</a>
        <a href="#features" class="nav-item">功能</a>
        <a href="#about" class="nav-item">关于我们</a>
        <a href="#contact" class="nav-item">联系我们</a>
      </div>
      <div class="nav-right">
        <router-link to="/login" class="btn btn-login">登录</router-link>
        <router-link to="/register" class="btn btn-register">注册</router-link>
      </div>
    </nav>

    <!-- Banner区域 -->
    <section class="banner" id="home">
      <div class="banner-content">
        <h1>安全高效的区块链资产管理平台</h1>
        <p>基于区块链技术，为您提供透明、安全、高效的资产管理解决方案</p>
        <a href="#features" class="btn btn-primary">了解更多</a>
      </div>
    </section>

    <!-- 功能介绍 -->
    <section class="features" id="features">
      <h2>核心功能</h2>
      <div class="feature-cards">
        <div class="feature-card">
          <i class="feature-icon el-icon-lock"></i>
          <h3>资产托管</h3>
          <p>安全可靠的资产托管服务，多重加密保护您的数字资产</p>
        </div>
        <div class="feature-card">
          <i class="feature-icon el-icon-monitor"></i>
          <h3>实时监控</h3>
          <p>24/7全天候资产监控，实时掌握资产动态</p>
        </div>
        <div class="feature-card">
          <i class="feature-icon el-icon-document"></i>
          <h3>智能合约</h3>
          <p>自动化合约执行，提高资产管理效率</p>
        </div>
        <div class="feature-card">
          <i class="feature-icon el-icon-data-analysis"></i>
          <h3>数据分析</h3>
          <p>专业的数据分析工具，助您做出明智决策</p>
        </div>
      </div>
    </section>

    <!-- 优势展示 -->
    <section class="advantages">
      <h2>我们的优势</h2>
      <div class="advantage-items">
        <div class="advantage-item">
          <div class="advantage-number">01</div>
          <h3>高安全性</h3>
          <p>采用先进的区块链技术，确保资产安全</p>
        </div>
        <div class="advantage-item">
          <div class="advantage-number">02</div>
          <h3>透明可信</h3>
          <p>所有交易记录不可篡改，公开透明</p>
        </div>
        <div class="advantage-item">
          <div class="advantage-number">03</div>
          <h3>用户友好</h3>
          <p>简洁直观的操作界面，轻松管理资产</p>
        </div>
      </div>
    </section>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-info">
          <h3>BlockAsset</h3>
          <p>© 2024 BlockAsset. 保留所有权利</p>
        </div>
        <div class="footer-links">
          <a href="#" class="social-link"><i class="el-icon-message"></i></a>
          <a href="#" class="social-link"><i class="el-icon-phone"></i></a>
          <a href="#" class="social-link"><i class="el-icon-chat-dot-round"></i></a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  mounted() {
    this.observeElements();
  },
  methods: {
    observeElements() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, {
        threshold: 0.1
      });

      // 观察所有的feature cards
      document.querySelectorAll('.feature-card').forEach(card => {
        observer.observe(card);
      });

      // 观察所有的advantage items
      document.querySelectorAll('.advantage-item').forEach(item => {
        observer.observe(item);
      });
    }
  }
}
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  background-color: #0a192f;
  color: #ffffff;
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5%;
  background-color: rgba(10, 25, 47, 0.95);
  backdrop-filter: blur(10px);
  z-index: 1000;
}

.nav-left {
  display: flex;
  align-items: center;
}

.logo {
  height: 40px;
  margin-right: 1rem;
}

.brand-name {
  font-size: 1.5rem;
  font-weight: bold;
  color: #64ffda;
}

.nav-center {
  display: flex;
  gap: 2rem;
}

.nav-item {
  color: #8892b0;
  text-decoration: none;
  transition: color 0.3s;
}

.nav-item:hover {
  color: #64ffda;
}

.nav-right {
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.3s;
}

.btn-login {
  color: #64ffda;
  border: 1px solid #64ffda;
}

.btn-register {
  background-color: #64ffda;
  color: #0a192f;
}

.banner {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(rgba(10, 25, 47, 0.9), rgba(10, 25, 47, 0.9));
  position: relative;
  overflow: hidden;
}

.banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 20%, rgba(100, 255, 218, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(100, 255, 218, 0.1) 0%, transparent 50%),
    linear-gradient(45deg, rgba(10, 25, 47, 0.8) 0%, rgba(10, 25, 47, 0.9) 100%);
  z-index: -1;
}

.banner-content {
  text-align: center;
  max-width: 800px;
  padding: 0 2rem;
}

.banner-content h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #64ffda;
  animation: fadeInUp 0.8s ease-out;
}

.banner-content p {
  font-size: 1.2rem;
  color: #8892b0;
  margin-bottom: 2rem;
  animation: fadeInUp 0.8s ease-out 0.2s backwards;
}

.btn-primary {
  background-color: #64ffda;
  color: #0a192f;
  padding: 1rem 2rem;
  font-weight: bold;
  animation: fadeInUp 0.8s ease-out 0.4s backwards;
}

.features, .advantages {
  padding: 5rem 5%;
}

h2 {
  text-align: center;
  color: #64ffda;
  margin-bottom: 3rem;
  font-size: 2rem;
}

.feature-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  background-color: rgba(100, 255, 218, 0.1);
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(20px);
}

.feature-card.visible {
  opacity: 1;
  transform: translateY(0);
}

.feature-card:hover {
  transform: translateY(-10px);
  background-color: rgba(100, 255, 218, 0.15);
  box-shadow: 0 4px 20px rgba(100, 255, 218, 0.1);
}

.feature-icon {
  font-size: 2.5rem;
  color: #64ffda;
  margin-bottom: 1rem;
}

.advantage-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.advantage-item {
  text-align: center;
  padding: 2rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease;
}

.advantage-item.visible {
  opacity: 1;
  transform: translateY(0);
}

.advantage-number {
  font-size: 3rem;
  color: #64ffda;
  font-weight: bold;
  margin-bottom: 1rem;
}

.footer {
  background-color: rgba(10, 25, 47, 0.95);
  padding: 2rem 5%;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  color: #8892b0;
  font-size: 1.5rem;
  transition: color 0.3s;
}

.social-link:hover {
  color: #64ffda;
}

@media (max-width: 768px) {
  .nav-center {
    display: none;
  }
  
  .banner-content h1 {
    font-size: 2rem;
  }
  
  .footer-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .feature-cards {
    grid-template-columns: 1fr;
    padding: 0 1rem;
  }

  .advantage-items {
    grid-template-columns: 1fr;
    padding: 0 1rem;
  }
}

/* 添加滚动平滑效果 */
html {
  scroll-behavior: smooth;
}

/* 添加动画效果 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 