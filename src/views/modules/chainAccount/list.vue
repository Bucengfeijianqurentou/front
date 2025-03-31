<template>
  <div class="main-content">
    <!-- 标题 -->
    <div class="title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>区块链服务</el-breadcrumb-item>
        <el-breadcrumb-item>链账户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    
    <!-- 操作按钮 -->
    <div class="operation-buttons">
      <el-button type="primary" @click="handleCreateAccount">创建账户</el-button>
      <el-button type="success" @click="handleImportAccount">导入账户</el-button>
    </div>
    
    <!-- 账户列表 -->
    <div class="account-list">
      <el-card shadow="hover">
        <div slot="header" class="clearfix">
          <span>账户列表</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="refreshDataList">刷新</el-button>
        </div>
        <el-table
          :data="dataList"
          border
          v-loading="dataListLoading"
          style="width: 100%">
          <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
          <el-table-column prop="userName" header-align="center" align="center" label="用户名"></el-table-column>
          <el-table-column prop="address" header-align="center" align="center" label="账户地址">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" :content="scope.row.address" placement="top">
                <span>{{ scope.row.address.substring(0, 10) }}...{{ scope.row.address.substring(scope.row.address.length - 8) }}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" header-align="center" align="center" label="创建时间" width="180"></el-table-column>
          <el-table-column prop="type" header-align="center" align="center" label="账户类型" width="120">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.type === 0" type="primary">普通账户</el-tag>
              <el-tag v-else-if="scope.row.type === 1" type="success">管理员</el-tag>
              <el-tag v-else>其他</el-tag>
            </template>
          </el-table-column>
          <el-table-column header-align="center" align="center" width="200" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="viewAccountDetail(scope.row)">详情</el-button>
              <el-button type="text" size="small" @click="exportPrivateKey(scope.row)">导出私钥</el-button>
              <el-button type="text" size="small" @click="bindUser(scope.row)">绑定用户</el-button>
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
    
    <!-- 创建账户对话框 -->
    <el-dialog
      title="创建区块链账户"
      :visible.sync="createDialogVisible"
      width="40%">
      <el-form :model="accountForm" :rules="accountRules" ref="accountForm" label-width="100px">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="accountForm.userName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="账户类型" prop="type">
          <el-select v-model="accountForm.type" placeholder="请选择账户类型">
            <el-option label="普通账户" :value="0"></el-option>
            <el-option label="管理员" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="accountForm.remark" type="textarea" placeholder="请输入备注信息"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="createDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitCreateAccount" :loading="createLoading">确 定</el-button>
      </span>
    </el-dialog>
    
    <!-- 导入账户对话框 -->
    <el-dialog
      title="导入区块链账户"
      :visible.sync="importDialogVisible"
      width="40%">
      <el-form :model="importForm" :rules="importRules" ref="importForm" label-width="100px">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="importForm.userName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="私钥" prop="privateKey">
          <el-input v-model="importForm.privateKey" placeholder="请输入私钥" show-password></el-input>
        </el-form-item>
        <el-form-item label="账户类型" prop="type">
          <el-select v-model="importForm.type" placeholder="请选择账户类型">
            <el-option label="普通账户" :value="0"></el-option>
            <el-option label="管理员" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="importForm.remark" type="textarea" placeholder="请输入备注信息"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="importDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitImportAccount" :loading="importLoading">确 定</el-button>
      </span>
    </el-dialog>
    
    <!-- 账户详情对话框 -->
    <el-dialog
      title="账户详情"
      :visible.sync="detailDialogVisible"
      width="50%">
      <div class="account-detail">
        <el-descriptions title="基本信息" :column="2" border>
          <el-descriptions-item label="用户名">{{ currentAccount.userName }}</el-descriptions-item>
          <el-descriptions-item label="账户类型">
            <el-tag v-if="currentAccount.type === 0" type="primary">普通账户</el-tag>
            <el-tag v-else-if="currentAccount.type === 1" type="success">管理员</el-tag>
            <el-tag v-else>其他</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="账户地址" :span="2">{{ currentAccount.address }}</el-descriptions-item>
          <el-descriptions-item label="公钥" :span="2">{{ currentAccount.publicKey }}</el-descriptions-item>
          <el-descriptions-item label="创建时间">{{ currentAccount.createTime }}</el-descriptions-item>
          <el-descriptions-item label="绑定用户">{{ currentAccount.bindUser || '未绑定' }}</el-descriptions-item>
          <el-descriptions-item label="备注" :span="2">{{ currentAccount.remark || '无' }}</el-descriptions-item>
        </el-descriptions>
      </div>
    </el-dialog>
    
    <!-- 导出私钥对话框 -->
    <el-dialog
      title="导出私钥"
      :visible.sync="exportDialogVisible"
      width="40%">
      <div class="export-warning">
        <el-alert
          title="安全警告"
          type="warning"
          description="私钥是您账户的唯一凭证，请妥善保管，不要泄露给他人！"
          show-icon
          :closable="false">
        </el-alert>
      </div>
      <div class="export-content" style="margin-top: 20px;">
        <el-form label-width="80px">
          <el-form-item label="账户地址">
            <el-input v-model="currentAccount.address" readonly></el-input>
          </el-form-item>
          <el-form-item label="私钥">
            <el-input v-model="privateKeyValue" readonly type="password" placeholder="请输入密码验证身份后查看">
              <el-button slot="append" @click="togglePrivateKeyVisible">
                {{ privateKeyVisible ? '隐藏' : '显示' }}
              </el-button>
            </el-input>
          </el-form-item>
          <el-form-item v-if="!privateKeyVisible" label="密码验证">
            <el-input v-model="verifyPassword" type="password" placeholder="请输入您的登录密码" show-password></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="exportDialogVisible = false">关 闭</el-button>
        <el-button v-if="!privateKeyVisible" type="primary" @click="verifyAndShowPrivateKey" :loading="verifyLoading">验 证</el-button>
        <el-button v-else type="success" @click="copyPrivateKey">复制私钥</el-button>
      </span>
    </el-dialog>
    
    <!-- 绑定用户对话框 -->
    <el-dialog
      title="绑定用户"
      :visible.sync="bindDialogVisible"
      width="40%">
      <el-form :model="bindForm" ref="bindForm" label-width="100px">
        <el-form-item label="账户地址">
          <el-input v-model="currentAccount.address" readonly></el-input>
        </el-form-item>
        <el-form-item label="选择用户" prop="userId">
          <el-select v-model="bindForm.userId" placeholder="请选择用户" filterable>
            <el-option
              v-for="item in userList"
              :key="item.id"
              :label="item.username"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="bindDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitBindUser" :loading="bindLoading">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      
      // 创建账户相关
      createDialogVisible: false,
      accountForm: {
        userName: '',
        type: 0,
        remark: ''
      },
      accountRules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择账户类型', trigger: 'change' }
        ]
      },
      createLoading: false,
      
      // 导入账户相关
      importDialogVisible: false,
      importForm: {
        userName: '',
        privateKey: '',
        type: 0,
        remark: ''
      },
      importRules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        privateKey: [
          { required: true, message: '请输入私钥', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择账户类型', trigger: 'change' }
        ]
      },
      importLoading: false,
      
      // 账户详情相关
      detailDialogVisible: false,
      currentAccount: {},
      
      // 导出私钥相关
      exportDialogVisible: false,
      privateKeyValue: '',
      privateKeyVisible: false,
      verifyPassword: '',
      verifyLoading: false,
      
      // 绑定用户相关
      bindDialogVisible: false,
      bindForm: {
        userId: ''
      },
      userList: [],
      bindLoading: false
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
        this.totalPage = 100
        this.dataListLoading = false
      }, 500)
    },
    // 模拟数据
    getMockData() {
      const mockData = []
      for (let i = 0; i < 10; i++) {
        mockData.push({
          id: i + 1,
          userName: '用户' + (i + 1),
          address: '0x' + Math.random().toString(16).substring(2, 42),
          publicKey: '0x' + Math.random().toString(16).substring(2, 130),
          privateKey: '0x' + Math.random().toString(16).substring(2, 66),
          type: i % 3 === 0 ? 1 : 0,
          createTime: this.formatDate(new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000))),
          bindUser: i % 2 === 0 ? '用户' + (i + 1) : '',
          remark: i % 2 === 0 ? '这是账户' + (i + 1) + '的备注信息' : ''
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
    // 刷新数据列表
    refreshDataList() {
      this.getDataList()
    },
    // 处理创建账户
    handleCreateAccount() {
      this.accountForm = {
        userName: '',
        type: 0,
        remark: ''
      }
      this.createDialogVisible = true
    },
    // 提交创建账户
    submitCreateAccount() {
      this.$refs.accountForm.validate(valid => {
        if (valid) {
          this.createLoading = true
          // 调用创建账户接口
          setTimeout(() => {
            this.$message({
              message: '账户创建成功',
              type: 'success'
            })
            this.createLoading = false
            this.createDialogVisible = false
            this.getDataList()
          }, 1000)
        }
      })
    },
    // 处理导入账户
    handleImportAccount() {
      this.importForm = {
        userName: '',
        privateKey: '',
        type: 0,
        remark: ''
      }
      this.importDialogVisible = true
    },
    // 提交导入账户
    submitImportAccount() {
      this.$refs.importForm.validate(valid => {
        if (valid) {
          this.importLoading = true
          // 调用导入账户接口
          setTimeout(() => {
            this.$message({
              message: '账户导入成功',
              type: 'success'
            })
            this.importLoading = false
            this.importDialogVisible = false
            this.getDataList()
          }, 1000)
        }
      })
    },
    // 查看账户详情
    viewAccountDetail(row) {
      this.currentAccount = JSON.parse(JSON.stringify(row))
      this.detailDialogVisible = true
    },
    // 导出私钥
    exportPrivateKey(row) {
      this.currentAccount = JSON.parse(JSON.stringify(row))
      this.privateKeyValue = ''
      this.privateKeyVisible = false
      this.verifyPassword = ''
      this.exportDialogVisible = true
    },
    // 切换私钥显示状态
    togglePrivateKeyVisible() {
      if (this.privateKeyVisible) {
        this.privateKeyVisible = false
      } else if (this.privateKeyValue) {
        this.privateKeyVisible = true
      }
    },
    // 验证并显示私钥
    verifyAndShowPrivateKey() {
      if (!this.verifyPassword) {
        this.$message.error('请输入密码')
        return
      }
      this.verifyLoading = true
      // 调用验证接口
      setTimeout(() => {
        this.privateKeyValue = this.currentAccount.privateKey
        this.privateKeyVisible = true
        this.verifyLoading = false
      }, 1000)
    },
    // 复制私钥
    copyPrivateKey() {
      const input = document.createElement('input')
      input.value = this.privateKeyValue
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
      this.$message({
        message: '私钥已复制到剪贴板',
        type: 'success'
      })
    },
    // 绑定用户
    bindUser(row) {
      this.currentAccount = JSON.parse(JSON.stringify(row))
      this.bindForm = {
        userId: ''
      }
      // 获取用户列表
      this.getUserList()
      this.bindDialogVisible = true
    },
    // 获取用户列表
    getUserList() {
      // 模拟数据，实际项目中应该调用后端接口
      this.userList = []
      for (let i = 0; i < 20; i++) {
        this.userList.push({
          id: i + 1,
          username: '用户' + (i + 1)
        })
      }
    },
    // 提交绑定用户
    submitBindUser() {
      if (!this.bindForm.userId) {
        this.$message.error('请选择用户')
        return
      }
      this.bindLoading = true
      // 调用绑定接口
      setTimeout(() => {
        this.$message({
          message: '用户绑定成功',
          type: 'success'
        })
        this.bindLoading = false
        this.bindDialogVisible = false
        this.getDataList()
      }, 1000)
    }
  }
}
</script>

<style scoped>
.main-content {
  padding: 20px;
}
.operation-buttons {
  margin-top: 20px;
  margin-bottom: 20px;
}
.account-list {
  margin-bottom: 20px;
}
.account-detail {
  padding: 10px;
}
.export-warning {
  margin-bottom: 20px;
}
</style> 