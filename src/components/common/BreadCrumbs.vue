<template>
  <div class="app-breadcrumb-wrapper">
    <el-breadcrumb class="app-breadcrumb" separator="/">
      <transition-group name="breadcrumb" class="box" :style="2==1?'justifyContent:flex-start;':2==2?'justifyContent:center;':'justifyContent:flex-end;'">
        <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
          <span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">
            <i class="el-icon-location-information" v-if="index==0"></i>
            <i class="el-icon-d-arrow-right" v-else></i>
            {{ item.name }}
          </span>
          <a v-else @click.prevent="handleLink(item)">
            <i class="el-icon-location-information" v-if="index==0"></i>
            <i class="el-icon-d-arrow-right" v-else></i>
            {{ item.name }}
          </a>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script>
import pathToRegexp from 'path-to-regexp'
import { generateTitle } from '@/utils/i18n'
export default {
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
    this.breadcrumbStyleChange()
  },
  methods: {
    generateTitle,
    getBreadcrumb() {
      // only show routes with meta.title
      let route = this.$route
      let matched = route.matched.filter(item => item.meta)
      const first = matched[0]
      matched = [{ path: '/index' }].concat(matched)

      this.levelList = matched.filter(item => item.meta)
    },
    isDashboard(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Index'.toLocaleLowerCase()
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink(item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(path)
    },
    breadcrumbStyleChange(val) {
      this.$nextTick(()=>{
        document.querySelectorAll('.app-breadcrumb .el-breadcrumb__separator').forEach(el=>{
          el.innerText = "/"
          el.style.color = "rgba(255, 255, 255, 0.5)"
        })
        document.querySelectorAll('.app-breadcrumb .el-breadcrumb__inner a').forEach(el=>{
          el.style.color = "rgba(255, 255, 255, 0.8)"
        })
        document.querySelectorAll('.app-breadcrumb .el-breadcrumb__inner .no-redirect').forEach(el=>{
          el.style.color = "#ffffff"
        })
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb-wrapper {
  position: relative;
  margin: 0 0 10px 0;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.app-breadcrumb {
  display: block;
  font-size: 16px;
  line-height: 50px;
  margin: 0;
  padding: 0 20px;
  background: linear-gradient(120deg, #1e3c72, #2a5298, #2c3e50);
  position: relative;
  
  /* 顶部细微光泽 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, 
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.5) 50%, 
      rgba(255, 255, 255, 0) 100%);
    z-index: 1;
  }
  
  /* 顶部区域微妙光泽 */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 40%;
    background: linear-gradient(to bottom, 
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0) 100%);
    z-index: 1;
  }

  .box {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    z-index: 2;
  }

  .no-redirect {
    color: #ffffff;
    cursor: text;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    font-weight: 500;
    
    i {
      margin-right: 6px;
      font-size: 18px;
      opacity: 0.9;
      filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
    }
  }
  
  :deep(.el-breadcrumb__item) {
    display: flex;
    align-items: center;
    
    .el-breadcrumb__inner a {
      color: rgba(255, 255, 255, 0.8);
      display: flex;
      align-items: center;
      font-weight: 500;
      transition: all 0.3s;
      
      &:hover {
        color: #ffffff;
        transform: scale(1.05);
      }
      
      i {
        margin-right: 6px;
        font-size: 18px;
        opacity: 0.9;
        filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
      }
    }
    
    .el-breadcrumb__separator {
      color: rgba(255, 255, 255, 0.5);
    }
  }
}

.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-move {
  transition: all 0.5s;
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>
