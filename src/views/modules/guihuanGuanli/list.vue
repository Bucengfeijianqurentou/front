<template>
    <div class="main-content">
        <!-- 条件查询 -->
        <div v-if="showFlag">
            <el-form :inline="true" :model="searchForm" class="form-content">
                <el-row :gutter="20" class="slt" :style="{justifyContent:contents.searchBoxPosition=='1'?'flex-start':contents.searchBoxPosition=='2'?'center':'flex-end'}">
                    <el-form-item :label="contents.inputTitle == 1 ? '搜索' : ''">
                        <el-input v-model="searchForm.key" placeholder="资产编号/名称" prefix-icon="el-icon-search" clearable style="width: 250px;"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" @click="search()">查询<i class="el-icon-search el-icon--right"/></el-button>
                    </el-form-item>
                </el-row>
            </el-form>
            <!-- 统计信息 -->
            <div class="stats-info" style="margin-bottom: 20px; padding: 15px; background-color: #f5f7fa; border-radius: 4px;">
                <el-row>
                    <el-col :span="12">
                        <div>
                            <span style="font-weight: bold;">未归还总数：</span>
                            <span style="color: #ff4949; font-size: 16px;">{{ totalPage }} 条记录</span>
                        </div>
                    </el-col>
                    <el-col :span="12" style="text-align: right;">
                        <download-excel 
                            v-if="dataList.length > 0"
                            class="export-excel-wrapper" 
                            :data="dataList" 
                            :fields="json_fields" 
                            name="未归还资产清单.xls">
                            <el-button type="primary" icon="el-icon-download">导出数据</el-button>
                        </download-excel>
                        <el-button v-else type="primary" icon="el-icon-download" disabled>导出数据</el-button>
                    </el-col>
                </el-row>
            </div>
            <div class="table-content">
                <el-table class="tables" :size="contents.tableSize" :show-header="contents.tableShowHeader"
                          :header-row-style="headerRowStyle" :header-cell-style="headerCellStyle"
                          :border="contents.tableBorder"
                          :fit="contents.tableFit"
                          :stripe="contents.tableStripe"
                          :row-style="rowStyle"
                          :cell-style="cellStyle"
                          :style="{width: '100%',fontSize:contents.tableContentFontSize,color:contents.tableContentFontColor}"
                          v-if="isAuth('jieyong','查看')"
                          :data="dataList"
                          v-loading="dataListLoading"
                          @selection-change="selectionChangeHandler"
                          show-summary
                          :summary-method="getSummaries">
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
                                      label="资产编号">
                        <template slot-scope="scope">
                            {{scope.row.shangpinUuidNumber}}
                        </template>
                    </el-table-column>
                    <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                                      prop="shangpinName"
                                      header-align="center"
                                      label="资产名称">
                        <template slot-scope="scope">
                            {{scope.row.shangpinName}}
                        </template>
                    </el-table-column>
                    
                    <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                                      prop="shangpinTypes"
                                      header-align="center"
                                      label="资产类型">
                        <template slot-scope="scope">
                            {{scope.row.shangpinValue}}
                        </template>
                    </el-table-column>
                    
                    <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                                      prop="didianTypes"
                                      header-align="center"
                                      label="存放地点">
                        <template slot-scope="scope">
                            {{scope.row.didianValue}}
                        </template>
                    </el-table-column>
                    
                    <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                                      prop="jieyongNumber"
                                      header-align="center"
                                      label="借用数量">
                        <template slot-scope="scope">
                            {{scope.row.jieyongNumber}}
                        </template>
                    </el-table-column>
                    
                    <el-table-column  :sortable="contents.tableSortable" :align="contents.tableAlign"
                                      prop="insertTime"
                                      header-align="center"
                                      label="借用时间">
                        <template slot-scope="scope">
                            {{scope.row.insertTime}}
                        </template>
                    </el-table-column>
                    
                    <el-table-column v-if="isAdmin" :sortable="contents.tableSortable" :align="contents.tableAlign"
                                      prop="yonghuName"
                                      header-align="center"
                                      label="借用人">
                        <template slot-scope="scope">
                            {{scope.row.yonghuName}}
                        </template>
                    </el-table-column>
                    
                    <el-table-column v-if="isAdmin" :sortable="contents.tableSortable" :align="contents.tableAlign"
                                      prop="yonghuPhone"
                                      header-align="center"
                                      label="联系电话">
                        <template slot-scope="scope">
                            {{scope.row.yonghuPhone}}
                        </template>
                    </el-table-column>
                    
                    <el-table-column width="300" :align="contents.tableAlign"
                                     header-align="center"
                                     label="操作">
                        <template slot-scope="scope">
                            <el-button v-if="isAuth('jieyong','查看')" type="success" icon="el-icon-tickets" size="mini" @click="addOrUpdateHandler(scope.row.id,'info')">详情</el-button>
                            <el-button v-if="isAuth('jieyong','修改')" type="primary" icon="el-icon-refresh" size="mini" @click="guihuan(scope.row.id)">归还</el-button>
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
    </div>
</template>
<script>
    import AddOrUpdate from "../jieyong/add-or-update";
    import styleJs from "../../../utils/style.js";
    import downloadExcel from 'vue-json-excel'
    
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
            pageSize: 20,
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
            json_fields: {
                '资产编号': 'shangpinUuidNumber',
                '资产名称': 'shangpinName',
                '资产类型': 'shangpinValue',
                '存放地点': 'didianValue',
                '借用数量': 'jieyongNumber',
                '借用时间': 'insertTime',
                '借用人': 'yonghuName',
                '联系电话': 'yonghuPhone'
            },
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
        computed: {
            isAdmin() {
                return this.role === '管理员';
            }
        },
        components: {
            AddOrUpdate,
            'download-excel': downloadExcel
        },
        methods: {
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
                    }, 10)
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
            contentTableBtnStyleChange() {
                this.$nextTick(() => {
                    setTimeout(() => {
                        document.querySelectorAll('.table-content .tables .el-table__body .el-button--success').forEach(el => {
                            el.style.height = this.contents.tableBtnHeight
                            el.style.color = this.contents.tableBtnDetailFontColor
                            el.style.fontSize = this.contents.tableBtnFontSize
                            el.style.borderWidth = this.contents.tableBtnBorderWidth
                            el.style.borderStyle = this.contents.tableBtnBorderStyle
                            el.style.borderColor = this.contents.tableBtnBorderColor
                            el.style.borderRadius = this.contents.tableBtnBorderRadius
                            el.style.backgroundColor = this.contents.tableBtnDetailBgColor
                        })
                        document.querySelectorAll('.table-content .tables .el-table__body .el-button--primary').forEach(el => {
                            el.style.height = this.contents.tableBtnHeight
                            el.style.color = this.contents.tableBtnEditFontColor
                            el.style.fontSize = this.contents.tableBtnFontSize
                            el.style.borderWidth = this.contents.tableBtnBorderWidth
                            el.style.borderStyle = this.contents.tableBtnBorderStyle
                            el.style.borderColor = this.contents.tableBtnBorderColor
                            el.style.borderRadius = this.contents.tableBtnBorderRadius
                            el.style.backgroundColor = this.contents.tableBtnEditBgColor
                        })
                        document.querySelectorAll('.table-content .tables .el-table__body .el-button--danger').forEach(el => {
                            el.style.height = this.contents.tableBtnHeight
                            el.style.color = this.contents.tableBtnDelFontColor
                            el.style.fontSize = this.contents.tableBtnFontSize
                            el.style.borderWidth = this.contents.tableBtnBorderWidth
                            el.style.borderStyle = this.contents.tableBtnBorderStyle
                            el.style.borderColor = this.contents.tableBtnBorderColor
                            el.style.borderRadius = this.contents.tableBtnBorderRadius
                            el.style.backgroundColor = this.contents.tableBtnDelBgColor
                        })

                    }, 10)
                })
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
                this.getDictionaryData();
            },
            
            // 获取下拉选择框的数据
            getDictionaryData() {
                this.$http({
                    url: `dictionary/page?dicCode=shangpin_types&page=1&limit=100`,
                    method: "get"
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                        this.shangpinTypesSelectSearch = data.data.list;
                    }
                });
                
                this.$http({
                    url: `dictionary/page?dicCode=didian_types&page=1&limit=100`,
                    method: "get"
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                        this.didianTypesSelectSearch = data.data.list;
                    }
                });
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
                
                // 未归还条件（固定）
                params['guihuanTypes'] = 1

                // 当前登录用户条件（非管理员）
                if (!this.isAdmin && this.sessionTable == 'yonghu') {
                    params['yonghuId'] = this.$storage.get('userId')
                }

                // 搜索关键词条件
                if (this.searchForm.key && this.searchForm.key !== '') {
                    params['shangpinUuidNumber'] = '%' + this.searchForm.key + '%';
                    params['shangpinName'] = '%' + this.searchForm.key + '%';
                }
                
                params['jieyongDelete'] = 1 // 逻辑删除字段 1 未删除 2 删除

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
                this.$nextTick(() => {
                    this.$refs.addOrUpdate.init(id, type);
                });
            },
            // 归还
            guihuan(id) {
                this.$confirm(`确定进行归还操作么?`, "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    this.$http({
                        url: "jieyong/guihuan/"+id,
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
                });
            },
            headerRowStyle() {
                if (!this.contents.tableHeaderBackground) {
                    return {}
                } else {
                    return {color: this.contents.tableHeaderFontColor,background:this.contents.tableHeaderBackground,fontSize: this.contents.tableHeaderFontSize}
                }
            },
            headerCellStyle(){
                if (!this.contents.tableHeaderBackground) {
                    return {}
                } else {
                    return {borderColor:this.contents.tableBorderColor}
                }
            },
            cellStyle() {
                return {
                    borderColor: this.contents.tableBorderColor
                }
            },
            getSummaries(param) {
                const { columns, data } = param;
                const sums = [];
                
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '总计';
                        return;
                    }
                    
                    // 只对"借用数量"列进行求和
                    if (column.property === 'jieyongNumber') {
                        const values = data.map(item => Number(item.jieyongNumber || 0));
                        sums[index] = values.reduce((prev, curr) => {
                            return prev + curr;
                        }, 0);
                    } else {
                        sums[index] = '';
                    }
                });
                
                return sums;
            },
        }
    }
</script>
<style scoped>
    .el-input__suffix {
        height: 100%;
    }

    .form-content {
        margin: 20px 0;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
        padding: 20px;
        background-color: #fff;
        border-radius: 4px;
    }

    .table-content {
        background-color: #fff;
        padding: 20px;
        border-radius: 4px;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
    }

    .pagination-content {
        margin: 15px 0;
    }

    .menu-badge-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }

    .el-badge {
        margin-top: -5px;
    }
</style>
