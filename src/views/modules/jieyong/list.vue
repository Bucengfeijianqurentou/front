<template>
    <div class="main-content">

        <!-- 条件查询 -->
        <div v-if="showFlag">
            <div class="search-form">
                <div class="search-item">
                    <span>借用数量</span>
                    <el-input v-model="searchForm.jieyongNumberStartSearch" placeholder="最小值" size="small" clearable></el-input>
                    <span class="separator">至</span>
                    <el-input v-model="searchForm.jieyongNumberEndSearch" placeholder="最大值" size="small" clearable></el-input>
                </div>
                
                <div class="search-item">
                    <span>资产编号</span>
                    <el-input v-model="searchForm.shangpinUuidNumber" placeholder="资产编号" size="small" clearable></el-input>
                </div>
                
                <div class="search-item">
                    <span>资产名称</span>
                    <el-input v-model="searchForm.shangpinName" placeholder="资产名称" size="small" clearable></el-input>
                </div>
                
                <div class="search-item">
                    <span>资产类型</span>
                    <el-select v-model="searchForm.shangpinTypes" placeholder="请选择" size="small" clearable>
                        <el-option label="请选择" value=""></el-option>
                        <el-option
                            v-for="(item,index) in shangpinTypesSelectSearch"
                            v-bind:key="index"
                            :label="item.indexName"
                            :value="item.codeIndex">
                        </el-option>
                    </el-select>
                </div>
                
                <div class="search-item">
                    <span>是否归还</span>
                    <el-select v-model="searchForm.guihuanTypes" placeholder="请选择" size="small" clearable>
                        <el-option label="请选择" value=""></el-option>
                        <el-option
                            v-for="(item,index) in guihuanTypesSelectSearch"
                            v-bind:key="index"
                            :label="item.indexName"
                            :value="item.codeIndex">
                            <template v-if="item.codeIndex == 1">
                                <el-tag type="danger" effect="plain" size="mini">借用中</el-tag>
                            </template>
                            <template v-else-if="item.codeIndex == 2">
                                <el-tag type="success" effect="plain" size="mini">已归还</el-tag>
                            </template>
                            <template v-else-if="item.codeIndex == 3">
                                <el-tag type="warning" effect="plain" size="mini">审核中</el-tag>
                            </template>
                            <template v-else>{{item.indexName}}</template>
                        </el-option>
                    </el-select>
                </div>
                
                <div class="search-buttons">
                    <el-button
                        v-if="isAuth('jieyong','新增')"
                        type="primary"
                        icon="el-icon-plus"
                        size="small"
                        @click="addOrUpdateHandler()"
                    >申请借用</el-button>
                    <el-button type="primary" size="small" @click="search()">查询</el-button>
                    <el-button size="small" @click="resetSearch()">重置</el-button>
                </div>
            </div>
            <div class="table-content" style="overflow: visible; width: 100%;">
                <el-table class="tables" :size="contents.tableSize" :show-header="contents.tableShowHeader"
                          :header-row-style="headerRowStyle" :header-cell-style="headerCellStyle"
                          :border="contents.tableBorder"
                          :fit="true"
                          :stripe="contents.tableStripe"
                          :row-style="rowStyle"
                          :cell-style="cellStyle"
                          :max-height="null"
                          :style="{width: '100%',fontSize:contents.tableContentFontSize,color:contents.tableContentFontColor, overflow: 'visible'}"
                          v-if="isAuth('jieyong','查看')"
                          :data="dataList"
                          v-loading="dataListLoading"
                          @selection-change="selectionChangeHandler">
                    <el-table-column  v-if="contents.tableSelection"
                                      type="selection"
                                      header-align="center"
                                      align="center"
                                      width="50">
                    </el-table-column>
                    <el-table-column label="索引" v-if="contents.tableIndex" type="index" width="50" />
                    <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                                      prop="shangpinUuidNumber"
                                      header-align="center"
                                      width="120"
                                      label="资产编号">
                        <template slot-scope="scope">
                            {{scope.row.shangpinUuidNumber}}
                        </template>
                    </el-table-column>
                    <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                                      prop="shangpinName"
                                      header-align="center"
                                      width="150"
                                      label="资产名称">
                        <template slot-scope="scope">
                            {{scope.row.shangpinName}}
                        </template>
                    </el-table-column>
                    
                    <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                                      prop="shangpinTypes"
                                      header-align="center"
                                      width="120"
                                      label="资产类型">
                        <template slot-scope="scope">
                            {{scope.row.shangpinValue}}
                        </template>
                    </el-table-column>
                    <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                                      prop="didianTypes"
                                      header-align="center"
                                      width="120"
                                      label="存放地点">
                        <template slot-scope="scope">
                            {{scope.row.didianValue}}
                        </template>
                    </el-table-column>
                    <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                                      prop="yonghuName"
                                      header-align="center"
                                      width="120"
                                      label="用户姓名">
                        <template slot-scope="scope">
                            {{scope.row.yonghuName}}
                        </template>
                    </el-table-column>
                    <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                                      prop="yonghuPhone"
                                      header-align="center"
                                      width="120"
                                      label="用户手机号">
                        <template slot-scope="scope">
                            {{scope.row.yonghuPhone}}
                        </template>
                    </el-table-column>
                    <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                                      prop="bumenTypes"
                                      header-align="center"
                                      width="120"
                                      label="部门">
                        <template slot-scope="scope">
                            {{scope.row.bumenValue}}
                        </template>
                    </el-table-column>
                    <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                                      prop="jieyongNumber"
                                      header-align="center"
                                      width="120"
                                      label="借用数量">
                        <template slot-scope="scope">
                            {{scope.row.jieyongNumber}}
                        </template>
                    </el-table-column>
                    <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                                      prop="guihuanTypes"
                                      header-align="center"
                                      width="120"
                                      label="是否归还">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.guihuanTypes == 1" type="danger" effect="plain" size="medium">借用中</el-tag>
                            <el-tag v-else-if="scope.row.guihuanTypes == 2" type="success" effect="plain" size="medium">已归还</el-tag>
                            <el-tag v-else-if="scope.row.guihuanTypes == 3" type="warning" effect="plain" size="medium">审核中</el-tag>
                            <span v-else>{{scope.row.guihuanValue}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                                   prop="insertTime"
                                   header-align="center"
                                   width="160"
                                   label="借用时间">
                        <template slot-scope="scope">
                            {{scope.row.insertTime}}
                        </template>
                    </el-table-column>

                    <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                                   prop="transactionHash"
                                   header-align="center"
                                   width="150"
                                   label="交易哈希">
                        <template slot-scope="scope">
                            <el-popover
                                placement="top-start"
                                title="交易哈希"
                                width="300"
                                trigger="hover">
                                <div style="word-break: break-all;">{{ scope.row.transactionHash }}</div>
                                <div style="margin-top: 10px;">
                                    <el-button size="mini" type="text" @click="copyToClipboard(scope.row.transactionHash)">复制</el-button>
                                </div>
                                <div slot="reference" class="hash-cell">
                                    {{ scope.row.transactionHash ? scope.row.transactionHash.substring(0, 8) + '...' : '' }}
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>

                    <el-table-column min-width="300" :align="contents.tableAlign"
                                     header-align="center"
                                     label="操作">
                        <template slot-scope="scope">
                            <div class="operation-buttons">
                                <el-button v-if="isAuth('jieyong','查看')" type="success" icon="el-icon-tickets" size="mini" @click="addOrUpdateHandler(scope.row.id,'info',scope.row)">详情</el-button>
                                <el-button v-if="isAuth('jieyong','修改')" type="primary" icon="el-icon-edit" size="mini" @click="addOrUpdateHandler(scope.row.id)">修改</el-button>
                                <el-button v-if="role === '管理员' && scope.row.guihuanTypes == 3" type="success" icon="el-icon-check" size="mini" @click="approveHandler(scope.row.id)">批准</el-button>
                                <el-button v-if="role === '管理员' && scope.row.guihuanTypes == 3" type="danger" icon="el-icon-close" size="mini" @click="rejectHandler(scope.row.id)">拒绝</el-button>
                                <el-button v-if="role !== '管理员' && scope.row.guihuanTypes == 1" type="warning" icon="el-icon-back" size="mini" @click="guihuan(scope.row.id)">归还</el-button>
                                <el-button v-if="scope.row.guihuanTypes == 1 && scope.row.userId == userId" type="warning" icon="el-icon-s-tools" size="mini" @click="applyForRepair(scope.row)">申请维修</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                        clsss="pages"
                        :layout="layouts"
                        @size-change="sizeChangeHandle"
                        @current-change="currentChangeHandle"
                        :current-page="pageIndex"
                        :page-sizes="[10, 20, 50, 100]"
                        :page-size="Number(contents.pageEachNum)"
                        :total="totalPage"
                        :small="contents.pageStyle"
                        class="pagination-content"
                        :background="contents.pageBtnBG"
                        :style="{textAlign:contents.pagePosition==1?'left':contents.pagePosition==2?'center':'right'}"
                ></el-pagination>
            </div>
        </div>
        
        <!-- 筛选状态指示 -->
        <div class="filter-tags" v-if="searchForm.guihuanTypes">
            <span class="filter-label">当前筛选:</span>
            <el-tag 
                v-if="searchForm.guihuanTypes == 1" 
                type="danger" 
                effect="plain" 
                size="small"
                closable
                @close="searchForm.guihuanTypes = ''; search()">
                借用中
            </el-tag>
            <el-tag 
                v-if="searchForm.guihuanTypes == 2" 
                type="success" 
                effect="plain" 
                size="small"
                closable
                @close="searchForm.guihuanTypes = ''; search()">
                已归还
            </el-tag>
        </div>
        
        <!-- 按钮区域 -->
        <div class="operation-area">
            <el-button
                v-if="isAuth('jieyong','报表')"
                type="primary"
                size="small"
                @click="chartDialog()"
            >报表</el-button>
            
            <a  v-if="isAuth('jieyong','导入导出')"
                :href="importTemplateUrl"
                style="text-decoration:none">
                <el-button type="primary" size="small">模板下载</el-button>
            </a>
            
            <el-upload
                v-if="isAuth('jieyong','导入导出')"
                style="display: inline-block"
                action="xiaoyuanzichan/file/upload"
                :on-success="jieyongUploadSuccess"
                :on-error="jieyongUploadError"
                :show-file-list="false">
                <el-button
                    type="primary"
                    size="small"
                >导入</el-button>
            </el-upload>
            
            <download-excel 
                v-if="isAuth('jieyong','导入导出')" 
                style="display: inline-block" 
                class="export-excel-wrapper" 
                :data="dataList" 
                :fields="json_fields" 
                name="jieyong.xls">
                <el-button
                    type="primary"
                    size="small"
                >导出</el-button>
            </download-excel>
        </div>
        
        <!-- 操作按钮区域 -->
        <div class="button-area" style="margin: 15px 0; padding: 10px 20px; background-color: #f5f7fa; border-radius: 4px; display: flex; justify-content: space-between; align-items: center;">
            <div>
                <!-- 移除批量删除按钮 -->
            </div>
            <div>
                <download-excel 
                    v-if="dataList.length > 0"
                    class="export-excel-wrapper" 
                    :data="dataList" 
                    :fields="json_fields" 
                    name="借用记录.xls">
                    <el-button type="primary" size="small" icon="el-icon-download">导出数据</el-button>
                </download-excel>
            </div>
        </div>
        
        <!-- 添加/修改页面  将父组件的search方法传递给子组件-->
        <add-or-update v-if="addOrUpdateFlag" :parent="this" ref="addOrUpdate"></add-or-update>



        <el-dialog title="统计报表" :visible.sync="chartVisiable" width="800">
            <el-date-picker
                    v-model="echartsDate"
                    type="year"
                    placeholder="选择年">
            </el-date-picker>
            <el-button @click="chartDialog()">查询</el-button>
            <div id="statistic" style="width:100%;height:600px;"></div>
            <span slot="footer" class="dialog-footer">
				<el-button @click="chartVisiable = false">返回</el-button>
			</span>
        </el-dialog>

        <!-- 状态统计指示 -->
        <div class="status-statistics" v-if="!dataListLoading && dataList.length > 0">
            <div class="stat-item">
                <span>总计:</span>
                <span class="stat-count">{{dataList.length}}</span>
            </div>
            <div class="stat-item">
                <el-tag type="danger" effect="plain" size="small">借用中</el-tag>
                <span class="stat-count">{{getBorrowingCount}}</span>
            </div>
            <div class="stat-item">
                <el-tag type="success" effect="plain" size="small">已归还</el-tag>
                <span class="stat-count">{{getReturnedCount}}</span>
            </div>
            <div class="stat-item">
                <el-tag type="warning" effect="plain" size="small">审核中</el-tag>
                <span class="stat-count">{{getPendingCount}}</span>
            </div>
        </div>

        <!-- 归还确认对话框 -->
        <el-dialog title="确认归还" :visible.sync="guihuanDialogVisible" width="30%">
            <span>确定要归还此资产吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="guihuanDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="confirmGuihuan">确定</el-button>
            </span>
        </el-dialog>
        
        <!-- 维修申请对话框 -->
        <el-dialog title="申请维修" :visible.sync="repairDialogVisible" width="40%">
            <el-form :model="repairForm" label-width="100px">
                <el-form-item label="资产编号">
                    <span>{{ repairForm.shangpinUuidNumber }}</span>
                </el-form-item>
                <el-form-item label="资产名称">
                    <span>{{ repairForm.shangpinName }}</span>
                </el-form-item>
                <el-form-item label="维修数量" prop="weixiuNumber">
                    <el-input-number v-model="repairForm.weixiuNumber" :min="1" :max="repairForm.maxNumber || 1"></el-input-number>
                </el-form-item>
                <el-form-item label="维修原因" prop="weixiuContent">
                    <el-input type="textarea" v-model="repairForm.weixiuContent" rows="4" placeholder="请详细描述需要维修的原因"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="repairDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="confirmRepairApplication">提交申请</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
    import AddOrUpdate from "./add-or-update";
    import styleJs from "../../../utils/style.js";
    export default {
        data() {
        return {
            searchForm: {
                key: ""
            },
            sessionTable : "",//登录账户所在表名
            role : "",//权限
    //级联表下拉框搜索条件
              shangpinTypesSelectSearch : [],
              didianTypesSelectSearch : [],
    //当前表下拉框搜索条件
              guihuanTypesSelectSearch : [],
            form:{
                id : null,
                yonghuId : null,
                shangpinId : null,
                jieyongNumber : null,
                jieyongContent : null,
                guihuanTypes : null,
                insertTime : null,
                createTime : null,
            },
            dataList: [],
            pageIndex: 1,
            pageSize: 10,
            totalPage: 0,
            dataListLoading: false,
            dataListSelections: [],
            showFlag: true,
            sfshVisiable: false,
            shForm: {},
            chartVisiable: false,
            addOrUpdateFlag:false,
            contents:null,
            layouts: '',

            echartsDate: new Date(),//echarts的时间查询字段

            //导出excel
            json_fields: {
                //级联表字段
                     '资产编号': 'shangpinUuidNumber',
                     '资产名称': 'shangpinName',
                     '资产照片': 'shangpinPhoto',
                     '资产类型': 'shangpinTypes',
                     '存放地点': 'didianTypes',
                     '资产库存': 'shangpinKucunNumber',
                     '用户姓名': 'yonghuName',
                     '用户手机号': 'yonghuPhone',
                     '用户身份证号': 'yonghuIdNumber',
                     '用户头像': 'yonghuPhoto',
                     '电子邮箱': 'yonghuEmail',
                     '部门': 'bumenTypes',
                //本表字段
                     '借用数量': "jieyongNumber",
                     '是否归还': "guihuanTypes",
                     '借用时间': "insertTime",
            },

            userId: null,
            
            // 状态统计
            jieyongzhongCount: 0,
            yiguihuanCount: 0,
            shenhezhongCount: 0,
            
            // 归还相关
            guihuanDialogVisible: false,
            guihuanId: null,
            
            // 维修申请相关
            repairDialogVisible: false,
            repairForm: {
                shangpinId: '',
                shangpinUuidNumber: '',
                shangpinName: '',
                weixiuNumber: 1,
                weixiuContent: '',
                maxNumber: 1
            }
        };
    },
    created() {
        this.contents = styleJs.listStyle();
        this.init();
        this.getDataList();
        this.contentStyleChange()
    },
    mounted() {
        //获取当前登录用户的信息
        this.sessionTable = this.$storage.get("sessionTable");
        this.role = this.$storage.get("role");
        this.userId = this.$storage.get("userId");
    },
    filters: {
        htmlfilter: function (val) {
            return val.replace(/<[^>]*>/g).replace(/undefined/g,'');
        }
    },
    components: {
        AddOrUpdate,
        'download-excel': () => import('vue-json-excel')
    },
    computed: {
        // 统计借用中的数量
        getBorrowingCount() {
            return this.dataList.filter(item => item.guihuanTypes == 1).length;
        },
        // 统计已归还的数量
        getReturnedCount() {
            return this.dataList.filter(item => item.guihuanTypes == 2).length;
        },
        // 统计审核中的数量
        getPendingCount() {
            return this.dataList.filter(item => item.guihuanTypes == 3).length;
        }
    },
    methods: {
        chartDialog() {
            let _this = this;
            let params = {
                dateFormat :"%Y"
                ,riqi :_this.echartsDate.getFullYear()
                ,thisTable : {//当前表
                    tableName :"shangdian_shouyin"//当前表表名
                    ,sumColum : 'shangdian_shouyin_true_price' //求和字段
                    ,date : 'insert_time'//分组日期字段
                    // ,string : 'name,leixing'//分组字符串字段
                    // ,types : 'shangdian_shouyin_types'//分组下拉框字段
                }
                // ,joinTable : {//级联表（可以不存在）
                //     tableName :"yuangong"//级联表表名
                //     // ,date : 'insert_time'//分组日期字段
                //     ,string : 'yuangong_name'//分组字符串字段
                //     // ,types : 'insertTime'//分组下拉框字段
                // }
            }
            _this.chartVisiable = true;
            _this.$nextTick(() => {
                var statistic = this.$echarts.init(document.getElementById("statistic"), 'macarons');
                this.$http({
                    url: "barSum",
                    method: "get",
                    params: params
                }).then(({data}) => {
                    if(data && data.code === 0){


                        //柱状图 求和 已成功使用
                        //start
                        let series = [];//具体数据值
                        data.data.yAxis.forEach(function (item,index) {
                            let tempMap = {};
                            tempMap.name=data.data.legend[index];
                            tempMap.type='bar';
                            tempMap.data=item;
                            series.push(tempMap);

                        })

                        var option = {
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'cross',
                                    crossStyle: {
                                        color: '#999'
                                    }
                                }
                            },
                            toolbox: {
                                feature: {
                                    // dataView: { show: true, readOnly: false },  // 数据查看
                                    magicType: { show: true, type: ['line', 'bar'] },//切换图形展示方式
                                    // restore: { show: true }, // 刷新
                                    saveAsImage: { show: true }//保存
                                }
                            },
                            legend: {
                                data: data.data.legend//标题  可以点击导致某一列数据消失
                            },
                            xAxis: [
                                {
                                    type: 'category',
                                    name: '月份',
                                    data: data.data.xAxis,
                                    axisPointer: {
                                        type: 'shadow'
                                    }
                                }
                            ],
                            yAxis: [
                                {
                                    type: 'value',//不能改
                                    name: '元',//y轴单位
                                    axisLabel: {
                                        formatter: '{value} 元' // 后缀
                                    }
                                }
                            ],
                            series:series//具体数据
                        };
                        // 使用刚指定的配置项和数据显示图表。
                        statistic.setOption(option);
                        //根据窗口的大小变动图表
                        window.onresize = function () {
                            statistic.resize();
                        };
                        //end



                        //饼状图 原先自带的 未修改过
                        //start
                        /*let res = data.data;
                        let xAxis = [];
                        let yAxis = [];
                        let pArray = []
                        for (let i = 0; i < res.length; i++) {
                            xAxis.push(res[i].xinzi);
                            yAxis.push(res[i].total);
                            pArray.push({
                                value: res[i].total,
                                name: res[i].xinzi
                            })
                            var option = {};
                            option = {
                                title: {
                                    text: '统计',
                                    left: 'center'
                                },
                                tooltip: {
                                    trigger: 'item',
                                    formatter: '{b} : {c} ({d}%)'
                                },
                                series: [{
                                    type: 'pie',
                                    radius: '55%',
                                    center: ['50%', '60%'],
                                    data: pArray,
                                    emphasis: {
                                        itemStyle: {
                                            shadowBlur: 10,
                                            shadowOffsetX: 0,
                                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                                        }
                                    }
                                }]
                            };
                            // 使用刚指定的配置项和数据显示图表。
                            statistic.setOption(option);
                            //根据窗口的大小变动图表
                            window.onresize = function () {
                                statistic.resize();
                            };
                        }*/

                        //end
                    }else {
                        this.$message({
                            message: "报表未查询到数据",
                            type: "success",
                            duration: 1500,
                            onClose: () => {
                                this.search();
                            }
                        });
                    }
                });
            });
            this.chartVisiable = !this.chartVisiable;
            this.$nextTick(() => {
                var statistic = this.$echarts.init(document.getElementById("statistic"), 'macarons');
                this.$http({
                    url: "group/xinzitongji/xinzi",
                    method: "get",
                }).then(({data}) => {
                    if(data && data.code === 0){
                        let res = data.data;
                        let xAxis = [];
                        let yAxis = [];
                        let pArray = []
                        for (let i = 0; i < res.length; i++) {
                            xAxis.push(res[i].xinzi);
                            yAxis.push(res[i].total);
                            pArray.push({
                                value: res[i].total,
                                name: res[i].xinzi
                            })
                            var option = {};
                            option = {
                                title: {
                                    text: '统计',
                                    left: 'center'
                                },
                                tooltip: {
                                    trigger: 'item',
                                    formatter: '{b} : {c} ({d}%)'
                                },
                                series: [{
                                    type: 'pie',
                                    radius: '55%',
                                    center: ['50%', '60%'],
                                    data: pArray,
                                    emphasis: {
                                        itemStyle: {
                                            shadowBlur: 10,
                                            shadowOffsetX: 0,
                                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                                        }
                                    }
                                }]
                            };
                            // 使用刚指定的配置项和数据显示图表。
                            statistic.setOption(option);
                            //根据窗口的大小变动图表
                            window.onresize = function () {
                                statistic.resize();
                            };
                        }
                    }
                });
            // xcolumn ycolumn
            });
        },
        contentStyleChange() {
            this.contentSearchStyleChange()
            this.contentBtnAdAllStyleChange()
            this.contentSearchBtnStyleChange()
            this.contentTableBtnStyleChange()
            this.contentPageStyleChange()
        },
        contentSearchStyleChange() {
            this.$nextTick(() => {
                document.querySelectorAll('.form-content .slt .el-input__inner').forEach(el => {
                    let textAlign = 'left'
                    if(this.contents.inputFontPosition == 2)
                        textAlign = 'center'
                        if (this.contents.inputFontPosition == 3) textAlign = 'right'
                            el.style.textAlign = textAlign
                        el.style.height = this.contents.inputHeight
                        el.style.lineHeight = this.contents.inputHeight
                        el.style.color = this.contents.inputFontColor
                        el.style.fontSize = this.contents.inputFontSize
                        el.style.borderWidth = this.contents.inputBorderWidth
                        el.style.borderStyle = this.contents.inputBorderStyle
                        el.style.borderColor = this.contents.inputBorderColor
                        el.style.borderRadius = this.contents.inputBorderRadius
                        el.style.backgroundColor = this.contents.inputBgColor
                })
                if (this.contents.inputTitle) {
                    document.querySelectorAll('.form-content .slt .el-form-item__label').forEach(el => {
                        el.style.color = this.contents.inputTitleColor
                        el.style.fontSize = this.contents.inputTitleSize
                        el.style.lineHeight = this.contents.inputHeight
                    })
                }
                setTimeout(() => {
                    document.querySelectorAll('.form-content .slt .el-input__prefix').forEach(el => {
                        el.style.color = this.contents.inputIconColor
                        el.style.lineHeight = this.contents.inputHeight
                    })
                    document.querySelectorAll('.form-content .slt .el-input__suffix').forEach(el => {
                        el.style.color = this.contents.inputIconColor
                        el.style.lineHeight = this.contents.inputHeight
                    })
                    document.querySelectorAll('.form-content .slt .el-input__icon').forEach(el => {
                        el.style.lineHeight = this.contents.inputHeight
                    })
                }, 10 )
            })
        },
        // 搜索按钮
        contentSearchBtnStyleChange() {
            this.$nextTick(() => {
                document.querySelectorAll('.form-content .slt .el-button--success').forEach(el => {
                    el.style.height = this.contents.searchBtnHeight
                    el.style.color = this.contents.searchBtnFontColor
                    el.style.fontSize = this.contents.searchBtnFontSize
                    el.style.borderWidth = this.contents.searchBtnBorderWidth
                    el.style.borderStyle = this.contents.searchBtnBorderStyle
                    el.style.borderColor = this.contents.searchBtnBorderColor
                    el.style.borderRadius = this.contents.searchBtnBorderRadius
                    el.style.backgroundColor = this.contents.searchBtnBgColor
                })
            })
        },
        // 新增、批量删除
        contentBtnAdAllStyleChange() {
            this.$nextTick(() => {
                document.querySelectorAll('.form-content .ad .el-button--success').forEach(el => {
                    el.style.height = this.contents.btnAdAllHeight
                    el.style.color = this.contents.btnAdAllAddFontColor
                    el.style.fontSize = this.contents.btnAdAllFontSize
                    el.style.borderWidth = this.contents.btnAdAllBorderWidth
                    el.style.borderStyle = this.contents.btnAdAllBorderStyle
                    el.style.borderColor = this.contents.btnAdAllBorderColor
                    el.style.borderRadius = this.contents.btnAdAllBorderRadius
                    el.style.backgroundColor = this.contents.btnAdAllAddBgColor
                })
                document.querySelectorAll('.form-content .ad .el-button--danger').forEach(el => {
                    el.style.height = this.contents.btnAdAllHeight
                    el.style.color = this.contents.btnAdAllDelFontColor
                    el.style.fontSize = this.contents.btnAdAllFontSize
                    el.style.borderWidth = this.contents.btnAdAllBorderWidth
                    el.style.borderStyle = this.contents.btnAdAllBorderStyle
                    el.style.borderColor = this.contents.btnAdAllBorderColor
                    el.style.borderRadius = this.contents.btnAdAllBorderRadius
                    el.style.backgroundColor = this.contents.btnAdAllDelBgColor
                })
                document.querySelectorAll('.form-content .ad .el-button--warning').forEach(el => {
                    el.style.height = this.contents.btnAdAllHeight
                    el.style.color = this.contents.btnAdAllWarnFontColor
                    el.style.fontSize = this.contents.btnAdAllFontSize
                    el.style.borderWidth = this.contents.btnAdAllBorderWidth
                    el.style.borderStyle = this.contents.btnAdAllBorderStyle
                    el.style.borderColor = this.contents.btnAdAllBorderColor
                    el.style.borderRadius = this.contents.btnAdAllBorderRadius
                    el.style.backgroundColor = this.contents.btnAdAllWarnBgColor
                })
            })
        },
        // 表格
        rowStyle({row, rowIndex}) {
            if (rowIndex % 2 == 1) {
                if (this.contents.tableStripe) {
                    return {color: this.contents.tableStripeFontColor}
                }
            } else {
                return ''
            }
        },
        cellStyle({row, rowIndex}) {
            if (rowIndex % 2 == 1) {
                if (this.contents.tableStripe) {
                    return {backgroundColor: this.contents.tableStripeBgColor}
                }
            } else {
                return ''
            }
        },
        headerRowStyle({row, rowIndex}) {
            return {color: this.contents.tableHeaderFontColor}
        },
        headerCellStyle({row, rowIndex}) {
            return {backgroundColor: this.contents.tableHeaderBgColor}
        },
        // 表格按钮
        contentTableBtnStyleChange() {
            // this.$nextTick(()=>{
            //   setTimeout(()=>{
            //     document.querySelectorAll('.table-content .tables .el-table__body .el-button--success').forEach(el=>{
            //       el.style.height = this.contents.tableBtnHeight
            //       el.style.color = this.contents.tableBtnDetailFontColor
            //       el.style.fontSize = this.contents.tableBtnFontSize
            //       el.style.borderWidth = this.contents.tableBtnBorderWidth
            //       el.style.borderStyle = this.contents.tableBtnBorderStyle
            //       el.style.borderColor = this.contents.tableBtnBorderColor
            //       el.style.borderRadius = this.contents.tableBtnBorderRadius
            //       el.style.backgroundColor = this.contents.tableBtnDetailBgColor
            //     })
            //     document.querySelectorAll('.table-content .tables .el-table__body .el-button--primary').forEach(el=>{
            //       el.style.height = this.contents.tableBtnHeight
            //       el.style.color = this.contents.tableBtnEditFontColor
            //       el.style.fontSize = this.contents.tableBtnFontSize
            //       el.style.borderWidth = this.contents.tableBtnBorderWidth
            //       el.style.borderStyle = this.contents.tableBtnBorderStyle
            //       el.style.borderColor = this.contents.tableBtnBorderColor
            //       el.style.borderRadius = this.contents.tableBtnBorderRadius
            //       el.style.backgroundColor = this.contents.tableBtnEditBgColor
            //     })
            //     document.querySelectorAll('.table-content .tables .el-table__body .el-button--danger').forEach(el=>{
            //       el.style.height = this.contents.tableBtnHeight
            //       el.style.color = this.contents.tableBtnDelFontColor
            //       el.style.fontSize = this.contents.tableBtnFontSize
            //       el.style.borderWidth = this.contents.tableBtnBorderWidth
            //       el.style.borderStyle = this.contents.tableBtnBorderStyle
            //       el.style.borderColor = this.contents.tableBtnBorderColor
            //       el.style.borderRadius = this.contents.tableBtnBorderRadius
            //       el.style.backgroundColor = this.contents.tableBtnDelBgColor
            //     })

            //   }, 50)
            // })
        },
        // 分页
        contentPageStyleChange() {
            let arr = []
            if (this.contents.pageTotal) arr.push('total')
            if (this.contents.pageSizes) arr.push('sizes')
            if (this.contents.pagePrevNext) {
                arr.push('prev')
                if (this.contents.pagePager) arr.push('pager')
                arr.push('next')
            }
            if (this.contents.pageJumper) arr.push('jumper')
            this.layouts = arr.join()
            this.contents.pageEachNum = 10
        },

        init() {
        },
        search() {
            this.pageIndex = 1;
            this.getDataList();
        },
        // 获取数据列表
        getDataList() {
            this.dataListLoading = true;
            let params = {
                page: this.pageIndex,
                limit: this.pageSize,
                sort: 'id',
            }

                                     
            if (this.searchForm.shangpinUuidNumber!= '' && this.searchForm.shangpinUuidNumber!= undefined) {
                params['shangpinUuidNumber'] = '%' + this.searchForm.shangpinUuidNumber + '%'
            }
                     
            if (this.searchForm.shangpinName!= '' && this.searchForm.shangpinName!= undefined) {
                params['shangpinName'] = '%' + this.searchForm.shangpinName + '%'
            }
                                         
            if (this.searchForm.shangpinTypes!= '' && this.searchForm.shangpinTypes!= undefined) {
                params['shangpinTypes'] = this.searchForm.shangpinTypes
            }
                     
            if (this.searchForm.didianTypes!= '' && this.searchForm.didianTypes!= undefined) {
                params['didianTypes'] = this.searchForm.didianTypes
            }
                     
            if (this.searchForm.shangpinKucunNumber!= '' && this.searchForm.shangpinKucunNumber!= undefined) {
                params['shangpinKucunNumber'] = this.searchForm.shangpinKucunNumber
            }
                                                            
            if (this.searchForm.createTimeStartSearch != '' && this.searchForm.createTimeStartSearch != undefined) {
                params['createTimeStartSearch'] = this.searchForm.createTimeStartSearch
            }
            if (this.searchForm.createTimeEndSearch != '' && this.searchForm.createTimeEndSearch != undefined) {
                params['createTimeEndSearch'] = this.searchForm.createTimeEndSearch
            }
                                         
            if (this.searchForm.yonghuName!= '' && this.searchForm.yonghuName!= undefined) {
                params['yonghuName'] = '%' + this.searchForm.yonghuName + '%'
            }
                     
            if (this.searchForm.yonghuPhone!= '' && this.searchForm.yonghuPhone!= undefined) {
                params['yonghuPhone'] = '%' + this.searchForm.yonghuPhone + '%'
            }
                     
            if (this.searchForm.yonghuIdNumber!= '' && this.searchForm.yonghuIdNumber!= undefined) {
                params['yonghuIdNumber'] = '%' + this.searchForm.yonghuIdNumber + '%'
            }
                                                                                
            if (this.searchForm.createTimeStartSearch != '' && this.searchForm.createTimeStartSearch != undefined) {
                params['createTimeStartSearch'] = this.searchForm.createTimeStartSearch
            }
            if (this.searchForm.createTimeEndSearch != '' && this.searchForm.createTimeEndSearch != undefined) {
                params['createTimeEndSearch'] = this.searchForm.createTimeEndSearch
            }
                                 

            if (this.searchForm.jieyongNumberStartSearch != '' && this.searchForm.jieyongNumberStartSearch != undefined) {
                params['jieyongNumberStartSearch'] = this.searchForm.jieyongNumberStartSearch
            }
            if (this.searchForm.jieyongNumberEndSearch != '' && this.searchForm.jieyongNumberEndSearch != undefined) {
                params['jieyongNumberEndSearch'] = this.searchForm.jieyongNumberEndSearch
            }
             
            if (this.searchForm.guihuanTypes!= '' && this.searchForm.guihuanTypes!= undefined) {
                params['guihuanTypes'] = this.searchForm.guihuanTypes
            }
            
            params['jieyongDelete'] = 1// 逻辑删除字段 1 未删除 2 删除


            this.$http({
                url: "jieyong/page",
                method: "get",
                params: params
            }).then(({data}) => {
                if(data && data.code === 0){
                    this.dataList = data.data.list;
                    this.totalPage = data.data.total;
                }else{
                    this.dataList = [];
                    this.totalPage = 0;
                }
                this.dataListLoading = false;
            });

            //查询级联表搜索条件所有列表
            this.$http({
                url: "dictionary/page?dicCode=shangpin_types&page=1&limit=100",
                method: "get",
                page: 1,
                limit: 100,
            }).then(({data}) => {
                if(data && data.code === 0){
                    this.shangpinTypesSelectSearch = data.data.list;
                }
            });
            this.$http({
                url: "dictionary/page?dicCode=didian_types&page=1&limit=100",
                method: "get",
                page: 1,
                limit: 100,
            }).then(({data}) => {
                if(data && data.code === 0){
                    this.didianTypesSelectSearch = data.data.list;
                }
            });
            //查询当前表搜索条件所有列表
            //填充下拉框选项
            this.$http({
                url: "dictionary/page?dicCode=guihuan_types&page=1&limit=100",
                method: "get",
            }).then(({data}) => {
                if(data && data.code === 0){
                    this.guihuanTypesSelectSearch = data.data.list;
                }
            });
        },
        //每页数
        sizeChangeHandle(val) {
            this.pageSize = val;
            this.pageIndex = 1;
            this.getDataList();
        },
        // 当前页
        currentChangeHandle(val) {
            this.pageIndex = val;
            this.getDataList();
        },
        // 多选
        selectionChangeHandler(val) {
            this.dataListSelections = val;
        },
        // 添加/修改
        addOrUpdateHandler(id, type, rowData) {
            this.showFlag = false;
            this.addOrUpdateFlag = true;
            this.crossAddOrUpdateFlag = false;
            
            // 获取交易哈希值
            let transactionHash = '';
            if (type === 'info' && rowData && rowData.transactionHash) {
                transactionHash = rowData.transactionHash;
                console.log('传递的交易哈希值:', transactionHash);
            }

            if (type != 'info') {
                type = 'else';
            }
            this.$nextTick(() => {
                this.$refs.addOrUpdate.init(id, type, transactionHash);
            });
        },
        // 下载
        download(file) {
            window.open(" ${file} ")
        },
        // 删除
        deleteHandler(id) {
            var ids = id ? [Number(id)] : this.dataListSelections.map(item => {
                return Number(item.id);
            });

            this.$confirm(`确定进行[${id ? "删除" : "批量删除"}]操作?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                this.$http({
                    url: "jieyong/delete",
                    method: "post",
                    data: ids
                }).then(({data}) => {
                    if(data && data.code === 0){
                        this.$message({
                            message: "操作成功",
                            type: "success",
                            duration: 1500,
                            onClose: () => {
                                this.search();
                            }
                        });
                    }else{
                        this.$message.error(data.msg);
                    }
                });
            });
        },
        // 归还
        guihuan(id) {
            this.guihuanId = id;
            this.guihuanDialogVisible = true;
        },
        confirmGuihuan() {
            this.$http({
                url: "jieyong/guihuan/"+this.guihuanId,
                method: "get"
            }).then(({data}) => {
                if(data && data.code === 0){
                    this.$message({
                        message: "归还成功",
                        type: "success",
                        duration: 1500,
                        onClose: () => {
                            this.search();
                        }
                    });
                }else{
                    this.$message.error(data.msg);
                }
            });
        },
        // 批准借用申请
        approveHandler(id) {
            this.$confirm(`确定批准该借用申请?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                this.$http({
                    url: `jieyong/approve/${id}`,
                    method: "get"
                }).then(({data}) => {
                    if(data && data.code === 0){
                        this.$message({
                            message: "操作成功",
                            type: "success",
                            duration: 1500,
                            onClose: () => {
                                this.search();
                            }
                        });
                    }else{
                        this.$message.error(data.msg);
                    }
                });
            });
        },
        // 拒绝借用申请
        rejectHandler(id) {
            this.$confirm(`确定拒绝该借用申请?`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                this.$http({
                    url: `jieyong/reject/${id}`,
                    method: "get"
                }).then(({data}) => {
                    if(data && data.code === 0){
                        this.$message({
                            message: "操作成功",
                            type: "success",
                            duration: 1500,
                            onClose: () => {
                                this.search();
                            }
                        });
                    }else{
                        this.$message.error(data.msg);
                    }
                });
            });
        },
        // 导入功能上传文件成功后调用导入方法
        jieyongUploadSuccess(data){
            let _this = this;
            _this.$http({
                url: "jieyong/batchInsert?fileName=" + data.file,
                method: "get"
            }).then(({data}) => {
                if(data && data.code === 0){
                    _this.$message({
                        message: "导入资产借用数据成功",
                        type: "success",
                        duration: 1500,
                        onClose: () => {
                            _this.search();
                        }
                    });
                }else{
                    _this.$message.error(data.msg);
                }
            });

        },
        // 导入功能上传文件失败后调用导入方法
        jieyongUploadError(data){
            this.$message.error('上传失败');
        },
        copyToClipboard(text) {
            const input = document.createElement('input');
            input.value = text;
            document.body.appendChild(input);
            input.select();
            document.execCommand('copy');
            document.body.removeChild(input);
            this.$message.success('复制成功');
        },
        resetSearch() {
            this.searchForm = {
                jieyongNumberStartSearch: '',
                jieyongNumberEndSearch: '',
                shangpinUuidNumber: '',
                shangpinName: '',
                shangpinTypes: '',
                didianTypes: '',
                guihuanTypes: '',
                yonghuName: '',
                yonghuPhone: '',
                yonghuIdNumber: '',
                key: ''
            };
            this.search();
            this.$message({
                message: "已重置搜索条件",
                type: "success",
                duration: 1500
            });
        },
        applyForRepair(row) {
            this.repairForm = {
                shangpinId: row.shangpinId,
                shangpinUuidNumber: row.shangpinUuidNumber,
                shangpinName: row.shangpinName,
                weixiuNumber: 1,
                weixiuContent: '',
                maxNumber: row.jieyongNumber || 1
            };
            this.repairDialogVisible = true;
        },
        confirmRepairApplication() {
            // 验证表单
            if (!this.repairForm.weixiuNumber || this.repairForm.weixiuNumber <= 0) {
                this.$message.error('维修数量必须大于0');
                return;
            }
            
            if (!this.repairForm.weixiuContent) {
                this.$message.error('请填写维修原因');
                return;
            }
            
            // 提交维修申请
            this.$http({
                url: 'weixiu/save',
                method: 'post',
                data: {
                    shangpinId: this.repairForm.shangpinId,
                    weixiuNumber: this.repairForm.weixiuNumber,
                    weixiuContent: this.repairForm.weixiuContent
                }
            }).then(({ data }) => {
                if (data && data.code === 0) {
                    this.$message({
                        message: '维修申请已提交，等待管理员审核',
                        type: 'success',
                        duration: 1500,
                        onClose: () => {
                            this.repairDialogVisible = false;
                        }
                    });
                } else {
                    this.$message.error(data.msg);
                }
            });
        },
    }
};
</script>
<style lang="scss" scoped>
/* 搜索表单样式 */
.search-form {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  background-color: #fff;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.search-item {
  display: flex;
  align-items: center;
  margin-right: 15px;
  margin-bottom: 10px;
  
  span {
    margin-right: 5px;
    white-space: nowrap;
  }
  
  .separator {
    margin: 0 5px;
  }
  
  .el-input, .el-select {
    width: 150px;
  }
}

.search-buttons {
  margin-left: auto;
  display: flex;
  gap: 10px;
}

/* 操作区域样式 */
.operation-area {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 15px;
}

/* 表格样式优化 */
.table-content {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.tables {
  width: 100%;
  
  & >>> .el-table__header-wrapper th {
    background-color: #f5f7fa;
    color: #606266;
    font-weight: bold;
  }
  
  & >>> .el-table__row:hover {
    background-color: #f5f7fa;
  }
  
  & >>> .el-button--success {
    background-color: #67C23A;
    border-color: #67C23A;
    color: #FFFFFF;
  }
  
  & >>> .el-button--primary {
    background-color: #409EFF;
    border-color: #409EFF;
    color: #FFFFFF;
  }
  
  & >>> .el-button--danger {
    background-color: #F56C6C;
    border-color: #F56C6C;
    color: #FFFFFF;
  }
  
  & >>> .el-button {
    padding: 5px 10px;
    font-size: 12px;
  }
}

/* 分页样式 */
.pagination-content {
  margin-top: 15px;
  text-align: center;
}

/* 哈希单元格样式 */
.hash-cell {
  font-family: monospace;
  background-color: #f5f7fa;
  padding: 2px 5px;
  border-radius: 3px;
}

/* 状态标签样式 */
>>> .el-tag--danger.el-tag--plain {
  background-color: #fef0f0;
  border-color: #fbc4c4;
  color: #f56c6c;
  font-weight: bold;
}

>>> .el-tag--success.el-tag--plain {
  background-color: #f0f9eb;
  border-color: #c2e7b0;
  color: #67c23a;
  font-weight: bold;
}

>>> .el-tag {
  display: inline-block;
  text-align: center;
  width: 80px;
  border-radius: 12px;
}

/* 筛选状态指示 */
.filter-tags {
  margin-bottom: 15px;
  padding: 10px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  .filter-label {
    margin-right: 10px;
    font-weight: bold;
  }
}

/* 状态统计指示 */
.status-statistics {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding: 10px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  .stat-item {
    display: flex;
    align-items: center;
    margin-right: 20px;

    span {
      margin-right: 5px;
    }

    .stat-count {
      font-weight: bold;
      font-size: 16px;
      color: #303133;
    }
  }
}

/* 操作按钮区域样式 */
.operation-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding: 2px;
  
  & >>> .el-button--mini {
    padding: 5px 8px;
    font-size: 11px;
  }
}
</style>


