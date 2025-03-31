<template>
  <div class="main-content">
    <!-- 标题 -->
    <div class="title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>区块链服务</el-breadcrumb-item>
        <el-breadcrumb-item>交易记录</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    
    <!-- 搜索区域 -->
    <div class="search-form">
      <el-form :inline="true" :model="searchForm" class="form-inline">
        <el-form-item label="交易类型">
          <el-select v-model="searchForm.transactionType" placeholder="交易类型" clearable>
            <el-option label="资产创建" value="资产创建"></el-option>
            <el-option label="资产借用" value="资产借用"></el-option>
            <el-option label="资产归还" value="资产归还"></el-option>
            <el-option label="资产维修" value="资产维修"></el-option>
            <el-option label="资产报废" value="资产报废"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易哈希">
          <el-input v-model="searchForm.transactionHash" placeholder="交易哈希" clearable></el-input>
        </el-form-item>
        <el-form-item label="交易时间">
          <el-date-picker
            v-model="searchForm.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getDataList()">查询</el-button>
          <el-button @click="resetSearchForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    
    <!-- 交易记录列表 -->
    <div class="transaction-list">
      <el-card shadow="hover">
        <div slot="header" class="clearfix">
          <span>交易记录</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="refreshDataList">刷新</el-button>
        </div>
        <el-table
          :data="dataList"
          border
          v-loading="dataListLoading"
          style="width: 100%">
          <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
          <el-table-column prop="transactionHash" header-align="center" align="center" label="交易哈希">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" :content="scope.row.transactionHash" placement="top">
                <span>{{ formatHash(scope.row.transactionHash) }}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="blockNumber" header-align="center" align="center" label="区块高度" width="120"></el-table-column>
          <el-table-column prop="transactionType" header-align="center" align="center" label="交易类型" width="120">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.transactionType === '资产创建'" type="success">资产创建</el-tag>
              <el-tag v-else-if="scope.row.transactionType === '资产借用'" type="warning">资产借用</el-tag>
              <el-tag v-else-if="scope.row.transactionType === '资产归还'" type="info">资产归还</el-tag>
              <el-tag v-else-if="scope.row.transactionType === '资产维修'" type="primary">资产维修</el-tag>
              <el-tag v-else-if="scope.row.transactionType === '资产报废'" type="danger">资产报废</el-tag>
              <el-tag v-else>{{scope.row.transactionType}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="assertId" header-align="center" align="center" label="资产ID" width="120"></el-table-column>
          <el-table-column prop="user" header-align="center" align="center" label="操作人"></el-table-column>
          <el-table-column prop="fromAddress" header-align="center" align="center" label="发起地址">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" :content="scope.row.fromAddress" placement="top">
                <span>{{ formatHash(scope.row.fromAddress) }}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="time" header-align="center" align="center" label="交易时间" width="180"></el-table-column>
          <el-table-column header-align="center" align="center" width="100" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="viewTxDetail(scope.row)">详情</el-button>
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
    
    <!-- 交易详情对话框 -->
    <el-dialog
      title="交易详情"
      :visible.sync="txDetailDialogVisible"
      width="60%">
      <div class="tx-detail">
        <el-descriptions title="基本信息" :column="2" border>
          <el-descriptions-item label="交易哈希">{{ currentTx.transactionHash }}</el-descriptions-item>
          <el-descriptions-item label="区块高度">{{ currentTx.blockNumber }}</el-descriptions-item>
          <el-descriptions-item label="交易类型">
            <el-tag v-if="currentTx.transactionType === '资产创建'" type="success">资产创建</el-tag>
            <el-tag v-else-if="currentTx.transactionType === '资产借用'" type="warning">资产借用</el-tag>
            <el-tag v-else-if="currentTx.transactionType === '资产归还'" type="info">资产归还</el-tag>
            <el-tag v-else-if="currentTx.transactionType === '资产维修'" type="primary">资产维修</el-tag>
            <el-tag v-else-if="currentTx.transactionType === '资产报废'" type="danger">资产报废</el-tag>
            <el-tag v-else>{{currentTx.transactionType}}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="交易时间">{{ currentTx.time }}</el-descriptions-item>
          <el-descriptions-item label="发起地址" :span="2">{{ currentTx.fromAddress }}</el-descriptions-item>
        </el-descriptions>
        
        <el-descriptions title="资产信息" :column="2" border style="margin-top: 20px;">
          <el-descriptions-item label="资产ID">{{ currentTx.assertId }}</el-descriptions-item>
          <el-descriptions-item label="操作人">{{ currentTx.user }}</el-descriptions-item>
        </el-descriptions>
        
        <div class="tx-json" style="margin-top: 20px;" v-if="currentTx.transactionData">
          <p><strong>交易数据：</strong></p>
          <pre>{{ formatJsonData(currentTx.transactionData) }}</pre>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { adornUrl, adornParams } from '@/utils/utils'
import http from '@/utils/http'

export default {
  data() {
    return {
      searchForm: {
        transactionType: '',
        transactionHash: '',
        dateRange: []
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      txDetailDialogVisible: false,
      currentTx: {}
    }
  },
  created() {
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true
      
      // 构建查询参数
      let params = {
        page: this.pageIndex,  // 当前页码
        limit: this.pageSize,  // 每页记录数
        orderBy: 'id'         // 排序字段
      }
      
      // 添加交易类型查询条件
      if (this.searchForm.transactionType) {
        params.transactionType = this.searchForm.transactionType
      }
      
      // 添加交易哈希查询条件
      if (this.searchForm.transactionHash) {
        params.transactionHash = this.searchForm.transactionHash
      }
      
      // 添加时间范围查询条件
      if (this.searchForm.dateRange && this.searchForm.dateRange.length === 2) {
        params.timeStart = this.searchForm.dateRange[0] + ' 00:00:00'
        params.timeEnd = this.searchForm.dateRange[1] + ' 23:59:59'
      }
      
      console.log('发送请求参数:', params)
      
      // 调用后端接口获取交易记录数据
      // 使用正确的URL格式，不要重复添加/xiaoyuanzichan前缀
      const requestUrl = `/transaction/page`;
      
      console.log('请求URL:', requestUrl);
      
      // 添加请求头信息以便调试
      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };
      
      // 发送请求
      http({
        url: requestUrl,
        method: 'get',
        params: adornParams(params),
        headers
      }).then(({data}) => {
        console.log('接收到响应数据:', data)
        if (data && data.code === 0) {
          // 更新数据列表和分页信息
          this.dataList = data.data.list
          this.totalPage = data.data.total    // 总记录数
          this.pageSize = data.data.pageSize  // 每页大小
          this.pageIndex = data.data.currPage // 当前页码
          console.log('处理后的数据列表:', this.dataList)
        } else {
          this.dataList = []
          this.totalPage = 0
          console.error('API返回错误:', data)
          this.$message.error(data ? data.msg || '获取数据失败' : '获取数据失败')
        }
        this.dataListLoading = false
      }).catch((error) => {
        console.error('API请求异常:', error)
        console.error('请求URL:', requestUrl)
        console.error('请求参数:', params)
        this.$message.error('获取数据失败：' + (error.message || '未知错误'))
        
        // 如果常规请求失败，尝试使用axios直接请求
        console.log('尝试使用备用请求方式...');
        this.tryAlternativeRequest(requestUrl, params);
        
        this.dataList = []
        this.totalPage = 0
        this.dataListLoading = false
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
    // 重置搜索表单
    resetSearchForm() {
      this.searchForm = {
        transactionType: '',
        transactionHash: '',
        dateRange: []
      }
      this.getDataList()
    },
    // 刷新数据列表
    refreshDataList() {
      this.getDataList()
    },
    // 查看交易详情
    viewTxDetail(row) {
      this.currentTx = JSON.parse(JSON.stringify(row))
      this.txDetailDialogVisible = true
    },
    // 格式化哈希值显示
    formatHash(hash) {
      if (!hash) return ''
      if (hash.length <= 16) return hash
      return hash.substring(0, 8) + '...' + hash.substring(hash.length - 8)
    },
    // 格式化JSON数据
    formatJsonData(data) {
      try {
        if (typeof data === 'string') {
          // 尝试美化JSON字符串
          const parsedData = JSON.parse(data);
          
          // 如果存在params对象，可以进一步处理
          if (parsedData.params) {
            // 将HTML内容转换为纯文本
            if (parsedData.params.baofeiContent) {
              parsedData.params.baofeiContent = this.stripHtml(parsedData.params.baofeiContent);
            }
            if (parsedData.params.weixiuContent) {
              parsedData.params.weixiuContent = this.stripHtml(parsedData.params.weixiuContent);
            }
          }
          
          return JSON.stringify(parsedData, null, 2);
        } else {
          return JSON.stringify(data, null, 2);
        }
      } catch (e) {
        console.error('解析交易数据失败:', e);
        return data;
      }
    },
    
    // 去除HTML标签
    stripHtml(html) {
      if (!html) return '';
      return html.replace(/<\/?[^>]+(>|$)/g, "");
    },
    
    // 备用请求方法
    tryAlternativeRequest(url, params) {
      // 导入axios
      const axios = require('axios');
      
      // 设置请求头
      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };
      
      // 构建完整的URL
      const fullUrl = `/xiaoyuanzichan${url}`;
      console.log('备用请求使用URL:', fullUrl);
      
      // 直接使用axios发送请求
      axios.get(fullUrl, { 
        params: adornParams(params),
        headers
      })
      .then(response => {
        console.log('备用请求成功:', response.data);
        if (response.data && response.data.code === 0) {
          // 更新数据列表和分页信息
          this.dataList = response.data.data.list;
          this.totalPage = response.data.data.total;
          this.pageSize = response.data.data.pageSize;
          this.pageIndex = response.data.data.currPage;
          this.dataListLoading = false;
        }
      })
      .catch(error => {
        console.error('备用请求失败:', error);
      });
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
.transaction-list {
  margin-bottom: 20px;
}
.tx-detail {
  padding: 10px;
}
.tx-json pre {
  background-color: #f5f7fa;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
}
</style> 