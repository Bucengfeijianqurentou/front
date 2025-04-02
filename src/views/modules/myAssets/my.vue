<template>
  <div class="main-content">
    <!-- 统计信息卡片 -->
    <el-card class="stats-card" shadow="hover">
      <div class="stats-info">
        <div class="stats-item">
          <div class="stats-label">我的资产</div>
          <div class="stats-value">{{ totalPage }} 件</div>
        </div>
        <div class="export-button">
          <el-button type="primary" icon="el-icon-download" size="small" @click="handleExport" :loading="exportLoading">
            导出资产信息
          </el-button>
        </div>
      </div>
    </el-card>

    <div class="table-content" style="overflow: visible; width: 100%; margin-top: 20px;">
      <el-table class="tables" :data="dataList" v-loading="dataListLoading" :border="true" :stripe="true" size="mini"
        style="width: 100%">
        <el-table-column type="index" label="索引" width="50"></el-table-column>

        <el-table-column prop="shangpinUuidNumber" label="资产编号" width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.shangpinUuidNumber }}
          </template>
        </el-table-column>

        <el-table-column prop="shangpinName" label="资产名称" width="150" align="center">
          <template slot-scope="scope">
            {{ scope.row.shangpinName }}
          </template>
        </el-table-column>

        <el-table-column prop="shangpinTypes" label="资产类型" width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.shangpinValue }}
          </template>
        </el-table-column>

        <el-table-column prop="didianTypes" label="存放地点" width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.didianValue }}
          </template>
        </el-table-column>

        <el-table-column prop="jieyongNumber" label="借用数量" width="100" align="center">
          <template slot-scope="scope">
            {{ scope.row.jieyongNumber }}
          </template>
        </el-table-column>

        <el-table-column prop="guihuanTime" label="预计归还时间" width="150" align="center">
          <template slot-scope="scope">
            {{ scope.row.guihuanTime }}
          </template>
        </el-table-column>

        <el-table-column prop="insertTime" label="借用时间" width="150" align="center">
          <template slot-scope="scope">
            {{ scope.row.insertTime }}
          </template>
        </el-table-column>

        <el-table-column prop="transactionHash" label="交易哈希" width="120" align="center">
          <template slot-scope="scope">
            <el-popover placement="top-start" title="交易哈希" width="300" trigger="hover">
              <div style="word-break: break-all;">{{ scope.row.transactionHash }}</div>
              <div style="margin-top: 10px;">
                <el-button size="mini" type="text" @click="copyToClipboard(scope.row.transactionHash)">复制</el-button>
              </div>
              <div slot="reference" class="hash-cell">
                {{ scope.row.transactionHash ? scope.row.transactionHash.substring(0, 8) + '...' : '' }}
              </div>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column label="操作" min-width="180" align="center">
          <template slot-scope="scope">
            <div class="operation-buttons">
              <el-button type="success" icon="el-icon-tickets" size="mini" @click="viewDetails(scope.row.id)">详情</el-button>
              <el-button type="primary" icon="el-icon-share" size="mini" @click="handleTransfer(scope.row)">转让</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex"
        :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage"
        layout="total, sizes, prev, pager, next, jumper" style="margin-top: 20px; text-align: center">
      </el-pagination>
    </div>

    <!-- 转让对话框 -->
    <el-dialog title="资产转让" :visible.sync="transferDialogVisible" width="500px" @close="closeTransferDialog">
      <el-form :model="transferForm" :rules="transferRules" ref="transferForm" label-width="100px">
        <el-form-item label="接收用户" prop="toId">
          <el-select v-model="transferForm.toId" filterable placeholder="请选择接收用户" style="width: 100%">
            <el-option
              v-for="item in userList"
              :key="item.id"
              :label="item.yonghuName + ' (' + item.yonghuPhone + ')'"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资产信息" class="asset-info">
          <div>资产名称：{{ currentAsset.shangpinName }}</div>
          <div>资产编号：{{ currentAsset.shangpinUuidNumber }}</div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeTransferDialog">取 消</el-button>
        <el-button type="primary" @click="submitTransfer" :loading="transferLoading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'MyAssets',
  data() {
    return {
      dataList: [], // 数据列表
      pageIndex: 1, // 当前页码
      pageSize: 10, // 每页显示条数
      totalPage: 0, // 总条数
      dataListLoading: false, // 数据列表加载状态
      exportLoading: false, // 导出按钮加载状态
      userId: this.$storage.get('userId'), // 当前用户ID
      transferDialogVisible: false, // 转让对话框可见性
      transferLoading: false, // 转让提交加载状态
      userList: [], // 用户列表
      currentAsset: {}, // 当前选中的资产
      transferForm: {
        toId: '', // 接收用户ID
      },
      transferRules: {
        toId: [
          { required: true, message: '请选择接收用户', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true
      this.$http({
        url: 'jieyong/page',
        method: 'get',
        params: {
          page: this.pageIndex,
          limit: this.pageSize,
          userId: this.userId,
          guihuanTypes: 1 // 1表示未归还
        }
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataList = data.data.list
          this.totalPage = data.data.total
        }
        this.dataListLoading = false
      })
    },
    // 导出Excel
    handleExport() {
      this.exportLoading = true
      // 获取所有数据
      this.$http({
        url: 'jieyong/page',
        method: 'get',
        params: {
          page: 1,
          limit: 10000, // 设置较大的数值以获取所有数据
          userId: this.userId,
          guihuanTypes: 1 // 1表示未归还
        }
      }).then(({ data }) => {
        if (data && data.code === 0) {
          const list = data.data.list
          // 准备Excel数据
          const header = ['资产编号', '资产名称', '资产类型', '存放地点', '借用数量', '借用时间', '交易哈希']
          const filterVal = ['shangpinUuidNumber', 'shangpinName', 'shangpinValue', 'didianValue', 'jieyongNumber', 'insertTime', 'transactionHash']
          const excelData = list.map(item => filterVal.map(key => item[key]))

          import('@/vendor/Export2Excel').then(excel => {
            excel.export_json_to_excel({
              header: header,
              data: excelData,
              filename: '我的未归还资产列表',
              autoWidth: true,
              bookType: 'xlsx'
            })
            this.exportLoading = false
            this.$message.success('导出成功')
          })
        }
      }).catch(() => {
        this.exportLoading = false
        this.$message.error('导出失败')
      })
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
    // 复制交易哈希
    copyToClipboard(text) {
      const textarea = document.createElement('textarea')
      textarea.value = text
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      this.$message.success('复制成功')
    },
    // 查看详情
    viewDetails(id) {
      this.$router.push(`/index/jieyong?id=${id}&type=info`)
    },
    // 打开转让对话框
    handleTransfer(row) {
      this.currentAsset = row
      this.transferDialogVisible = true
      this.loadUserList()
    },
    // 加载用户列表
    loadUserList() {
      this.$http({
        url: 'yonghu/list',
        method: 'get'
      }).then(({ data }) => {
        if (data && data.code === 0) {
          // 过滤掉当前用户
          this.userList = data.data.filter(user => user.id !== parseInt(this.userId))
        }
      })
    },
    // 关闭转让对话框
    closeTransferDialog() {
      this.transferDialogVisible = false
      this.transferForm.toId = ''
      this.$refs.transferForm && this.$refs.transferForm.resetFields()
    },
    // 提交转让
    submitTransfer() {
      this.$refs.transferForm.validate(valid => {
        if (valid) {
          this.transferLoading = true
          const transferData = {
            fromId: parseInt(this.userId),
            toId: this.transferForm.toId,
            shangpinId: this.currentAsset.id,
            shangpinName: this.currentAsset.shangpinName,
            status: 1 // 1: 未接收
          }

          this.$http({
            url: 'zhuanrang/save',
            method: 'post',
            data: transferData
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.$message.success('转让申请已提交')
              this.closeTransferDialog()
              this.getDataList() // 刷新列表
            } else {
              this.$message.error(data.msg || '转让失败')
            }
            this.transferLoading = false
          }).catch(() => {
            this.$message.error('转让失败')
            this.transferLoading = false
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.main-content {
  padding: 20px;

  .stats-card {
    margin-bottom: 20px;

    .stats-info {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .stats-item {
        .stats-label {
          font-size: 14px;
          color: #606266;
          margin-bottom: 8px;
        }

        .stats-value {
          font-size: 24px;
          color: #303133;
          font-weight: bold;
        }
      }
    }
  }

  .operation-buttons {
    .el-button {
      margin: 2px;
    }
  }

  .hash-cell {
    cursor: pointer;
    color: #409EFF;

    &:hover {
      text-decoration: underline;
    }
  }

  .asset-info {
    margin-top: 15px;
    div {
      margin-bottom: 8px;
      color: #606266;
    }
  }

  .el-dialog {
    .el-select {
      width: 100%;
    }
  }
}
</style> 