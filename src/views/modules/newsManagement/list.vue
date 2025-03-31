<template>
  <div class="main-content">
    <div v-if="showFlag">
      <el-form :inline="true" :model="searchForm" class="form-content">
        <el-form-item label="标题">
          <el-input v-model="searchForm.title" placeholder="标题" clearable></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="searchForm.type" placeholder="请选择" clearable>
            <el-option
              v-for="(option, index) in typeOptions"
              :key="index"
              :label="option"
              :value="option">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getDataList()">查询</el-button>
          <el-button v-if="isAuth('add')" type="success" @click="addOrUpdateHandler()">添加</el-button>
          <el-button v-if="isAuth('delete')" type="danger" @click="deleteHandler()">批量删除</el-button>
        </el-form-item>
      </el-form>
      
      <div class="table-content">
        <el-table
          :data="dataList"
          border
          v-loading="dataListLoading"
          @selection-change="selectionChangeHandler"
          style="width: 100%;"
          :empty-text="emptyText">
          <el-table-column
            type="selection"
            header-align="center"
            align="center"
            width="50">
          </el-table-column>
          <el-table-column
            prop="title"
            header-align="center"
            align="center"
            label="标题">
          </el-table-column>
          <el-table-column
            prop="type"
            header-align="center"
            align="center"
            label="类型">
          </el-table-column>
          <el-table-column
            prop="createTime"
            header-align="center"
            align="center"
            label="发布时间">
          </el-table-column>
          <el-table-column
            prop="author"
            header-align="center"
            align="center"
            label="发布人">
          </el-table-column>
          <el-table-column
            prop="readCount"
            header-align="center"
            align="center"
            label="阅读量">
          </el-table-column>
          <el-table-column
            fixed="right"
            header-align="center"
            align="center"
            width="150"
            label="操作">
            <template slot-scope="scope">
              <el-button v-if="isAuth('view')" type="text" size="small" @click="viewHandler(scope.row.id)">查看</el-button>
              <el-button v-if="isAuth('update')" type="text" size="small" @click="addOrUpdateHandler(scope.row.id)">修改</el-button>
              <el-button v-if="isAuth('delete')" type="text" size="small" @click="deleteHandler(scope.row.id)">删除</el-button>
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
          layout="total, sizes, prev, pager, next, jumper"
          style="margin-top: 20px; text-align: center;">
        </el-pagination>
      </div>
    </div>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateFlag" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
    <!-- 弹窗, 查看详情 -->
    <view-dialog v-if="viewDialogFlag" ref="viewDialog"></view-dialog>
  </div>
</template>

<script>
import AddOrUpdate from './add-or-update'
import ViewDialog from './view'

export default {
  data() {
    return {
      searchForm: {
        title: '',
        type: ''
      },
      typeOptions: ['动态', '笔记', '公告'],
      dataList: [], // 列表数据
      pageIndex: 1, // 当前页码
      pageSize: 10, // 每页显示条数
      totalPage: 0, // 总条数
      dataListLoading: false, // 数据加载中
      dataListSelections: [], // 多选
      showFlag: true,
      addOrUpdateFlag: false,
      viewDialogFlag: false,
      // 表格无数据时显示的文本
      emptyText: '加载中，请稍候...',
      // 模拟数据
      mockData: []
    }
  },
  components: {
    AddOrUpdate,
    ViewDialog
  },
  created() {
    // 添加created钩子，确保组件创建时就加载数据
    this.initMockData()
    this.getDataList()
  },
  activated() {
    this.getDataList()
  },
  methods: {
    // 初始化模拟数据
    initMockData() {
      console.log('初始化新闻模拟数据')
      // 确保mockData有数据
      if (!this.mockData || this.mockData.length === 0) {
        this.mockData = [
          {
            id: 1,
            title: '系统更新公告',
            content: '尊敬的用户，我们将于2023年5月15日凌晨2:00-5:00进行系统升级，期间系统可能无法正常访问，请提前做好准备。',
            type: '公告',
            createTime: '2023-05-10 10:30:00',
            author: '系统管理员',
            readCount: 156
          },
          {
            id: 2,
            title: '校园资产管理新功能介绍',
            content: '最新版本中，我们新增了区块链资产追踪功能，提高了资产管理的透明度和安全性。使用方法：1. 进入资产详情页...',
            type: '动态',
            createTime: '2023-05-08 14:20:00',
            author: '张明',
            readCount: 89
          },
          {
            id: 3,
            title: '电子设备维护心得',
            content: '分享一些电子设备的日常维护经验，可以有效延长设备使用寿命...',
            type: '笔记',
            createTime: '2023-05-05 09:15:00',
            author: '李华',
            readCount: 67
          },
          {
            id: 4,
            title: '关于做好实验室设备管理的通知',
            content: '为加强实验室安全管理，确保教学科研工作的正常进行，现就做好实验室设备管理工作通知如下...',
            type: '公告',
            createTime: '2023-05-03 16:40:00',
            author: '系统管理员',
            readCount: 124
          },
          {
            id: 5,
            title: '办公设备借用流程优化',
            content: '为了提高办公效率，我们对设备借用流程进行了优化，现在可以通过手机端快速完成借用申请...',
            type: '动态',
            createTime: '2023-05-01 11:05:00',
            author: '王芳',
            readCount: 78
          },
          {
            id: 6,
            title: '多媒体教室使用指南',
            content: '整理了一份多媒体教室设备的使用指南，希望对大家有所帮助...',
            type: '笔记',
            createTime: '2023-04-28 13:25:00',
            author: '赵强',
            readCount: 92
          }
        ]
      }
      console.log('模拟数据初始化完成，共', this.mockData.length, '条')
    },
    
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true
      console.log('加载新闻列表数据...')
      this.emptyText = '加载中，请稍候...'
      
      // 强制初始化一次模拟数据，以防万一
      this.initMockData()
      
      // 模拟API请求，减少延迟时间
      setTimeout(() => {
        // 先不过滤，直接显示所有数据
        if (this.searchForm.title || this.searchForm.type) {
          // 如果有搜索条件，才过滤数据
          let filteredData = this.mockData.filter(item => {
            if (this.searchForm.title && !item.title.includes(this.searchForm.title)) {
              return false
            }
            if (this.searchForm.type && item.type !== this.searchForm.type) {
              return false
            }
            return true
          })
          this.dataList = filteredData
          if (filteredData.length === 0) {
            this.emptyText = '没有符合条件的数据'
          }
        } else {
          // 否则显示所有数据
          this.dataList = [...this.mockData]
        }
        
        console.log('新闻列表数据已加载:', this.dataList.length, '条')
        this.totalPage = this.dataList.length
        this.dataListLoading = false
        
        if (this.dataList.length === 0) {
          this.emptyText = '暂无数据'
        }
      }, 100) // 减少延迟时间以确保数据快速加载
    },
    // 每页显示条数
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
    // 多选
    selectionChangeHandler(val) {
      this.dataListSelections = val
    },
    // 添加/修改
    addOrUpdateHandler(id) {
      this.addOrUpdateFlag = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id)
      })
    },
    // 查看详情
    viewHandler(id) {
      this.viewDialogFlag = true
      this.$nextTick(() => {
        this.$refs.viewDialog.init(id, this.mockData.find(item => item.id === id))
      })
    },
    // 删除
    deleteHandler(id) {
      let ids = id ? [id] : this.dataListSelections.map(item => item.id)
      if (ids.length === 0) {
        this.$message({
          message: '请选择要删除的数据',
          type: 'warning',
          duration: 1500
        })
        return
      }
      this.$confirm(`确定要删除选中的数据吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 模拟删除操作
        this.mockData = this.mockData.filter(item => !ids.includes(item.id))
        this.$message({
          message: '操作成功',
          type: 'success',
          duration: 1500,
          onClose: () => {
            this.getDataList()
          }
        })
      })
    },
    // 权限验证
    isAuth(type) {
      // 管理员可以执行所有操作
      // 普通用户只能查看和添加
      const role = this.$storage.get('role')
      if (role === '管理员') {
        return true
      } else {
        return type === 'view' || type === 'add'
      }
    }
  }
}
</script>

<style scoped>
.main-content {
  padding: 20px;
}

.form-content {
  padding: 15px;
  background-color: #f5f7fa;
  border-radius: 5px;
  margin-bottom: 20px;
}

.table-content {
  background-color: #fff;
  padding: 15px;
  border-radius: 5px;
}

.menu-badge-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.menu-badge {
  margin-left: 10px;
}
</style> 