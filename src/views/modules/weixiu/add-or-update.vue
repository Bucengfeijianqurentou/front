<template>
    <div class="addEdit-block">
        <el-form
                class="detail-form-content"
                ref="ruleForm"
                :model="ruleForm"
                :rules="rules"
                label-width="80px"
                :style="{backgroundColor:addEditForm.addEditBoxColor}">
            <el-row>
                <el-col :span="12"  v-if="sessionTable !='shangpin'">
                    <el-form-item class="select" v-if="type!='info'"  label="校园资产" prop="shangpinId">
                        <div v-if="role === '用户'" style="margin-bottom: 8px; color: #E6A23C; font-size: 12px;">
                            <i class="el-icon-warning"></i> 您只能为当前借用中的设备申请维修
                        </div>
                        <el-select v-model="ruleForm.shangpinId" filterable placeholder="请选择校园资产" @change="shangpinChange">
                            <el-option
                                    v-for="item in shangpinOptions"
                                    v-bind:key="item.id"
                                    :label="item.shangpinName"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="12"  v-if="sessionTable !='shangpin' ">
                    <el-form-item class="input" v-if="type!='info'"  label="资产编号" prop="shangpinUuidNumber">
                        <el-input v-model="shangpinForm.shangpinUuidNumber"
                                  placeholder="资产编号" clearable readonly></el-input>
                    </el-form-item>
                    <div v-else>
                        <el-form-item class="input" label="资产编号" prop="shangpinUuidNumber">
                            <el-input v-model="ruleForm.shangpinUuidNumber"
                                      placeholder="资产编号" readonly></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12"  v-if="sessionTable !='shangpin' ">
                    <el-form-item class="input" v-if="type!='info'"  label="资产名称" prop="shangpinName">
                        <el-input v-model="shangpinForm.shangpinName"
                                  placeholder="资产名称" clearable readonly></el-input>
                    </el-form-item>
                    <div v-else>
                        <el-form-item class="input" label="资产名称" prop="shangpinName">
                            <el-input v-model="ruleForm.shangpinName"
                                      placeholder="资产名称" readonly></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="24" v-if="sessionTable !='shangpin' ">
                    <el-form-item class="upload" v-if="type!='info' && !ro.shangpinPhoto" label="资产照片" prop="shangpinPhoto">
                        <img style="margin-right:20px;" v-bind:key="index" v-for="(item,index) in (shangpinForm.shangpinPhoto || '').split(',')" :src="item" width="100" height="100">
                    </el-form-item>
                    <div v-else>
                        <el-form-item v-if="ruleForm.shangpinPhoto" label="资产照片" prop="shangpinPhoto">
                            <img style="margin-right:20px;" v-bind:key="index" v-for="(item,index) in (ruleForm.shangpinPhoto || '').split(',')" :src="item" width="100" height="100">
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12"  v-if="sessionTable !='shangpin' ">
                    <el-form-item class="input" v-if="type!='info'"  label="资产类型" prop="shangpinValue">
                        <el-input v-model="shangpinForm.shangpinValue"
                                  placeholder="资产类型" clearable readonly></el-input>
                    </el-form-item>
                    <div v-else>
                        <el-form-item class="input" label="资产类型" prop="shangpinValue">
                            <el-input v-model="ruleForm.shangpinValue"
                                      placeholder="资产类型" readonly></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12"  v-if="sessionTable !='shangpin' ">
                    <el-form-item class="input" v-if="type!='info'"  label="存放地点" prop="didianValue">
                        <el-input v-model="shangpinForm.didianValue"
                                  placeholder="存放地点" clearable readonly></el-input>
                    </el-form-item>
                    <div v-else>
                        <el-form-item class="input" label="存放地点" prop="didianValue">
                            <el-input v-model="ruleForm.didianValue"
                                      placeholder="存放地点" readonly></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12"  v-if="sessionTable !='shangpin' ">
                    <el-form-item class="input" v-if="type!='info'"  label="资产库存" prop="shangpinKucunNumber">
                        <el-input v-model="shangpinForm.shangpinKucunNumber"
                                  placeholder="资产库存" clearable readonly></el-input>
                    </el-form-item>
                    <div v-else>
                        <el-form-item class="input" label="资产库存" prop="shangpinKucunNumber">
                            <el-input v-model="ruleForm.shangpinKucunNumber"
                                      placeholder="资产库存" readonly></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <input id="updateId" name="id" type="hidden">
            <input id="shangpinId" name="shangpinId" type="hidden">
               <el-col :span="12">
                   <el-form-item class="input" v-if="type!='info'"  label="维修数量" prop="weixiuNumber">
                       <el-input v-model="ruleForm.weixiuNumber"
                                 placeholder="维修数量" clearable  :readonly="ro.weixiuNumber"></el-input>
                   </el-form-item>
                   <div v-else>
                       <el-form-item class="input" label="维修数量" prop="weixiuNumber">
                           <el-input v-model="ruleForm.weixiuNumber"
                                     placeholder="维修数量" readonly></el-input>
                       </el-form-item>
                   </div>
               </el-col>
                <el-col :span="24">
                    <el-form-item v-if="type!='info'"  label="维修备注" prop="weixiuContent">
                        <editor style="min-width: 200px; max-width: 600px;"
                                v-model="ruleForm.weixiuContent"
                                class="editor"
                                action="file/upload">
                        </editor>
                    </el-form-item>
                    <div v-else>
                        <el-form-item v-if="ruleForm.weixiuContent" label="维修备注" prop="weixiuContent">
                            <span v-html="ruleForm.weixiuContent"></span>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="input" v-if="type=='info'"  label="交易哈希" prop="transactionHash">
                        <el-input v-model="ruleForm.transactionHash"
                                placeholder="交易哈希" readonly></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="select" v-if="type!='info'"  label="维修状态" prop="status">
                        <el-select v-model="ruleForm.status" placeholder="请选择维修状态">
                            <el-option
                                label="未开始"
                                :value="0">
                            </el-option>
                            <el-option
                                label="维修中"
                                :value="1">
                            </el-option>
                            <el-option
                                label="已完成"
                                :value="2">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <div v-else>
                        <el-form-item class="input" label="维修状态" prop="status">
                            <el-tag v-if="ruleForm.status === 0" type="info">未开始</el-tag>
                            <el-tag v-if="ruleForm.status === 1" type="warning">维修中</el-tag>
                            <el-tag v-if="ruleForm.status === 2" type="success">已完成</el-tag>
                        </el-form-item>
                    </div>
                </el-col>
                
                <!-- 审核状态字段，只有管理员可以编辑 -->
                <el-col :span="12" v-if="role==='管理员'">
                    <el-form-item class="select" v-if="type!='info'"  label="审核状态" prop="shenheStatus">
                        <el-select v-model="ruleForm.shenheStatus" placeholder="请选择审核状态">
                            <el-option
                                label="待审核"
                                :value="0">
                            </el-option>
                            <el-option
                                label="已批准"
                                :value="1">
                            </el-option>
                            <el-option
                                label="已拒绝"
                                :value="2">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <div v-else>
                        <el-form-item class="input" label="审核状态" prop="shenheStatus">
                            <el-tag v-if="ruleForm.shenheStatus === 0" type="warning">待审核</el-tag>
                            <el-tag v-if="ruleForm.shenheStatus === 1" type="success">已批准</el-tag>
                            <el-tag v-if="ruleForm.shenheStatus === 2" type="danger">已拒绝</el-tag>
                        </el-form-item>
                    </div>
                </el-col>
                <!-- 只读状态展示 -->
                <el-col :span="12" v-else-if="type=='info'">
                    <el-form-item class="input" label="审核状态" prop="shenheStatus">
                        <el-tag v-if="ruleForm.shenheStatus === 0" type="warning">待审核</el-tag>
                        <el-tag v-if="ruleForm.shenheStatus === 1" type="success">已批准</el-tag>
                        <el-tag v-if="ruleForm.shenheStatus === 2" type="danger">已拒绝</el-tag>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item class="btn">
                <el-button v-if="type!='info'" type="primary" class="btn-success" @click="onSubmit">提交</el-button>
                <el-button v-if="type!='info'" class="btn-close" @click="back()">取消</el-button>
                <el-button v-if="type=='info'" class="btn-close" @click="back()">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import styleJs from "../../../utils/style.js";
    // 数字，邮件，手机，url，身份证校验
    import { isNumber,isIntNumer,isEmail,isPhone, isMobile,isURL,checkIdCard } from "@/utils/validate";
    export default {
        data() {
            return {
                addEditForm:null,
                id: '',
                type: '',
                sessionTable : "",//登录账户所在表名
                role : "",//权限
                shangpinForm: {},
                ro:{
                    shangpinId: false,
                    weixiuNumber: false,
                    weixiuContent: false,
                    insertTime: false,
                    status: false,
                    yonghuId: false,
                    shenheStatus: false,
                },
                ruleForm: {
                    shangpinId: '',
                    weixiuNumber: '',
                    weixiuContent: '',
                    insertTime: '',
                    status: 0,
                    yonghuId: '',
                    shenheStatus: 0,
                },
                shangpinOptions : [],
                rules: {
                   shangpinId: [
                              { required: true, message: '校园资产不能为空', trigger: 'blur' },
                              {  pattern: /^[1-9][0-9]*$/,
                                  message: '只允许输入整数',
                                  trigger: 'blur'
                              }
                          ],
                   weixiuNumber: [
                              { required: true, message: '维修数量不能为空', trigger: 'blur' },
                              {  pattern: /^[1-9][0-9]*$/,
                                  message: '只允许输入整数',
                                  trigger: 'blur'
                              }
                          ],
                   weixiuContent: [
                              { required: true, message: '维修备注不能为空', trigger: 'blur' },
                          ],
                   insertTime: [
                              { required: true, message: '维修时间不能为空', trigger: 'blur' },
                          ],
                   status: [
                              { required: true, message: '维修状态不能为空', trigger: 'change' },
                          ],
                }
            };
        },
        props: ["parent"],
        computed: {
        },
        created() {
            //获取当前登录用户的信息
            this.sessionTable = this.$storage.get("sessionTable");
            this.role = this.$storage.get("role");

            if (this.role != "管理员"){
            }
            this.addEditForm = styleJs.addStyle();
            this.addEditStyleChange()
            this.addEditUploadStyleChange()
            
            // 根据用户角色获取不同的资产列表
            if (this.role === '用户') {
                // 用户角色：获取当前用户借用中的设备
                this.$http({
                    url: `jieyong/page`,
                    method: "get",
                    params: {
                        page: 1,
                        limit: 100,
                        guihuanTypes: 1 // 1表示借用中
                    }
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                        // 获取用户借用的设备ID
                        const borrowedItems = data.data.list;
                        const borrowedItemIds = borrowedItems.map(item => item.shangpinId);
                        
                        // 如果有借用设备，获取这些设备的详情
                        if (borrowedItemIds.length > 0) {
                            this.$http({
                                url: `shangpin/page?page=1&limit=100`,
                                method: "get"
                            }).then(({ data }) => {
                                if (data && data.code === 0) {
                                    // 筛选出借用中的设备
                                    this.shangpinOptions = data.data.list.filter(item => 
                                        borrowedItemIds.includes(item.id)
                                    );
                                }
                            });
                        } else {
                            // 没有借用设备时显示提示
                            this.shangpinOptions = [];
                            this.$message.warning('您当前没有借用中的设备，无法申请维修');
                        }
                    }
                });
            } else {
                // 管理员角色：获取所有设备
                this.$http({
                    url: `shangpin/page?page=1&limit=100`,
                    method: "get"
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                        this.shangpinOptions = data.data.list;
                    }
                });
            }
        },
        mounted() {
        },
        methods: {
            // 下载
            download(file){
                window.open(`${file}`)
            },
            // 初始化
            init(id,type) {
                if (id) {
                    this.id = id;
                    this.type = type;
                }
                if(this.type=='info'||this.type=='else'){
                    this.info(id);
                }else if(this.type=='cross'){
                    var obj = this.$storage.getObj('crossObj');
                    for (var o in obj){
                      if(o=='shangpinId'){
                          this.ruleForm.shangpinId = obj[o];
                          this.ro.shangpinId = true;
                          continue;
                      }
                      if(o=='weixiuNumber'){
                          this.ruleForm.weixiuNumber = obj[o];
                          this.ro.weixiuNumber = true;
                          continue;
                      }
                      if(o=='weixiuContent'){
                          this.ruleForm.weixiuContent = obj[o];
                          this.ro.weixiuContent = true;
                          continue;
                      }
                      if(o=='insertTime'){
                          this.ruleForm.insertTime = obj[o];
                          this.ro.insertTime = true;
                          continue;
                      }
                      if(o=='status'){
                          this.ruleForm.status = obj[o];
                          this.ro.status = true;
                          continue;
                      }
                      if(o=='yonghuId'){
                          this.ruleForm.yonghuId = obj[o];
                          this.ro.yonghuId = true;
                          continue;
                      }
                      if(o=='shenheStatus'){
                          this.ruleForm.shenheStatus = obj[o];
                          this.ro.shenheStatus = true;
                          continue;
                      }
                    }
                }
                // 获取用户信息
                this.$http({
                    url:`${this.$storage.get("sessionTable")}/session`,
                    method: "get"
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                        var json = data.data;
                        // 用户角色
                        if (this.role === '用户') {
                            // 如果是用户角色，设置用户ID和默认的审核状态
                            this.ruleForm.yonghuId = json.id;
                            this.ruleForm.shenheStatus = 0; // 默认为待审核
                        }
                    } else {
                        this.$message.error(data.msg);
                    }
                });
            },
            shangpinChange(id){
                this.$http({
                    url: `shangpin/info/`+id,
                    method: "get"
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                        this.shangpinForm = data.data;
                    }
                });
            },
            // 多级联动参数
            info(id) {
                this.$http({
                    url: `weixiu/info/${id}`,
                    method: 'get'
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                        this.ruleForm = data.data;
                        this.shangpinChange(data.data.shangpinId)
                        //解决前台上传图片后台不显示的问题
                        let reg=new RegExp('../../../upload','g')//g代表全部
                    } else {
                        this.$message.error(data.msg);
                    }
                });
            },
            // 提交
            onSubmit() {
                this.$refs["ruleForm"].validate(valid => {
                    if (valid) {
                        this.$http({
                            url:`weixiu/${!this.ruleForm.id ? "save" : "update"}`,
                            method: "post",
                            data: this.ruleForm
                        }).then(({ data }) => {
                            if (data && data.code === 0) {
                                this.$message({
                                    message: "操作成功",
                                    type: "success",
                                    duration: 1500,
                                    onClose: () => {
                                        this.parent.showFlag = true;
                                        this.parent.addOrUpdateFlag = false;
                                        this.parent.weixiuCrossAddOrUpdateFlag = false;
                                        this.parent.search();
                                        this.parent.contentStyleChange();
                                    }
                                });
                            } else {
                                this.$message.error(data.msg);
                            }
                        });
                    }
                });
            },
            // 获取uuid
            getUUID () {
                return new Date().getTime();
            },
            // 返回
            back() {
                this.parent.showFlag = true;
                this.parent.addOrUpdateFlag = false;
                this.parent.weixiuCrossAddOrUpdateFlag = false;
                this.parent.contentStyleChange();
            },
            //图片

            addEditStyleChange() {
                this.$nextTick(()=>{
                    // input
                    document.querySelectorAll('.addEdit-block .input .el-input__inner').forEach(el=>{
                        el.style.height = this.addEditForm.inputHeight
                        el.style.color = this.addEditForm.inputFontColor
                        el.style.fontSize = this.addEditForm.inputFontSize
                        el.style.borderWidth = this.addEditForm.inputBorderWidth
                        el.style.borderStyle = this.addEditForm.inputBorderStyle
                        el.style.borderColor = this.addEditForm.inputBorderColor
                        el.style.borderRadius = this.addEditForm.inputBorderRadius
                        el.style.backgroundColor = this.addEditForm.inputBgColor
                    })
                    document.querySelectorAll('.addEdit-block .input .el-form-item__label').forEach(el=>{
                        el.style.lineHeight = this.addEditForm.inputHeight
                        el.style.color = this.addEditForm.inputLableColor
                        el.style.fontSize = this.addEditForm.inputLableFontSize
                    })
                    // select
                    document.querySelectorAll('.addEdit-block .select .el-input__inner').forEach(el=>{
                        el.style.height = this.addEditForm.selectHeight
                        el.style.color = this.addEditForm.selectFontColor
                        el.style.fontSize = this.addEditForm.selectFontSize
                        el.style.borderWidth = this.addEditForm.selectBorderWidth
                        el.style.borderStyle = this.addEditForm.selectBorderStyle
                        el.style.borderColor = this.addEditForm.selectBorderColor
                        el.style.borderRadius = this.addEditForm.selectBorderRadius
                        el.style.backgroundColor = this.addEditForm.selectBgColor
                    })
                    document.querySelectorAll('.addEdit-block .select .el-form-item__label').forEach(el=>{
                        el.style.lineHeight = this.addEditForm.selectHeight
                        el.style.color = this.addEditForm.selectLableColor
                        el.style.fontSize = this.addEditForm.selectLableFontSize
                    })
                    document.querySelectorAll('.addEdit-block .select .el-select__caret').forEach(el=>{
                        el.style.color = this.addEditForm.selectIconFontColor
                        el.style.fontSize = this.addEditForm.selectIconFontSize
                    })
                    // date
                    document.querySelectorAll('.addEdit-block .date .el-input__inner').forEach(el=>{
                        el.style.height = this.addEditForm.dateHeight
                        el.style.color = this.addEditForm.dateFontColor
                        el.style.fontSize = this.addEditForm.dateFontSize
                        el.style.borderWidth = this.addEditForm.dateBorderWidth
                        el.style.borderStyle = this.addEditForm.dateBorderStyle
                        el.style.borderColor = this.addEditForm.dateBorderColor
                        el.style.borderRadius = this.addEditForm.dateBorderRadius
                        el.style.backgroundColor = this.addEditForm.dateBgColor
                    })
                    document.querySelectorAll('.addEdit-block .date .el-form-item__label').forEach(el=>{
                        el.style.lineHeight = this.addEditForm.dateHeight
                        el.style.color = this.addEditForm.dateLableColor
                        el.style.fontSize = this.addEditForm.dateLableFontSize
                    })
                    document.querySelectorAll('.addEdit-block .date .el-input__icon').forEach(el=>{
                        el.style.color = this.addEditForm.dateIconFontColor
                        el.style.fontSize = this.addEditForm.dateIconFontSize
                        el.style.lineHeight = this.addEditForm.dateHeight
                    })
                    // upload
                    let iconLineHeight = parseInt(this.addEditForm.uploadHeight) - parseInt(this.addEditForm.uploadBorderWidth) * 2 + 'px'
                    document.querySelectorAll('.addEdit-block .upload .el-upload--picture-card').forEach(el=>{
                        el.style.width = this.addEditForm.uploadHeight
                        el.style.height = this.addEditForm.uploadHeight
                        el.style.borderWidth = this.addEditForm.uploadBorderWidth
                        el.style.borderStyle = this.addEditForm.uploadBorderStyle
                        el.style.borderColor = this.addEditForm.uploadBorderColor
                        el.style.borderRadius = this.addEditForm.uploadBorderRadius
                        el.style.backgroundColor = this.addEditForm.uploadBgColor
                    })
                    document.querySelectorAll('.addEdit-block .upload .el-form-item__label').forEach(el=>{
                        el.style.lineHeight = this.addEditForm.uploadHeight
                        el.style.color = this.addEditForm.uploadLableColor
                        el.style.fontSize = this.addEditForm.uploadLableFontSize
                    })
                    document.querySelectorAll('.addEdit-block .upload .el-icon-plus').forEach(el=>{
                        el.style.color = this.addEditForm.uploadIconFontColor
                        el.style.fontSize = this.addEditForm.uploadIconFontSize
                        el.style.lineHeight = iconLineHeight
                        el.style.display = 'block'
                    })
                    // 多文本输入框
                    document.querySelectorAll('.addEdit-block .textarea .el-textarea__inner').forEach(el=>{
                        el.style.height = this.addEditForm.textareaHeight
                        el.style.color = this.addEditForm.textareaFontColor
                        el.style.fontSize = this.addEditForm.textareaFontSize
                        el.style.borderWidth = this.addEditForm.textareaBorderWidth
                        el.style.borderStyle = this.addEditForm.textareaBorderStyle
                        el.style.borderColor = this.addEditForm.textareaBorderColor
                        el.style.borderRadius = this.addEditForm.textareaBorderRadius
                        el.style.backgroundColor = this.addEditForm.textareaBgColor
                    })
                    document.querySelectorAll('.addEdit-block .textarea .el-form-item__label').forEach(el=>{
                        // el.style.lineHeight = this.addEditForm.textareaHeight
                        el.style.color = this.addEditForm.textareaLableColor
                        el.style.fontSize = this.addEditForm.textareaLableFontSize
                    })
                    // 保存
                    document.querySelectorAll('.addEdit-block .btn .btn-success').forEach(el=>{
                        el.style.width = this.addEditForm.btnSaveWidth
                        el.style.height = this.addEditForm.btnSaveHeight
                        el.style.color = this.addEditForm.btnSaveFontColor
                        el.style.fontSize = this.addEditForm.btnSaveFontSize
                        el.style.borderWidth = this.addEditForm.btnSaveBorderWidth
                        el.style.borderStyle = this.addEditForm.btnSaveBorderStyle
                        el.style.borderColor = this.addEditForm.btnSaveBorderColor
                        el.style.borderRadius = this.addEditForm.btnSaveBorderRadius
                        el.style.backgroundColor = this.addEditForm.btnSaveBgColor
                    })
                    // 返回
                    document.querySelectorAll('.addEdit-block .btn .btn-close').forEach(el=>{
                        el.style.width = this.addEditForm.btnCancelWidth
                        el.style.height = this.addEditForm.btnCancelHeight
                        el.style.color = this.addEditForm.btnCancelFontColor
                        el.style.fontSize = this.addEditForm.btnCancelFontSize
                        el.style.borderWidth = this.addEditForm.btnCancelBorderWidth
                        el.style.borderStyle = this.addEditForm.btnCancelBorderStyle
                        el.style.borderColor = this.addEditForm.btnCancelBorderColor
                        el.style.borderRadius = this.addEditForm.btnCancelBorderRadius
                        el.style.backgroundColor = this.addEditForm.btnCancelBgColor
                    })
                })
            },
            addEditUploadStyleChange() {
                this.$nextTick(()=>{
                    document.querySelectorAll('.addEdit-block .upload .el-upload-list--picture-card .el-upload-list__item').forEach(el=>{
                        el.style.width = this.addEditForm.uploadHeight
                        el.style.height = this.addEditForm.uploadHeight
                        el.style.borderWidth = this.addEditForm.uploadBorderWidth
                        el.style.borderStyle = this.addEditForm.uploadBorderStyle
                        el.style.borderColor = this.addEditForm.uploadBorderColor
                        el.style.borderRadius = this.addEditForm.uploadBorderRadius
                        el.style.backgroundColor = this.addEditForm.uploadBgColor
                    })
                })
            },
        }
    };
</script>
<style lang="scss">
.editor{
  height: 500px;

  & >>> .ql-container {
	  height: 310px;
  }
}
.amap-wrapper {
  width: 100%;
  height: 500px;
}
.search-box {
  position: absolute;
}
.addEdit-block {
	margin: -10px;
}
.detail-form-content {
	padding: 12px;
}
.btn .el-button {
  padding: 0;
}</style>

