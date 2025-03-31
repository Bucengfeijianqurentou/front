<template>
  <div class="main-content">
    <!-- 标题 -->
    <div class="title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>区块链服务</el-breadcrumb-item>
        <el-breadcrumb-item>资产上链</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    
    <!-- 搜索区域 -->
    <div class="search-form">
      <el-form :inline="true" :model="searchForm" class="form-inline">
        <el-form-item label="资产名称">
          <el-input v-model="searchForm.name" placeholder="资产名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="资产编号">
          <el-input v-model="searchForm.code" placeholder="资产编号" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getDataList()">查询</el-button>
          <el-button @click="resetSearchForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    
    <!-- 资产列表 -->
    <div class="asset-list">
      <el-card shadow="hover">
        <div slot="header" class="clearfix">
          <span>资产列表</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="refreshDataList">刷新</el-button>
        </div>
        <el-table
          :data="dataList"
          border
          v-loading="dataListLoading"
          style="width: 100%">
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column prop="shangpinName" header-align="center" align="center" label="资产名称"></el-table-column>
          <el-table-column prop="shangpinUuid" header-align="center" align="center" label="资产编号"></el-table-column>
          <el-table-column prop="shangpinTypes" header-align="center" align="center" label="资产分类"></el-table-column>
          <el-table-column prop="didianName" header-align="center" align="center" label="存放地点"></el-table-column>
          <el-table-column prop="shangpinValue" header-align="center" align="center" label="资产价值"></el-table-column>
          <el-table-column prop="onChain" header-align="center" align="center" label="上链状态">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.onChain" type="success">已上链</el-tag>
              <el-tag v-else type="info">未上链</el-tag>
            </template>
          </el-table-column>
          <el-table-column header-align="center" align="center" width="150" label="操作">
            <template slot-scope="scope">
              <el-button v-if="!scope.row.onChain" type="text" size="small" @click="handleChain(scope.row)">上链</el-button>
              <el-button v-else type="text" size="small" @click="viewChainInfo(scope.row)">查看</el-button>
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
    
    <!-- 上链确认对话框 -->
    <el-dialog
      title="资产上链确认"
      :visible.sync="chainDialogVisible"
      width="30%">
      <div class="chain-confirm">
        <p>确认将以下资产信息上传至区块链？</p>
        <p><strong>资产名称：</strong>{{ currentAsset.shangpinName }}</p>
        <p><strong>资产编号：</strong>{{ currentAsset.shangpinUuid }}</p>
        <p><strong>资产分类：</strong>{{ currentAsset.shangpinTypes }}</p>
        <p><strong>资产价值：</strong>{{ currentAsset.shangpinValue }}</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="chainDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmChain" :loading="chainLoading">确 定</el-button>
      </span>
    </el-dialog>
    
    <!-- 区块链信息对话框 -->
    <el-dialog
      title="区块链信息"
      :visible.sync="chainInfoDialogVisible"
      width="50%">
      <div class="chain-info">
        <el-descriptions title="资产信息" :column="2" border>
          <el-descriptions-item label="资产名称">{{ currentAsset.shangpinName }}</el-descriptions-item>
          <el-descriptions-item label="资产编号">{{ currentAsset.shangpinUuid }}</el-descriptions-item>
          <el-descriptions-item label="资产分类">{{ currentAsset.shangpinTypes }}</el-descriptions-item>
          <el-descriptions-item label="资产价值">{{ currentAsset.shangpinValue }}</el-descriptions-item>
          <el-descriptions-item label="上链时间">{{ currentAsset.chainTime }}</el-descriptions-item>
          <el-descriptions-item label="交易哈希">
            <el-tag type="success">{{ currentAsset.txHash || '0x123456789...' }}</el-tag>
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {
        name: '',
        code: ''
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      chainDialogVisible: false,
      chainInfoDialogVisible: false,
      currentAsset: {},
      chainLoading: false
    }
  },
  created() {
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true
      
      // 使用模拟数据替代API调用
      setTimeout(() => {
        this.dataList = this.getMockData()
        this.totalPage = 100
        this.dataListLoading = false
      }, 500)
      
      // 注释掉原来的API调用代码
      /*
      this.$http({
        url: this.$api.shangpinList,
        method: 'get',
        params: {
          page: this.pageIndex,
          limit: this.pageSize,
          shangpinName: this.searchForm.name,
          shangpinUuid: this.searchForm.code
        }
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataList = data.data.list
          this.totalPage = data.data.total
        }
        this.dataListLoading = false
      })
      */
    },
    
    // 添加模拟数据生成方法
    getMockData() {
      const assetTypes = ['电子设备', '办公家具', '实验设备', '教学设备', '体育器材', '图书资料']
      const locations = ['教学楼A区', '实验楼B区', '图书馆', '行政楼', '体育馆', '学生宿舍']
      
      let mockData = []
      for (let i = 0; i < 10; i++) {
        const isOnChain = i % 3 === 0 // 每3个数据中有1个已上链
        mockData.push({
          id: 1000 + i,
          shangpinName: ['笔记本电脑', '办公桌椅', '显微镜', '投影仪', '篮球架', '专业书籍'][i % 6] + ' ' + (i + 1),
          shangpinUuid: 'ASSET-' + (10000 + i),
          shangpinTypes: assetTypes[i % 6],
          didianName: locations[i % 6],
          shangpinValue: (Math.floor(Math.random() * 10) + 1) * 1000,
          onChain: isOnChain,
          chainTime: isOnChain ? this.formatDate(new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000))) : '',
          txHash: isOnChain ? '0x' + Math.random().toString(16).substring(2, 50) : ''
        })
      }
      
      // 如果有搜索条件，进行过滤
      if (this.searchForm.name) {
        mockData = mockData.filter(item => item.shangpinName.includes(this.searchForm.name))
      }
      if (this.searchForm.code) {
        mockData = mockData.filter(item => item.shangpinUuid.includes(this.searchForm.code))
      }
      
      return mockData
    },
    
    // 添加日期格式化方法
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
        name: '',
        code: ''
      }
      this.getDataList()
    },
    // 刷新数据列表
    refreshDataList() {
      this.getDataList()
    },
    // 处理上链
    handleChain(row) {
      this.currentAsset = row
      this.chainDialogVisible = true
    },
    // 确认上链
    confirmChain() {
      this.chainLoading = true
      
      // 使用模拟数据替代API调用
      setTimeout(() => {
        // 模拟上链成功
        this.$message({
          message: '资产上链成功',
          type: 'success'
        })
        
        // 更新当前资产的上链状态
        const index = this.dataList.findIndex(item => item.id === this.currentAsset.id)
        if (index !== -1) {
          this.dataList[index].onChain = true
          this.dataList[index].chainTime = this.formatDate(new Date())
          this.dataList[index].txHash = '0x' + Math.random().toString(16).substring(2, 50)
        }
        
        this.chainLoading = false
        this.chainDialogVisible = false
      }, 1500)
      
      // 注释掉原来的API调用代码
      /*
      this.$http({
        url: this.$api.assetCreateAsset || '/chain/createAsset',
        method: 'post',
        data: {
          assetId: this.currentAsset.id,
          assetName: this.currentAsset.shangpinName,
          assetCode: this.currentAsset.shangpinUuid,
          assetType: this.currentAsset.shangpinTypes,
          assetValue: this.currentAsset.shangpinValue
        }
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.$message({
            message: '资产上链成功',
            type: 'success'
          })
          // 更新资产上链状态
          this.getDataList()
        } else {
          this.$message.error(data.msg || '资产上链失败')
        }
        this.chainLoading = false
        this.chainDialogVisible = false
      }).catch(() => {
        this.chainLoading = false
        this.chainDialogVisible = false
      })
      */
    },
    // 查看区块链信息
    viewChainInfo(row) {
      this.currentAsset = row
      this.chainInfoDialogVisible = true
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
.asset-list {
  margin-bottom: 20px;
}
.chain-confirm {
  line-height: 1.8;
}
.chain-info {
  padding: 10px;
}
</style> 