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
                <input id="updateId" name="id" type="hidden">
               <el-col :span="12">
                   <el-form-item class="input" v-if="type!='info'"  label="资产编号" prop="shangpinUuidNumber">
                       <el-input v-model="ruleForm.shangpinUuidNumber"
                                 placeholder="资产编号" clearable  :readonly="ro.shangpinUuidNumber"></el-input>
                   </el-form-item>
                   <div v-else>
                       <el-form-item class="input" label="资产编号" prop="shangpinUuidNumber">
                           <el-input v-model="ruleForm.shangpinUuidNumber"
                                     placeholder="资产编号" readonly></el-input>
                       </el-form-item>
                   </div>
               </el-col>
               <el-col :span="12">
                   <el-form-item class="input" v-if="type!='info'"  label="资产名称" prop="shangpinName">
                       <el-input v-model="ruleForm.shangpinName"
                                 placeholder="资产名称" clearable  :readonly="ro.shangpinName"></el-input>
                   </el-form-item>
                   <div v-else>
                       <el-form-item class="input" label="资产名称" prop="shangpinName">
                           <el-input v-model="ruleForm.shangpinName"
                                     placeholder="资产名称" readonly></el-input>
                       </el-form-item>
                   </div>
               </el-col>
                <el-col :span="24">
                    <el-form-item class="upload" v-if="type!='info' && !ro.shangpinPhoto" label="资产照片" prop="shangpinPhoto">
                        <file-upload
                            tip="点击上传资产照片"
                            action="file/upload"
                            :limit="3"
                            :multiple="true"
                            :fileUrls="ruleForm.shangpinPhoto?ruleForm.shangpinPhoto:''"
                            @change="shangpinPhotoUploadChange"
                        ></file-upload>
                    </el-form-item>
                    <div v-else>
                        <el-form-item v-if="ruleForm.shangpinPhoto" label="资产照片" prop="shangpinPhoto">
                            <img style="margin-right:20px;" v-bind:key="i" v-for="(item,i) in (ruleForm.shangpinPhoto || '').split(',')" :src="item" width="100" height="100">
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="select" v-if="type!='info'"  label="资产类型" prop="shangpinTypes">
                        <el-select v-model="ruleForm.shangpinTypes" placeholder="请选择资产类型">
                            <el-option
                                v-for="item in shangpinTypesOptions"
                                v-bind:key="item.codeIndex"
                                :label="item.indexName"
                                :value="item.codeIndex">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <div v-else>
                        <el-form-item class="input" label="资产类型" prop="shangpinValue">
                        <el-input v-model="ruleForm.shangpinValue"
                            placeholder="资产类型" readonly></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12">
                    <el-form-item class="select" v-if="type!='info'"  label="存放地点" prop="didianTypes">
                        <el-select v-model="ruleForm.didianTypes" placeholder="请选择存放地点">
                            <el-option
                                v-for="item in didianTypesOptions"
                                v-bind:key="item.codeIndex"
                                :label="item.indexName"
                                :value="item.codeIndex">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <div v-else>
                        <el-form-item class="input" label="存放地点" prop="didianValue">
                        <el-input v-model="ruleForm.didianValue"
                            placeholder="存放地点" readonly></el-input>
                        </el-form-item>
                    </div>
                </el-col>
               <el-col :span="12">
                   <el-form-item class="input" v-if="type!='info'"  label="资产库存" prop="shangpinKucunNumber">
                       <el-input v-model="ruleForm.shangpinKucunNumber"
                                 placeholder="资产库存" clearable  :readonly="ro.shangpinKucunNumber"></el-input>
                   </el-form-item>
                   <div v-else>
                       <el-form-item class="input" label="资产库存" prop="shangpinKucunNumber">
                           <el-input v-model="ruleForm.shangpinKucunNumber"
                                     placeholder="资产库存" readonly></el-input>
                       </el-form-item>
                   </div>
               </el-col>
               <el-col :span="12">
                   <el-form-item class="input" v-if="type!='info'"  label="资产价值" prop="price">
                       <el-input v-model="ruleForm.price"
                                 placeholder="资产价值" clearable  :readonly="ro.price"></el-input>
                   </el-form-item>
                   <div v-else>
                       <el-form-item class="input" label="资产价值" prop="price">
                           <el-input v-model="ruleForm.price"
                                     placeholder="资产价值" readonly></el-input>
                       </el-form-item>
                   </div>
               </el-col>
                <el-col :span="24">
                    <el-form-item v-if="type!='info'"  label="资产介绍" prop="shangpinContent">
                        <editor style="min-width: 200px; max-width: 600px;"
                                v-model="ruleForm.shangpinContent"
                                class="editor"
                                action="file/upload">
                        </editor>
                    </el-form-item>
                    <div v-else>
                        <el-form-item v-if="ruleForm.shangpinContent" label="资产介绍" prop="shangpinContent">
                            <span v-html="ruleForm.shangpinContent"></span>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="24">
                    <el-form-item class="input" v-if="type=='info'"  label="交易哈希" prop="transactionHash">
                        <div style="display: flex; flex-direction: column;">
                            <div style="display: flex; align-items: center; margin-bottom: 5px;">
                                <el-input v-model="ruleForm.transactionHash" placeholder="交易哈希" readonly style="width: 100%;"></el-input>
                                <el-button size="mini" type="primary" @click="copyToClipboard(ruleForm.transactionHash)" style="margin-left: 10px;">复制</el-button>
                            </div>
                            <div v-if="ruleForm.transactionHash" style="font-size: 12px; color: #666; margin-top: 5px;">
                                <i class="el-icon-info"></i> 交易哈希是区块链上该操作的唯一标识，可用于查询和验证交易记录
                            </div>
                            <div v-if="!ruleForm.transactionHash" style="font-size: 12px; color: #f56c6c; margin-top: 5px;">
                                <i class="el-icon-warning"></i> 未找到交易哈希信息
                            </div>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item class="btn">
                <el-button v-if="type!='info'" type="primary" class="btn-success" @click="onSubmit">提交</el-button>
                <el-button v-if="type!='info'" class="btn-close" @click="back()">取消</el-button>
                <el-button v-if="type=='info'" type="primary" icon="el-icon-back" class="back-button" @click="back()">返回</el-button>
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
                ro:{
                    shangpinUuidNumber: false,
                    shangpinName: false,
                    shangpinPhoto: false,
                    shangpinTypes: false,
                    didianTypes: false,
                    shangpinKucunNumber: false,
                    shangpinDelete: false,
                    shangpinContent: false,
                    price: false,
                },
                ruleForm: {
                    shangpinUuidNumber: new Date().getTime(),
                    shangpinName: '',
                    shangpinPhoto: '',
                    shangpinTypes: '',
                    didianTypes: '',
                    shangpinKucunNumber: '',
                    shangpinDelete: '',
                    shangpinContent: '',
                    price: '',
                },
                shangpinTypesOptions : [],
                didianTypesOptions : [],
                rules: {
                   shangpinUuidNumber: [
                              { required: true, message: '资产编号不能为空', trigger: 'blur' },
                          ],
                   shangpinName: [
                              { required: true, message: '资产名称不能为空', trigger: 'blur' },
                          ],
                   shangpinPhoto: [
                              { required: true, message: '资产照片不能为空', trigger: 'blur' },
                          ],
                   shangpinTypes: [
                              { required: true, message: '资产类型不能为空', trigger: 'blur' },
                              {  pattern: /^[1-9][0-9]*$/,
                                  message: '只允许输入整数',
                                  trigger: 'blur'
                              }
                          ],
                   didianTypes: [
                              { required: true, message: '存放地点不能为空', trigger: 'blur' },
                              {  pattern: /^[1-9][0-9]*$/,
                                  message: '只允许输入整数',
                                  trigger: 'blur'
                              }
                          ],
                   shangpinKucunNumber: [
                              { required: true, message: '资产库存不能为空', trigger: 'blur' },
                              {  pattern: /^[1-9][0-9]*$/,
                                  message: '只允许输入整数',
                                  trigger: 'blur'
                              }
                          ],
                   shangpinDelete: [
                              { required: true, message: '逻辑删除不能为空', trigger: 'blur' },
                              {  pattern: /^[1-9][0-9]*$/,
                                  message: '只允许输入整数',
                                  trigger: 'blur'
                              }
                          ],
                   shangpinContent: [
                              { required: true, message: '资产介绍不能为空', trigger: 'blur' },
                          ],
                   price: [
                              { required: true, message: '资产价值不能为空', trigger: 'blur' },
                              {  pattern: /^[1-9][0-9]*$/,
                                  message: '只允许输入整数',
                                  trigger: 'blur'
                              }
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
            //获取下拉框信息
                this.$http({
                    url:`dictionary/page?page=1&limit=100&sort=&order=&dicCode=shangpin_types`,
                    method: "get"
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                        this.shangpinTypesOptions = data.data.list;
                    }
                });
                this.$http({
                    url:`dictionary/page?page=1&limit=100&sort=&order=&dicCode=didian_types`,
                    method: "get"
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                        this.didianTypesOptions = data.data.list;
                    }
                });


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

                      if(o=='shangpinUuidNumber'){
                          this.ruleForm.shangpinUuidNumber = obj[o];
                          this.ro.shangpinUuidNumber = true;
                          continue;
                      }
                      if(o=='shangpinName'){
                          this.ruleForm.shangpinName = obj[o];
                          this.ro.shangpinName = true;
                          continue;
                      }
                      if(o=='shangpinPhoto'){
                          this.ruleForm.shangpinPhoto = obj[o];
                          this.ro.shangpinPhoto = true;
                          continue;
                      }
                      if(o=='shangpinTypes'){
                          this.ruleForm.shangpinTypes = obj[o];
                          this.ro.shangpinTypes = true;
                          continue;
                      }
                      if(o=='didianTypes'){
                          this.ruleForm.didianTypes = obj[o];
                          this.ro.didianTypes = true;
                          continue;
                      }
                      if(o=='shangpinKucunNumber'){
                          this.ruleForm.shangpinKucunNumber = obj[o];
                          this.ro.shangpinKucunNumber = true;
                          continue;
                      }
                      if(o=='shangpinDelete'){
                          this.ruleForm.shangpinDelete = obj[o];
                          this.ro.shangpinDelete = true;
                          continue;
                      }
                      if(o=='shangpinContent'){
                          this.ruleForm.shangpinContent = obj[o];
                          this.ro.shangpinContent = true;
                          continue;
                      }
                      if(o=='price'){
                          this.ruleForm.price = obj[o];
                          this.ro.price = true;
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
                    } else {
                        this.$message.error(data.msg);
                    }
                });
            },
            // 多级联动参数
            info(id) {
                this.$http({
                    url: `shangpin/info/${id}`,
                    method: 'get'
                }).then(({ data }) => {
                    if (data && data.code === 0) {
                        this.ruleForm = data.data;
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
                            url:`shangpin/${!this.ruleForm.id ? "save" : "update"}`,
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
                                        this.parent.shangpinCrossAddOrUpdateFlag = false;
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
                this.parent.shangpinCrossAddOrUpdateFlag = false;
                this.parent.contentStyleChange();
            },
            //图片
            shangpinPhotoUploadChange(fileUrls){
                this.ruleForm.shangpinPhoto = fileUrls;
                this.addEditUploadStyleChange()
            },

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
            copyToClipboard(text) {
                const input = document.createElement('input');
                input.value = text;
                document.body.appendChild(input);
                input.select();
                document.execCommand('copy');
                document.body.removeChild(input);
                this.$message.success('交易哈希已复制到剪贴板');
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
}

.back-button {
  padding: 12px 20px !important;
  background-color: #409EFF !important;
  border-color: #409EFF !important;
  color: white !important;
  font-size: 14px;
  border-radius: 4px !important;
  transition: all 0.3s;
}

.back-button:hover {
  background-color: #66b1ff !important;
  border-color: #66b1ff !important;
}
</style>

