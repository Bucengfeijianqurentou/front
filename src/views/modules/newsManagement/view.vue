<template>
  <el-dialog
    title="新闻详情"
    :close-on-click-modal="false"
    :visible.sync="visible"
    width="600px">
    <div v-if="dataForm.id" class="news-detail">
      <h2 class="news-title">{{ dataForm.title }}</h2>
      <div class="news-meta">
        <span>
          <i class="el-icon-user"></i> {{ dataForm.author }}
        </span>
        <span>
          <i class="el-icon-date"></i> {{ dataForm.createTime }}
        </span>
        <span>
          <i class="el-icon-view"></i> {{ dataForm.readCount }} 次阅读
        </span>
        <el-tag size="small" effect="plain">{{ dataForm.type }}</el-tag>
      </div>
      <div class="news-content">{{ dataForm.content }}</div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          title: '',
          content: '',
          type: '',
          createTime: '',
          author: '',
          readCount: 0
        }
      }
    },
    methods: {
      init (id, newsData) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          if (newsData) {
            // 如果直接传入了数据，直接使用
            Object.assign(this.dataForm, newsData)
          } else {
            // 否则，模拟API请求获取数据
            // 在真实场景中，这里会调用接口获取详情
            setTimeout(() => {
              // 模拟从服务器获取数据
              const mockNewsData = {
                id: 1,
                title: '系统更新公告',
                content: '尊敬的用户，我们将于2023年5月15日凌晨2:00-5:00进行系统升级，期间系统可能无法正常访问，请提前做好准备。升级内容包括：\n\n1. 修复已知的性能问题\n2. 增强系统安全性\n3. 优化用户界面体验\n4. 新增数据分析功能\n\n感谢您的理解和支持！',
                type: '公告',
                createTime: '2023-05-10 10:30:00',
                author: '系统管理员',
                readCount: 156
              }
              Object.assign(this.dataForm, mockNewsData)
            }, 300)
          }
        })
      }
    }
  }
</script>

<style scoped>
.news-detail {
  padding: 0 20px;
}

.news-title {
  text-align: center;
  margin-bottom: 15px;
  color: #303133;
}

.news-meta {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  color: #909399;
  font-size: 14px;
  margin-bottom: 20px;
  border-bottom: 1px solid #EBEEF5;
  padding-bottom: 15px;
}

.news-meta span {
  margin: 0 10px;
}

.news-meta i {
  margin-right: 5px;
}

.news-content {
  line-height: 1.8;
  color: #606266;
  text-align: justify;
  white-space: pre-line;
}
</style> 