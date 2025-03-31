<template>
    <div class="main-content">

        <!-- 条件查询 -->
        <div v-if="showFlag">
            <div class="search-form">
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
                    <span>存放地点</span>
                    <el-select v-model="searchForm.didianTypes" placeholder="请选择" size="small" clearable>
                        <el-option label="请选择" value=""></el-option>
                        <el-option
                            v-for="(item,index) in didianTypesSelectSearch"
                            v-bind:key="index"
                            :label="item.indexName"
                            :value="item.codeIndex">
                        </el-option>
                    </el-select>
                </div>
                
                <div class="search-item range-input">
                    <span>资产库存</span>
                    <el-input v-model="searchForm.shangpinKucunNumberStartSearch" placeholder="最小值" size="small" clearable></el-input>
                    <span class="range-separator">至</span>
                    <el-input v-model="searchForm.shangpinKucunNumberEndSearch" placeholder="最大值" size="small" clearable></el-input>
                </div>
                
                <div class="search-buttons">
                    <el-button type="primary" size="small" @click="search()">查询</el-button>
                    <el-button size="small" @click="resetSearch()">重置</el-button>
                </div>
            </div>
            
            <div class="button-area">
                <el-button
                    v-if="isAuth('shangpin','新增')"
                    type="success"
                    size="medium"
                    class="add-button"
                    @click="addOrUpdateHandler()"
                >新增</el-button>
                
                <el-button
                    v-if="isAuth('shangpin','报表')"
                    type="primary"
                    size="small"
                    @click="chartDialog()"
                >报表</el-button>
                
                <a  v-if="isAuth('shangpin','导入导出')"
                    :href="'http://localhost:8080/xiaoyuanzichan/upload/shangpinMuBan.xls'"
                    style="text-decoration:none">
                    <el-button type="primary" size="small">模板下载</el-button>
                </a>
                
                <el-upload
                    v-if="isAuth('shangpin','导入导出')"
                    style="display: inline-block"
                    action="xiaoyuanzichan/file/upload"
                    :on-success="shangpinUploadSuccess"
                    :on-error="shangpinUploadError"
                    :show-file-list="false">
                    <el-button
                        type="primary"
                        size="small"
                    >导入</el-button>
                </el-upload>
                
                <download-excel 
                    v-if="isAuth('shangpin','导入导出')" 
                    style="display: inline-block" 
                    class="export-excel-wrapper" 
                    :data="dataList" 
                    :fields="json_fields" 
                    name="shangpin.xls">
                    <el-button
                        type="primary"
                        size="small"
                    >导出</el-button>
                </download-excel>
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
                          v-if="isAuth('shangpin','查看')"
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
                    <el-table-column :sortable="contents.tableSortable" :align="contents.tableAlign" prop="shangpinPhoto"
                                     header-align="center"
                                     width="120"
                                     label="资产照片">
                        <template slot-scope="scope">
                            <div v-if="scope.row.shangpinPhoto">
                                <img :src="scope.row.shangpinPhoto" width="80" height="80">
                            </div>
                            <div v-else>无图片</div>
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
                                      prop="shangpinKucunNumber"
                                      header-align="center"
                                      width="120"
                                      label="资产库存">
                        <template slot-scope="scope">
                            {{scope.row.shangpinKucunNumber}}
                        </template>
                    </el-table-column>

                    <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                                   prop="transactionHash"
                                   header-align="center"
                                   width="220"
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
                                    {{ scope.row.transactionHash ? scope.row.transactionHash.substring(0, 20) + '...' : '' }}
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>

                    <el-table-column min-width="180" :align="contents.tableAlign"
                                     header-align="center"
                                     label="操作">
                        <template slot-scope="scope">
                            <div style="display: flex; justify-content: center; align-items: center; gap: 5px;">
                                <el-button v-if="isAuth('shangpin','查看')" type="success" size="small" @click="addOrUpdateHandler(scope.row.id,'info')">详情</el-button>
                                <el-button v-if="isAuth('shangpin','修改')" type="primary" size="small" @click="addOrUpdateHandler(scope.row.id)">修改</el-button>
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
        <!-- 添加/修改页面  将父组件的search方法传递给子组件-->
        <add-or-update v-if="addOrUpdateFlag" :parent="this" ref="addOrUpdate"></add-or-update>

<!-- 库存 -->
		<el-dialog
                :title="shangpinKucunNumberTitle"
                :visible.sync="shangpinKucunNumberVisible"
                width="30%">
            <span>操作数量</span><el-input-number v-model="kucunNumber" :min="1" :max="100" label="描述文字"></el-input-number>
            <span slot="footer" class="dialog-footer">
			<el-button @click="shangpinKucunNumberVisible = false">取 消</el-button>
			<el-button type="primary" @click="addShangpinKucunNumber()">确 定</el-button>
		  </span>
        </el-dialog>

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
    //当前表下拉框搜索条件
              shangpinTypesSelectSearch : [],
              didianTypesSelectSearch : [],
            form:{
                id : null,
                shangpinUuidNumber : null,
                shangpinName : null,
                shangpinPhoto : null,
                shangpinTypes : null,
                didianTypes : null,
                shangpinKucunNumber : null,
                shangpinDelete : null,
                shangpinContent : null,
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
                //本表字段
                     '资产编号': "shangpinUuidNumber",
                     '资产名称': "shangpinName",
                     '资产照片': "shangpinPhoto",
                     '资产类型': "shangpinTypes",
                     '存放地点': "didianTypes",
                     '资产库存': "shangpinKucunNumber",
            },

        //库存
            //操作数量
            kucunNumber: 1,
            //操作数据id
            kucunNumberId: null,
            //操作类型
            kucunNumberTypes: null,
            //原有数量
            shangpinKucunNumber: 0,
            //标题
            shangpinKucunNumberTitle: null,
            //模态框状态
            shangpinKucunNumberVisible: false,
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

        },
        filters: {
            htmlfilter: function (val) {
                return val.replace(/<[^>]*>/g).replace(/undefined/g,'');
            }
        },
        components: {
            AddOrUpdate,
        },
        computed: {
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
         

                if (this.searchForm.shangpinKucunNumberStartSearch != '' && this.searchForm.shangpinKucunNumberStartSearch != undefined) {
                    params['shangpinKucunNumberStartSearch'] = this.searchForm.shangpinKucunNumberStartSearch
                }
                if (this.searchForm.shangpinKucunNumberEndSearch != '' && this.searchForm.shangpinKucunNumberEndSearch != undefined) {
                    params['shangpinKucunNumberEndSearch'] = this.searchForm.shangpinKucunNumberEndSearch
                }
                        
                params['shangpinDelete'] = 1// 逻辑删除字段 1 未删除 2 删除


                this.$http({
                    url: "shangpin/page",
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
                //查询当前表搜索条件所有列表
                //填充下拉框选项
                this.$http({
                    url: "dictionary/page?dicCode=shangpin_types&page=1&limit=100",
                    method: "get",
                }).then(({data}) => {
                    if(data && data.code === 0){
                        this.shangpinTypesSelectSearch = data.data.list;
                    }
                });
                //填充下拉框选项
                this.$http({
                    url: "dictionary/page?dicCode=didian_types&page=1&limit=100",
                    method: "get",
                }).then(({data}) => {
                    if(data && data.code === 0){
                        this.didianTypesSelectSearch = data.data.list;
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
            addOrUpdateHandler(id, type) {
                this.showFlag = false;
                this.addOrUpdateFlag = true;
                this.crossAddOrUpdateFlag = false;
                if (type != 'info') {
                    type = 'else';
                }
                this.$nextTick(() => {
                    this.$refs.addOrUpdate.init(id, type);
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
                        url: "shangpin/delete",
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
            // 导入功能上传文件成功后调用导入方法
            shangpinUploadSuccess(data){
                let _this = this;
                _this.$http({
                    url: "shangpin/batchInsert?fileName=" + data.file,
                    method: "get"
                }).then(({data}) => {
                    if(data && data.code === 0){
                        _this.$message({
                            message: "导入校园资产数据成功",
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
            shangpinUploadError(data){
                this.$message.error('上传失败');
            },
            //增加库存
			plusShangpinKucunNumber(thisId,shangpinKucunNumber){
			//清空数据
				//库存数据设置为0
				this.kucunNumber = 0
				//id清空
				this.kucunNumberId = null
				//库存数据设置为0
				this.kucunNumber = 0
				//操作类型清空
				this.kucunNumberTypes = null
				//原有数量清空
				this.shangpinKucunNumber = 0
			//判断数据是否为空	
				if(thisId == null || thisId=="" || thisId=="null"){
					this.$message.error('未知错误,请联系管理员处理');
					return;
				}
			//数据不为空放值
				//id
				this.kucunNumberId = thisId
				//操作类型
				this.kucunNumberTypes = "+"
				//原有数量
				this.shangpinKucunNumber = shangpinKucunNumber
				//将模态框打开
				this.shangpinKucunNumberVisible = true;
				//标题
				this.shangpinKucunNumberTitle = '增加库存'
			},
			//减少库存
			reduceShangpinKucunNumber(thisId,shangpinKucunNumber){
			//清空数据
				//库存数据设置为0
				this.kucunNumber = 0
				//id清空
				this.kucunNumberId = null
				//操作类型清空
				this.kucunNumberTypes = null
				//原有数量清空
				this.shangpinKucunNumber = 0
			//判断数据是否为空	
				if(thisId == null || thisId=="" || thisId=="null"){
					this.$message.error('未知错误,请联系管理员处理');
					return;
				}
			//数据不为空放值
				//id
				this.kucunNumberId = thisId
				//操作类型
				this.kucunNumberTypes = "-"
				//原有数量
				this.shangpinKucunNumber = shangpinKucunNumber
				//将模态框打开
				this.shangpinKucunNumberVisible = true;
				//标题
				this.shangpinKucunNumberTitle = '减少库存'
			},
			//提交用户操作库存数量
			addShangpinKucunNumber(){
				var type = null
				var maxNumber = 0
				if(this.kucunNumberTypes == "+"){
					type = '增加'
					maxNumber = this.shangpinKucunNumber + this.kucunNumber
				}else{
					type = '减少'
					if(this.shangpinKucunNumber < this.kucunNumber || this.kucunNumber <= 0){
						this.$message.error('库存不足不能减少');
						return false;
					}else{
						maxNumber = this.shangpinKucunNumber - this.kucunNumber
					}
				}
				let date = {
					"id":this.kucunNumberId,
					"shangpinKucunNumber":maxNumber
				}
				this.$confirm(`确定要`+type+`物品数量`+this.kucunNumber+`个?`, "提示", {
				    confirmButtonText: "确定",
				    cancelButtonText: "取消",
				    type: "warning"
				}).then(() => {
				    this.$http({
				        url: "shangpin/update",
				        method: "post",
				        data: date
				    }).then(({ data }) => {
				        if (data && data.code === 0) {
				            this.$message({
				                message: "操作成功",
				                type: "success",
				                duration: 1500,
				                onClose: () => {
				                    this.search();
				                }
				            });
				        } else {
				            this.$message.error(data.msg);
				        }
				    });
				});
				this.shangpinKucunNumberVisible = false;
			},
            // 重置搜索条件
            resetSearch() {
                this.searchForm = {
                    key: '',
                    shangpinUuidNumber: '',
                    shangpinName: '',
                    shangpinTypes: '',
                    didianTypes: '',
                    shangpinKucunNumberStartSearch: '',
                    shangpinKucunNumberEndSearch: ''
                };
                this.search();
            },
            
            copyToClipboard(text) {
                const input = document.createElement('input');
                input.value = text;
                document.body.appendChild(input);
                input.select();
                document.execCommand('copy');
                document.body.removeChild(input);
                this.$message({
                    message: '复制成功',
                    type: 'success',
                    duration: 1500
                });
            },
        }
    };
</script>
<style lang="scss" scoped>
.search-form {
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    background-color: #f5f7fa;
    border-radius: 4px;
    margin-bottom: 10px;
    align-items: center;
}

.search-item {
    display: flex;
    align-items: center;
    margin-right: 15px;
    margin-bottom: 10px;
    
    span {
        margin-right: 5px;
        color: #606266;
        font-size: 14px;
    }
    
    .el-input, .el-select {
        width: 180px;
    }
}

.range-input {
    .el-input {
        width: 100px;
    }
    
    .range-separator {
        margin: 0 5px;
        color: #909399;
    }
}

.search-buttons {
    display: flex;
    align-items: center;
    margin-left: auto;
    
    .el-button {
        margin-left: 10px;
    }
}

.button-area {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    flex-wrap: wrap;
    
    .el-button, a {
        margin-right: 10px;
        margin-bottom: 10px;
    }
    
    .add-button {
        padding: 12px 20px !important;
        font-size: 15px !important;
        font-weight: bold;
        border-radius: 4px;
        min-width: 90px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        transition: all 0.3s;
        
        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
    }
}

.slt {
    margin: 0 !important;
    display: flex;
}

.ad {
    margin: 0 !important;
    display: flex;
}

.pages {
    & >>> el-pagination__sizes{
      & >>> el-input__inner {
        height: 22px;
        line-height: 22px;
      }
    }
}
  
.el-button+.el-button {
    margin:0;
} 

.tables {
    table-layout: fixed;
    width: 100%;
    
    & >>> .el-table__body-wrapper {
      overflow: visible !important; /* 强制内容可见，不滚动 */
      height: auto !important; /* 高度自适应内容 */
      
      /* 隐藏垂直滚动条 */
      &::-webkit-scrollbar {
        width: 0;
        display: none;
      }
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none; /* IE and Edge */
    }
    
    & >>> .el-table__inner-wrapper {
      overflow: visible !important; /* 强制内容可见，不滚动 */
    }
    
    & >>> .el-scrollbar {
      overflow: visible !important; /* 强制内容可见，不滚动 */
      height: auto !important; /* 高度自适应内容 */
    }
    
    & >>> .el-scrollbar__wrap {
      overflow: visible !important; /* 强制内容可见，不滚动 */
      height: auto !important; /* 高度自适应内容 */
    }
    
    & >>> th {
      background-color: #f5f7fa !important;
      color: #606266;
      font-weight: bold;
      border-bottom: 1px solid #ebeef5;
    }
    
    & >>> .el-table__row {
      transition: all 0.3s;
    }
    
    & >>> .el-table__row:hover {
      background-color: #f0f9eb;
    }
    
    & >>> .el-tooltip {
      cursor: pointer;
    }
    
	& >>> .el-button--success {
		height: 30px;
		color: #333;
		font-size: 12px;
		border-width: 1px;
		border-style: solid;
		border-color: #DCDFE6;
		border-radius: 15px;
		background-color: rgba(173, 241, 242, 1);
	}

	& >>> .el-button--primary {
		height: 30px;
		color: #333;
		font-size: 12px;
		border-width: 1px;
		border-style: solid;
		border-color: #DCDFE6;
		border-radius: 15px;
		background-color: rgba(202, 235, 202, 1);
	}

	& >>> .el-button--danger {
		height: 30px;
		color: #333;
		font-size: 12px;
		border-width: 1px;
		border-style: solid;
		border-color: #DCDFE6;
		border-radius: 15px;
		background-color: rgba(214, 186, 232, 1);
	}

    & >>> .el-button {
      margin: 2px;
      padding: 5px 10px;
    }
}
  
.table-content {
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    overflow: visible !important;
    width: 100%;
    max-width: 100%;
}

/* 全局禁用Element UI表格的滚动条 */
>>> .el-table__body-wrapper {
    overflow: visible !important;
}

>>> .el-scrollbar {
    overflow: visible !important;
}

>>> .el-scrollbar__wrap {
    overflow: visible !important;
}

>>> .el-table--scrollable-y {
    overflow-y: visible !important;
}

.hash-cell {
    display: inline-block;
    background-color: #f5f7fa;
    padding: 4px 10px;
    border-radius: 4px;
    font-family: monospace;
    cursor: pointer;
    color: #606266;
    font-size: 13px;
    transition: all 0.3s;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.hash-cell:hover {
    background-color: #ecf5ff;
    color: #409eff;
}
</style>


