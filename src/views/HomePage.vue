<template>
  <div class="home-page">
    <!-- 导航栏 -->
    <nav class="nav-bar">
      <div class="logo">BlockAsset</div>
      <div class="nav-links">
        <a href="#home" class="nav-link">首页</a>
        <a href="#features" class="nav-link">核心功能</a>
        <a href="#cases" class="nav-link">合作案例</a>
        <a href="#about" class="nav-link">关于我们</a>
        <a href="#contact" class="nav-link">联系我们</a>
      </div>
      <div class="auth-buttons">
        <button class="btn-login" @click="handleLogin">登录</button>
        <button class="btn-register" @click="handleRegister">注册</button>
      </div>
    </nav>

    <!-- Banner区域 -->
    <section id="home" class="banner">
      <div class="banner-content">
        <h1>区块链资产管理平台</h1>
        <p>安全、高效、透明的区块链资产管理解决方案</p>
        <button class="btn-start" @click="handleStart">开始使用</button>
      </div>
    </section>

    <!-- 功能介绍 -->
    <section id="features" class="features">
      <h2>核心功能</h2>
      <div class="feature-grid">
        <div class="feature-card" v-for="(feature, index) in features" :key="index">
          <i :class="feature.icon"></i>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <!-- 合作案例 -->
    <section id="cases" class="cases">
      <h2>合作案例</h2>
      <p class="section-desc">我们为众多企业提供区块链资产管理解决方案</p>
      <Carousel :slides="caseSlides" />
    </section>

    <!-- 关于我们 -->
    <section id="about" class="about-us">
      <h2>关于我们</h2>
      <div class="about-content">
        <div class="about-text">
          <p>BlockAsset 是一个专业的区块链资产管理平台，致力于为企业和个人提供安全、透明、高效的区块链资产管理服务。</p>
          <div class="advantages">
            <div class="advantage-item">
              <h4>安全可靠</h4>
              <p>采用多重签名和冷热钱包分离技术，确保资产安全</p>
            </div>
            <div class="advantage-item">
              <h4>透明公开</h4>
              <p>所有交易记录上链，实现全程可追溯</p>
            </div>
            <div class="advantage-item">
              <h4>便捷高效</h4>
              <p>智能合约自动化执行，提高管理效率</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 联系我们 -->
    <section id="contact" class="contact">
      <h2>联系我们</h2>
      <div class="contact-grid">
        <div class="contact-card">
          <i class="el-icon-message"></i>
          <h3>邮件咨询</h3>
          <p>support@blockasset.com</p>
        </div>
        <div class="contact-card">
          <i class="el-icon-phone"></i>
          <h3>电话支持</h3>
          <p>400-888-8888</p>
        </div>
        <div class="contact-card">
          <i class="el-icon-service"></i>
          <h3>在线客服</h3>
          <p>工作日 9:00-18:00</p>
        </div>
      </div>
    </section>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-info">
          <p>&copy; 2025 BlockAsset. All rights reserved.</p>
        </div>
        <div class="social-links">
          <a href="#" class="social-link"><i class="el-icon-platform-eleme"></i></a>
          <a href="#" class="social-link"><i class="el-icon-chat-dot-round"></i></a>
          <a href="#" class="social-link"><i class="el-icon-connection"></i></a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import Carousel from '@/components/Carousel.vue'

export default {
  name: 'HomePage',
  components: {
    Carousel
  },
  data() {
    return {
      features: [
        {
          icon: 'el-icon-lock',
          title: '资产托管',
          description: '安全可靠的区块链资产托管服务'
        },
        {
          icon: 'el-icon-monitor',
          title: '实时监控',
          description: '全天候监控资产状态和交易情况'
        },
        {
          icon: 'el-icon-document',
          title: '智能合约',
          description: '自动化执行交易和管理流程'
        },
        {
          icon: 'el-icon-data-line',
          title: '数据分析',
          description: '专业的数据分析和可视化报表'
        }
      ],
      caseSlides: [
        {
          image: require('@/assets/images/case1.jpg'),
          title: '某大型金融机构资产数字化项目',
          description: '为客户提供完整的区块链资产管理解决方案，实现资产全生命周期的透明化管理'
        },
        {
          image: require('@/assets/images/case2.jpg'),
          title: '跨境贸易区块链平台',
          description: '打造基于区块链的跨境贸易平台，提高贸易效率，降低信任成本'
        },
        {
          image: require('@/assets/images/case3.jpg'),
          title: '供应链金融区块链项目',
          description: '运用区块链技术重构供应链金融业务流程，实现资产可追溯、不可篡改'
        }
      ]
    }
  },
  methods: {
    handleLogin() {
      this.$router.push('/login')
    },
    handleRegister() {
      this.$router.push('/register')
    },
    handleStart() {
      this.$router.push('/login')
    },
    handleScroll() {
      const sections = document.querySelectorAll('section')
      sections.forEach(section => {
        const rect = section.getBoundingClientRect()
        const isVisible = (rect.top <= window.innerHeight * 0.75) && (rect.bottom >= window.innerHeight * 0.25)
        if (isVisible) {
          section.classList.add('visible')
          // 更新导航栏高亮
          const navLinks = document.querySelectorAll('.nav-link')
          navLinks.forEach(link => {
            if (link.getAttribute('href').slice(1) === section.id) {
              link.classList.add('active')
            } else {
              link.classList.remove('active')
            }
          })
        }
      })
    }
  },
  mounted() {
    // 监听滚动事件
    document.querySelector('.home-page').addEventListener('scroll', this.handleScroll)
    // 初始化第一屏
    document.querySelector('#home').classList.add('visible')
  },
  beforeDestroy() {
    // 移除滚动监听
    document.querySelector('.home-page').removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="scss" scoped>
.home-page {
  scroll-behavior: smooth;
  height: 100%;
  background: linear-gradient(135deg, #1a1a1a 0%, #0a192f 100%);
  overflow-y: auto;
  position: relative;
}

.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  background: rgba(18, 18, 18, 0.8);
  backdrop-filter: blur(10px);
  z-index: 1000;

  .logo {
    font-size: 24px;
    font-weight: bold;
    color: #fff;
  }

  .nav-links {
    display: flex;
    gap: 30px;

    .nav-link {
      color: #fff;
      text-decoration: none;
      font-size: 16px;
      transition: color 0.3s;

      &:hover {
        color: #409EFF;
      }
    }
  }

  .auth-buttons {
    display: flex;
    gap: 15px;
    align-items: center;
    height: 100%;

    button {
      height: 32px;
      min-width: 68px;
      padding: 0 16px;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
      margin: 0;
    }

    .btn-login {
      background: transparent;
      border: 1px solid #40c9c6;
      color: #40c9c6;

      &:hover {
        background: rgba(64, 201, 198, 0.1);
        border-color: #66d9d6;
        color: #66d9d6;
      }
    }

    .btn-register {
      background: #40c9c6;
      border: 1px solid #40c9c6;
      color: #fff;

      &:hover {
        background: #66d9d6;
        border-color: #66d9d6;
      }
    }
  }
}

section {
  min-height: 100vh;
  padding: 80px 50px;
  opacity: 0;
  transform: translateY(50px);
  transition: all 1s ease;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  scroll-margin-top: 60px; // 为导航栏留出空间

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }

  h2 {
    text-align: center;
    font-size: 36px;
    margin-bottom: 50px;
    color: #fff;
  }
}

.banner {
  height: 100vh;
  padding-top: 60px;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  background: linear-gradient(135deg, #1a1a1a 0%, #0a192f 100%);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 20%, rgba(64, 201, 198, 0.05) 0%, transparent 25%),
      radial-gradient(circle at 80% 80%, rgba(64, 201, 198, 0.05) 0%, transparent 25%);
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2340c9c6' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
    opacity: 0.5;
    pointer-events: none;
  }

  .banner-content {
    max-width: 800px;
    position: relative;
    z-index: 1;

    h1 {
      font-size: 48px;
      color: #fff;
      margin-bottom: 20px;
      text-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }

    p {
      font-size: 20px;
      color: #fff;
      margin-bottom: 30px;
      text-shadow: 0 1px 2px rgba(0,0,0,0.2);
    }

    .btn-start {
      padding: 12px 30px;
      font-size: 18px;
      background: #40c9c6;
      border: none;
      border-radius: 5px;
      color: #fff;
      cursor: pointer;
      transition: all 0.3s;
      position: relative;
      overflow: hidden;

      &:hover {
        background: #66d9d6;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(64, 201, 198, 0.3);
      }

      &:active {
        transform: translateY(0);
      }

      &::after {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: linear-gradient(
          45deg,
          transparent,
          rgba(255, 255, 255, 0.1),
          transparent
        );
        transform: rotate(45deg);
        transition: all 0.3s;
      }

      &:hover::after {
        left: 100%;
      }
    }
  }
}

.features {
  background: rgba(26, 26, 26, 0.95);
  min-height: 100vh;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 100px 50px;

  .feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto;

    .feature-card {
      background: #2a2a2a;
      padding: 30px;
      border-radius: 10px;
      text-align: center;
      transition: transform 0.3s;

      &:hover {
        transform: translateY(-10px);
      }

      i {
        font-size: 40px;
        color: #409EFF;
        margin-bottom: 20px;
      }

      h3 {
        color: #fff;
        margin-bottom: 15px;
      }

      p {
        color: #999;
      }
    }
  }
}

.about-us {
  background: rgba(42, 42, 42, 0.95);
  min-height: 100vh;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 120px 50px;

  h2 {
    font-size: 42px;
    margin-bottom: 80px;
    color: #fff;
    text-align: center;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -20px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 4px;
      background: #40c9c6;
      border-radius: 2px;
    }
  }

  .about-content {
    max-width: 1200px;
    margin: 0 auto;

    .about-text {
      text-align: center;
      color: #fff;
      margin-bottom: 80px;
      
      p {
        font-size: 18px;
        line-height: 1.8;
        max-width: 800px;
        margin: 0 auto 60px;
      }
    }

    .advantages {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 40px;
      padding: 0 20px;

      .advantage-item {
        background: rgba(26, 26, 26, 0.7);
        padding: 40px;
        border-radius: 16px;
        text-align: center;
        transition: all 0.3s ease;
        border: 1px solid rgba(64, 201, 198, 0.1);
        
        &:hover {
          transform: translateY(-10px);
          border-color: rgba(64, 201, 198, 0.3);
          box-shadow: 0 10px 30px rgba(64, 201, 198, 0.1);
        }

        h4 {
          color: #40c9c6;
          font-size: 24px;
          margin-bottom: 25px;
          position: relative;
          display: inline-block;
          
          &::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, transparent, #40c9c6, transparent);
          }
        }

        p {
          color: #bbb;
          font-size: 16px;
          line-height: 1.8;
          margin: 0;
        }
      }
    }
  }
}

.contact {
  background: rgba(26, 26, 26, 0.95);
  min-height: 100vh;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 100px 50px;

  .contact-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
    max-width: 1000px;
    margin: 0 auto;

    .contact-card {
      background: #2a2a2a;
      padding: 30px;
      border-radius: 10px;
      text-align: center;

      i {
        font-size: 40px;
        color: #409EFF;
        margin-bottom: 20px;
      }

      h3 {
        color: #fff;
        margin-bottom: 15px;
      }

      p {
        color: #999;
      }
    }
  }
}

.cases {
  background: rgba(26, 26, 26, 0.95);
  min-height: 100vh;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 120px 50px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 10% 10%, rgba(64, 201, 198, 0.03) 0%, transparent 30%),
      radial-gradient(circle at 90% 90%, rgba(64, 201, 198, 0.03) 0%, transparent 30%);
    pointer-events: none;
  }

  h2 {
    font-size: 42px;
    margin-bottom: 20px;
    color: #fff;
    text-align: center;
    position: relative;
  }

  .section-desc {
    text-align: center;
    color: #bbb;
    font-size: 18px;
    margin-bottom: 60px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
}

.footer {
  background: #0a0a0a;
  padding: 30px 50px;

  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;

    .footer-info {
      color: #666;
    }

    .social-links {
      display: flex;
      gap: 20px;

      .social-link {
        color: #666;
        font-size: 20px;
        transition: color 0.3s;

        &:hover {
          color: #409EFF;
        }
      }
    }
  }
}

html {
  scroll-behavior: smooth;
  height: 100%;
}

body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}

#app {
  height: 100%;
}

// 添加滚动条样式
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

::-webkit-scrollbar-thumb {
  background: rgba(64, 201, 198, 0.3);
  border-radius: 4px;
  
  &:hover {
    background: rgba(64, 201, 198, 0.5);
  }
}

@media (max-width: 768px) {
  .nav-bar {
    padding: 0 20px;

    .nav-links {
      display: none;
    }
  }

  section {
    padding: 60px 20px;
    min-height: 100vh;
  }

  .banner {
    height: 100vh;
    margin-top: 60px;
  }

  .banner .banner-content {
    h1 {
      font-size: 36px;
    }

    p {
      font-size: 18px;
    }
  }

  .footer .footer-content {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }

  .about-us {
    padding: 80px 20px;

    h2 {
      font-size: 32px;
      margin-bottom: 60px;
    }

    .about-content {
      .about-text {
        margin-bottom: 60px;
        
        p {
          font-size: 16px;
          margin-bottom: 40px;
        }
      }

      .advantages {
        grid-template-columns: 1fr;
        gap: 30px;
        
        .advantage-item {
          padding: 30px;
          
          h4 {
            font-size: 20px;
            margin-bottom: 20px;
          }
          
          p {
            font-size: 15px;
          }
        }
      }
    }
  }

  .cases {
    padding: 80px 20px;

    h2 {
      font-size: 32px;
      margin-bottom: 15px;
    }

    .section-desc {
      font-size: 16px;
      margin-bottom: 40px;
    }
  }
}
</style> 