<template>
  <div class="home" style="margin-top: 0; padding-top: 0;">
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

export default {
  name: 'Home',
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
      ]
    }
  },
  mounted() {
    this.getTotalInventory() // 获取总资产数量
    this.initUsageChart()
    this.initCategoryChart()
    this.initLocationChart()
    this.initTimeDistChart()
    this.initStatusChart()
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
      this.usageChart = echarts.init(this.$refs.usageChart)
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
      const chart = echarts.init(this.$refs.categoryChart)
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
      const chart = echarts.init(this.$refs.locationChart)
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
      const chart = echarts.init(this.$refs.timeDistChart)
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
      const chart = echarts.init(this.$refs.statusChart)
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
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  padding: 20px;
  background-color: #f5f7fa;

  .stat-card {
    height: 140px;
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 40%;
      height: 100%;
      background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.3));
      transform: skewX(-30deg) translateX(10%);
      opacity: 0.2;
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
          
          &.icon-blue { color: #40c9c6; }
          &.icon-green { color: #67c23a; }
          &.icon-orange { color: #e6a23c; }
          &.icon-purple { color: #9c27b0; }
        }
        
        span {
          font-size: 14px;
          color: #606266;
          font-weight: 500;
        }
      }
      
      .stat-value {
        font-size: 28px;
        font-weight: bold;
        color: #303133;
        margin-bottom: 6px;
      }
    }
    
    .stat-footer {
      display: flex;
      align-items: center;
      margin-top: 5px;
      margin-bottom: 10px;
      font-size: 12px;
      color: #909399;
      position: relative;
      z-index: 1;
      
      .up {
        color: #67c23a;
        margin-left: 5px;
      }
      
      .down {
        color: #f56c6c;
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
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
      
      .chart-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        
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
            color: #303133;
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
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
      
      .activity-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        
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
            color: #303133;
          }
        }
        
        .view-more {
          color: #409eff;
          font-size: 14px;
        }
      }
      
      .activity-list {
        .activity-item {
          display: flex;
          align-items: center;
          padding: 15px 0;
          border-bottom: 1px solid #ebeef5;
          
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
              background-color: #fdf6ec;
              
              i {
                color: #e6a23c;
                font-size: 20px;
              }
            }
            
            &.processing {
              background-color: #ecf5ff;
              
              i {
                color: #409eff;
                font-size: 20px;
              }
            }
            
            &.success {
              background-color: #f0f9eb;
              
              i {
                color: #67c23a;
                font-size: 20px;
              }
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
                color: #303133;
              }
              
              .action {
                color: #909399;
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
                  background-color: #fdf6ec;
                  color: #e6a23c;
                }
                
                &.processing {
                  background-color: #ecf5ff;
                  color: #409eff;
                }
                
                &.success {
                  background-color: #f0f9eb;
                  color: #67c23a;
                }
              }
            }
            
            .activity-info {
              display: flex;
              align-items: center;
              font-size: 12px;
              color: #909399;
              
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

@media screen and (max-width: 1400px) {
  .home {
    .stat-card {
      height: auto;
      
      .stat-value {
        font-size: 24px;
      }
    }
    
    .chart-row .chart-card .chart-container {
      height: auto;
    }
  }
}
</style>