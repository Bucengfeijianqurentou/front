<template>
  <div id="app" class="">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
};
</script>

<style lang="scss">
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
html,body{
  width: 100%;
  height: 100%;
  font-family: "Source Sans Pro",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  color: #343a40;
  background-color: #f4f6f9;
  overflow: hidden;
}
#app{
  height: 100%;
  overflow: hidden;
}
body {
  padding: 0;
  margin: 0;
}

/* 全局按钮样式优化 */
.el-button--primary {
  background-color: #3c8dbc;
  border-color: #3c8dbc;
  &:hover, &:focus {
    background-color: #367fa9;
    border-color: #367fa9;
  }
}

/* 表格样式优化 */
.el-table {
  border-radius: 0;
  overflow: hidden;
  
  th {
    background-color: #f4f6f9 !important;
  }
}

/* 表单样式优化 */
.el-form-item__label {
  font-weight: 500;
}

/* 卡片样式优化 */
.el-card {
  border-radius: 3px;
  border: none;
  box-shadow: 0 0 1px rgba(0,0,0,.125), 0 1px 3px rgba(0,0,0,.2);
  margin-bottom: 1rem;
}

/* AdminLTE 风格样式 */
.content-header {
  padding: 15px 0.5rem;
  h1 {
    font-size: 1.8rem;
    margin: 0;
  }
}

.small-box {
  border-radius: 0.25rem;
  box-shadow: 0 0 1px rgba(0,0,0,.125), 0 1px 3px rgba(0,0,0,.2);
  display: block;
  margin-bottom: 20px;
  position: relative;
}

.bg-info {
  background-color: #17a2b8 !important;
  color: #fff;
}

.bg-success {
  background-color: #28a745 !important;
  color: #fff;
}

.bg-warning {
  background-color: #ffc107 !important;
  color: #1f2d3d;
}

.bg-danger {
  background-color: #dc3545 !important;
  color: #fff;
}
</style>
