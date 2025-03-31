<template>
  <div class="main-content">
    <!-- 标题 -->
    <div class="title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>告警服务</el-breadcrumb-item>
        <el-breadcrumb-item>告警统计</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    
    <!-- 筛选条件 -->
    <div class="filter-container">
      <el-form :inline="true" :model="filterForm" class="form-inline">
        <el-form-item label="时间范围">
          <el-date-picker
            v-model="filterForm.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="告警类型">
          <el-select v-model="filterForm.alarmType" placeholder="全部类型" clearable>
            <el-option label="区块链节点" value="node"></el-option>
            <el-option label="区块链同步" value="sync"></el-option>
            <el-option label="资产管理" value="asset"></el-option>
            <el-option label="系统资源" value="system"></el-option>
            <el-option label="安全监控" value="security"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getStatisticsData()">查询</el-button>
          <el-button @click="resetFilterForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    
    <!-- 统计概览 -->
    <div class="statistics-overview">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card shadow="hover" class="overview-card">
            <div class="overview-item">
              <div class="overview-icon">
                <i class="el-icon-warning" style="color: #F56C6C;"></i>
              </div>
              <div class="overview-info">
                <div class="overview-title">总告警数</div>
                <div class="overview-value">{{ overviewData.totalAlarms }}</div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover" class="overview-card">
            <div class="overview-item">
              <div class="overview-icon">
                <i class="el-icon-bell" style="color: #E6A23C;"></i>
              </div>
              <div class="overview-info">
                <div class="overview-title">未处理告警</div>
                <div class="overview-value">{{ overviewData.pendingAlarms }}</div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover" class="overview-card">
            <div class="overview-item">
              <div class="overview-icon">
                <i class="el-icon-error" style="color: #F56C6C;"></i>
              </div>
              <div class="overview-info">
                <div class="overview-title">严重告警</div>
                <div class="overview-value">{{ overviewData.criticalAlarms }}</div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover" class="overview-card">
            <div class="overview-item">
              <div class="overview-icon">
                <i class="el-icon-date" style="color: #409EFF;"></i>
              </div>
              <div class="overview-info">
                <div class="overview-title">今日新增</div>
                <div class="overview-value">{{ overviewData.todayAlarms }}</div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    
    <!-- 告警趋势图 -->
    <el-card shadow="hover" class="chart-card">
      <div slot="header" class="clearfix">
        <span>告警趋势</span>
        <el-radio-group v-model="trendTimeRange" size="small" style="float: right;">
          <el-radio-button label="week">最近一周</el-radio-button>
          <el-radio-button label="month">最近一月</el-radio-button>
          <el-radio-button label="quarter">最近一季</el-radio-button>
        </el-radio-group>
      </div>
      <div class="chart-container" ref="trendChart"></div>
    </el-card>
    
    <!-- 告警分布统计 -->
    <el-row :gutter="20" class="distribution-row">
      <el-col :span="12">
        <el-card shadow="hover" class="chart-card">
          <div slot="header" class="clearfix">
            <span>告警类型分布</span>
          </div>
          <div class="chart-container" ref="typeChart"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover" class="chart-card">
          <div slot="header" class="clearfix">
            <span>告警级别分布</span>
          </div>
          <div class="chart-container" ref="levelChart"></div>
        </el-card>
      </el-col>
    </el-row>
    
    <!-- 告警处理情况 -->
    <el-card shadow="hover" class="chart-card">
      <div slot="header" class="clearfix">
        <span>告警处理情况</span>
      </div>
      <div class="chart-container" ref="processChart"></div>
    </el-card>
    
    <!-- 告警TOP5 -->
    <el-card shadow="hover" class="chart-card">
      <div slot="header" class="clearfix">
        <span>告警TOP5</span>
      </div>
      <el-table
        :data="topAlarms"
        border
        style="width: 100%">
        <el-table-column type="index" label="排名" width="80" align="center"></el-table-column>
        <el-table-column prop="ruleName" header-align="center" align="center" label="告警规则"></el-table-column>
        <el-table-column prop="alarmType" header-align="center" align="center" label="告警类型" width="150">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.alarmType === 'node'" type="danger">区块链节点</el-tag>
            <el-tag v-else-if="scope.row.alarmType === 'sync'" type="warning">区块链同步</el-tag>
            <el-tag v-else-if="scope.row.alarmType === 'asset'" type="success">资产管理</el-tag>
            <el-tag v-else-if="scope.row.alarmType === 'system'" type="info">系统资源</el-tag>
            <el-tag v-else-if="scope.row.alarmType === 'security'" type="danger">安全监控</el-tag>
            <el-tag v-else>其他</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="alarmLevel" header-align="center" align="center" label="告警级别" width="120">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.alarmLevel === 'critical'" type="danger">严重</el-tag>
            <el-tag v-else-if="scope.row.alarmLevel === 'major'" type="warning">重要</el-tag>
            <el-tag v-else-if="scope.row.alarmLevel === 'minor'" type="success">次要</el-tag>
            <el-tag v-else-if="scope.row.alarmLevel === 'warning'" type="info">提示</el-tag>
            <el-tag v-else>未知</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="count" header-align="center" align="center" label="告警次数" width="120"></el-table-column>
        <el-table-column prop="lastTime" header-align="center" align="center" label="最近告警时间" width="180"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
// 修改echarts导入方式
import echarts from 'echarts'

export default {
  data() {
    // 在data中不能使用this，需要将初始化日期的逻辑移到created或mounted中
    return {
      // 筛选条件
      filterForm: {
        dateRange: [],
        alarmType: ''
      },
      
      // 统计概览数据
      overviewData: {
        totalAlarms: 256,
        pendingAlarms: 42,
        criticalAlarms: 18,
        todayAlarms: 24
      },
      
      // 趋势图时间范围
      trendTimeRange: 'week',
      
      // 图表实例
      trendChart: null,
      typeChart: null,
      levelChart: null,
      processChart: null,
      
      // 告警TOP5
      topAlarms: [
        {
          ruleName: '区块链节点离线告警',
          alarmType: 'node',
          alarmLevel: 'critical',
          count: 36,
          lastTime: '2023-06-15 14:23:45'
        },
        {
          ruleName: '系统CPU使用率告警',
          alarmType: 'system',
          alarmLevel: 'major',
          count: 28,
          lastTime: '2023-06-15 10:12:33'
        },
        {
          ruleName: '区块链同步异常告警',
          alarmType: 'sync',
          alarmLevel: 'major',
          count: 24,
          lastTime: '2023-06-14 22:45:12'
        },
        {
          ruleName: '异常登录尝试告警',
          alarmType: 'security',
          alarmLevel: 'critical',
          count: 15,
          lastTime: '2023-06-13 08:34:56'
        },
        {
          ruleName: '磁盘空间不足告警',
          alarmType: 'system',
          alarmLevel: 'minor',
          count: 12,
          lastTime: '2023-06-12 16:28:09'
        }
      ]
    }
  },
  created() {
    // 在created中初始化日期
    this.filterForm.dateRange = [this.getDateBefore(30), this.formatDate(new Date())]
  },
  mounted() {
    this.initCharts()
  },
  methods: {
    // 获取统计数据
    getStatisticsData() {
      // 实际项目中应该调用后端接口获取数据
      // 这里使用模拟数据
      this.initCharts()
    },
    
    // 重置筛选表单
    resetFilterForm() {
      this.filterForm = {
        dateRange: [this.getDateBefore(30), this.formatDate(new Date())],
        alarmType: ''
      }
      this.getStatisticsData()
    },
    
    // 初始化图表
    initCharts() {
      this.$nextTick(() => {
        this.initTrendChart()
        this.initTypeChart()
        this.initLevelChart()
        this.initProcessChart()
      })
    },
    
    // 初始化趋势图
    initTrendChart() {
      if (this.trendChart) {
        this.trendChart.dispose()
      }
      
      this.trendChart = echarts.init(this.$refs.trendChart)
      
      // 生成日期数据
      const days = this.trendTimeRange === 'week' ? 7 : (this.trendTimeRange === 'month' ? 30 : 90)
      const dates = []
      const criticalData = []
      const majorData = []
      const minorData = []
      const warningData = []
      
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date()
        date.setDate(date.getDate() - i)
        dates.push(this.formatDate(date, 'MM-dd'))
        
        // 生成随机数据
        criticalData.push(Math.floor(Math.random() * 5))
        majorData.push(Math.floor(Math.random() * 8))
        minorData.push(Math.floor(Math.random() * 10))
        warningData.push(Math.floor(Math.random() * 12))
      }
      
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['严重', '重要', '次要', '提示']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: dates
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '严重',
            type: 'line',
            stack: 'Total',
            data: criticalData,
            itemStyle: {
              color: '#F56C6C'
            }
          },
          {
            name: '重要',
            type: 'line',
            stack: 'Total',
            data: majorData,
            itemStyle: {
              color: '#E6A23C'
            }
          },
          {
            name: '次要',
            type: 'line',
            stack: 'Total',
            data: minorData,
            itemStyle: {
              color: '#67C23A'
            }
          },
          {
            name: '提示',
            type: 'line',
            stack: 'Total',
            data: warningData,
            itemStyle: {
              color: '#909399'
            }
          }
        ]
      }
      
      this.trendChart.setOption(option)
      
      // 监听窗口大小变化，调整图表大小
      window.addEventListener('resize', () => {
        this.trendChart.resize()
      })
    },
    
    // 初始化类型分布图
    initTypeChart() {
      if (this.typeChart) {
        this.typeChart.dispose()
      }
      
      this.typeChart = echarts.init(this.$refs.typeChart)
      
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: ['区块链节点', '区块链同步', '资产管理', '系统资源', '安全监控']
        },
        series: [
          {
            name: '告警类型',
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
              { value: 85, name: '区块链节点', itemStyle: { color: '#F56C6C' } },
              { value: 65, name: '区块链同步', itemStyle: { color: '#E6A23C' } },
              { value: 35, name: '资产管理', itemStyle: { color: '#67C23A' } },
              { value: 48, name: '系统资源', itemStyle: { color: '#409EFF' } },
              { value: 23, name: '安全监控', itemStyle: { color: '#909399' } }
            ]
          }
        ]
      }
      
      this.typeChart.setOption(option)
      
      window.addEventListener('resize', () => {
        this.typeChart.resize()
      })
    },
    
    // 初始化级别分布图
    initLevelChart() {
      if (this.levelChart) {
        this.levelChart.dispose()
      }
      
      this.levelChart = echarts.init(this.$refs.levelChart)
      
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: ['严重', '重要', '次要', '提示']
        },
        series: [
          {
            name: '告警级别',
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
              { value: 48, name: '严重', itemStyle: { color: '#F56C6C' } },
              { value: 78, name: '重要', itemStyle: { color: '#E6A23C' } },
              { value: 65, name: '次要', itemStyle: { color: '#67C23A' } },
              { value: 45, name: '提示', itemStyle: { color: '#909399' } }
            ]
          }
        ]
      }
      
      this.levelChart.setOption(option)
      
      window.addEventListener('resize', () => {
        this.levelChart.resize()
      })
    },
    
    // 初始化处理情况图
    initProcessChart() {
      if (this.processChart) {
        this.processChart.dispose()
      }
      
      this.processChart = echarts.init(this.$refs.processChart)
      
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['已处理', '未处理', '已忽略', '自动处理']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['区块链节点', '区块链同步', '资产管理', '系统资源', '安全监控']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '已处理',
            type: 'bar',
            stack: 'total',
            emphasis: {
              focus: 'series'
            },
            data: [35, 28, 15, 20, 10],
            itemStyle: {
              color: '#67C23A'
            }
          },
          {
            name: '未处理',
            type: 'bar',
            stack: 'total',
            emphasis: {
              focus: 'series'
            },
            data: [20, 15, 8, 12, 5],
            itemStyle: {
              color: '#F56C6C'
            }
          },
          {
            name: '已忽略',
            type: 'bar',
            stack: 'total',
            emphasis: {
              focus: 'series'
            },
            data: [15, 12, 5, 8, 3],
            itemStyle: {
              color: '#909399'
            }
          },
          {
            name: '自动处理',
            type: 'bar',
            stack: 'total',
            emphasis: {
              focus: 'series'
            },
            data: [15, 10, 7, 8, 5],
            itemStyle: {
              color: '#409EFF'
            }
          }
        ]
      }
      
      this.processChart.setOption(option)
      
      window.addEventListener('resize', () => {
        this.processChart.resize()
      })
    },
    
    // 获取n天前的日期
    getDateBefore(days) {
      const date = new Date()
      date.setDate(date.getDate() - days)
      return this.formatDate(date)
    },
    
    // 格式化日期
    formatDate(date, format = 'yyyy-MM-dd') {
      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')
      
      if (format === 'yyyy-MM-dd') {
        return `${year}-${month}-${day}`
      } else if (format === 'MM-dd') {
        return `${month}-${day}`
      }
      
      return `${year}-${month}-${day}`
    }
  },
  watch: {
    trendTimeRange() {
      this.initTrendChart()
    }
  },
  beforeDestroy() {
    // 销毁图表实例
    if (this.trendChart) {
      this.trendChart.dispose()
    }
    if (this.typeChart) {
      this.typeChart.dispose()
    }
    if (this.levelChart) {
      this.levelChart.dispose()
    }
    if (this.processChart) {
      this.processChart.dispose()
    }
    
    // 移除窗口大小变化监听
    window.removeEventListener('resize', () => {})
  }
}
</script>

<style scoped>
.main-content {
  padding: 20px;
}
.filter-container {
  margin-top: 20px;
  margin-bottom: 20px;
}
.statistics-overview {
  margin-bottom: 20px;
}
.overview-card {
  height: 120px;
}
.overview-item {
  display: flex;
  align-items: center;
  height: 100%;
}
.overview-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: rgba(245, 108, 108, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
}
.overview-icon i {
  font-size: 30px;
}
.overview-info {
  flex: 1;
}
.overview-title {
  font-size: 14px;
  color: #909399;
  margin-bottom: 10px;
}
.overview-value {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
}
.chart-card {
  margin-bottom: 20px;
}
.chart-container {
  height: 350px;
}
.distribution-row {
  margin-bottom: 20px;
}
</style> 