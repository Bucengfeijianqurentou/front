<template>
  <div class="main-content">
    <!-- 统计信息卡片 -->
    <el-card class="stats-card" shadow="hover">
      <div class="stats-info">
        <div class="stats-item">
          <div class="stats-label">当前借用资产总数</div>
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
              <el-button type="success" icon="el-icon-tickets" size="mini"
                @click="viewDetails(scope.row.id)">详情</el-button>
              <el-button type="warning" icon="el-icon-back" size="mini" @click="guihuan(scope.row.id)">归还</el-button>
              <el-button type="warning" icon="el-icon-s-tools" size="mini"
                @click="applyForRepair(scope.row)">申请维修</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex"
        :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage"
        layout="total, sizes, prev, pager, next, jumper" style="margin-top: 20px; text-align: center">
      </el-pagination>
    </div>
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
      userId: this.$storage.get('userId') // 当前用户ID
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
          guihuanTypes: 1 // 1表示借用中
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
          guihuanTypes: 1
        }
      }).then(({ data }) => {
        if (data && data.code === 0) {
          const list = data.data.list
          // 准备Excel数据
          const header = ['资产编号', '资产名称', '资产类型', '存放地点', '借用数量', '预计归还时间', '借用时间', '交易哈希']
          const filterVal = ['shangpinUuidNumber', 'shangpinName', 'shangpinValue', 'didianValue', 'jieyongNumber', 'guihuanTime', 'insertTime', 'transactionHash']
          const excelData = list.map(item => filterVal.map(key => item[key]))

          import('@/vendor/Export2Excel').then(excel => {
            excel.export_json_to_excel({
              header: header,
              data: excelData,
              filename: '我的资产列表',
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
    // 归还资产
    guihuan(id) {
      this.$confirm('确认要归还该资产吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: `jieyong/guihuan/${id}`,
          method: 'post'
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.$message.success('已提交归还申请')
            this.getDataList()
          } else {
            this.$message.error(data.msg)
          }
        })
      })
    },
    // 申请维修
    applyForRepair(row) {
      this.$router.push({
        path: '/index/weixiu',
        query: {
          shangpinId: row.shangpinId,
          jieyongId: row.id
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
}
</style> 