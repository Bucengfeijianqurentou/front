<template>
    <div class="main-content" style="margin-top: 0; padding-top: 0;">
        <!-- 条件查询 -->
        <div v-if="showFlag">
            <el-form :inline="true" :model="searchForm" class="form-content">
                <el-row :gutter="20" class="slt" :style="{justifyContent:contents.searchBoxPosition=='1'?'flex-start':contents.searchBoxPosition=='2'?'center':'flex-end'}">
                    <el-form-item :label="contents.inputTitle == 1 ? '用户姓名' : ''">
                        <el-input prefix-icon="el-icon-search" v-model="searchForm.yonghuName" placeholder="用户姓名" clearable></el-input>
                    </el-form-item>
                    <el-form-item :label="contents.inputTitle == 1 ? '用户手机号' : ''">
                        <el-input prefix-icon="el-icon-search" v-model="searchForm.yonghuPhone" placeholder="用户手机号" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" @click="search()">查询<i class="el-icon-search el-icon--right"/></el-button>
                    </el-form-item>
                </el-row>
            </el-form>
            <div class="table-content">
                <el-table class="tables" :size="contents.tableSize" :show-header="contents.tableShowHeader"
                          :header-row-style="headerRowStyle" :header-cell-style="headerCellStyle"
                          :border="contents.tableBorder"
                          :fit="contents.tableFit"
                          :stripe="contents.tableStripe"
                          :row-style="rowStyle"
                          :cell-style="cellStyle"
                          :style="{width: '100%',fontSize:contents.tableContentFontSize,color:contents.tableContentFontColor}"
                          v-if="isAuth('register-approval','查看')"
                          :data="dataList"
                          v-loading="dataListLoading"
                          @selection-change="selectionChangeHandler">
                    <el-table-column
                            type="index"
                            width="50"
                            label="序号">
                    </el-table-column>
                    <el-table-column
                            prop="username"
                            header-align="center"
                            align="center"
                            sortable
                            label="账户">
                    </el-table-column>
                    <el-table-column
                            prop="yonghuName"
                            header-align="center"
                            align="center"
                            sortable
                            label="用户姓名">
                    </el-table-column>
                    <el-table-column
                            prop="yonghuPhone"
                            header-align="center"
                            align="center"
                            sortable
                            label="用户手机号">
                    </el-table-column>
                    <el-table-column
                            prop="yonghuIdNumber"
                            header-align="center"
                            align="center"
                            sortable
                            label="用户身份证号">
                    </el-table-column>
                    <el-table-column
                            prop="yonghuEmail"
                            header-align="center"
                            align="center"
                            sortable
                            label="电子邮箱">
                    </el-table-column>
                    <el-table-column
                            prop="createTime"
                            header-align="center"
                            align="center"
                            sortable
                            label="注册时间">
                    </el-table-column>
                    <el-table-column
                            prop="yonghuStatus"
                            header-align="center"
                            align="center"
                            sortable
                            label="状态">
                        <template slot-scope="scope">
                            <el-tag type="warning" v-if="scope.row.yonghuStatus == 0">审批中</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                            width="200"
                            header-align="center"
                            align="center"
                            label="操作">
                        <template slot-scope="scope">
                            <el-button type="success" size="mini" @click="approveHandler(scope.row.id)">批准</el-button>
                            <el-button type="danger" size="mini" @click="rejectHandler(scope.row.id)">拒绝</el-button>
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
                        :page-size="Number(10)"
                        :total="totalPage"
                        :small="contents.pageStyle"
                        class="pagination-content"
                        :background="contents.pageBtnBG"
                        :style="{textAlign:contents.pagePosition==1?'left':contents.pagePosition==2?'center':'right'}"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import { isAuth } from '@/utils/utils'
    import axios from 'axios'
    import router from '@/router/router-static'
    import storage from '@/utils/storage'

    export default {
        data() {
            return {
                searchForm: {
                    key: ''
                },
                form: {},
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
                chartOptions: {},
                contents: {},
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
            };
        },
        components: {
        },
        computed: {
            limit: function() {
                return this.contents.pageEnable?this.contents.pageSizes[0]:''
            },
            page: function() {
                return this.contents.pageEnable?1:''
            },
            layouts: function() {
                return 'total, sizes, prev, pager, next, jumper'
            }
        },
        created() {
            this.init();
            this.getDataList();
            this.contentStyleChange()
        },
        mounted() {
        },
        methods: {
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
                    yonghuStatus: 0  // 使用数字0作为参数
                }
                
                if(this.searchForm.yonghuName) {
                    params['yonghuName'] = '%' + this.searchForm.yonghuName + '%'
                }
                if(this.searchForm.yonghuPhone) {
                    params['yonghuPhone'] = '%' + this.searchForm.yonghuPhone + '%'
                }
                
                console.log('查询参数:', params);
                
                this.$http({
                    url: "yonghu/page",
                    method: "get",
                    params: params
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                        console.log('查询结果:', data.data.list);
                        // 使用后端筛选的结果，不再需要前端筛选
                        this.dataList = data.data.list;
                        this.totalPage = data.data.total;
                        
                        // 记录日志，查看每个用户的状态
                        this.dataList.forEach(item => {
                            console.log('用户:', item.username, '状态:', item.yonghuStatus, typeof item.yonghuStatus);
                        });
                    } else {
                        this.dataList = [];
                        this.totalPage = 0;
                    }
                    this.dataListLoading = false;
                });
            },
            // 分页
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
            // 批准用户注册
            approveHandler(id) {
                this.$confirm(`确定要批准该用户的注册申请吗?`, "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    this.$http({
                        url: `yonghu/approveRegister`,
                        method: "post",
                        params: {
                            id: id,
                            status: 1 // 1-批准
                        }
                    }).then(({ data }) => {
                        if (data && data.code === 0) {
                            this.$message({
                                message: "操作成功",
                                type: "success",
                                duration: 1500,
                                onClose: () => {
                                    this.getDataList();
                                }
                            });
                        } else {
                            this.$message.error(data.msg);
                        }
                    });
                });
            },
            // 拒绝用户注册
            rejectHandler(id) {
                this.$confirm(`确定要拒绝该用户的注册申请吗?`, "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    this.$http({
                        url: `yonghu/approveRegister`,
                        method: "post",
                        params: {
                            id: id,
                            status: 2 // 2-拒绝
                        }
                    }).then(({ data }) => {
                        if (data && data.code === 0) {
                            this.$message({
                                message: "操作成功",
                                type: "success",
                                duration: 1500,
                                onClose: () => {
                                    this.getDataList();
                                }
                            });
                        } else {
                            this.$message.error(data.msg);
                        }
                    });
                });
            },
            // 返回
            back() {
                this.$router.go(-1);
            },
            contentStyleChange() {
                this.contentSearchStyleChange()
                this.contentTableStyleChange()
            },
            contentSearchStyleChange() {
                this.$nextTick(() => {
                    document.querySelectorAll('.form-content .slt .el-input__inner').forEach(el => {
                        let textAlign = 'left'
                        if(this.contents.inputFontPosition == 2) textAlign = 'center'
                        if(this.contents.inputFontPosition == 3) textAlign = 'right'
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
                    if(this.contents.inputTitle) {
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
            // 表格
            rowStyle({ row, rowIndex }) {
                if (rowIndex % 2 == 1) {
                    if (this.contents.tableStripe) {
                        return {color:this.contents.tableStripeFontColor}
                    }
                } else {
                    return {color:this.contents.tableFontColor}
                }
            },
            cellStyle({ row, rowIndex, columnIndex, column }) {
                if (rowIndex % 2 == 1) {
                    if (this.contents.tableStripe) {
                        return {backgroundColor:this.contents.tableStripeBgColor}
                    }
                } else {
                    if (this.contents.tableBgColor) {
                        return {backgroundColor:this.contents.tableBgColor}
                    }
                }
            },
            headerRowStyle({ row, rowIndex }) {
                return {color: this.contents.tableHeaderFontColor}
            },
            headerCellStyle({ row, rowIndex, columnIndex, column }) {
                if (this.contents.tableHeaderBgColor) {
                    return {backgroundColor: this.contents.tableHeaderBgColor}
                }
            },
            isAuth(tableName, key) {
                return isAuth(tableName, key);
            }
        }
    };
</script>

<style lang="scss" scoped>
    .main-content {
        min-height: 100%;
        position: relative;
        padding: 0 20px;
        overflow: hidden;
    }
    .form-content {
        padding: 20px;
    }
    .table-content {
        background-color: #fff;
        padding: 20px 20px 0;
    }
</style> 