<template>
  <div class="statistics-container">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>新闻统计概览</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="6" v-for="(item, index) in stats" :key="index">
              <div class="stat-card" :class="'color-'+index">
                <div class="stat-icon">
                  <i :class="item.icon"></i>
                </div>
                <div class="stat-info">
                  <div class="stat-value">{{ item.value }}</div>
                  <div class="stat-label">{{ item.label }}</div>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    
    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="12">
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>类型分布</span>
          </div>
          <div style="height: 300px; display: flex; align-items: center; justify-content: center;">
            <el-progress type="circle" :percentage="37" color="#409EFF"><div>公告<br/>37%</div></el-progress>
            <el-progress type="circle" :percentage="25" color="#67C23A" style="margin: 0 20px;"><div>动态<br/>25%</div></el-progress>
            <el-progress type="circle" :percentage="38" color="#E6A23C"><div>笔记<br/>38%</div></el-progress>
          </div>
        </el-card>
      </el-col>
      
      <el-col :span="12">
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>热门新闻（阅读量）</span>
          </div>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="title" label="标题" width="250"></el-table-column>
            <el-table-column prop="type" label="类型" width="100"></el-table-column>
            <el-table-column prop="readCount" label="阅读量">
              <template slot-scope="scope">
                <el-progress :percentage="scope.row.percentage" :color="scope.row.color"></el-progress>
                {{ scope.row.readCount }}
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stats: [
        { 
          label: '总新闻数', 
          value: 8, 
          icon: 'el-icon-document' 
        },
        { 
          label: '公告数量', 
          value: 3, 
          icon: 'el-icon-bell' 
        },
        { 
          label: '动态数量', 
          value: 2, 
          icon: 'el-icon-chat-line-square' 
        },
        { 
          label: '笔记数量', 
          value: 3, 
          icon: 'el-icon-notebook-1' 
        }
      ],
      tableData: [
        { 
          title: '系统更新公告', 
          type: '公告', 
          readCount: 156,
          percentage: 100,
          color: '#F56C6C'
        },
        { 
          title: '关于做好实验室设备管理的通知', 
          type: '公告', 
          readCount: 124,
          percentage: 80,
          color: '#E6A23C'
        },
        { 
          title: '资产管理系统更新日志', 
          type: '公告', 
          readCount: 113,
          percentage: 72,
          color: '#67C23A'
        },
        { 
          title: '多媒体教室使用指南', 
          type: '笔记', 
          readCount: 92,
          percentage: 59,
          color: '#409EFF'
        },
        { 
          title: '校园资产管理新功能介绍', 
          type: '动态', 
          readCount: 89,
          percentage: 57,
          color: '#909399'
        }
      ]
    }
  }
}
</script>

<style scoped>
.statistics-container {
  padding: 20px;
}

.stat-card {
  display: flex;
  align-items: center;
  background: #f5f7fa;
  border-radius: 4px;
  padding: 15px;
  margin-bottom: 10px;
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
}

.stat-icon i {
  font-size: 30px;
  color: #fff;
}

.stat-info {
  flex: 1;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 14px;
  color: #909399;
}

.color-0 .stat-icon {
  background-color: #409eff;
}

.color-1 .stat-icon {
  background-color: #67c23a;
}

.color-2 .stat-icon {
  background-color: #e6a23c;
}

.color-3 .stat-icon {
  background-color: #f56c6c;
}
</style> 