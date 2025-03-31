<template>
  <div class="main-content">
    <!-- 标题 -->
    <div class="title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>告警服务</el-breadcrumb-item>
        <el-breadcrumb-item>告警设置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    
    <!-- 告警设置选项卡 -->
    <el-card shadow="hover" class="settings-card">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="告警规则" name="rules">
          <div class="operation-buttons">
            <el-button type="primary" @click="handleAddRule">新增规则</el-button>
          </div>
          
          <!-- 告警规则列表 -->
          <el-table
            :data="rulesList"
            border
            style="width: 100%">
            <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
            <el-table-column prop="ruleName" header-align="center" align="center" label="规则名称"></el-table-column>
            <el-table-column prop="ruleType" header-align="center" align="center" label="规则类型" width="150">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.ruleType === 'node'" type="danger">区块链节点</el-tag>
                <el-tag v-else-if="scope.row.ruleType === 'sync'" type="warning">区块链同步</el-tag>
                <el-tag v-else-if="scope.row.ruleType === 'asset'" type="success">资产管理</el-tag>
                <el-tag v-else-if="scope.row.ruleType === 'system'" type="info">系统资源</el-tag>
                <el-tag v-else-if="scope.row.ruleType === 'security'" type="danger">安全监控</el-tag>
                <el-tag v-else>其他</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="triggerCondition" header-align="center" align="center" label="触发条件"></el-table-column>
            <el-table-column prop="alarmLevel" header-align="center" align="center" label="告警级别" width="120">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.alarmLevel === 'critical'" type="danger">严重</el-tag>
                <el-tag v-else-if="scope.row.alarmLevel === 'major'" type="warning">重要</el-tag>
                <el-tag v-else-if="scope.row.alarmLevel === 'minor'" type="success">次要</el-tag>
                <el-tag v-else-if="scope.row.alarmLevel === 'warning'" type="info">提示</el-tag>
                <el-tag v-else>未知</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="status" header-align="center" align="center" label="状态" width="100">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.status"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  @change="changeRuleStatus(scope.row)">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column header-align="center" align="center" width="200" label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="editRule(scope.row)">编辑</el-button>
                <el-button type="text" size="small" @click="deleteRule(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        
        <el-tab-pane label="通知设置" name="notifications">
          <el-form :model="notificationForm" label-width="120px" class="notification-form">
            <el-form-item label="邮件通知">
              <el-switch v-model="notificationForm.emailEnabled"></el-switch>
            </el-form-item>
            
            <div v-if="notificationForm.emailEnabled" class="notification-settings">
              <el-form-item label="接收邮箱">
                <el-input v-model="notificationForm.emailReceivers" placeholder="多个邮箱用逗号分隔"></el-input>
              </el-form-item>
              <el-form-item label="通知级别">
                <el-checkbox-group v-model="notificationForm.emailLevels">
                  <el-checkbox label="critical">严重</el-checkbox>
                  <el-checkbox label="major">重要</el-checkbox>
                  <el-checkbox label="minor">次要</el-checkbox>
                  <el-checkbox label="warning">提示</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </div>
            
            <el-form-item label="短信通知">
              <el-switch v-model="notificationForm.smsEnabled"></el-switch>
            </el-form-item>
            
            <div v-if="notificationForm.smsEnabled" class="notification-settings">
              <el-form-item label="接收手机号">
                <el-input v-model="notificationForm.smsReceivers" placeholder="多个手机号用逗号分隔"></el-input>
              </el-form-item>
              <el-form-item label="通知级别">
                <el-checkbox-group v-model="notificationForm.smsLevels">
                  <el-checkbox label="critical">严重</el-checkbox>
                  <el-checkbox label="major">重要</el-checkbox>
                  <el-checkbox label="minor">次要</el-checkbox>
                  <el-checkbox label="warning">提示</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </div>
            
            <el-form-item label="系统通知">
              <el-switch v-model="notificationForm.systemEnabled"></el-switch>
            </el-form-item>
            
            <div v-if="notificationForm.systemEnabled" class="notification-settings">
              <el-form-item label="通知级别">
                <el-checkbox-group v-model="notificationForm.systemLevels">
                  <el-checkbox label="critical">严重</el-checkbox>
                  <el-checkbox label="major">重要</el-checkbox>
                  <el-checkbox label="minor">次要</el-checkbox>
                  <el-checkbox label="warning">提示</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </div>
            
            <el-form-item>
              <el-button type="primary" @click="saveNotificationSettings">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        
        <el-tab-pane label="自动处理" name="autoProcess">
          <el-form :model="autoProcessForm" label-width="120px" class="auto-process-form">
            <el-form-item label="自动处理">
              <el-switch v-model="autoProcessForm.enabled"></el-switch>
            </el-form-item>
            
            <div v-if="autoProcessForm.enabled" class="auto-process-settings">
              <el-form-item label="处理规则">
                <el-table
                  :data="autoProcessForm.rules"
                  border
                  style="width: 100%">
                  <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
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
                  <el-table-column prop="action" header-align="center" align="center" label="自动处理动作"></el-table-column>
                  <el-table-column prop="status" header-align="center" align="center" label="状态" width="100">
                    <template slot-scope="scope">
                      <el-switch
                        v-model="scope.row.status"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                      </el-switch>
                    </template>
                  </el-table-column>
                  <el-table-column header-align="center" align="center" width="150" label="操作">
                    <template slot-scope="scope">
                      <el-button type="text" size="small" @click="editAutoProcessRule(scope.row)">编辑</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
              
              <el-form-item>
                <el-button type="primary" @click="saveAutoProcessSettings">保存设置</el-button>
              </el-form-item>
            </div>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    
    <!-- 新增/编辑告警规则对话框 -->
    <el-dialog
      :title="ruleDialogTitle"
      :visible.sync="ruleDialogVisible"
      width="50%">
      <el-form :model="ruleForm" :rules="ruleFormRules" ref="ruleForm" label-width="100px">
        <el-form-item label="规则名称" prop="ruleName">
          <el-input v-model="ruleForm.ruleName" placeholder="请输入规则名称"></el-input>
        </el-form-item>
        <el-form-item label="规则类型" prop="ruleType">
          <el-select v-model="ruleForm.ruleType" placeholder="请选择规则类型" style="width: 100%;">
            <el-option label="区块链节点" value="node"></el-option>
            <el-option label="区块链同步" value="sync"></el-option>
            <el-option label="资产管理" value="asset"></el-option>
            <el-option label="系统资源" value="system"></el-option>
            <el-option label="安全监控" value="security"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="触发条件" prop="triggerCondition">
          <el-input v-model="ruleForm.triggerCondition" placeholder="请输入触发条件"></el-input>
        </el-form-item>
        <el-form-item label="告警级别" prop="alarmLevel">
          <el-select v-model="ruleForm.alarmLevel" placeholder="请选择告警级别" style="width: 100%;">
            <el-option label="严重" value="critical"></el-option>
            <el-option label="重要" value="major"></el-option>
            <el-option label="次要" value="minor"></el-option>
            <el-option label="提示" value="warning"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="告警内容" prop="alarmContent">
          <el-input v-model="ruleForm.alarmContent" type="textarea" rows="4" placeholder="请输入告警内容模板"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="ruleForm.status"></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="ruleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitRuleForm">确 定</el-button>
      </span>
    </el-dialog>
    
    <!-- 编辑自动处理规则对话框 -->
    <el-dialog
      title="编辑自动处理规则"
      :visible.sync="autoProcessDialogVisible"
      width="50%">
      <el-form :model="autoProcessRuleForm" ref="autoProcessRuleForm" label-width="100px">
        <el-form-item label="告警类型">
          <el-input v-model="autoProcessRuleForm.alarmTypeText" disabled></el-input>
        </el-form-item>
        <el-form-item label="处理动作" prop="action">
          <el-input v-model="autoProcessRuleForm.action" placeholder="请输入自动处理动作"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="autoProcessRuleForm.status"></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="autoProcessDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAutoProcessRuleForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 'rules',
      
      // 告警规则相关
      rulesList: [
        {
          ruleName: '区块链节点离线告警',
          ruleType: 'node',
          triggerCondition: '节点状态为离线超过5分钟',
          alarmLevel: 'critical',
          alarmContent: '区块链节点[{{nodeName}}]已离线，请检查节点状态',
          status: true
        },
        {
          ruleName: '区块链同步异常告警',
          ruleType: 'sync',
          triggerCondition: '区块高度停滞超过10分钟',
          alarmLevel: 'major',
          alarmContent: '区块链同步异常，当前区块高度[{{blockHeight}}]已停滞超过10分钟',
          status: true
        },
        {
          ruleName: '系统CPU使用率告警',
          ruleType: 'system',
          triggerCondition: 'CPU使用率超过90%持续5分钟',
          alarmLevel: 'major',
          alarmContent: '系统CPU使用率过高，当前使用率[{{cpuUsage}}]，已超过阈值',
          status: true
        },
        {
          ruleName: '系统内存使用率告警',
          ruleType: 'system',
          triggerCondition: '内存使用率超过85%持续5分钟',
          alarmLevel: 'major',
          alarmContent: '系统内存使用率过高，当前使用率[{{memoryUsage}}]，已超过阈值',
          status: true
        },
        {
          ruleName: '磁盘空间不足告警',
          ruleType: 'system',
          triggerCondition: '磁盘剩余空间低于10%',
          alarmLevel: 'minor',
          alarmContent: '磁盘空间不足，当前剩余空间[{{diskSpace}}]，低于阈值',
          status: true
        },
        {
          ruleName: '异常登录尝试告警',
          ruleType: 'security',
          triggerCondition: '5分钟内连续3次登录失败',
          alarmLevel: 'critical',
          alarmContent: '检测到异常登录尝试，IP地址[{{ipAddress}}]，可能存在安全风险',
          status: true
        },
        {
          ruleName: '资产数据异常告警',
          ruleType: 'asset',
          triggerCondition: '资产数据校验失败',
          alarmLevel: 'minor',
          alarmContent: '资产数据异常，资产ID[{{assetId}}]，请检查资产记录',
          status: true
        }
      ],
      ruleDialogVisible: false,
      ruleDialogTitle: '新增告警规则',
      ruleForm: {
        ruleName: '',
        ruleType: '',
        triggerCondition: '',
        alarmLevel: '',
        alarmContent: '',
        status: true
      },
      ruleFormRules: {
        ruleName: [
          { required: true, message: '请输入规则名称', trigger: 'blur' }
        ],
        ruleType: [
          { required: true, message: '请选择规则类型', trigger: 'change' }
        ],
        triggerCondition: [
          { required: true, message: '请输入触发条件', trigger: 'blur' }
        ],
        alarmLevel: [
          { required: true, message: '请选择告警级别', trigger: 'change' }
        ],
        alarmContent: [
          { required: true, message: '请输入告警内容模板', trigger: 'blur' }
        ]
      },
      
      // 通知设置相关
      notificationForm: {
        emailEnabled: true,
        emailReceivers: 'admin@example.com,manager@example.com',
        emailLevels: ['critical', 'major'],
        smsEnabled: true,
        smsReceivers: '13800138000,13900139000',
        smsLevels: ['critical'],
        systemEnabled: true,
        systemLevels: ['critical', 'major', 'minor', 'warning']
      },
      
      // 自动处理相关
      autoProcessForm: {
        enabled: true,
        rules: [
          {
            alarmType: 'node',
            action: '自动重启节点服务',
            status: true
          },
          {
            alarmType: 'sync',
            action: '重新启动同步进程',
            status: true
          },
          {
            alarmType: 'system',
            action: '清理系统缓存',
            status: true
          },
          {
            alarmType: 'security',
            action: '锁定账户并通知管理员',
            status: true
          },
          {
            alarmType: 'asset',
            action: '自动修复资产数据',
            status: false
          }
        ]
      },
      autoProcessDialogVisible: false,
      autoProcessRuleForm: {
        alarmType: '',
        alarmTypeText: '',
        action: '',
        status: true
      }
    }
  },
  methods: {
    // 告警规则相关方法
    handleAddRule() {
      this.ruleDialogTitle = '新增告警规则'
      this.ruleForm = {
        ruleName: '',
        ruleType: '',
        triggerCondition: '',
        alarmLevel: '',
        alarmContent: '',
        status: true
      }
      this.ruleDialogVisible = true
    },
    
    editRule(row) {
      this.ruleDialogTitle = '编辑告警规则'
      this.ruleForm = JSON.parse(JSON.stringify(row))
      this.ruleDialogVisible = true
    },
    
    submitRuleForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.ruleDialogTitle === '新增告警规则') {
            // 新增规则
            this.rulesList.push(JSON.parse(JSON.stringify(this.ruleForm)))
          } else {
            // 编辑规则
            const index = this.rulesList.findIndex(item => item.ruleName === this.ruleForm.ruleName)
            if (index !== -1) {
              this.rulesList.splice(index, 1, JSON.parse(JSON.stringify(this.ruleForm)))
            }
          }
          
          this.$message({
            message: this.ruleDialogTitle === '新增告警规则' ? '新增规则成功' : '编辑规则成功',
            type: 'success'
          })
          
          this.ruleDialogVisible = false
        }
      })
    },
    
    deleteRule(row) {
      this.$confirm('确定删除该告警规则吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const index = this.rulesList.findIndex(item => item.ruleName === row.ruleName)
        if (index !== -1) {
          this.rulesList.splice(index, 1)
        }
        
        this.$message({
          message: '删除规则成功',
          type: 'success'
        })
      }).catch(() => {
        // 取消删除
      })
    },
    
    changeRuleStatus(row) {
      this.$message({
        message: row.status ? '规则已启用' : '规则已禁用',
        type: 'success'
      })
    },
    
    // 通知设置相关方法
    saveNotificationSettings() {
      this.$message({
        message: '通知设置保存成功',
        type: 'success'
      })
    },
    
    // 自动处理相关方法
    editAutoProcessRule(row) {
      this.autoProcessRuleForm = JSON.parse(JSON.stringify(row))
      
      // 设置告警类型文本
      const alarmTypeMap = {
        'node': '区块链节点异常',
        'sync': '区块链同步异常',
        'asset': '资产异常',
        'system': '系统异常',
        'security': '安全告警'
      }
      this.autoProcessRuleForm.alarmTypeText = alarmTypeMap[row.alarmType] || '其他'
      
      this.autoProcessDialogVisible = true
    },
    
    submitAutoProcessRuleForm() {
      const index = this.autoProcessForm.rules.findIndex(item => item.alarmType === this.autoProcessRuleForm.alarmType)
      if (index !== -1) {
        this.autoProcessForm.rules[index].action = this.autoProcessRuleForm.action
        this.autoProcessForm.rules[index].status = this.autoProcessRuleForm.status
      }
      
      this.$message({
        message: '自动处理规则保存成功',
        type: 'success'
      })
      
      this.autoProcessDialogVisible = false
    },
    
    saveAutoProcessSettings() {
      this.$message({
        message: '自动处理设置保存成功',
        type: 'success'
      })
    }
  }
}
</script>

<style scoped>
.main-content {
  padding: 20px;
}
.settings-card {
  margin-top: 20px;
}
.operation-buttons {
  margin-bottom: 20px;
}
.notification-settings, .auto-process-settings {
  background-color: #f5f7fa;
  padding: 20px;
  border-radius: 4px;
  margin-bottom: 20px;
}
.notification-form, .auto-process-form {
  max-width: 800px;
  margin: 0 auto;
}
</style> 