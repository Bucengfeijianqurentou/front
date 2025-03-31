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

    <!-- Banner区域增强 -->
    <section id="home" class="banner">
      <div class="blockchain-particles"></div>
      <div class="banner-content">
        <h1>区块链资产管理平台</h1>
        <p>安全、高效、透明的区块链资产管理解决方案</p>
        <div class="banner-stats">
          <div class="stat-item">
            <span class="stat-number">100+</span>
            <span class="stat-label">企业客户</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">￥10B+</span>
            <span class="stat-label">资产管理规模</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">99.99%</span>
            <span class="stat-label">系统可用性</span>
          </div>
        </div>
        <button class="btn-start" @click="handleStart">开始使用</button>
      </div>
    </section>

    <!-- 功能介绍 -->
    <section id="features" class="features">
      <h2>核心功能</h2>
      <div class="feature-grid">
        <div class="feature-card" v-for="(feature, index) in features" :key="index" :class="{ 'visible': true }">
          <div class="feature-icon">
            <i :class="feature.icon"></i>
          </div>
          <div class="feature-content">
            <h3>{{ feature.title }}</h3>
            <p class="feature-desc">{{ feature.description }}</p>
            <ul class="feature-list">
              <li v-for="(item, itemIndex) in feature.details" :key="itemIndex">
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- 新增：技术优势 -->
    <section id="technology" class="technology">
      <h2>技术优势</h2>
      <div class="tech-grid">
        <div class="tech-item">
          <div class="tech-icon">
            <i class="el-icon-cpu"></i>
          </div>
          <h3>高性能架构</h3>
          <p>支持每秒千万级交易处理</p>
          <div class="tech-progress">
            <div class="progress-bar" style="width: 90%"></div>
          </div>
        </div>
        <div class="tech-item">
          <div class="tech-icon">
            <i class="el-icon-lock"></i>
          </div>
          <h3>多重安全保障</h3>
          <p>军工级加密技术</p>
          <div class="tech-progress">
            <div class="progress-bar" style="width: 95%"></div>
          </div>
        </div>
        <div class="tech-item">
          <div class="tech-icon">
            <i class="el-icon-connection"></i>
          </div>
          <h3>共识机制</h3>
          <p>创新的DPOS共识算法</p>
          <div class="tech-progress">
            <div class="progress-bar" style="width: 85%"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- 新增：实时数据 -->
    <section id="live-data" class="live-data">
      <h2>实时数据</h2>
      <div class="data-grid">
        <div class="data-card">
          <h3>当前链上交易</h3>
          <div class="data-value">{{transactionCount}}</div>
          <div class="data-chart">
            <!-- 这里可以添加echarts图表 -->
          </div>
        </div>
        <div class="data-card">
          <h3>活跃用户数</h3>
          <div class="data-value">{{activeUsers}}</div>
          <div class="data-chart">
            <!-- 这里可以添加echarts图表 -->
          </div>
        </div>
        <div class="data-card">
          <h3>系统性能</h3>
          <div class="data-value">{{systemPerformance}}ms</div>
          <div class="data-chart">
            <!-- 这里可以添加echarts图表 -->
          </div>
        </div>
      </div>
    </section>

    <!-- 新增：合作伙伴 -->
    <section id="partners" class="partners">
      <h2>合作伙伴</h2>
      <div class="partner-scroll">
        <div class="partner-grid">
          <div class="partner-logo" v-for="i in 8" :key="i">
            <div class="logo-placeholder">Partner {{i}}</div>
          </div>
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
          description: '安全可靠的区块链资产托管服务',
          details: [
            '多重签名钱包管理',
            '冷热钱包分离存储',
            '多层级权限控制',
            '24/7资产安全监控'
          ]
        },
        {
          icon: 'el-icon-monitor',
          title: '实时监控',
          description: '全天候监控资产状态和交易情况',
          details: [
            '实时资产估值分析',
            '交易流水实时追踪',
            '异常行为预警',
            '自动化风险控制'
          ]
        },
        {
          icon: 'el-icon-document',
          title: '智能合约',
          description: '自动化执行交易和管理流程',
          details: [
            '自定义合约模板',
            '智能合约审计',
            '自动化交易执行',
            '合约性能优化'
          ]
        },
        {
          icon: 'el-icon-data-line',
          title: '数据分析',
          description: '专业的数据分析和可视化报表',
          details: [
            '多维度数据分析',
            '自定义报表生成',
            '趋势预测分析',
            '决策支持系统'
          ]
        },
        {
          icon: 'el-icon-refresh',
          title: '资产追溯',
          description: '区块链技术保障资产全程可追溯',
          details: [
            '资产来源验证',
            '交易历史追踪',
            '资产流转记录',
            '全链路追溯查询'
          ]
        },
        {
          icon: 'el-icon-user',
          title: '权限管理',
          description: '灵活的多级权限管理系统',
          details: [
            '角色权限配置',
            '操作权限分级',
            '审批流程管理',
            '访问控制策略'
          ]
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
      ],
      transactionCount: '1,234,567',
      activeUsers: '45,678',
      systemPerformance: '0.023',
      updateTimer: null
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
    },
    initBlockchainParticles() {
      // 初始化区块链粒子动画
      const particles = document.querySelector('.blockchain-particles');
      // 这里可以添加粒子动画逻辑
    },
    startDataUpdate() {
      // 模拟实时数据更新
      this.updateTimer = setInterval(() => {
        this.transactionCount = (parseInt(this.transactionCount.replace(/,/g, '')) + Math.floor(Math.random() * 100)).toLocaleString();
        this.activeUsers = (parseInt(this.activeUsers.replace(/,/g, '')) + Math.floor(Math.random() * 10)).toLocaleString();
        this.systemPerformance = (Math.random() * 0.01 + 0.02).toFixed(3);
      }, 3000);
    }
  },
  mounted() {
    // 监听滚动事件
    document.querySelector('.home-page').addEventListener('scroll', this.handleScroll)
    // 初始化第一屏
    document.querySelector('#home').classList.add('visible')
    this.initBlockchainParticles();
    this.startDataUpdate();
  },
  beforeDestroy() {
    // 移除滚动监听
    document.querySelector('.home-page').removeEventListener('scroll', this.handleScroll)
    if (this.updateTimer) {
      clearInterval(this.updateTimer);
    }
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
  background: rgba(10, 25, 47, 0.95);
  backdrop-filter: blur(10px);
  z-index: 1000;
  border-bottom: 1px solid rgba(64, 201, 198, 0.1);
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, 
      transparent,
      rgba(64, 201, 198, 0.2),
      rgba(147, 51, 234, 0.2),
      transparent
    );
  }

  .logo {
    font-size: 24px;
    font-weight: bold;
    background: linear-gradient(120deg, #40c9c6, #9333ea);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: flex;
    align-items: center;
    gap: 10px;
    position: relative;
    
    &::before {
      content: '⬡';
      font-size: 28px;
      background: linear-gradient(120deg, #40c9c6, #9333ea);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: rotateLogo 6s linear infinite;
    }
  }

  .nav-links {
    display: flex;
    gap: 30px;

    .nav-link {
      color: #fff;
      text-decoration: none;
      font-size: 16px;
      transition: all 0.3s;
      position: relative;
      padding: 5px 0;

      &::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background: linear-gradient(90deg, #40c9c6, #9333ea);
        transform: scaleX(0);
        transform-origin: right;
        transition: transform 0.3s ease;
      }

      &:hover {
        color: #40c9c6;
        text-shadow: 0 0 10px rgba(64, 201, 198, 0.3);

        &::before {
          transform: scaleX(1);
          transform-origin: left;
        }
      }

      &.active {
        color: #40c9c6;
        
        &::before {
          transform: scaleX(1);
        }
      }
    }
  }

  .auth-buttons {
    display: flex;
    align-items: center;
    gap: 15px;
    height: 36px;

    button {
      all: unset;
      height: 36px;
      min-width: 90px;
      padding: 0 20px;
      border-radius: 18px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
    }

    .btn-login {
      border: 1px solid #40c9c6;
      color: #40c9c6;
      background: transparent;
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          120deg,
          transparent,
          rgba(64, 201, 198, 0.2),
          transparent
        );
        transition: 0.5s;
      }

      &:hover {
        border-color: #9333ea;
        color: #9333ea;
        box-shadow: 0 0 15px rgba(64, 201, 198, 0.2);

        &::before {
          left: 100%;
        }
      }
    }

    .btn-register {
      background: linear-gradient(45deg, #40c9c6, #9333ea);
      color: #fff;
      border: none;
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          120deg,
          transparent,
          rgba(255, 255, 255, 0.2),
          transparent
        );
        transition: 0.5s;
      }

      &:hover {
        transform: translateY(-2px);
        box-shadow: 
          0 5px 15px rgba(64, 201, 198, 0.3),
          0 0 30px rgba(147, 51, 234, 0.2);

        &::before {
          left: 100%;
        }
      }

      &:active {
        transform: translateY(0);
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
  background: linear-gradient(135deg, #0a192f 0%, #0d1b2a 100%);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 20%, rgba(64, 201, 198, 0.1) 0%, transparent 25%),
      radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.1) 0%, transparent 25%);
    pointer-events: none;
    animation: glowPulse 8s infinite alternate;
  }

  .blockchain-particles {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    opacity: 0.6;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        linear-gradient(45deg, transparent 45%, rgba(64, 201, 198, 0.1) 50%, transparent 55%),
        linear-gradient(-45deg, transparent 45%, rgba(147, 51, 234, 0.1) 50%, transparent 55%);
      background-size: 30px 30px;
      animation: particleMove 20s infinite linear;
    }
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%2340c9c6' stroke-width='0.5' stroke-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
      animation: particleMove 15s infinite linear reverse;
    }
  }

  .banner-content {
    max-width: 800px;
    position: relative;
    z-index: 1;
    padding: 0 20px;

    h1 {
      font-size: 48px;
      background: linear-gradient(120deg, #40c9c6, #9333ea);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 20px;
      text-shadow: 0 0 30px rgba(64, 201, 198, 0.3);
      animation: titleGlow 2s ease-in-out infinite alternate;
    }

    p {
      font-size: 20px;
      color: #fff;
      margin-bottom: 30px;
      text-shadow: 0 0 20px rgba(64, 201, 198, 0.2);
      opacity: 0;
      animation: fadeInUp 1s ease forwards 0.5s;
    }

    .banner-stats {
      display: flex;
      justify-content: center;
      gap: 40px;
      margin: 30px 0;
      opacity: 0;
      animation: fadeInUp 1s ease forwards 1s;

      .stat-item {
        text-align: center;
        
        .stat-number {
          display: block;
          font-size: 36px;
          font-weight: bold;
          background: linear-gradient(120deg, #40c9c6, #9333ea);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 8px;
          position: relative;
          
          &::after {
            content: '';
            position: absolute;
            bottom: -4px;
            left: 50%;
            transform: translateX(-50%);
            width: 30px;
            height: 2px;
            background: linear-gradient(90deg, #40c9c6, #9333ea);
            border-radius: 1px;
          }
        }

        .stat-label {
          font-size: 16px;
          color: #fff;
          opacity: 0.8;
        }
      }
    }

    .btn-start {
      padding: 15px 40px;
      font-size: 18px;
      background: linear-gradient(45deg, #40c9c6, #9333ea);
      border: none;
      border-radius: 4px;
      color: #fff;
      cursor: pointer;
      transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
      position: relative;
      overflow: hidden;
      opacity: 0;
      animation: fadeInUp 1s ease forwards 1.5s;
      box-shadow: 0 4px 15px rgba(64, 201, 198, 0.2);
      letter-spacing: 1px;
      font-weight: 500;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          120deg,
          transparent,
          rgba(255, 255, 255, 0.3),
          transparent
        );
        transition: 0.6s ease;
      }

      &:hover {
        transform: translateY(-3px) scale(1.02);
        box-shadow: 
          0 8px 25px rgba(64, 201, 198, 0.4),
          0 4px 15px rgba(147, 51, 234, 0.3);
        background: linear-gradient(45deg, #9333ea, #40c9c6);
        letter-spacing: 2px;

        &::before {
          left: 100%;
        }
      }

      &:active {
        transform: translateY(1px) scale(0.98);
        box-shadow: 
          0 2px 10px rgba(64, 201, 198, 0.2),
          0 1px 5px rgba(147, 51, 234, 0.1);
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
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 40px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;

    .feature-card {
      background: rgba(26, 26, 26, 0.7);
      border-radius: 16px;
      padding: 30px;
      transition: all 0.4s ease;
      border: 1px solid rgba(64, 201, 198, 0.1);
      position: relative;
      overflow: hidden;

      &:hover {
        transform: translateY(-10px);
        border-color: rgba(64, 201, 198, 0.3);
        box-shadow: 0 10px 30px rgba(64, 201, 198, 0.1);

        .feature-icon i {
          transform: scale(1.1) rotate(10deg);
          color: #40c9c6;
        }
      }

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(64, 201, 198, 0.1), transparent);
        opacity: 0;
        transition: opacity 0.4s ease;
      }

      &:hover::before {
        opacity: 1;
      }

      .feature-icon {
        margin-bottom: 20px;
        
        i {
          font-size: 48px;
          color: #40c9c6;
          transition: all 0.4s ease;
        }
      }

      .feature-content {
        h3 {
          color: #fff;
          font-size: 24px;
          margin-bottom: 15px;
          position: relative;
          padding-bottom: 15px;

          &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 40px;
            height: 3px;
            background: #40c9c6;
            border-radius: 2px;
          }
        }

        .feature-desc {
          color: #bbb;
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .feature-list {
          list-style: none;
          padding: 0;
          margin: 0;

          li {
            color: #999;
            font-size: 14px;
            margin-bottom: 10px;
            padding-left: 20px;
            position: relative;

            &::before {
              content: '•';
              color: #40c9c6;
              position: absolute;
              left: 0;
              font-size: 18px;
              line-height: 1;
            }

            &:hover {
              color: #40c9c6;
              transform: translateX(5px);
              transition: all 0.3s ease;
            }
          }
        }
      }
    }
  }
}

.technology {
  background: rgba(26, 26, 26, 0.95);
  padding: 100px 50px;

  .tech-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto;

    .tech-item {
      background: rgba(38, 38, 38, 0.7);
      padding: 30px;
      border-radius: 16px;
      text-align: center;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-10px);

        .tech-progress .progress-bar {
          width: 100% !important;
        }
      }

      .tech-icon {
        font-size: 48px;
        color: #40c9c6;
        margin-bottom: 20px;
      }

      h3 {
        color: #fff;
        margin-bottom: 10px;
      }

      p {
        color: #bbb;
        margin-bottom: 20px;
      }

      .tech-progress {
        height: 4px;
        background: rgba(255,255,255,0.1);
        border-radius: 2px;
        overflow: hidden;

        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #40c9c6, #66d9d6);
          transition: width 1.5s ease;
        }
      }
    }
  }
}

.live-data {
  background: rgba(26, 26, 26, 0.95);
  padding: 100px 50px;

  .data-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto;

    .data-card {
      background: rgba(38, 38, 38, 0.7);
      padding: 30px;
      border-radius: 16px;
      text-align: center;

      h3 {
        color: #fff;
        margin-bottom: 15px;
      }

      .data-value {
        font-size: 36px;
        color: #40c9c6;
        margin-bottom: 20px;
      }

      .data-chart {
        height: 150px;
        // 这里可以添加图表样式
      }
    }
  }
}

.partners {
  background: rgba(26, 26, 26, 0.95);
  padding: 100px 50px;

  .partner-scroll {
    overflow: hidden;
    position: relative;
    
    &::before, &::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100px;
      z-index: 1;
      pointer-events: none;
    }

    &::before {
      left: 0;
      background: linear-gradient(90deg, rgba(26,26,26,0.95), transparent);
    }

    &::after {
      right: 0;
      background: linear-gradient(-90deg, rgba(26,26,26,0.95), transparent);
    }
  }

  .partner-grid {
    display: flex;
    gap: 30px;
    padding: 20px 0;
    animation: scrollPartners 30s linear infinite;

    .partner-logo {
      flex: 0 0 200px;
      height: 100px;
      background: rgba(38, 38, 38, 0.7);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      .logo-placeholder {
        color: #666;
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

  .features {
    padding: 60px 20px;

    .feature-grid {
      grid-template-columns: 1fr;
      gap: 30px;

      .feature-card {
        padding: 25px;

        .feature-icon i {
          font-size: 36px;
        }

        .feature-content {
          h3 {
            font-size: 20px;
          }

          .feature-desc {
            font-size: 14px;
          }

          .feature-list li {
            font-size: 13px;
          }
        }
      }
    }
  }

  .banner-stats {
    flex-direction: column;
    gap: 20px;
  }

  .tech-grid, .data-grid {
    grid-template-columns: 1fr;
  }

  .partner-scroll {
    &::before, &::after {
      width: 50px;
    }
  }
}

@keyframes glowPulse {
  0% {
    opacity: 0.5;
    transform: scale(1);
  }
  100% {
    opacity: 0.8;
    transform: scale(1.1);
  }
}

@keyframes particleMove {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100% 100%;
  }
}

@keyframes scrollPartners {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

@keyframes titleGlow {
  0% {
    text-shadow: 0 0 20px rgba(64, 201, 198, 0.3);
  }
  100% {
    text-shadow: 0 0 30px rgba(147, 51, 234, 0.5);
  }
}

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

@keyframes rotateLogo {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style> 