export const welcomeMessage = {
  content: `您好！我是区块链资产管理助手。我可以帮您了解：
- 资产借用和归还流程
- 区块链资产知识
- 系统使用指南`,
  type: 'assistant'
};

export const presetQuestions = [
  {
    id: 1,
    question: '如何借用资产？',
    answer: `借用资产的流程非常简单：
1. 在系统首页点击"资产借用"
2. 选择需要借用的资产
3. 填写借用原因和预计归还时间
4. 提交申请等待审核
5. 审核通过后即可领取资产`,
    relatedQuestions: [2, 3, 4]
  },
  {
    id: 2,
    question: '如何归还资产？',
    answer: `归还资产的步骤如下：
1. 进入"我的借用"页面
2. 找到需要归还的资产
3. 点击"申请归还"
4. 填写资产使用情况
5. 等待管理员确认归还`,
    relatedQuestions: [1, 5]
  },
  {
    id: 3,
    question: '资产借用有时间限制吗？',
    answer: `是的，资产借用有时间限制：
1. 一般资产最长借用期限为30天
2. 特殊资产可能有不同的借用期限
3. 如需延长借用时间，请提前3天申请续借
4. 超期未归还将影响后续借用权限`,
    relatedQuestions: [1, 2]
  },
  {
    id: 4,
    question: '什么是区块链资产？',
    answer: `区块链资产是指在区块链上进行登记和管理的资产：
1. 每个资产都有唯一的区块链标识
2. 所有操作都会记录在区块链上
3. 确保资产管理的透明性和不可篡改性
4. 方便追踪资产的使用历史`,
    relatedQuestions: [6, 7]
  },
  {
    id: 5,
    question: '如何查看资产使用记录？',
    answer: `查看资产使用记录的方法：
1. 进入资产详情页面
2. 点击"使用记录"标签
3. 可以看到完整的借用归还历史
4. 区块链记录确保数据真实可靠`,
    relatedQuestions: [4, 6]
  },
  {
    id: 6,
    question: '区块链如何保证资产安全？',
    answer: `区块链通过以下机制保证资产安全：
1. 分布式存储，防止单点故障
2. 加密技术确保数据安全
3. 智能合约自动执行规则
4. 全程可追溯，防止资产丢失`,
    relatedQuestions: [4, 7]
  },
  {
    id: 7,
    question: '什么是智能合约？',
    answer: `智能合约是自动执行的区块链程序：
1. 自动执行预设的规则
2. 确保借用归还流程规范
3. 无需人工干预，提高效率
4. 保证流程的公平和透明`,
    relatedQuestions: [4, 6]
  }
];

export const getQuestionById = (id) => {
  return presetQuestions.find(q => q.id === id);
};

export const getRelatedQuestions = (id) => {
  const question = getQuestionById(id);
  if (!question) return [];
  return question.relatedQuestions.map(id => ({
    id,
    question: getQuestionById(id).question
  }));
}; 