<template>
  <div class="home dark-theme" style="margin-top: 0; padding-top: 0;">
    <!-- 顶部统计卡片区域 -->
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-header">
            <div class="stat-title">
              <i class="el-icon-s-platform icon-blue"></i>
              <span>总资产数量</span>
            </div>
            <div class="stat-value">{{ totalInventory }}</div>
          </div>
          <div class="stat-footer">
            <span>较上月</span>
            <span class="up">+12.5%</span>
          </div>
          <div class="stat-progress">
            <el-progress :percentage="75" :show-text="false" color="#40c9c6"></el-progress>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-header">
            <div class="stat-title">
              <i class="el-icon-s-order icon-green"></i>
              <span>本月预约</span>
            </div>
            <div class="stat-value">328</div>
          </div>
          <div class="stat-footer">
            <span>较上月</span>
            <span class="up">+8.2%</span>
          </div>
          <div class="stat-progress">
            <el-progress :percentage="62" :show-text="false" color="#67c23a"></el-progress>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-header">
            <div class="stat-title">
              <i class="el-icon-warning-outline icon-orange"></i>
              <span>待维护设备</span>
            </div>
            <div class="stat-value">45</div>
          </div>
          <div class="stat-footer">
            <span>较上月</span>
            <span class="down">-5.3%</span>
          </div>
          <div class="stat-progress">
            <el-progress :percentage="28" :show-text="false" color="#e6a23c"></el-progress>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-header">
            <div class="stat-title">
              <i class="el-icon-s-data icon-purple"></i>
              <span>资产利用率</span>
            </div>
            <div class="stat-value">86.7%</div>
          </div>
          <div class="stat-footer">
            <span>较上月</span>
            <span class="up">+2.1%</span>
          </div>
          <div class="stat-progress">
            <el-progress :percentage="86.7" :show-text="false" color="#9c27b0"></el-progress>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 区块链数据展示区域 -->
    <el-row :gutter="20" class="blockchain-stats-row">
      <!-- 区块高度展示 -->
      <el-col :span="12">
        <el-card shadow="hover" class="blockchain-card">
          <div class="blockchain-content">
            <div class="blockchain-icon">
              <div class="hexagon">
                <i class="el-icon-s-data"></i>
              </div>
            </div>
            <div class="blockchain-info">
              <div class="label">区块高度</div>
              <div class="value-container">
                <count-to
                  :start-val="0"
                  :end-val="blockNumber"
                  :duration="2000"
                  :separator="','"
                  class="number-value"
                />
                <div class="ripple-container">
                  <div class="ripple"></div>
                  <div class="ripple"></div>
                  <div class="ripple"></div>
                </div>
              </div>
              <div class="update-time">最后更新: {{ lastUpdateTime }}</div>
            </div>
            <div class="blockchain-chart">
              <div ref="blockHeightChart" style="width: 150px; height: 150px;"></div>
            </div>
          </div>
        </el-card>
      </el-col>
      
      <!-- 交易总数展示 -->
      <el-col :span="12">
        <el-card shadow="hover" class="blockchain-card">
          <div class="blockchain-content">
            <div class="blockchain-icon">
              <div class="hexagon purple">
                <i class="el-icon-s-order"></i>
              </div>
            </div>
            <div class="blockchain-info">
              <div class="label">交易总数</div>
              <div class="value-container">
                <count-to
                  :start-val="0"
                  :end-val="txSum"
                  :duration="2000"
                  :separator="','"
                  class="number-value purple"
                />
                <div class="ripple-container purple">
                  <div class="ripple"></div>
                  <div class="ripple"></div>
                  <div class="ripple"></div>
                </div>
              </div>
              <div class="trend">
                <span class="trend-value">+{{ todayTx }}</span>
                <span class="trend-label">今日新增</span>
              </div>
            </div>
            <div class="blockchain-chart">
              <div ref="txSumChart" style="width: 150px; height: 150px;"></div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 图表区域 - 第一行 -->
    <el-row :gutter="20" class="chart-row">
      <el-col :span="16">
        <el-card shadow="hover" class="chart-card">
          <div slot="header" class="chart-header">
            <div class="chart-title">
              <i class="el-icon-data-line"></i>
              <span>资产使用趋势</span>
            </div>
            <el-radio-group v-model="timeRange" size="small">
              <el-radio-button label="week">本周</el-radio-button>
              <el-radio-button label="month">本月</el-radio-button>
              <el-radio-button label="year">全年</el-radio-button>
            </el-radio-group>
          </div>
          <div class="chart-container">
            <div ref="usageChart" style="width: 100%; height: 350px;"></div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover" class="chart-card">
          <div slot="header" class="chart-header">
            <div class="chart-title">
              <i class="el-icon-pie-chart"></i>
              <span>资产分类占比</span>
            </div>
          </div>
          <div class="chart-container">
            <div ref="categoryChart" style="width: 100%; height: 350px;"></div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 图表区域 - 第二行 -->
    <el-row :gutter="20" class="chart-row">
      <el-col :span="8">
        <el-card shadow="hover" class="chart-card">
          <div slot="header" class="chart-header">
            <div class="chart-title">
              <i class="el-icon-map-location"></i>
              <span>资产存放地点分布</span>
            </div>
          </div>
          <div class="chart-container">
            <div ref="locationChart" style="width: 100%; height: 300px;"></div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover" class="chart-card">
          <div slot="header" class="chart-header">
            <div class="chart-title">
              <i class="el-icon-time"></i>
              <span>资产使用时段分布</span>
            </div>
          </div>
          <div class="chart-container">
            <div ref="timeDistChart" style="width: 100%; height: 300px;"></div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover" class="chart-card">
          <div slot="header" class="chart-header">
            <div class="chart-title">
              <i class="el-icon-s-operation"></i>
              <span>资产状态分布</span>
            </div>
          </div>
          <div class="chart-container">
            <div ref="statusChart" style="width: 100%; height: 300px;"></div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 系统监控图表区域 -->
    <el-row :gutter="20" class="chart-row">
      <!-- CPU使用率实时监控 -->
      <el-col :span="8">
        <el-card shadow="hover" class="chart-card system-monitor">
          <div slot="header" class="chart-header">
            <div class="chart-title">
              <i class="el-icon-cpu"></i>
              <span>CPU 使用率</span>
            </div>
            <div class="real-time-tag">
              <el-tag size="mini" type="success">实时</el-tag>
            </div>
          </div>
          <div class="chart-container">
            <div ref="cpuChart" style="width: 100%; height: 280px;"></div>
            <div class="core-stats">
              <div class="core-item">
                <span class="label">核心温度</span>
                <span class="value">62°C</span>
              </div>
              <div class="core-item">
                <span class="label">主频</span>
                <span class="value">3.8GHz</span>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>

      <!-- 内存使用监控 -->
      <el-col :span="8">
        <el-card shadow="hover" class="chart-card system-monitor">
          <div slot="header" class="chart-header">
            <div class="chart-title">
              <i class="el-icon-coin"></i>
              <span>内存使用情况</span>
            </div>
            <div class="real-time-tag">
              <el-tag size="mini" type="success">实时</el-tag>
            </div>
          </div>
          <div class="chart-container">
            <div ref="memoryChart" style="width: 100%; height: 280px;"></div>
          </div>
        </el-card>
      </el-col>

      <!-- 系统负载监控 -->
      <el-col :span="8">
        <el-card shadow="hover" class="chart-card system-monitor">
          <div slot="header" class="chart-header">
            <div class="chart-title">
              <i class="el-icon-loading"></i>
              <span>系统负载</span>
            </div>
            <div class="real-time-tag">
              <el-tag size="mini" type="success">实时</el-tag>
            </div>
          </div>
          <div class="chart-container">
            <div ref="loadChart" style="width: 100%; height: 280px;"></div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 网络监控图表区域 -->
    <el-row :gutter="20" class="chart-row">
      <!-- 网络流量监控 -->
      <el-col :span="16">
        <el-card shadow="hover" class="chart-card system-monitor">
          <div slot="header" class="chart-header">
            <div class="chart-title">
              <i class="el-icon-connection"></i>
              <span>网络流量监控</span>
            </div>
            <div class="monitor-actions">
              <el-radio-group v-model="networkTimeRange" size="mini">
                <el-radio-button label="realtime">实时</el-radio-button>
                <el-radio-button label="hour">1小时</el-radio-button>
                <el-radio-button label="day">24小时</el-radio-button>
              </el-radio-group>
            </div>
          </div>
          <div class="chart-container">
            <div ref="networkChart" style="width: 100%; height: 300px;"></div>
            <div class="network-stats">
              <div class="stat-item">
                <div class="label">上行速率</div>
                <div class="value">2.8 MB/s</div>
                <div class="trend up">
                  <i class="el-icon-top"></i>
                  <span>12%</span>
                </div>
              </div>
              <div class="stat-item">
                <div class="label">下行速率</div>
                <div class="value">5.2 MB/s</div>
                <div class="trend down">
                  <i class="el-icon-bottom"></i>
                  <span>8%</span>
                </div>
              </div>
              <div class="stat-item">
                <div class="label">延迟</div>
                <div class="value">23ms</div>
                <div class="trend stable">
                  <i class="el-icon-minus"></i>
                  <span>稳定</span>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>

      <!-- 网络连接状态 -->
      <el-col :span="8">
        <el-card shadow="hover" class="chart-card system-monitor">
          <div slot="header" class="chart-header">
            <div class="chart-title">
              <i class="el-icon-s-operation"></i>
              <span>网络连接状态</span>
            </div>
          </div>
          <div class="chart-container">
            <div ref="connectionChart" style="width: 100%; height: 300px;"></div>
            <div class="connection-stats">
              <el-row :gutter="20">
                <el-col :span="8">
                  <div class="stat-box">
                    <div class="value">1,286</div>
                    <div class="label">活跃连接</div>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="stat-box">
                    <div class="value">89</div>
                    <div class="label">等待连接</div>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="stat-box">
                    <div class="value">23</div>
                    <div class="label">拒绝连接</div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 最近活动 -->
    <el-row :gutter="20" class="activity-row">
      <el-col :span="12">
        <el-card shadow="hover" class="activity-card">
          <div slot="header" class="activity-header">
            <div class="activity-title">
              <i class="el-icon-date"></i>
              <span>最近预约</span>
            </div>
            <el-button type="text" class="view-more">查看更多</el-button>
          </div>
          <div class="activity-list">
            <div v-for="(item, index) in recentBookings" :key="index" class="activity-item">
              <el-avatar :size="40" :src="item.avatar"></el-avatar>
              <div class="activity-content">
                <div class="activity-title">
                  <span class="name">{{ item.name }}</span>
                  <span class="action">预约了</span>
                  <span class="target">{{ item.asset }}</span>
                </div>
                <div class="activity-info">
                  <span class="time"><i class="el-icon-time"></i> {{ item.time }}</span>
                  <el-tag size="mini" type="success">已确认</el-tag>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover" class="activity-card">
          <div slot="header" class="activity-header">
            <div class="activity-title">
              <i class="el-icon-bell"></i>
              <span>维护提醒</span>
            </div>
            <el-button type="text" class="view-more">查看更多</el-button>
          </div>
          <div class="activity-list">
            <div v-for="(item, index) in maintenanceReminders" :key="index" class="activity-item">
              <div class="reminder-icon-wrapper" :class="item.status">
                <i :class="item.icon"></i>
              </div>
              <div class="activity-content">
                <div class="activity-title">
                  <span class="target">{{ item.asset }}</span>
                  <span class="status-tag" :class="item.status">{{ item.statusText }}</span>
                </div>
                <div class="activity-info">
                  <span class="time"><i class="el-icon-time"></i> {{ item.time }}</span>
                  <span class="location"><i class="el-icon-location-information"></i> {{ item.location || '实验室A区' }}</span>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import moment from 'moment'
import CountTo from 'vue-count-to'  // 需要安装 vue-count-to 包

export default {
  name: 'Home',
  components: {
    CountTo
  },
  data() {
    return {
      timeRange: 'week',
      totalInventory: 0, // 总资产数量
      // 使用趋势数据 - 添加不同时间范围的数据
      usageData: {
        week: {
          xAxis: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          series: [
            { name: '使用次数', data: [120, 132, 101, 134, 90, 230, 210] },
            { name: '使用时长', data: [220, 182, 191, 234, 290, 330, 310] }
          ]
        },
        month: {
          xAxis: ['第1周', '第2周', '第3周', '第4周'],
          series: [
            { name: '使用次数', data: [520, 632, 701, 534] },
            { name: '使用时长', data: [820, 932, 901, 934] }
          ]
        },
        year: {
          xAxis: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          series: [
            { name: '使用次数', data: [820, 932, 901, 934, 1290, 1330, 1320, 1150, 1300, 1250, 1150, 1750] },
            { name: '使用时长', data: [1220, 1332, 1301, 1334, 1590, 1630, 1520, 1750, 1600, 1450, 1350, 1850] }
          ]
        }
      },
      usageChart: null, // 保存图表实例
      recentBookings: [
        { name: '张三', asset: '3D打印机', time: '10分钟前', avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' },
        { name: '李四', asset: '激光切割机', time: '23分钟前', avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' },
        { name: '王五', asset: 'CNC机床', time: '42分钟前', avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' },
        { name: '赵六', asset: '工业机器人', time: '1小时前', avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' }
      ],
      maintenanceReminders: [
        { asset: '3D打印机', statusText: '待维护', status: 'warning', time: '今天 14:00', icon: 'el-icon-warning-outline', location: '实验室A区' },
        { asset: '激光切割机', statusText: '维护中', status: 'processing', time: '今天 15:30', icon: 'el-icon-loading', location: '实验室B区' },
        { asset: 'CNC机床', statusText: '已完成', status: 'success', time: '今天 11:20', icon: 'el-icon-success', location: '工程训练中心' },
        { asset: '工业机器人', statusText: '待维护', status: 'warning', time: '明天 10:00', icon: 'el-icon-warning-outline', location: '实验室C区' }
      ],
      networkTimeRange: 'realtime',
      cpuData: [],
      memoryData: [],
      networkData: {
        upload: [],
        download: []
      },
      blockNumber: 0,
      txSum: 0,
      todayTx: 0,
      lastUpdateTime: '',
      updateTimer: null,
      loadData: {
        times: [],
        values: []
      }
    }
  },
  mounted() {
    // 修改图表主题颜色
    const chartTheme = {
      backgroundColor: 'transparent',
      textStyle: {
        color: '#8b9bb4'
      },
      title: {
        textStyle: {
          color: '#e1e6f0'
        }
      },
      line: {
        itemStyle: {
          borderWidth: 1
        },
        lineStyle: {
          width: 2
        },
        symbolSize: 4,
        symbol: 'circle',
        smooth: true
      },
      radar: {
        itemStyle: {
          borderWidth: 1
        },
        lineStyle: {
          width: 2
        },
        symbolSize: 4,
        symbol: 'circle',
        smooth: true
      },
      bar: {
        itemStyle: {
          barBorderWidth: 0,
          barBorderColor: '#ccc'
        }
      },
      pie: {
        itemStyle: {
          borderWidth: 0,
          borderColor: '#ccc'
        }
      },
      scatter: {
        itemStyle: {
          borderWidth: 0,
          borderColor: '#ccc'
        }
      },
      boxplot: {
        itemStyle: {
          borderWidth: 0,
          borderColor: '#ccc'
        }
      },
      parallel: {
        itemStyle: {
          borderWidth: 0,
          borderColor: '#ccc'
        }
      },
      sankey: {
        itemStyle: {
          borderWidth: 0,
          borderColor: '#ccc'
        }
      },
      funnel: {
        itemStyle: {
          borderWidth: 0,
          borderColor: '#ccc'
        }
      },
      gauge: {
        itemStyle: {
          borderWidth: 0,
          borderColor: '#ccc'
        }
      },
      candlestick: {
        itemStyle: {
          color: '#fd1050',
          color0: '#0cf49b',
          borderColor: '#fd1050',
          borderColor0: '#0cf49b',
          borderWidth: 1
        }
      },
      axisLine: {
        lineStyle: {
          color: '#8b9bb4'
        }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(64, 158, 255, 0.1)',
          type: 'dashed'
        }
      }
    };

    // 应用主题到所有图表
    echarts.registerTheme('dark', chartTheme);
    
    // 初始化时使用暗色主题
    this.getTotalInventory();
    this.initUsageChart();
    this.initCategoryChart();
    this.initLocationChart();
    this.initTimeDistChart();
    this.initStatusChart();
    this.initCpuChart();
    this.initMemoryChart();
    this.initLoadChart();
    this.initNetworkChart();
    this.initConnectionChart();
    this.getBlockchainData();
    this.initBlockHeightChart();
    this.initTxSumChart();
    
    // 模拟实时数据更新
    setInterval(() => {
      this.updateCharts()
    }, 3000)

    // 定时更新区块链数据
    this.updateTimer = setInterval(() => {
      this.getBlockchainData()
    }, 10000)
  },
  beforeDestroy() {
    if (this.updateTimer) {
      clearInterval(this.updateTimer)
    }
  },
  watch: {
    // 监听timeRange变化，更新图表
    timeRange(newValue) {
      this.updateUsageChart(newValue)
    }
  },
  methods: {
    // 获取总资产数量
    getTotalInventory() {
      this.$http({
        url: 'shangpin/getTotalInventory',
        method: 'get'
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.totalInventory = data.data
        }
      })
    },
    initUsageChart() {
      this.usageChart = echarts.init(this.$refs.usageChart, 'dark')
      this.updateUsageChart(this.timeRange)
      
      // 响应窗口大小变化
      window.addEventListener('resize', () => {
        this.usageChart.resize()
      })
    },
    // 更新使用趋势图表
    updateUsageChart(timeRange) {
      const currentData = this.usageData[timeRange]
      
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['使用次数', '使用时长'],
          right: 10,
          top: 10
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: currentData.xAxis,
          axisLine: {
            lineStyle: {
              color: '#eaeaea'
            }
          },
          axisLabel: {
            color: '#666'
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            lineStyle: {
              color: '#eaeaea',
              type: 'dashed'
            }
          },
          axisLabel: {
            color: '#666'
          }
        },
        series: [
          {
            name: '使用次数',
            type: 'line',
            smooth: true,
            data: currentData.series[0].data,
            itemStyle: {
              color: '#40c9c6'
            },
            lineStyle: {
              width: 3
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: 'rgba(64, 201, 198, 0.4)'
                }, {
                  offset: 1,
                  color: 'rgba(64, 201, 198, 0.1)'
                }]
              }
            }
          },
          {
            name: '使用时长',
            type: 'line',
            smooth: true,
            data: currentData.series[1].data,
            itemStyle: {
              color: '#36a3f7'
            },
            lineStyle: {
              width: 3
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: 'rgba(54, 163, 247, 0.4)'
                }, {
                  offset: 1,
                  color: 'rgba(54, 163, 247, 0.1)'
                }]
              }
            }
          }
        ]
      }
      this.usageChart.setOption(option)
    },
    initCategoryChart() {
      const chart = echarts.init(this.$refs.categoryChart, 'dark')
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: 10,
          top: 'center',
          data: ['3D打印设备', '激光加工设备', 'CNC设备', '机器人设备', '其他设备'],
          formatter: function(name) {
            return name.length > 6 ? name.substring(0, 6) + '...' : name
          }
        },
        series: [
          {
            name: '资产分类',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '18',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 335, name: '3D打印设备', itemStyle: { color: '#f56c6c' } },
              { value: 310, name: '激光加工设备', itemStyle: { color: '#67c23a' } },
              { value: 234, name: 'CNC设备', itemStyle: { color: '#409eff' } },
              { value: 135, name: '机器人设备', itemStyle: { color: '#9c27b0' } },
              { value: 548, name: '其他设备', itemStyle: { color: '#e6a23c' } }
            ]
          }
        ]
      }
      chart.setOption(option)
      
      // 响应窗口大小变化
      window.addEventListener('resize', function() {
        chart.resize()
      })
    },
    initLocationChart() {
      const chart = echarts.init(this.$refs.locationChart, 'dark')
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        series: [
          {
            name: '存放地点',
            type: 'pie',
            radius: '65%',
            center: ['50%', '50%'],
            data: [
              { value: 540, name: '实验室A区', itemStyle: { color: '#91cc75' } },
              { value: 320, name: '实验室B区', itemStyle: { color: '#fac858' } },
              { value: 280, name: '工程训练中心', itemStyle: { color: '#ee6666' } },
              { value: 190, name: '创新实践中心', itemStyle: { color: '#73c0de' } },
              { value: 120, name: '其他地点', itemStyle: { color: '#3ba272' } }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            label: {
              formatter: '{b}: {c} ({d}%)',
              fontSize: 12
            }
          }
        ]
      }
      chart.setOption(option)
      
      // 响应窗口大小变化
      window.addEventListener('resize', function() {
        chart.resize()
      })
    },
    initTimeDistChart() {
      const chart = echarts.init(this.$refs.timeDistChart, 'dark')
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['8-10', '10-12', '12-14', '14-16', '16-18', '18-20', '20-22'],
          axisLine: {
            lineStyle: {
              color: '#eaeaea'
            }
          },
          axisLabel: {
            color: '#666'
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            lineStyle: {
              color: '#eaeaea',
              type: 'dashed'
            }
          },
          axisLabel: {
            color: '#666'
          }
        },
        series: [
          {
            name: '使用次数',
            type: 'bar',
            barWidth: '60%',
            data: [78, 142, 90, 164, 182, 132, 76],
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: '#83bff6'
                }, {
                  offset: 1,
                  color: '#188df0'
                }]
              },
              borderRadius: [4, 4, 0, 0]
            }
          }
        ]
      }
      chart.setOption(option)
      
      // 响应窗口大小变化
      window.addEventListener('resize', function() {
        chart.resize()
      })
    },
    initStatusChart() {
      const chart = echarts.init(this.$refs.statusChart, 'dark')
      const option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          bottom: '5%',
          left: 'center'
        },
        series: [
          {
            name: '资产状态',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '45%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '18',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1450, name: '正常使用', itemStyle: { color: '#67c23a' } },
              { value: 45, name: '待维护', itemStyle: { color: '#e6a23c' } },
              { value: 28, name: '维护中', itemStyle: { color: '#409eff' } },
              { value: 15, name: '已报废', itemStyle: { color: '#909399' } }
            ]
          }
        ]
      }
      chart.setOption(option)
      
      // 响应窗口大小变化
      window.addEventListener('resize', function() {
        chart.resize()
      })
    },
    initCpuChart() {
      const chart = echarts.init(this.$refs.cpuChart, 'dark')
      const option = {
        tooltip: {
          formatter: '{b} : {c}%'
        },
        series: [
          {
            type: 'gauge',
            radius: '100%',
            progress: {
              show: true,
              width: 18,
              itemStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0,
                    color: '#409EFF'
                  }, {
                    offset: 1,
                    color: '#36A3F7'
                  }]
                }
              }
            },
            axisLine: {
              lineStyle: {
                width: 18,
                color: [[1, 'rgba(64, 158, 255, 0.1)']]
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              distance: 25,
              color: '#8b9bb4',
              fontSize: 12
            },
            pointer: {
              show: false
            },
            anchor: {
              show: false
            },
            title: {
              show: false
            },
            detail: {
              valueAnimation: true,
              fontSize: 30,
              offsetCenter: [0, '0%'],
              formatter: '{value}%',
              color: '#e1e6f0'
            },
            data: [{
              value: 75
            }]
          }
        ]
      }
      chart.setOption(option)
      window.addEventListener('resize', () => chart.resize())
    },
    initMemoryChart() {
      const chart = echarts.init(this.$refs.memoryChart, 'dark')
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          top: '10%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          max: 32,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(64, 158, 255, 0.1)',
              type: 'dashed'
            }
          },
          axisLabel: {
            formatter: '{value}GB',
            color: '#8b9bb4'
          }
        },
        yAxis: {
          type: 'category',
          data: ['内存'],
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#8b9bb4'
          }
        },
        series: [
          {
            name: '已使用',
            type: 'bar',
            stack: 'total',
            data: [18.6],
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: '#409EFF' },
                { offset: 1, color: '#36A3F7' }
              ]),
              borderRadius: [0, 0, 0, 0]
            },
            label: {
              show: true,
              position: 'inside',
              formatter: '{c}GB',
              color: '#fff'
            }
          },
          {
            name: '可用',
            type: 'bar',
            stack: 'total',
            data: [13.4],
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: 'rgba(64, 158, 255, 0.1)' },
                { offset: 1, color: 'rgba(54, 163, 247, 0.1)' }
              ]),
              borderRadius: [0, 4, 4, 0]
            },
            label: {
              show: true,
              position: 'inside',
              formatter: '{c}GB',
              color: '#8b9bb4'
            }
          }
        ]
      }
      chart.setOption(option)
      window.addEventListener('resize', () => chart.resize())
    },
    initLoadChart() {
      const chart = echarts.init(this.$refs.loadChart, 'dark')
      // 初始化时间数据
      const now = new Date()
      const times = []
      const values = []
      
      for (let i = 20; i >= 0; i--) {
        times.push(moment(now).subtract(i * 10, 'seconds').format('HH:mm:ss'))
        values.push((Math.random() * 1.5 + 0.5).toFixed(2))
      }
      
      this.loadData.times = times
      this.loadData.values = values
      
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          formatter: function(params) {
            return `${params[0].name}<br/>负载: ${params[0].value}`
          }
        },
        grid: {
          top: '15%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: times,
          axisLine: {
            lineStyle: {
              color: 'rgba(64, 158, 255, 0.2)'
            }
          },
          axisLabel: {
            color: '#8b9bb4',
            rotate: 45,
            formatter: function(value) {
              return value.split(':')[2]
            }
          }
        },
        yAxis: {
          type: 'value',
          name: '负载',
          min: 0,
          max: 3,
          interval: 0.5,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(64, 158, 255, 0.1)',
              type: 'dashed'
            }
          },
          axisLabel: {
            color: '#8b9bb4',
            formatter: '{value}'
          }
        },
        series: [
          {
            name: '系统负载',
            type: 'line',
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            lineStyle: {
              width: 2,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#409EFF' },
                { offset: 1, color: '#36A3F7' }
              ])
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(64, 158, 255, 0.3)' },
                { offset: 1, color: 'rgba(64, 158, 255, 0.1)' }
              ])
            },
            data: values,
            markArea: {
              itemStyle: {
                color: 'rgba(255, 173, 177, 0.1)'
              },
              data: [[{
                name: '高负载区间',
                yAxis: 2
              }, {
                yAxis: 3
              }]]
            }
          }
        ]
      }
      chart.setOption(option)
      window.addEventListener('resize', () => chart.resize())
    },
    initNetworkChart() {
      const chart = echarts.init(this.$refs.networkChart, 'dark')
      const now = new Date()
      const times = []
      const uploadData = []
      const downloadData = []
      
      for (let i = 0; i < 60; i++) {
        times.unshift(moment(now).subtract(i, 'minutes').format('HH:mm'))
        uploadData.unshift(Math.random() * 3 + 1)
        downloadData.unshift(Math.random() * 5 + 2)
      }
      
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['上行流量', '下行流量']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: times,
          axisLabel: {
            interval: 9
          }
        },
        yAxis: {
          type: 'value',
          name: 'MB/s',
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        series: [{
          name: '上行流量',
          type: 'line',
          smooth: true,
          symbol: 'none',
          lineStyle: {
            width: 2,
            color: '#67C23A'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(103,194,58,0.3)'
            }, {
              offset: 1,
              color: 'rgba(103,194,58,0.1)'
            }])
          },
          data: uploadData
        }, {
          name: '下行流量',
          type: 'line',
          smooth: true,
          symbol: 'none',
          lineStyle: {
            width: 2,
            color: '#409EFF'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(64,158,255,0.3)'
            }, {
              offset: 1,
              color: 'rgba(64,158,255,0.1)'
            }])
          },
          data: downloadData
        }]
      }
      chart.setOption(option)
      window.addEventListener('resize', () => chart.resize())
    },
    initConnectionChart() {
      const chart = echarts.init(this.$refs.connectionChart, 'dark')
      const option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [{
          name: '连接状态',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '18',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1286, name: '活跃连接', itemStyle: { color: '#67C23A' } },
            { value: 89, name: '等待连接', itemStyle: { color: '#E6A23C' } },
            { value: 23, name: '拒绝连接', itemStyle: { color: '#F56C6C' } }
          ]
        }]
      }
      chart.setOption(option)
      window.addEventListener('resize', () => chart.resize())
    },
    updateCharts() {
      // 更新CPU数据
      const cpuChart = echarts.getInstanceByDom(this.$refs.cpuChart)
      if (cpuChart) {
        const newValue = Math.random() * 20 + 65 // 模拟65-85之间的CPU使用率
        cpuChart.setOption({
          series: [{
            data: [{
              value: newValue.toFixed(1)
            }]
          }]
        })
      }

      // 更新内存数据
      const memoryChart = echarts.getInstanceByDom(this.$refs.memoryChart)
      if (memoryChart) {
        const totalMemory = 32
        const usedMemory = (Math.random() * 10 + 15).toFixed(1) // 模拟15-25GB的已用内存
        const availableMemory = (totalMemory - usedMemory).toFixed(1)
        
        memoryChart.setOption({
          series: [{
            data: [usedMemory]
          }, {
            data: [availableMemory]
          }]
        })
      }

      // 更新系统负载数据
      const loadChart = echarts.getInstanceByDom(this.$refs.loadChart)
      if (loadChart) {
        const now = moment()
        this.loadData.times.shift()
        this.loadData.values.shift()
        this.loadData.times.push(now.format('HH:mm:ss'))
        this.loadData.values.push((Math.random() * 1.5 + 0.5).toFixed(2))
        
        loadChart.setOption({
          xAxis: {
            data: this.loadData.times
          },
          series: [{
            data: this.loadData.values
          }]
        })
      }

      // 更新网络数据
      const networkChart = echarts.getInstanceByDom(this.$refs.networkChart)
      if (networkChart) {
        const option = networkChart.getOption()
        const uploadData = option.series[0].data
        const downloadData = option.series[1].data
        
        uploadData.shift()
        downloadData.shift()
        uploadData.push(Math.random() * 3 + 1)
        downloadData.push(Math.random() * 5 + 2)
        
        networkChart.setOption({
          series: [{
            data: uploadData
          }, {
            data: downloadData
          }]
        })
      }
    },
    // 获取区块链数据
    getBlockchainData() {
      // 获取区块高度
      this.$http({
        url: '/chain/getBlockNumber',
        method: "get"
      }).then(({ data }) => {
        if (data !== null && data !== undefined) {
          this.blockNumber = data
        }
      })

      // 获取交易总数
      this.$http({
        url: '/chain/getTransactionTotal',
        method: "get"
      }).then(({ data }) => {
        if (data !== null && data !== undefined) {
          this.txSum = data
        }
      })
      
      this.lastUpdateTime = moment().format('HH:mm:ss')
      this.todayTx = Math.floor(Math.random() * 1000 + 500) // 模拟今日新增交易数
    },
    
    initBlockHeightChart() {
      const chart = echarts.init(this.$refs.blockHeightChart, 'dark')
      const option = {
        series: [{
          type: 'gauge',
          radius: '100%',
          startAngle: 90,
          endAngle: -270,
          pointer: {
            show: false
          },
          progress: {
            show: true,
            overlap: false,
            roundCap: true,
            clip: false,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: '#40c9c6'
                }, {
                  offset: 1,
                  color: '#36a3f7'
                }]
              }
            }
          },
          axisLine: {
            lineStyle: {
              width: 8,
              color: [[1, '#e9ecef']]
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          data: [{
            value: 85,
            detail: {
              show: false
            }
          }]
        }]
      }
      chart.setOption(option)
    },
    
    initTxSumChart() {
      const chart = echarts.init(this.$refs.txSumChart, 'dark')
      const option = {
        series: [{
          type: 'gauge',
          radius: '100%',
          startAngle: 90,
          endAngle: -270,
          pointer: {
            show: false
          },
          progress: {
            show: true,
            overlap: false,
            roundCap: true,
            clip: false,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: '#9c27b0'
                }, {
                  offset: 1,
                  color: '#7b1fa2'
                }]
              }
            }
          },
          axisLine: {
            lineStyle: {
              width: 8,
              color: [[1, '#e9ecef']]
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          data: [{
            value: 92,
            detail: {
              show: false
            }
          }]
        }]
      }
      chart.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>
.home.dark-theme {
  padding: 20px;
  background-color: #0f1a2b;  // 更深的蓝色背景
  min-height: 100vh;

  .stat-card {
    height: 140px;
    position: relative;
    overflow: hidden;
    background: linear-gradient(135deg, #1b2838 0%, #151c2b 100%);  // 偏蓝色的渐变背景
    border: 1px solid rgba(64, 158, 255, 0.1);
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 40%;
      height: 100%;
      background: linear-gradient(to right, rgba(64, 158, 255, 0), rgba(64, 158, 255, 0.05));
      transform: skewX(-30deg) translateX(10%);
      opacity: 0.1;
      z-index: 0;
    }
    
    .stat-header {
      display: flex;
      flex-direction: column;
      position: relative;
      z-index: 1;
      
      .stat-title {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        
        i {
          font-size: 24px;
          margin-right: 8px;
          
          &.icon-blue { color: #409eff; }
          &.icon-green { color: #67e0e3; }
          &.icon-orange { color: #ffd04b; }
          &.icon-purple { color: #a084e8; }
        }
        
        span {
          font-size: 14px;
          color: #e1e6f0;
          font-weight: 500;
        }
      }
      
      .stat-value {
        font-size: 28px;
        font-weight: bold;
        color: #ffffff;
        margin-bottom: 6px;
      }
    }
    
    .stat-footer {
      display: flex;
      align-items: center;
      margin-top: 5px;
      margin-bottom: 10px;
      font-size: 12px;
      color: #8b9bb4;
      position: relative;
      z-index: 1;
      
      .up {
        color: #67e0e3;
        margin-left: 5px;
      }
      
      .down {
        color: #ff6b6b;
        margin-left: 5px;
      }
    }
    
    .stat-progress {
      position: relative;
      z-index: 1;
      margin-top: 10px;
    }
  }

  .chart-row {
    margin-top: 20px;
    
    .chart-card {
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
      background: linear-gradient(135deg, #1b2838 0%, #151c2b 100%);
      
      .chart-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(64, 158, 255, 0.1);
        
        .chart-title {
          display: flex;
          align-items: center;
          
          i {
            margin-right: 8px;
            font-size: 18px;
            color: #409eff;
          }
          
          span {
            font-size: 16px;
            font-weight: 500;
            color: #e1e6f0;
          }
        }
      }
      
      .chart-container {
        padding: 10px 0;
      }
    }
  }

  .activity-row {
    margin-top: 20px;
    
    .activity-card {
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
      background: linear-gradient(135deg, #1b2838 0%, #151c2b 100%);
      
      .activity-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(64, 158, 255, 0.1);
        
        .activity-title {
          display: flex;
          align-items: center;
          
          i {
            margin-right: 8px;
            font-size: 18px;
            color: #409eff;
          }
          
          span {
            font-size: 16px;
            font-weight: 500;
            color: #e1e6f0;
          }
        }
        
        .view-more {
          color: #409eff;
          font-size: 14px;
          
          &:hover {
            color: #66b1ff;
          }
        }
      }
      
      .activity-list {
        .activity-item {
          display: flex;
          align-items: center;
          padding: 15px 0;
          border-bottom: 1px solid rgba(64, 158, 255, 0.1);
          
          &:last-child {
            border-bottom: none;
          }
          
          .reminder-icon-wrapper {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 12px;
            
            &.warning {
              background-color: rgba(255, 208, 75, 0.1);
              i { color: #ffd04b; }
            }
            
            &.processing {
              background-color: rgba(64, 158, 255, 0.1);
              i { color: #409eff; }
            }
            
            &.success {
              background-color: rgba(103, 224, 227, 0.1);
              i { color: #67e0e3; }
            }
          }
          
          .activity-content {
            flex: 1;
            
            .activity-title {
              display: flex;
              align-items: center;
              margin-bottom: 6px;
              
              .name {
                font-weight: 500;
                margin-right: 5px;
                font-size: 14px;
                color: #e1e6f0;
              }
              
              .action {
                color: #8b9bb4;
                margin: 0 5px;
                font-size: 14px;
              }
              
              .target {
                color: #409eff;
                font-weight: 500;
                font-size: 14px;
              }
              
              .status-tag {
                margin-left: 10px;
                padding: 2px 8px;
                border-radius: 10px;
                font-size: 12px;
                
                &.warning {
                  background-color: rgba(255, 208, 75, 0.1);
                  color: #ffd04b;
                }
                
                &.processing {
                  background-color: rgba(64, 158, 255, 0.1);
                  color: #409eff;
                }
                
                &.success {
                  background-color: rgba(103, 224, 227, 0.1);
                  color: #67e0e3;
                }
              }
            }
            
            .activity-info {
              display: flex;
              align-items: center;
              font-size: 12px;
              color: #8b9bb4;
              
              .time {
                margin-right: 15px;
                
                i {
                  margin-right: 3px;
                }
              }
              
              .location {
                i {
                  margin-right: 3px;
                }
              }
            }
          }
        }
      }
    }
  }
}

.system-monitor {
  .chart-container {
    padding: 20px;
    height: 340px;
    
    .core-stats {
      margin-top: 15px;
      padding: 15px;
      background: rgba(64, 158, 255, 0.05);
      border-radius: 8px;
      border: 1px solid rgba(64, 158, 255, 0.1);
      
      .core-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
        
        .label {
          color: #8b9bb4;
        }
        
        .value {
          font-weight: 500;
          color: #e1e6f0;
        }
        
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}

.real-time-tag {
  margin-left: 10px;
  display: inline-block;
}

.monitor-actions {
  float: right;
}

.blockchain-stats-row {
  margin: 20px 0;
  
  .blockchain-card {
    background: linear-gradient(135deg, #1b2838 0%, #151c2b 100%);
    border: 1px solid rgba(64, 158, 255, 0.1);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    
    &:hover {
      transform: translateY(-2px);
      transition: all 0.3s ease;
    }
    
    .blockchain-content {
      display: flex;
      align-items: center;
      padding: 20px;
      position: relative;
      overflow: hidden;
      
      &::before {
        content: '';
        position: absolute;
        top: -50%;
        right: -50%;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, transparent 45%, rgba(64, 158, 255, 0.05) 48%, rgba(64, 158, 255, 0.1) 50%, rgba(64, 158, 255, 0.05) 52%, transparent 55%);
        transform: rotate(45deg);
        animation: shine 3s infinite;
      }
    }
    
    .blockchain-icon {
      margin-right: 20px;
      
      .hexagon {
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #409eff 0%, #36a3f7 100%);
        clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 20px rgba(64, 158, 255, 0.3);
        
        &.purple {
          background: linear-gradient(135deg, #a084e8 0%, #8e6cde 100%);
          box-shadow: 0 0 20px rgba(160, 132, 232, 0.3);
        }
        
        i {
          font-size: 24px;
          color: white;
        }
      }
    }
    
    .blockchain-info {
      flex: 1;
      
      .label {
        font-size: 16px;
        color: #8b9bb4;
        margin-bottom: 8px;
      }
      
      .value-container {
        position: relative;
        display: inline-block;
        
        .number-value {
          font-size: 36px;
          font-weight: bold;
          color: #409eff;
          text-shadow: 0 0 10px rgba(64, 158, 255, 0.3);
          position: relative;
          z-index: 2;
          
          &.purple {
            color: #a084e8;
            text-shadow: 0 0 10px rgba(160, 132, 232, 0.3);
          }
        }
        
        .ripple-container {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          
          .ripple {
            position: absolute;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            border: 2px solid #40c9c6;
            animation: ripple 2s infinite;
            opacity: 0;
            
            &:nth-child(2) {
              animation-delay: 0.5s;
            }
            
            &:nth-child(3) {
              animation-delay: 1s;
            }
          }
          
          &.purple .ripple {
            border-color: #9c27b0;
          }
        }
      }
      
      .update-time {
        font-size: 12px;
        color: #8b9bb4;
        margin-top: 8px;
      }
      
      .trend {
        margin-top: 8px;
        
        .trend-value {
          font-size: 14px;
          color: #67e0e3;
          text-shadow: 0 0 10px rgba(103, 224, 227, 0.3);
          font-weight: bold;
          margin-right: 8px;
        }
        
        .trend-label {
          font-size: 12px;
          color: #8b9bb4;
        }
      }
    }
    
    .blockchain-chart {
      width: 150px;
      height: 150px;
    }
  }
}

@keyframes ripple {
  0% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

@keyframes shine {
  0% {
    transform: translateX(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) rotate(45deg);
  }
}
</style>