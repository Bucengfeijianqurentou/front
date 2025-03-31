<template>
  <div class="home-page">
    <!-- 导航栏 -->
    <nav class="nav-bar">
      <div class="logo">BlockAsset</div>
      <div class="nav-links">
        <a href="#home" class="nav-link">首页</a>
        <a href="#features" class="nav-link">核心功能</a>
        <a href="#technology" class="nav-link">技术优势</a>
        <a href="#live-data" class="nav-link">实时数据</a>
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
        <div class="tech-item">
          <div class="tech-icon">
            <i class="el-icon-data-analysis"></i>
          </div>
          <h3>智能分析</h3>
          <p>AI驱动的资产分析引擎</p>
          <div class="tech-progress">
            <div class="progress-bar" style="width: 88%"></div>
          </div>
        </div>
        <div class="tech-item">
          <div class="tech-icon">
            <i class="el-icon-refresh"></i>
          </div>
          <h3>高可用性</h3>
          <p>99.99%系统可用率</p>
          <div class="tech-progress">
            <div class="progress-bar" style="width: 92%"></div>
          </div>
        </div>
        <div class="tech-item">
          <div class="tech-icon">
            <i class="el-icon-monitor"></i>
          </div>
          <h3>实时监控</h3>
          <p>全链路追踪与监控</p>
          <div class="tech-progress">
            <div class="progress-bar" style="width: 87%"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- 实时数据部分的更新 -->
    <section id="live-data" class="live-data">
      <h2>实时数据</h2>
      <div class="data-overview">
        <div class="data-column left-column">
          <div class="data-row highlight">
            <div class="data-label">
              <i class="el-icon-money"></i>
              <span>总资产规模</span>
            </div>
            <div class="data-number">¥ 128.5B</div>
            <div class="data-trend positive">
              <i class="el-icon-top"></i>
              <span>+2.5%</span>
            </div>
            <div class="data-description">
              <p>平台管理的总资产规模持续增长</p>
              <div class="trend-chart">
                <!-- 这里可以添加一个简单的趋势图 -->
                <div class="chart-bar" style="height: 20%"></div>
                <div class="chart-bar" style="height: 40%"></div>
                <div class="chart-bar" style="height: 30%"></div>
                <div class="chart-bar" style="height: 60%"></div>
                <div class="chart-bar" style="height: 50%"></div>
              </div>
            </div>
          </div>
          <div class="data-row">
            <div class="data-label">
              <i class="el-icon-document"></i>
              <span>智能合约数量</span>
            </div>
            <div class="data-number">25,431</div>
            <div class="data-trend positive">
              <i class="el-icon-top"></i>
              <span>+156</span>
            </div>
            <div class="data-description">
              <p>已部署的智能合约总数</p>
              <div class="contract-types">
                <span>DeFi合约: 12,345</span>
                <span>资产管理: 8,642</span>
                <span>其他: 4,444</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="data-column center-column">
          <div class="chain-status">
            <div class="status-ring">
              <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" class="ring-bg"/>
                <circle cx="50" cy="50" r="45" class="ring-progress" :style="{ 'stroke-dashoffset': 283 * (1 - 0.9986) }"/>
              </svg>
              <div class="status-content">
                <div class="status-number">99.86%</div>
                <div class="status-label">链上运行状态</div>
              </div>
            </div>
            <div class="current-stats">
              <div class="stat-item">
                <div class="stat-value">{{transactionCount}}</div>
                <div class="stat-label">当前链上交易</div>
                <div class="stat-detail">每秒处理约 3,000+ 笔交易</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">{{systemPerformance}}ms</div>
                <div class="stat-label">系统响应时间</div>
                <div class="stat-detail">全球平均网络延迟</div>
              </div>
            </div>
            <div class="network-stats">
              <div class="network-item">
                <span class="label">节点数量</span>
                <span class="value">1,234</span>
              </div>
              <div class="network-item">
                <span class="label">网络带宽</span>
                <span class="value">10 Gbps</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="data-column right-column">
          <div class="data-row">
            <div class="data-label">
              <i class="el-icon-user"></i>
              <span>活跃用户数</span>
            </div>
            <div class="data-number">{{activeUsers}}</div>
            <div class="data-trend positive">
              <i class="el-icon-top"></i>
              <span>+12.3%</span>
            </div>
            <div class="data-description">
              <p>近24小时活跃用户统计</p>
              <div class="user-distribution">
                <div class="dist-item">
                  <span class="label">个人用户</span>
                  <span class="value">65%</span>
                </div>
                <div class="dist-item">
                  <span class="label">企业用户</span>
                  <span class="value">35%</span>
                </div>
              </div>
            </div>
          </div>
          <div class="data-row">
            <div class="data-label">
              <i class="el-icon-time"></i>
              <span>平均确认时间</span>
            </div>
            <div class="data-number">1.2s</div>
            <div class="data-trend negative">
              <i class="el-icon-bottom"></i>
              <span>-0.3s</span>
            </div>
            <div class="data-description">
              <p>交易确认效率持续提升</p>
              <div class="performance-metrics">
                <div class="metric">
                  <span class="label">最快确认</span>
                  <span class="value">0.8s</span>
                </div>
                <div class="metric">
                  <span class="label">最慢确认</span>
                  <span class="value">2.1s</span>
                </div>
              </div>
            </div>
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
      <div class="carousel-container">
        <div class="carousel">
          <div 
            v-for="(slide, index) in caseSlides" 
            :key="index"
            class="case-card"
            :data-active="currentSlide === index"
          >
            <img :src="slide.image" :alt="slide.title">
            <div class="case-content">
              <h3>{{ slide.title }}</h3>
              <p>{{ slide.description }}</p>
            </div>
          </div>
        </div>
        <button class="carousel-btn prev" @click="prevSlide">&lt;</button>
        <button class="carousel-btn next" @click="nextSlide">&gt;</button>
        <div class="carousel-indicators">
          <span 
            v-for="(_, index) in caseSlides" 
            :key="'indicator-' + index"
            class="indicator"
            :class="{ active: currentSlide === index }"
            @click="goToSlide(index)"
          ></span>
        </div>
      </div>
    </section>

    <!-- 关于我们 -->
    <section id="about" class="about-us">
      <h2>关于我们</h2>
      <div class="about-content">
        <div class="about-grid">
          <!-- 公司简介 -->
          <div class="about-card company-intro">
            <div class="card-icon">
              <i class="el-icon-office-building"></i>
            </div>
            <h3>公司简介</h3>
            <p>BlockAsset 成立于2023年，是一家专注于区块链资产管理的科技公司。我们致力于为企业和个人提供安全、透明、高效的区块链资产管理服务。通过持续创新和技术突破，我们已成为行业领先的区块链资产管理平台。</p>
          </div>

          <!-- 发展历程 -->
          <div class="about-card timeline">
            <div class="card-icon">
              <i class="el-icon-time"></i>
            </div>
            <h3>发展历程</h3>
            <div class="timeline-items">
              <div class="timeline-item">
                <span class="time">2023.01</span>
                <span class="event">公司成立</span>
              </div>
              <div class="timeline-item">
                <span class="time">2023.06</span>
                <span class="event">获得A轮融资</span>
              </div>
              <div class="timeline-item">
                <span class="time">2023.09</span>
                <span class="event">平台正式上线</span>
              </div>
              <div class="timeline-item">
                <span class="time">2024.03</span>
                <span class="event">用户规模突破10万</span>
              </div>
            </div>
          </div>

          <!-- 核心价值观 -->
          <div class="about-card values">
            <div class="card-icon">
              <i class="el-icon-star-on"></i>
            </div>
            <h3>核心价值观</h3>
            <div class="values-grid">
              <div class="value-item">
                <i class="el-icon-lock"></i>
                <h4>安全至上</h4>
                <p>以最高标准保障用户资产安全</p>
              </div>
              <div class="value-item">
                <i class="el-icon-view"></i>
                <h4>开放透明</h4>
                <p>区块链技术确保信息公开透明</p>
              </div>
              <div class="value-item">
                <i class="el-icon-magic-stick"></i>
                <h4>持续创新</h4>
                <p>不断探索技术前沿与应用创新</p>
              </div>
              <div class="value-item">
                <i class="el-icon-user"></i>
                <h4>用户至上</h4>
                <p>始终以用户需求为核心</p>
              </div>
            </div>
          </div>

          <!-- 团队介绍 -->
          <div class="about-card team">
            <div class="card-icon">
              <i class="el-icon-user"></i>
            </div>
            <h3>核心团队</h3>
            <div class="team-stats">
              <div class="stat-item">
                <span class="number">50+</span>
                <span class="label">技术专家</span>
              </div>
              <div class="stat-item">
                <span class="number">10+</span>
                <span class="label">博士</span>
              </div>
              <div class="stat-item">
                <span class="number">20+</span>
                <span class="label">专利</span>
              </div>
            </div>
            <p class="team-desc">我们的团队来自国内外顶尖高校和知名企业，拥有丰富的区块链技术和金融领域经验。</p>
          </div>

          <!-- 资质认证 -->
          <div class="about-card certifications">
            <div class="card-icon">
              <i class="el-icon-medal"></i>
            </div>
            <h3>资质认证</h3>
            <div class="cert-grid">
              <div class="cert-item">
                <i class="el-icon-document-checked"></i>
                <span>ISO27001信息安全认证</span>
              </div>
              <div class="cert-item">
                <i class="el-icon-document-checked"></i>
                <span>国家高新技术企业</span>
              </div>
              <div class="cert-item">
                <i class="el-icon-document-checked"></i>
                <span>区块链服务网络认证</span>
              </div>
              <div class="cert-item">
                <i class="el-icon-document-checked"></i>
                <span>金融科技创新奖</span>
              </div>
            </div>
          </div>

          <!-- 社会责任 -->
          <div class="about-card responsibility">
            <div class="card-icon">
              <i class="el-icon-coordinate"></i>
            </div>
            <h3>社会责任</h3>
            <div class="responsibility-content">
              <p>我们积极承担社会责任，致力于：</p>
              <ul>
                <li>推动区块链技术在公益领域的应用</li>
                <li>支持开源社区发展</li>
                <li>参与区块链教育普及</li>
                <li>践行绿色环保理念</li>
              </ul>
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

    <!-- 修改实时交易动态展示部分 -->
    <div class="floating-transactions">
      <transition-group name="slide" tag="div" class="transaction-list">
        <div v-for="tx in visibleTransactions" 
             :key="tx.id"
             class="transaction-item"
             :class="{ 'slide-up': tx.isNew }">
          <i class="el-icon-connection"></i>
          <span class="hash">{{ tx.hash }}</span>
          <span class="status" :class="tx.status">{{ tx.statusText }}</span>
        </div>
      </transition-group>
    </div>
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
      updateTimer: null,
      currentSlide: 0,
      transactions: [], // 存储所有交易
      maxVisibleTransactions: 5, // 最大显示数量
      transactionCounter: 0, // 用于生成唯一ID
      mockTransactions: [
        {
          hash: '0x7d12f8d3b54c82d9c882817a87c926c2',
          time: '2024-03-15 10:30:22',
          status: 'success',
          statusText: '已确认',
          isNew: false
        },
        {
          hash: '0x9e45a2c1f8b7d6e3a4c5b2d1e9f8c7b6',
          time: '2024-03-15 10:29:15',
          status: 'pending',
          statusText: '确认中',
          isNew: false
        }
      ],
      currentTransaction: {
        hash: '',
        status: 'success',
        statusText: '已确认',
        isNew: false
      }
    }
  },
  computed: {
    visibleTransactions() {
      // 只显示最新的几条交易
      return this.transactions.slice(-this.maxVisibleTransactions);
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
    },
    prevSlide() {
      this.currentSlide = this.currentSlide > 0 ? this.currentSlide - 1 : this.caseSlides.length - 1;
    },
    nextSlide() {
      this.currentSlide = this.currentSlide < this.caseSlides.length - 1 ? this.currentSlide + 1 : 0;
    },
    goToSlide(index) {
      this.currentSlide = index;
    },
    startAutoSlide() {
      setInterval(() => {
        this.nextSlide();
      }, 5000);
    },
    // 修改生成交易数据的方法
    generateMockTransaction() {
      this.transactionCounter++;
      const hash = '0x' + Math.random().toString(16).substr(2, 40);
      const status = Math.random() > 0.3 ? 'success' : 'pending';
      
      return {
        id: this.transactionCounter, // 添加唯一ID
        hash,
        status,
        statusText: status === 'success' ? '已确认' : '确认中',
        isNew: true
      };
    },
    
    // 更新交易列表
    updateTransactions() {
      const newTx = this.generateMockTransaction();
      this.transactions.push(newTx);
      
      // 3秒后移除新交易的动画效果
      setTimeout(() => {
        const index = this.transactions.findIndex(tx => tx.id === newTx.id);
        if (index !== -1) {
          this.transactions[index].isNew = false;
        }
      }, 3000);
      
      // 如果超过最大显示数量的2倍，删除旧的交易记录以节省内存
      if (this.transactions.length > this.maxVisibleTransactions * 2) {
        this.transactions = this.transactions.slice(-this.maxVisibleTransactions * 2);
      }
    },
    
    // 初始化交易更新
    initTransactions() {
      // 立即添加第一条交易
      this.updateTransactions();
      
      // 每隔几秒添加一条新交易
      setInterval(() => {
        this.updateTransactions();
      }, 5000);
    }
  },
  mounted() {
    // 监听滚动事件
    document.querySelector('.home-page').addEventListener('scroll', this.handleScroll)
    // 初始化第一屏
    document.querySelector('#home').classList.add('visible')
    this.initBlockchainParticles();
    this.startDataUpdate();
    this.startAutoSlide();
    this.initTransactions();
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
  padding: 80px 50px;

  .feature-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px;

    .feature-card {
      background: rgba(26, 26, 26, 0.7);
      border-radius: 12px;
      padding: 25px;
      transition: all 0.4s ease;
      border: 1px solid rgba(64, 201, 198, 0.1);
      position: relative;
      overflow: hidden;
      height: 100%;
      display: flex;
      flex-direction: column;

      &:hover {
        transform: translateY(-5px);
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
        margin-bottom: 15px;
        
        i {
          font-size: 36px;
          color: #40c9c6;
          transition: all 0.4s ease;
        }
      }

      .feature-content {
        flex: 1;
        display: flex;
        flex-direction: column;

        h3 {
          color: #fff;
          font-size: 20px;
          margin-bottom: 10px;
          position: relative;
          padding-bottom: 10px;

          &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 30px;
            height: 2px;
            background: #40c9c6;
            border-radius: 2px;
          }
        }

        .feature-desc {
          color: #bbb;
          font-size: 14px;
          line-height: 1.5;
          margin-bottom: 15px;
        }

        .feature-list {
          list-style: none;
          padding: 0;
          margin: 0;

          li {
            color: #999;
            font-size: 13px;
            margin-bottom: 8px;
            padding-left: 16px;
            position: relative;

            &::before {
              content: '•';
              color: #40c9c6;
              position: absolute;
              left: 0;
              font-size: 16px;
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
  margin-top: -50px; // 减少与核心功能的间距

  h2 {
    text-align: center;
    font-size: 36px;
    margin-bottom: 50px;
    color: #fff;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -15px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 3px;
      background: linear-gradient(90deg, #40c9c6, #9333ea);
      border-radius: 2px;
    }
  }

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
      transition: all 0.4s ease;
      border: 1px solid rgba(64, 201, 198, 0.1);
      
      &:hover {
        transform: translateY(-10px);
        border-color: rgba(64, 201, 198, 0.3);
        box-shadow: 0 10px 30px rgba(64, 201, 198, 0.1);

        .tech-progress .progress-bar {
          width: 100% !important;
        }

        .tech-icon i {
          transform: scale(1.1);
          color: #40c9c6;
        }
      }

      .tech-icon {
        font-size: 48px;
        color: #40c9c6;
        margin-bottom: 20px;
        
        i {
          transition: all 0.4s ease;
        }
      }

      h3 {
        color: #fff;
        margin-bottom: 15px;
        font-size: 24px;
      }

      p {
        color: #bbb;
        margin-bottom: 20px;
        font-size: 16px;
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
  min-height: 100vh;
  position: relative;
  overflow: hidden;

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

  h2 {
    text-align: center;
    font-size: 42px;
    margin-bottom: 60px;
    color: #fff;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -15px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 3px;
      background: linear-gradient(90deg, #40c9c6, #9333ea);
      border-radius: 2px;
    }
  }

  .data-overview {
    display: flex;
    justify-content: space-between;
    gap: 30px;
    max-width: 1600px;
    margin: 0 auto;
    padding: 20px;

    .data-column {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 30px;

      &.center-column {
        flex: 1.2;
      }
    }

    .data-row {
      background: rgba(38, 38, 38, 0.7);
      border-radius: 16px;
      padding: 30px;
      border: 1px solid rgba(64, 201, 198, 0.1);
      transition: all 0.3s ease;
      min-height: 250px;

      &:hover {
        border-color: rgba(64, 201, 198, 0.3);
        box-shadow: 0 10px 30px rgba(64, 201, 198, 0.1);
        transform: translateY(-5px);
      }

      &.highlight {
        background: linear-gradient(135deg, rgba(64, 201, 198, 0.1), rgba(147, 51, 234, 0.1));
      }

      .data-label {
        display: flex;
        align-items: center;
        gap: 10px;
        color: #bbb;
        margin-bottom: 20px;

        i {
          color: #40c9c6;
          font-size: 24px;
        }

        span {
          font-size: 18px;
        }
      }

      .data-number {
        font-size: 42px;
        font-weight: bold;
        background: linear-gradient(120deg, #40c9c6, #9333ea);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 15px;
      }

      .data-trend {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 16px;
        margin-bottom: 20px;

        &.positive {
          color: #67C23A;
        }

        &.negative {
          color: #F56C6C;
        }

        i {
          font-size: 14px;
        }
      }

      .data-description {
        margin-top: 20px;
        
        p {
          color: #bbb;
          font-size: 16px;
          margin-bottom: 15px;
        }

        .trend-chart {
          display: flex;
          align-items: flex-end;
          gap: 8px;
          height: 60px;
          margin-top: 20px;

          .chart-bar {
            flex: 1;
            background: linear-gradient(to top, #40c9c6, #9333ea);
            border-radius: 2px;
            transition: height 0.3s ease;
          }
        }

        .contract-types {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 15px;

          span {
            color: #bbb;
            font-size: 14px;
            padding: 8px;
            background: rgba(64, 201, 198, 0.1);
            border-radius: 4px;
          }
        }

        .user-distribution, .performance-metrics {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-top: 15px;

          .dist-item, .metric {
            background: rgba(64, 201, 198, 0.1);
            padding: 10px;
            border-radius: 8px;
            text-align: center;

            .label {
              display: block;
              color: #bbb;
              font-size: 14px;
              margin-bottom: 5px;
            }

            .value {
              color: #40c9c6;
              font-size: 18px;
              font-weight: bold;
            }
          }
        }
      }
    }

    .chain-status {
      background: rgba(38, 38, 38, 0.7);
      border-radius: 16px;
      padding: 40px;
      border: 1px solid rgba(64, 201, 198, 0.1);
      height: calc(100% - 80px);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      gap: 40px;
      transition: all 0.3s ease;

      &:hover {
        border-color: rgba(64, 201, 198, 0.3);
        box-shadow: 0 10px 30px rgba(64, 201, 198, 0.1);
        transform: translateY(-5px);
      }

      .status-ring {
        position: relative;
        width: 220px;
        height: 220px;

        svg {
          transform: rotate(-90deg);
          
          circle {
            fill: none;
            stroke-width: 8;
            stroke-linecap: round;
            
            &.ring-bg {
              stroke: rgba(255, 255, 255, 0.1);
            }
            
            &.ring-progress {
              stroke: url(#gradient);
              stroke-dasharray: 283;
              transition: stroke-dashoffset 1s ease;
            }
          }
        }

        .status-content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;

          .status-number {
            font-size: 42px;
            font-weight: bold;
            background: linear-gradient(120deg, #40c9c6, #9333ea);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .status-label {
            color: #bbb;
            font-size: 16px;
            margin-top: 8px;
          }
        }
      }

      .current-stats {
        display: flex;
        gap: 40px;
        width: 100%;
        padding: 20px 0;
        border-top: 1px solid rgba(64, 201, 198, 0.1);
        border-bottom: 1px solid rgba(64, 201, 198, 0.1);

        .stat-item {
          flex: 1;
          text-align: center;

          .stat-value {
            font-size: 28px;
            color: #40c9c6;
            margin-bottom: 8px;
          }

          .stat-label {
            color: #bbb;
            font-size: 16px;
            margin-bottom: 5px;
          }

          .stat-detail {
            color: #666;
            font-size: 14px;
          }
        }
      }

      .network-stats {
        display: flex;
        justify-content: space-around;
        width: 100%;
        
        .network-item {
          text-align: center;
          
          .label {
            display: block;
            color: #bbb;
            font-size: 14px;
            margin-bottom: 5px;
          }
          
          .value {
            color: #40c9c6;
            font-size: 20px;
            font-weight: bold;
          }
        }
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
    
    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 3px;
      background: linear-gradient(90deg, #40c9c6, #9333ea);
      border-radius: 2px;
    }
  }

  .section-desc {
    text-align: center;
    color: #bbb;
    font-size: 18px;
    margin-bottom: 60px;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }

  .carousel-container {
    width: 90%;
    max-width: 1600px;
    margin: 0 auto;
    position: relative;
    
    .carousel {
      height: 600px;
      border-radius: 20px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      overflow: hidden;
      position: relative;
      
      .case-card {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        visibility: hidden;
        transition: all 0.6s ease;
        transform: translateX(100%);
        
        &[data-active="true"] {
          opacity: 1;
          visibility: visible;
          transform: translateX(0);
        }
        
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        
        .case-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 40px;
          background: linear-gradient(to top, 
            rgba(0, 0, 0, 0.9) 0%,
            rgba(0, 0, 0, 0.7) 50%,
            transparent 100%);
          transform: translateY(0);
          transition: transform 0.6s ease;
          
          h3 {
            font-size: 32px;
            margin-bottom: 20px;
            background: linear-gradient(120deg, #40c9c6, #9333ea);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 2px 10px rgba(64, 201, 198, 0.3);
          }
          
          p {
            font-size: 18px;
            line-height: 1.8;
            max-width: 800px;
            color: #fff;
            opacity: 0.9;
          }
        }
      }
    }
    
    .carousel-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 50px;
      height: 50px;
      border: none;
      border-radius: 25px;
      background: rgba(64, 201, 198, 0.2);
      backdrop-filter: blur(5px);
      color: #fff;
      font-size: 24px;
      cursor: pointer;
      transition: all 0.3s ease;
      z-index: 2;
      
      &.prev {
        left: -25px;
      }
      
      &.next {
        right: -25px;
      }
      
      &:hover {
        background: rgba(64, 201, 198, 0.4);
        transform: translateY(-50%) scale(1.1);
      }
    }
    
    .carousel-indicators {
      position: absolute;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 12px;
      z-index: 2;
      
      .indicator {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(5px);
        cursor: pointer;
        transition: all 0.3s ease;
        
        &.active {
          background: #40c9c6;
          box-shadow: 0 0 10px rgba(64, 201, 198, 0.5);
        }
        
        &:hover {
          background: rgba(64, 201, 198, 0.5);
        }
      }
    }
  }
}

.about-us {
  padding: 80px 0;
  background: linear-gradient(135deg, #1a1f3c 0%, #0d1117 100%);
  color: #fff;
}

.about-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.about-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin-top: 40px;
}

.about-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 30px;
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;
  position: relative;
  overflow: hidden;
}

.about-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.08);
}

.card-icon {
  font-size: 2.5em;
  color: #3699ff;
  margin-bottom: 20px;
}

.about-card h3 {
  font-size: 1.5em;
  margin-bottom: 20px;
  color: #3699ff;
}

.company-intro {
  grid-column: span 2;
}

.company-intro p {
  font-size: 1.1em;
  line-height: 1.6;
}

.timeline-items {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.timeline-item {
  display: flex;
  align-items: center;
  gap: 15px;
}

.timeline-item .time {
  color: #3699ff;
  font-weight: bold;
  min-width: 80px;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.value-item {
  text-align: center;
  padding: 15px;
}

.value-item i {
  font-size: 2em;
  color: #3699ff;
  margin-bottom: 10px;
}

.value-item h4 {
  margin: 10px 0;
  color: #fff;
}

.team-stats {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
}

.stat-item {
  text-align: center;
}

.stat-item .number {
  display: block;
  font-size: 1.8em;
  color: #3699ff;
  font-weight: bold;
}

.cert-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.cert-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.cert-item i {
  color: #3699ff;
}

.responsibility-content ul {
  list-style: none;
  padding: 0;
  margin-top: 15px;
}

.responsibility-content li {
  margin: 10px 0;
  padding-left: 20px;
  position: relative;
}

.responsibility-content li:before {
  content: "•";
  color: #3699ff;
  position: absolute;
  left: 0;
}

@media (max-width: 768px) {
  .about-grid {
    grid-template-columns: 1fr;
  }
  
  .company-intro {
    grid-column: span 1;
  }
  
  .values-grid {
    grid-template-columns: 1fr;
  }
  
  .cert-grid {
    grid-template-columns: 1fr;
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
    padding: 60px 20px;

    h2 {
      font-size: 32px;
    }
    
    .section-desc {
      font-size: 16px;
      margin-bottom: 40px;
    }
    
    .carousel-container {
      width: 95%;
      
      .carousel {
        height: 400px;
      }
      
      .case-card {
        .case-content {
          padding: 25px;
          
          h3 {
            font-size: 24px;
            margin-bottom: 15px;
          }
          
          p {
            font-size: 14px;
            line-height: 1.6;
          }
        }
      }
      
      .carousel-btn {
        width: 40px;
        height: 40px;
        font-size: 20px;
      }
    }
  }

  .banner-stats {
    flex-direction: column;
    gap: 20px;
  }

  .tech-grid, .data-overview {
    grid-template-columns: 1fr;
  }

  .partner-scroll {
    &::before, &::after {
      width: 50px;
    }
  }
}

@media (max-width: 1200px) {
  .cases {
    padding: 80px 30px;
    
    .carousel-container {
      .carousel {
        height: 500px;
      }
      
      .case-card {
        .case-content {
          padding: 30px;
          
          h3 {
            font-size: 28px;
          }
          
          p {
            font-size: 16px;
          }
        }
      }
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

.floating-transactions {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 100;
  pointer-events: none;
  max-width: 400px;
}

.transaction-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.transaction-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  background: rgba(13, 17, 23, 0.85);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  color: #40c9c6;
  font-size: 14px;
  transition: all 0.3s ease;
  opacity: 0.8;
  
  i {
    font-size: 16px;
  }
  
  .hash {
    font-family: monospace;
    color: #a8b6c3;
  }
  
  .status {
    padding: 2px 8px;
    border-radius: 10px;
    font-size: 12px;
    white-space: nowrap;
    
    &.success {
      background: rgba(39, 174, 96, 0.2);
      color: #27ae60;
    }
    
    &.pending {
      background: rgba(241, 196, 15, 0.2);
      color: #f1c40f;
    }
  }
}

// 添加 Vue transition-group 动画
.slide-enter-active, .slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter {
  opacity: 0;
  transform: translateY(20px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.slide-move {
  transition: transform 0.5s ease;
}

@media (max-width: 768px) {
  .floating-transactions {
    bottom: 20px;
    right: 20px;
    left: 20px;
    max-width: none;
    
    .transaction-item {
      justify-content: center;
    }
  }
}
</style> 