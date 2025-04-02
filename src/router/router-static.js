import Vue from 'vue';
//配置路由
import VueRouter from 'vue-router'
Vue.use(VueRouter);
//1.创建组件
import Index from '@/views/index'
import Home from '@/views/home'
import Login from '@/views/login'
import NotFound from '@/views/404'
import UpdatePassword from '@/views/update-password'
import pay from '@/views/pay'
import register from '@/views/register'
import center from '@/views/center'
import HomePage from '@/views/HomePage'

         import users from '@/views/modules/users/list'
        import baofei from '@/views/modules/baofei/list'
        import dictionary from '@/views/modules/dictionary/list'
        import jieyong from '@/views/modules/jieyong/list'
        import shangpin from '@/views/modules/shangpin/list'
        import shangpinChuruInout from '@/views/modules/shangpinChuruInout/list'
        import shangpinChuruInoutList from '@/views/modules/shangpinChuruInoutList/list'
        import weixiu from '@/views/modules/weixiu/list'
        import yonghu from '@/views/modules/yonghu/list'
        import dictionaryBumen from '@/views/modules/dictionaryBumen/list'
        import dictionaryDidian from '@/views/modules/dictionaryDidian/list'
        import dictionaryGuihuan from '@/views/modules/dictionaryGuihuan/list'
        import dictionarySex from '@/views/modules/dictionarySex/list'
        import dictionaryShangpin from '@/views/modules/dictionaryShangpin/list'
        import dictionaryShangpinChuruInout from '@/views/modules/dictionaryShangpinChuruInout/list'
        import registerApproval from '@/views/modules/yonghu/register-approval'

        // 区块链相关页面
        import chainOverview from '@/views/modules/chainOverview/list'
        import assetChain from '@/views/modules/assetChain/list'
        import transactionRecord from '@/views/modules/transactionRecord/list'
        import chainAccount from '@/views/modules/chainAccount/list'

        // 告警服务相关页面
        import alarmList from '@/views/modules/alarmList/list'
        import alarmSettings from '@/views/modules/alarmSettings/list'
        import alarmStatistics from '@/views/modules/alarmStatistics/list'

        // 新闻管理相关页面
        import newsList from '@/views/modules/newsManagement/list'
        import newsStatistics from '@/views/modules/newsManagement/statistics'

        // 我的资产相关页面
        import myAssets from '@/views/modules/myAssets/my'
        import assetTransfer from '@/views/modules/myAssets/transfer'

//2.配置路由   注意：名字
const routes = [
  {
    path: '/index',
    name: '首页',
    component: Index,
    children: [{
      path: '',
      name: '数据概览',
      component: Home,
      meta: {icon:'', title:'center'}
    }, {
      path: 'updatePassword',
      name: '修改密码',
      component: UpdatePassword,
      meta: {icon:'', title:'updatePassword'}
    }, {
      path: 'pay',
      name: '支付',
      component: pay,
      meta: {icon:'', title:'pay'}
    }, {
      path: 'center',
      name: '个人信息',
      component: center,
      meta: {icon:'', title:'center'}
    }
    ,{
        path: 'users',
        name: '管理信息',
        component: users
      }
    ,{
        path: 'dictionaryBumen',
        name: '部门类型名称',
        component: dictionaryBumen,
        meta: {requiresAdmin: true}
    }
    ,{
        path: 'dictionaryDidian',
        name: '存放地点类型名称',
        component: dictionaryDidian,
        meta: {requiresAdmin: true}
    }
    ,{
        path: 'dictionaryGuihuan',
        name: '归还管理',
        component: () => import('@/views/modules/guihuanGuanli/list')
    }
    ,{
        path: 'dictionarySex',
        name: '性别类型名称',
        component: dictionarySex
    }
    ,{
        path: 'dictionaryShangpin',
        name: '资产类型名称',
        component: dictionaryShangpin,
        meta: {requiresAdmin: true}
    }
    ,{
        path: 'dictionaryShangpinChuruInout',
        name: '入库类型名称',
        component: dictionaryShangpinChuruInout
    }
    ,{
        path: 'baofei',
        name: '资产报废',
        component: baofei
      }
    ,{
        path: 'dictionary',
        name: '字典',
        component: dictionary
      }
    ,{
        path: 'jieyong',
        name: '资产借用',
        component: jieyong
      }
    ,{
        path: 'shangpin',
        name: '校园资产',
        component: shangpin
      }
    ,{
        path: 'shangpinChuruInout',
        name: '入库',
        component: shangpinChuruInout
      }
    ,{
        path: 'shangpinChuruInoutList',
        name: '入库详情',
        component: shangpinChuruInoutList
      }
    ,{
        path: 'weixiu',
        name: '资产维修',
        component: weixiu
      }
    ,{
        path: 'yonghu',
        name: '用户',
        component: yonghu
      }
    ,{
        path: 'register-approval',
        name: '注册申请',
        component: registerApproval
      }
    // 区块链相关路由
    ,{
        path: 'chainOverview',
        name: '区块链概览',
        component: chainOverview
      }
    ,{
        path: 'assetChain',
        name: '资产上链',
        component: assetChain
      }
    ,{
        path: 'transactionRecord',
        name: '交易记录',
        component: transactionRecord
      }
    ,{
        path: 'chainAccount',
        name: '链账户管理',
        component: chainAccount
      }
    // 告警服务相关路由
    ,{
        path: 'alarmList',
        name: '告警列表',
        component: alarmList
    }
    ,{
        path: 'alarmSettings',
        name: '告警设置',
        component: alarmSettings
    }
    ,{
        path: 'alarmStatistics',
        name: '告警统计',
        component: alarmStatistics
    }
    // 新闻管理相关路由
    ,{
        path: 'newsList',
        name: '新闻列表',
        component: newsList
    }
    ,{
        path: 'newsStatistics',
        name: '新闻统计',
        component: newsStatistics
    }
    // 我的资产相关路由
    ,{
        path: 'myAssets',
        name: '我的',
        component: myAssets
    }
    ,{
        path: 'assetTransfer',
        name: '资产转让记录',
        component: assetTransfer
    }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {icon:'', title:'login'}
  },
  {
    path: '/register',
    name: 'register',
    component: register,
    meta: {icon:'', title:'register'}
  },
  {
    path: '/',
    name: '介绍页',
    component: HomePage,
    meta: {icon:'', title:'home'}
  },
  {
    path: '*',
    component: NotFound
  }
]
//3.实例化VueRouter  注意：名字
const router = new VueRouter({
  mode: 'hash',
  /*hash模式改为history*/
  routes // （缩写）相当于 routes: routes
})

export default router;
