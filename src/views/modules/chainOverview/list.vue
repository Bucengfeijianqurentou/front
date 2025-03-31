<template>
  <div class="main-content">
    <!-- 标题 -->
    <div class="title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>区块链服务</el-breadcrumb-item>
        <el-breadcrumb-item>区块链概览</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    
    <!-- 区块链概览卡片 -->
    <div class="chain-overview">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card shadow="hover" class="chain-card">
            <div slot="header" class="clearfix">
              <span>区块高度</span>
            </div>
            <div class="chain-data">
              <i class="el-icon-s-data"></i>
              <div class="chain-value-container">
                <span class="chain-value">{{ chainData.blockNumber || 0 }}</span>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover" class="chain-card">
            <div slot="header" class="clearfix">
              <span>交易总数</span>
            </div>
            <div class="chain-data">
              <i class="el-icon-s-order"></i>
              <div class="chain-value-container">
                <span class="chain-value">{{ chainData.txSum || 0 }}</span>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover" class="chain-card">
            <div slot="header" class="clearfix">
              <span>节点数量</span>
            </div>
            <div class="chain-data">
              <i class="el-icon-connection"></i>
              <div class="chain-value-container">
                <span class="chain-value">{{ chainData.nodeCount || 0 }}</span>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover" class="chain-card">
            <div slot="header" class="clearfix">
              <span>正在处理交易</span>
            </div>
            <div class="chain-data">
              <i class="el-icon-loading"></i>
              <div class="chain-value-container">
                <span class="chain-value">{{ chainData.pendingTxSize || 0 }}</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 区块链状态 -->
    <div class="chain-status">
      <el-card shadow="hover">
        <div slot="header" class="clearfix">
          <span>区块链状态</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="refreshChainData">刷新</el-button>
        </div>
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="status-item">
              <span class="status-label">共识状态：</span>
              <el-tag type="success" v-if="chainData.consensusStatus">正常</el-tag>
              <el-tag type="danger" v-else>异常</el-tag>
            </div>
            <div class="status-item">
              <span class="status-label">同步状态：</span>
              <el-tag type="success" v-if="chainData.syncStatus">已同步</el-tag>
              <el-tag type="warning" v-else>同步中</el-tag>
            </div>
            <div class="status-item">
              <span class="status-label">PBFT视图：</span>
              <span>{{ chainData.pbftView || 0 }}</span>
            </div>
            <div class="status-item">
              <span class="status-label">区块链版本：</span>
              <span>{{ chainData.clientVersion || 'FISCO BCOS 2.0' }}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="status-item">
              <span class="status-label">群组ID：</span>
              <span>{{ chainData.groupId || 1 }}</span>
            </div>
            <div class="status-item">
              <span class="status-label">创世区块：</span>
              <el-tooltip class="item" effect="dark" :content="chainData.genesisHash || ''" placement="top">
                <span class="hash-text">{{ formatHash(chainData.genesisHash) }}</span>
              </el-tooltip>
            </div>
            <div class="status-item">
              <span class="status-label">最新区块哈希：</span>
              <el-tooltip class="item" effect="dark" :content="chainData.latestHash || ''" placement="top">
                <span class="hash-text">{{ formatHash(chainData.latestHash) }}</span>
              </el-tooltip>
            </div>
            <div class="status-item">
              <span class="status-label">是否国密：</span>
              <el-tag type="info" v-if="chainData.smCrypto">是</el-tag>
              <el-tag type="info" v-else>否</el-tag>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </div>

    <!-- 节点列表 -->
    <div class="node-list">
      <el-card shadow="hover">
        <div slot="header" class="clearfix">
          <span>节点列表</span>
        </div>
        <el-table :data="chainData.nodeList || []" style="width: 100%" border v-loading="nodeListLoading">
          <el-table-column type="index" label="序号" width="80"></el-table-column>
          <el-table-column prop="nodeId" label="节点ID">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" :content="scope.row.nodeId" placement="top">
                <span>{{ formatHash(scope.row.nodeId) }}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="nodeType" label="节点类型" width="120">
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.nodeType === 'sealer'">共识节点</el-tag>
              <el-tag type="warning" v-else-if="scope.row.nodeType === 'observer'">观察节点</el-tag>
              <el-tag type="info" v-else>其他节点</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="blockNumber" label="区块高度" width="120"></el-table-column>
          <el-table-column prop="pbftView" label="PBFT视图" width="120"></el-table-column>
          <el-table-column label="状态" width="100">
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.status === 1">运行中</el-tag>
              <el-tag type="danger" v-else>异常</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>

    <!-- 最新区块信息 -->
    <div class="latest-blocks">
      <el-card shadow="hover">
        <div slot="header" class="clearfix">
          <span>最新区块</span>
        </div>
        <el-table :data="chainData.latestBlocks || []" style="width: 100%" border v-loading="blockListLoading">
          <el-table-column prop="number" label="区块高度" width="120"></el-table-column>
          <el-table-column prop="hash" label="区块哈希">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" :content="scope.row.hash" placement="top">
                <span>{{ formatHash(scope.row.hash) }}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="timestamp" label="出块时间" width="180">
            <template slot-scope="scope">
              {{ formatTimestamp(scope.row.timestamp) }}
            </template>
          </el-table-column>
          <el-table-column prop="txCount" label="交易数" width="100"></el-table-column>
          <el-table-column prop="gasUsed" label="Gas消耗" width="120"></el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="viewBlockDetail(scope.row)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>

    <!-- 区块详情对话框 -->
    <el-dialog
      title="区块详情"
      :visible.sync="blockDetailVisible"
      width="60%">
      <div v-loading="blockDetailLoading">
        <el-descriptions title="基本信息" :column="2" border>
          <el-descriptions-item label="区块高度">{{ currentBlock.number }}</el-descriptions-item>
          <el-descriptions-item label="出块时间">{{ formatTimestamp(currentBlock.timestamp) }}</el-descriptions-item>
          <el-descriptions-item label="区块哈希" :span="2">{{ currentBlock.hash }}</el-descriptions-item>
          <el-descriptions-item label="父区块哈希" :span="2">{{ currentBlock.parentHash }}</el-descriptions-item>
          <el-descriptions-item label="交易数量">{{ currentBlock.transactions ? currentBlock.transactions.length : 0 }}</el-descriptions-item>
          <el-descriptions-item label="Gas消耗">{{ currentBlock.gasUsed }}</el-descriptions-item>
          <el-descriptions-item label="区块大小">{{ currentBlock.size || 0 }} bytes</el-descriptions-item>
          <el-descriptions-item label="出块节点">
            <el-tooltip class="item" effect="dark" :content="currentBlock.sealer || ''" placement="top">
              <span>{{ formatHash(currentBlock.sealer) }}</span>
            </el-tooltip>
          </el-descriptions-item>
        </el-descriptions>
        
        <div class="block-transactions" v-if="currentBlock.transactions && currentBlock.transactions.length > 0">
          <h3>交易列表</h3>
          <el-table :data="currentBlock.transactions" style="width: 100%" border>
            <el-table-column prop="hash" label="交易哈希">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" :content="scope.row.hash" placement="top">
                  <span>{{ formatHash(scope.row.hash) }}</span>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column prop="from" label="发送方">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" :content="scope.row.from" placement="top">
                  <span>{{ formatHash(scope.row.from) }}</span>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column prop="to" label="接收方">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" :content="scope.row.to" placement="top">
                  <span>{{ formatHash(scope.row.to) }}</span>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column prop="value" label="交易值" width="100"></el-table-column>
          </el-table>
        </div>
        <div v-else class="no-transactions">
          <el-empty description="暂无交易"></el-empty>
        </div>
      </div>
    </el-dialog>

    <!-- 区块链信息 -->
    <div class="chain-info">
      <el-card shadow="hover">
        <div slot="header" class="clearfix">
          <span>区块链信息</span>
        </div>
        <div class="info-content">
          <p><strong>区块链平台：</strong>FISCO BCOS</p>
          <p><strong>区块链版本：</strong>{{ chainData.clientVersion || '2.0' }}</p>
          <p><strong>共识算法：</strong>PBFT</p>
          <p><strong>智能合约：</strong>AssetManagement</p>
          <p><strong>WeBASE版本：</strong>{{ chainData.webaseVersion || '1.5.0' }}</p>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chainData: {
        blockNumber: 0,
        txSum: 0,
        nodeCount: 0,
        pendingTxSize: 0,
        pbftView: 0,
        consensusStatus: true,
        syncStatus: true,
        clientVersion: '',
        groupId: 1,
        genesisHash: '',
        latestHash: '',
        smCrypto: false,
        webaseVersion: '',
        nodeList: [],
        latestBlocks: []
      },
      baseUrl: 'http://192.168.102.149:5002/',
      nodeListLoading: false,
      blockListLoading: false,
      blockDetailVisible: false,
      blockDetailLoading: false,
      currentBlock: {},
      refreshTimer: null,
      refreshInterval: 10000 // 10秒刷新一次
    }
  },
  created() {
    this.getChainData()
    this.getNodeList()
    this.getLatestBlocks()
    // 启动定时刷新
    this.startAutoRefresh()
  },
  beforeDestroy() {
    // 组件销毁前清除定时器
    this.stopAutoRefresh()
  },
  methods: {
    // 获取区块链数据
    getChainData() {
      // 获取区块高度
      this.$http({
        url: '/chain/getBlockNumber',
        method: "get"
      }).then(({ data }) => {
        console.log('区块高度响应:', data);
        if (data !== null && data !== undefined) {
          this.chainData.blockNumber = data;
        } else {
          // 如果接口返回空，使用默认值
          this.chainData.blockNumber = 0;
        }
      }).catch((error) => {
        console.error('获取区块高度失败:', error);
        // 如果接口调用失败，使用模拟数据
        this.chainData.blockNumber = 0;
      });

      // 获取交易总数
      this.$http({
        url: '/chain/getTransactionTotal',
        method: "get"
      }).then(({ data }) => {
        console.log('交易总数响应:', data);
        if (data !== null && data !== undefined) {
          this.chainData.txSum = data;
        } else {
          // 如果接口返回空，使用默认值
          this.chainData.txSum = 0;
        }
      }).catch((error) => {
        console.error('获取交易总数失败:', error);
        // 如果接口调用失败，使用模拟数据
        this.chainData.txSum = 0;
      });

      // 以下是其他模拟数据，暂时保留
      this.chainData.nodeCount = 5;
      this.chainData.pendingTxSize = 8;
      this.chainData.pbftView = 93;
      this.chainData.consensusStatus = true;
      this.chainData.syncStatus = true;
      this.chainData.clientVersion = 'FISCO BCOS 2.7.2';
      this.chainData.groupId = 1;
      this.chainData.genesisHash = '0x9d495d79b581e2f93c2177e6a900806a7f20633e7fe5604f7d8a77ad33e20bdc';
      this.chainData.latestHash = '0xca7339c7c1b0e5c1e62b5b28ad';
      this.chainData.smCrypto = false;
      this.chainData.webaseVersion = '1.5.3';
    },

    // 获取节点列表
    getNodeList() {
      this.nodeListLoading = true
      
      // 使用模拟数据
      setTimeout(() => {
        const nodeList = []
        const nodeTypes = ['sealer', 'observer']
        
        for (let i = 0; i < 5; i++) {
          nodeList.push({
            nodeId: '0x' + this.generateRandomHash(),
            nodeType: nodeTypes[i % 2],
            blockNumber: this.chainData.blockNumber - Math.floor(Math.random() * 5),
            pbftView: this.chainData.pbftView,
            status: 1
          })
        }
        
        this.chainData.nodeList = nodeList
        this.chainData.nodeCount = nodeList.length
        this.nodeListLoading = false
      }, 500)
    },

    // 获取最新区块
    getLatestBlocks() {
      this.blockListLoading = true
      
      // 使用模拟数据
      setTimeout(() => {
        const blocks = []
        const currentTime = Date.now()
        
        for (let i = 0; i < 5; i++) {
          const blockNumber = this.chainData.blockNumber - i
          blocks.push({
            number: blockNumber,
            hash: '0x' + this.generateRandomHash(),
            timestamp: Math.floor(currentTime / 1000) - i * 15, // 每15秒一个区块
            txCount: Math.floor(Math.random() * 5),
            gasUsed: Math.floor(Math.random() * 100000)
          })
        }
        
        this.chainData.latestBlocks = blocks
        this.blockListLoading = false
      }, 500)
    },

    // 查看区块详情
    viewBlockDetail(block) {
      this.currentBlock = { ...block }
      this.blockDetailVisible = true
      this.blockDetailLoading = true
      
      // 使用模拟数据
      setTimeout(() => {
        this.currentBlock.parentHash = '0x' + this.generateRandomHash()
        this.currentBlock.size = Math.floor(Math.random() * 10000) + 1000
        this.currentBlock.sealer = '0x' + this.generateRandomHash()
        
        // 生成交易列表
        const transactions = []
        for (let i = 0; i < this.currentBlock.txCount; i++) {
          transactions.push({
            hash: '0x' + this.generateRandomHash(),
            from: '0x' + this.generateRandomHash(20),
            to: '0x' + this.generateRandomHash(20),
            value: '0'
          })
        }
        
        this.currentBlock.transactions = transactions
        this.blockDetailLoading = false
      }, 500)
      
      // 保留API调用代码，但暂时不使用
      /*
      this.$http({
        url: this.baseUrl + this.$api.chainGetBlockByNumber,
        method: "get",
        params: { 
          groupId: 1,
          blockNumber: block.number
        }
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.currentBlock = data.data
        }
        this.blockDetailLoading = false
      }).catch(() => {
        // 如果接口调用失败，使用模拟数据
        this.currentBlock.parentHash = '0x' + this.generateRandomHash()
        this.currentBlock.size = Math.floor(Math.random() * 10000) + 1000
        this.currentBlock.sealer = '0x' + this.generateRandomHash()
        
        // 生成交易列表
        const transactions = []
        for (let i = 0; i < this.currentBlock.txCount; i++) {
          transactions.push({
            hash: '0x' + this.generateRandomHash(),
            from: '0x' + this.generateRandomHash(20),
            to: '0x' + this.generateRandomHash(20),
            value: '0'
          })
        }
        
        this.currentBlock.transactions = transactions
        this.blockDetailLoading = false
      })
      */
    },

    // 刷新区块链数据
    refreshChainData() {
      // 执行实际的数据刷新
      this.getChainData();
      
      this.$message({
        message: '数据已刷新',
        type: 'success'
      });
    },

    // 启动自动刷新
    startAutoRefresh() {
      this.stopAutoRefresh(); // 先清除可能存在的定时器
      this.refreshTimer = setInterval(() => {
        this.getChainData(); // 定期刷新区块链数据
      }, this.refreshInterval);
    },
    
    // 停止自动刷新
    stopAutoRefresh() {
      if (this.refreshTimer) {
        clearInterval(this.refreshTimer)
        this.refreshTimer = null
      }
    },

    // 格式化哈希值显示
    formatHash(hash) {
      if (!hash) return ''
      if (hash.length <= 20) return hash
      return hash.substring(0, 10) + '...' + hash.substring(hash.length - 8)
    },

    // 格式化时间戳
    formatTimestamp(timestamp) {
      if (!timestamp) return ''
      const date = new Date(timestamp * 1000)
      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')
      const hours = date.getHours().toString().padStart(2, '0')
      const minutes = date.getMinutes().toString().padStart(2, '0')
      const seconds = date.getSeconds().toString().padStart(2, '0')
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    },

    // 生成随机哈希
    generateRandomHash(length = 64) {
      const chars = '0123456789abcdef'
      let result = ''
      for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      return result
    }
  }
}
</script>

<style scoped>
.main-content {
  padding: 20px;
}
.chain-overview {
  margin-top: 20px;
  margin-bottom: 20px;
}
.chain-card {
  height: 180px;
}
.chain-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;
  overflow: visible;
}
.chain-data i {
  font-size: 36px;
  color: #409EFF;
  margin-bottom: 20px;
}
.chain-value-container {
  width: 100%;
  text-align: center;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.chain-value {
  font-size: 24px;
  font-weight: bold;
  line-height: 1.5;
  overflow: visible;
  white-space: nowrap;
  display: inline-block;
}
.chain-status {
  margin-bottom: 20px;
}
.status-item {
  margin-bottom: 15px;
  line-height: 1.5;
}
.status-label {
  font-weight: bold;
  margin-right: 10px;
}
.hash-text {
  font-family: monospace;
  color: #606266;
}
.node-list {
  margin-bottom: 20px;
}
.latest-blocks {
  margin-bottom: 20px;
}
.block-transactions {
  margin-top: 20px;
}
.no-transactions {
  margin-top: 20px;
  text-align: center;
}
.info-content {
  line-height: 2;
}
</style> 