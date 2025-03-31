const api = {
    // 积分订单
    orderpage: 'orders/page',
    orderdelete: 'orders/delete',
    orderinfo: 'orders/info/',
    ordersave: 'orders/save',
    orderupdate: 'orders/update',
    // 配置
    configpage: 'config/page',
    configdelete: 'config/delete',
    configinfo: 'config/info/',
    configsave: 'config/save',
    configupdate: 'config/update',
    
    // 区块链相关API
    // 区块链概览
    chainGetchain: 'chain/getchain',
    
    // WeBASE-Front接口
    // 区块链基本信息
    chainGetBlockHeight: 'WeBASE-Front/1/web3/blockNumber',
    chainGetTxTotal: 'WeBASE-Front/1/web3/transaction-total',
    chainGetPbftView: 'WeBASE-Front/1/web3/pbftView',
    chainGetPendingTxSize: 'WeBASE-Front/1/web3/pendingTransactions',
    chainGetConsensusStatus: 'WeBASE-Front/1/web3/consensusStatus',
    chainGetSyncStatus: 'WeBASE-Front/1/web3/syncStatus',
    chainGetClientVersion: 'WeBASE-Front/1/web3/clientVersion',
    chainGetSmCrypto: 'WeBASE-Front/1/web3/smCrypto',
    chainGetWebaseVersion: 'WeBASE-Front/version',
    
    // 区块相关接口
    chainGetBlockByNumber: 'WeBASE-Front/1/web3/blockByNumber',
    chainGetBlockByHash: 'WeBASE-Front/1/web3/blockByHash',
    chainGetLatestBlocks: 'WeBASE-Front/1/block/latestBlock',
    
    // 节点相关接口
    chainGetNodeList: 'WeBASE-Front/1/web3/nodeList',
    chainGetNodeInfo: 'WeBASE-Front/1/web3/nodeInfo',
    
    // 交易相关接口
    chainGetTransactionByHash: 'WeBASE-Front/1/web3/transaction',
    chainGetTransactionReceipt: 'WeBASE-Front/1/web3/transactionReceipt',
    chainGetTransactionByBlockNumberAndIndex: 'WeBASE-Front/1/web3/transactionByBlockNumberAndIndex',
    
    // 合约相关接口
    chainGetContractList: 'WeBASE-Front/1/contract/contractList',
    chainGetContractInfo: 'WeBASE-Front/1/contract/contractInfo',
    chainDeployContract: 'WeBASE-Front/1/contract/deploy',
    
    // 资产上链
    assetCreateAsset: 'chain/createAsset',
    
    // 资产借用上链
    assetBorrowAsset: 'chain/borrowAsset',
    
    // 资产归还上链
    assetReturnAsset: 'chain/guihuan',
    
    // 资产维修上链
    assetRepairAsset: 'chain/weixiu',
    
    // 资产报废上链
    assetScrapAsset: 'chain/scrapAsset',
    
    // 交易记录
    transactionList: 'chain/transactions',
    transactionDetail: 'chain/transaction/detail',
    
    // 链账户管理
    accountList: 'chain/accounts',
    accountCreate: 'chain/account/create',
    accountImport: 'chain/account/import',
    accountDetail: 'chain/account/detail',
    accountExportPrivateKey: 'chain/account/export',
    accountBindUser: 'chain/account/bind'
}

export default api
