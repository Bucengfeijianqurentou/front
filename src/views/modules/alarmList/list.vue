<template>
  <div class="main-content">
    <!-- 标题 -->
    <div class="title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>告警服务</el-breadcrumb-item>
        <el-breadcrumb-item>告警列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    
    <!-- 搜索区域 -->
    <div class="search-form">
      <el-form :inline="true" :model="searchForm" class="form-inline">
        <el-form-item label="告警类型">
          <el-select v-model="searchForm.type" placeholder="告警类型" clearable>
            <el-option label="区块链节点异常" value="node"></el-option>
            <el-option label="区块链同步异常" value="sync"></el-option>
            <el-option label="资产异常" value="asset"></el-option>
            <el-option label="系统异常" value="system"></el-option>
            <el-option label="安全告警" value="security"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="告警级别">
          <el-select v-model="searchForm.level" placeholder="告警级别" clearable>
            <el-option label="严重" value="critical"></el-option>
            <el-option label="重要" value="major"></el-option>
            <el-option label="次要" value="minor"></el-option>
            <el-option label="提示" value="warning"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="告警时间">
          <el-date-picker
            v-model="searchForm.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="处理状态">
          <el-select v-model="searchForm.status" placeholder="处理状态" clearable>
            <el-option label="未处理" value="pending"></el-option>
            <el-option label="处理中" value="processing"></el-option>
            <el-option label="已处理" value="resolved"></el-option>
            <el-option label="已忽略" value="ignored"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getDataList()">查询</el-button>
          <el-button @click="resetSearchForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    
    <!-- 告警统计卡片 -->
    <div class="alarm-overview">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card shadow="hover" class="alarm-card">
            <div slot="header" class="clearfix">
              <span>总告警数</span>
            </div>
            <div class="alarm-data">
              <i class="el-icon-warning"></i>
              <div class="alarm-value-container">
                <span class="alarm-value">{{ alarmStats.total || 0 }}</span>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover" class="alarm-card">
            <div slot="header" class="clearfix">
              <span>未处理告警</span>
            </div>
            <div class="alarm-data">
              <i class="el-icon-bell" style="color: #E6A23C;"></i>
              <div class="alarm-value-container">
                <span class="alarm-value">{{ alarmStats.pending || 0 }}</span>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover" class="alarm-card">
            <div slot="header" class="clearfix">
              <span>严重告警</span>
            </div>
            <div class="alarm-data">
              <i class="el-icon-error" style="color: #F56C6C;"></i>
              <div class="alarm-value-container">
                <span class="alarm-value">{{ alarmStats.critical || 0 }}</span>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover" class="alarm-card">
            <div slot="header" class="clearfix">
              <span>今日新增</span>
            </div>
            <div class="alarm-data">
              <i class="el-icon-data-line" style="color: #409EFF;"></i>
              <div class="alarm-value-container">
                <span class="alarm-value">{{ alarmStats.today || 0 }}</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    
    <!-- 告警列表 -->
    <div class="alarm-list">
      <el-card shadow="hover">
        <div slot="header" class="clearfix">
          <span>告警列表</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="refreshDataList">刷新</el-button>
        </div>
        <el-table
          :data="dataList"
          border
          v-loading="dataListLoading"
          style="width: 100%">
          <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
          <el-table-column prop="alarmId" header-align="center" align="center" label="告警ID" width="120"></el-table-column>
          <el-table-column prop="alarmType" header-align="center" align="center" label="告警类型" width="150">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.alarmType === 'node'" type="danger">区块链节点异常</el-tag>
              <el-tag v-else-if="scope.row.alarmType === 'sync'" type="warning">区块链同步异常</el-tag>
              <el-tag v-else-if="scope.row.alarmType === 'asset'" type="success">资产异常</el-tag>
              <el-tag v-else-if="scope.row.alarmType === 'system'" type="info">系统异常</el-tag>
              <el-tag v-else-if="scope.row.alarmType === 'security'" type="danger">安全告警</el-tag>
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
          <el-table-column prop="alarmContent" header-align="center" align="center" label="告警内容"></el-table-column>
          <el-table-column prop="alarmSource" header-align="center" align="center" label="告警来源" width="150"></el-table-column>
          <el-table-column prop="alarmTime" header-align="center" align="center" label="告警时间" width="180"></el-table-column>
          <el-table-column prop="alarmStatus" header-align="center" align="center" label="处理状态" width="120">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.alarmStatus === 'pending'" type="danger">未处理</el-tag>
              <el-tag v-else-if="scope.row.alarmStatus === 'processing'" type="warning">处理中</el-tag>
              <el-tag v-else-if="scope.row.alarmStatus === 'resolved'" type="success">已处理</el-tag>
              <el-tag v-else-if="scope.row.alarmStatus === 'ignored'" type="info">已忽略</el-tag>
              <el-tag v-else>未知</el-tag>
            </template>
          </el-table-column>
          <el-table-column header-align="center" align="center" width="200" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="viewAlarmDetail(scope.row)">详情</el-button>
              <el-button type="text" size="small" @click="handleAlarm(scope.row)" v-if="scope.row.alarmStatus === 'pending'">处理</el-button>
              <el-button type="text" size="small" @click="ignoreAlarm(scope.row)" v-if="scope.row.alarmStatus === 'pending'">忽略</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="sizeChangeHandle"
          @current-change="currentChangeHandle"
          :current-page="pageIndex"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          :total="totalPage"
          layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
      </el-card>
    </div>
    
    <!-- 告警详情对话框 -->
    <el-dialog
      title="告警详情"
      :visible.sync="alarmDetailVisible"
      width="60%">
      <div v-loading="alarmDetailLoading">
        <el-descriptions title="基本信息" :column="2" border>
          <el-descriptions-item label="告警ID">{{ currentAlarm.alarmId }}</el-descriptions-item>
          <el-descriptions-item label="告警时间">{{ currentAlarm.alarmTime }}</el-descriptions-item>
          <el-descriptions-item label="告警类型">
            <el-tag v-if="currentAlarm.alarmType === 'node'" type="danger">区块链节点异常</el-tag>
            <el-tag v-else-if="currentAlarm.alarmType === 'sync'" type="warning">区块链同步异常</el-tag>
            <el-tag v-else-if="currentAlarm.alarmType === 'asset'" type="success">资产异常</el-tag>
            <el-tag v-else-if="currentAlarm.alarmType === 'system'" type="info">系统异常</el-tag>
            <el-tag v-else-if="currentAlarm.alarmType === 'security'" type="danger">安全告警</el-tag>
            <el-tag v-else>其他</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="告警级别">
            <el-tag v-if="currentAlarm.alarmLevel === 'critical'" type="danger">严重</el-tag>
            <el-tag v-else-if="currentAlarm.alarmLevel === 'major'" type="warning">重要</el-tag>
            <el-tag v-else-if="currentAlarm.alarmLevel === 'minor'" type="success">次要</el-tag>
            <el-tag v-else-if="currentAlarm.alarmLevel === 'warning'" type="info">提示</el-tag>
            <el-tag v-else>未知</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="告警来源">{{ currentAlarm.alarmSource }}</el-descriptions-item>
          <el-descriptions-item label="处理状态">
            <el-tag v-if="currentAlarm.alarmStatus === 'pending'" type="danger">未处理</el-tag>
            <el-tag v-else-if="currentAlarm.alarmStatus === 'processing'" type="warning">处理中</el-tag>
            <el-tag v-else-if="currentAlarm.alarmStatus === 'resolved'" type="success">已处理</el-tag>
            <el-tag v-else-if="currentAlarm.alarmStatus === 'ignored'" type="info">已忽略</el-tag>
            <el-tag v-else>未知</el-tag>
          </el-descriptions-item>
        </el-descriptions>
        
        <el-card class="alarm-content-card" style="margin-top: 20px;">
          <div slot="header">
            <span>告警内容</span>
          </div>
          <div class="alarm-content">
            {{ currentAlarm.alarmContent }}
          </div>
        </el-card>
        
        <el-card class="alarm-detail-card" style="margin-top: 20px;">
          <div slot="header">
            <span>详细信息</span>
          </div>
          <div class="alarm-detail">
            <pre>{{ currentAlarm.alarmDetail }}</pre>
          </div>
        </el-card>
        
        <el-card v-if="currentAlarm.alarmStatus !== 'pending'" class="alarm-process-card" style="margin-top: 20px;">
          <div slot="header">
            <span>处理记录</span>
          </div>
          <div class="alarm-process">
            <p><strong>处理人：</strong>{{ currentAlarm.processUser || '系统自动处理' }}</p>
            <p><strong>处理时间：</strong>{{ currentAlarm.processTime }}</p>
            <p><strong>处理方式：</strong>{{ currentAlarm.processMethod }}</p>
            <p><strong>处理结果：</strong>{{ currentAlarm.processResult }}</p>
          </div>
        </el-card>
      </div>
      <span slot="footer" class="dialog-footer" v-if="currentAlarm.alarmStatus === 'pending'">
        <el-button @click="alarmDetailVisible = false">关闭</el-button>
        <el-button type="warning" @click="ignoreAlarm(currentAlarm)">忽略告警</el-button>
        <el-button type="primary" @click="handleAlarm(currentAlarm)">处理告警</el-button>
      </span>
      <span slot="footer" class="dialog-footer" v-else>
        <el-button @click="alarmDetailVisible = false">关闭</el-button>
      </span>
    </el-dialog>
    
    <!-- 处理告警对话框 -->
    <el-dialog
      title="处理告警"
      :visible.sync="handleDialogVisible"
      width="40%">
      <el-form :model="handleForm" :rules="handleRules" ref="handleForm" label-width="100px">
        <el-form-item label="告警ID">
          <el-input v-model="currentAlarm.alarmId" disabled></el-input>
        </el-form-item>
        <el-form-item label="告警内容">
          <el-input v-model="currentAlarm.alarmContent" disabled type="textarea" rows="2"></el-input>
        </el-form-item>
        <el-form-item label="处理方式" prop="processMethod">
          <el-select v-model="handleForm.processMethod" placeholder="请选择处理方式" style="width: 100%;">
            <el-option label="重启服务" value="restart"></el-option>
            <el-option label="修复配置" value="config"></el-option>
            <el-option label="更新系统" value="update"></el-option>
            <el-option label="其他方式" value="other"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="处理备注" prop="processRemark">
          <el-input v-model="handleForm.processRemark" type="textarea" rows="4" placeholder="请输入处理备注"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitHandleForm" :loading="handleLoading">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {
        type: '',
        level: '',
        dateRange: [],
        status: ''
      },
      alarmStats: {
        total: 156,
        pending: 23,
        critical: 8,
        today: 15
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      
      // 告警详情相关
      alarmDetailVisible: false,
      alarmDetailLoading: false,
      currentAlarm: {},
      
      // 处理告警相关
      handleDialogVisible: false,
      handleForm: {
        processMethod: '',
        processRemark: ''
      },
      handleRules: {
        processMethod: [
          { required: true, message: '请选择处理方式', trigger: 'change' }
        ],
        processRemark: [
          { required: true, message: '请输入处理备注', trigger: 'blur' }
        ]
      },
      handleLoading: false
    }
  },
  created() {
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true
      
      // 模拟数据，实际项目中应该调用后端接口
      setTimeout(() => {
        this.dataList = this.getMockData()
        this.totalPage = 156
        this.dataListLoading = false
      }, 500)
    },
    
    // 生成模拟数据
    getMockData() {
      const mockData = []
      const alarmTypes = ['node', 'sync', 'asset', 'system', 'security']
      const alarmLevels = ['critical', 'major', 'minor', 'warning']
      const alarmStatus = ['pending', 'processing', 'resolved', 'ignored']
      const alarmSources = ['区块链节点1', '区块链节点2', '资产管理系统', '安全监控系统', '网络监控']
      
      const alarmContents = [
        '区块链节点无法连接，请检查网络连接',
        '区块链同步异常，当前区块高度停滞',
        '资产数据异常，请检查资产记录',
        '系统CPU使用率过高，已超过90%',
        '检测到异常登录尝试，可能存在安全风险',
        '区块链节点响应超时，请检查节点状态',
        '数据库连接异常，请检查数据库服务',
        '磁盘空间不足，剩余空间低于10%',
        '网络带宽使用率过高，请检查网络状态',
        '检测到未授权的API访问尝试'
      ]
      
      for (let i = 0; i < 10; i++) {
        const alarmType = alarmTypes[Math.floor(Math.random() * alarmTypes.length)]
        const alarmLevel = alarmLevels[Math.floor(Math.random() * alarmLevels.length)]
        const status = this.searchForm.status || alarmStatus[Math.floor(Math.random() * alarmStatus.length)]
        
        // 根据搜索条件过滤
        if (this.searchForm.type && this.searchForm.type !== alarmType) continue
        if (this.searchForm.level && this.searchForm.level !== alarmLevel) continue
        if (this.searchForm.status && this.searchForm.status !== status) continue
        
        const date = new Date()
        date.setDate(date.getDate() - Math.floor(Math.random() * 10))
        const alarmTime = this.formatDate(date)
        
        // 根据日期范围过滤
        if (this.searchForm.dateRange && this.searchForm.dateRange.length === 2) {
          const startDate = new Date(this.searchForm.dateRange[0])
          const endDate = new Date(this.searchForm.dateRange[1])
          if (date < startDate || date > endDate) continue
        }
        
        mockData.push({
          alarmId: 'ALM' + (1000 + i),
          alarmType: alarmType,
          alarmLevel: alarmLevel,
          alarmContent: alarmContents[Math.floor(Math.random() * alarmContents.length)],
          alarmSource: alarmSources[Math.floor(Math.random() * alarmSources.length)],
          alarmTime: alarmTime,
          alarmStatus: status,
          alarmDetail: JSON.stringify({
            timestamp: new Date().getTime(),
            source: {
              ip: '192.168.102.' + (Math.floor(Math.random() * 100) + 1),
              service: 'BlockchainService',
              node: 'Node' + (Math.floor(Math.random() * 5) + 1)
            },
            metrics: {
              cpu: Math.floor(Math.random() * 100) + '%',
              memory: Math.floor(Math.random() * 100) + '%',
              disk: Math.floor(Math.random() * 100) + '%',
              network: Math.floor(Math.random() * 100) + 'Mbps'
            },
            additionalInfo: {
              errorCode: 'ERR' + Math.floor(Math.random() * 1000),
              suggestion: '请检查系统日志并重启相关服务'
            }
          }, null, 2),
          processUser: status !== 'pending' ? '管理员' : '',
          processTime: status !== 'pending' ? this.formatDate(new Date(date.getTime() + 3600000)) : '',
          processMethod: status !== 'pending' ? ['restart', 'config', 'update', 'other'][Math.floor(Math.random() * 4)] : '',
          processResult: status !== 'pending' ? '已成功处理，服务恢复正常' : ''
        })
      }
      
      return mockData
    },
    
    // 格式化日期
    formatDate(date) {
      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')
      const hours = date.getHours().toString().padStart(2, '0')
      const minutes = date.getMinutes().toString().padStart(2, '0')
      const seconds = date.getSeconds().toString().padStart(2, '0')
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    },
    
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList()
    },
    
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val
      this.getDataList()
    },
    
    // 重置搜索表单
    resetSearchForm() {
      this.searchForm = {
        type: '',
        level: '',
        dateRange: [],
        status: ''
      }
      this.getDataList()
    },
    
    // 刷新数据列表
    refreshDataList() {
      this.getDataList()
    },
    
    // 查看告警详情
    viewAlarmDetail(row) {
      this.currentAlarm = JSON.parse(JSON.stringify(row))
      this.alarmDetailVisible = true
      this.alarmDetailLoading = true
      
      // 模拟加载数据
      setTimeout(() => {
        this.alarmDetailLoading = false
      }, 500)
    },
    
    // 处理告警
    handleAlarm(row) {
      this.currentAlarm = JSON.parse(JSON.stringify(row))
      this.handleForm = {
        processMethod: '',
        processRemark: ''
      }
      this.handleDialogVisible = true
    },
    
    // 提交处理表单
    submitHandleForm() {
      this.$refs.handleForm.validate(valid => {
        if (valid) {
          this.handleLoading = true
          
          // 模拟处理告警
          setTimeout(() => {
            // 更新告警状态
            const index = this.dataList.findIndex(item => item.alarmId === this.currentAlarm.alarmId)
            if (index !== -1) {
              this.dataList[index].alarmStatus = 'resolved'
              this.dataList[index].processUser = '管理员'
              this.dataList[index].processTime = this.formatDate(new Date())
              this.dataList[index].processMethod = this.handleForm.processMethod
              this.dataList[index].processResult = '已成功处理，' + this.handleForm.processRemark
            }
            
            // 更新统计数据
            this.alarmStats.pending = Math.max(0, this.alarmStats.pending - 1)
            
            this.$message({
              message: '告警处理成功',
              type: 'success'
            })
            
            this.handleLoading = false
            this.handleDialogVisible = false
            this.alarmDetailVisible = false
          }, 1000)
        }
      })
    },
    
    // 忽略告警
    ignoreAlarm(row) {
      this.$confirm('确定忽略该告警吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 更新告警状态
        const index = this.dataList.findIndex(item => item.alarmId === row.alarmId)
        if (index !== -1) {
          this.dataList[index].alarmStatus = 'ignored'
          this.dataList[index].processUser = '管理员'
          this.dataList[index].processTime = this.formatDate(new Date())
          this.dataList[index].processMethod = 'ignore'
          this.dataList[index].processResult = '已忽略该告警'
        }
        
        // 更新统计数据
        this.alarmStats.pending = Math.max(0, this.alarmStats.pending - 1)
        
        this.$message({
          message: '告警已忽略',
          type: 'success'
        })
        
        this.alarmDetailVisible = false
      }).catch(() => {
        // 取消忽略
      })
    }
  }
}
</script>

<style scoped>
.main-content {
  padding: 20px;
}
.search-form {
  margin-top: 20px;
  margin-bottom: 20px;
}
.alarm-overview {
  margin-bottom: 20px;
}
.alarm-card {
  height: 180px;
}
.alarm-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;
  overflow: visible;
}
.alarm-data i {
  font-size: 36px;
  color: #E6A23C;
  margin-bottom: 20px;
}
.alarm-value-container {
  width: 100%;
  text-align: center;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.alarm-value {
  font-size: 24px;
  font-weight: bold;
  line-height: 1.5;
  overflow: visible;
  white-space: nowrap;
  display: inline-block;
}
.alarm-list {
  margin-bottom: 20px;
}
.alarm-content {
  line-height: 1.8;
  padding: 10px;
}
.alarm-detail pre {
  background-color: #f5f7fa;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
  line-height: 1.5;
}
.alarm-process {
  line-height: 1.8;
  padding: 10px;
}
</style> 