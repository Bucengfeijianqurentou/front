// 区块链相关API接口配置
export default {
  // 区块链概览
  chainGetchain: '/chain/getchain',
  
  // 资产上链
  assetCreateAsset: '/chain/createAsset',
  
  // 资产借用上链
  assetBorrowAsset: '/chain/borrowAsset',
  
  // 资产归还上链
  assetReturnAsset: '/chain/guihuan',
  
  // 资产维修上链
  assetRepairAsset: '/chain/weixiu',
  
  // 资产报废上链
  assetScrapAsset: '/chain/scrapAsset',
  
  // 交易记录
  transactionList: '/chain/transactions',
  transactionDetail: '/chain/transaction/detail',
  
  // 链账户管理
  accountList: '/chain/accounts',
  accountCreate: '/chain/account/create',
  accountImport: '/chain/account/import',
  accountDetail: '/chain/account/detail',
  accountExportPrivateKey: '/chain/account/export',
  accountBindUser: '/chain/account/bind'
} 