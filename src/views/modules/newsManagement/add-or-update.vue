<template>
  <el-dialog
    :title="!dataForm.id ? '新增新闻' : '修改新闻'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    width="600px">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="dataForm.title" placeholder="标题"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select v-model="dataForm.type" placeholder="请选择" style="width: 100%;">
          <el-option
            v-for="(option, index) in typeOptions"
            :key="index"
            :label="option"
            :value="option">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input
          type="textarea"
          v-model="dataForm.content"
          placeholder="请输入内容"
          :rows="8">
        </el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        typeOptions: ['动态', '笔记', '公告'],
        dataForm: {
          id: 0,
          title: '',
          content: '',
          type: '',
          createTime: '',
          author: '',
          readCount: 0
        },
        dataRule: {
          title: [
            { required: true, message: '标题不能为空', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择类型', trigger: 'change' }
          ],
          content: [
            { required: true, message: '内容不能为空', trigger: 'blur' }
          ]
        },
        mockData: [
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
          }
        ]
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            // 修改 - 模拟获取信息
            setTimeout(() => {
              // 从模拟数据中查找对应ID的数据
              const foundItem = this.mockData.find(item => item.id === id)
              if (foundItem) {
                this.dataForm = JSON.parse(JSON.stringify(foundItem))
              }
            }, 300)
          } else {
            // 新增 - 重置表单
            this.dataForm = {
              id: 0,
              title: '',
              content: '',
              type: '',
              createTime: this.getCurrentTime(),
              author: this.$storage.get('user') ? this.$storage.get('user').username : '匿名用户',
              readCount: 0
            }
          }
        })
      },
      // 获取当前时间格式化
      getCurrentTime() {
        const now = new Date()
        const year = now.getFullYear()
        const month = String(now.getMonth() + 1).padStart(2, '0')
        const day = String(now.getDate()).padStart(2, '0')
        const hour = String(now.getHours()).padStart(2, '0')
        const minute = String(now.getMinutes()).padStart(2, '0')
        const second = String(now.getSeconds()).padStart(2, '0')
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            // 验证通过，模拟提交
            // 设置作者和时间（如果是新建）
            if (!this.dataForm.id) {
              this.dataForm.createTime = this.getCurrentTime()
              this.dataForm.author = this.$storage.get('user') ? this.$storage.get('user').username : '匿名用户'
              this.dataForm.readCount = 0
              this.dataForm.id = new Date().getTime() // 使用时间戳作为临时ID
            }
            
            // 模拟请求延迟
            setTimeout(() => {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.visible = false
                  this.$emit('refreshDataList')
                }
              })
            }, 500)
          }
        })
      }
    }
  }
</script> 