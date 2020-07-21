<!--<template>-->
<!--    <div id="app">-->
<!--        &lt;!&ndash;        面包屑导航区&ndash;&gt;-->
<!--        <el-breadcrumb separator-class="el-icon-arrow-right">-->
<!--            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>-->
<!--            <el-breadcrumb-item>活动管理</el-breadcrumb-item>-->
<!--            <el-breadcrumb-item>活动列表</el-breadcrumb-item>-->
<!--        </el-breadcrumb>-->
<!--        &lt;!&ndash;            卡片视图区&ndash;&gt;-->
<!--        <el-card>-->
<!--            &lt;!&ndash;搜索区域&ndash;&gt;-->
<!--            &lt;!&ndash;            el-row栅格布局，gutter为每个栅格的间隔&ndash;&gt;-->
<!--            <el-row :gutter="20">-->
<!--                <el-col :span="8">-->
<!--                    &lt;!&ndash;                :sapn input宽度&ndash;&gt;-->
<!--                    &lt;!&ndash;                model和click一起实现了搜索&ndash;&gt;-->
<!--                    <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @change="getUserList">-->
<!--                        <el-button slot="append" icon="el-icon-search" @click="getUserList">-->
<!--                        </el-button>-->
<!--                    </el-input>-->
<!--                </el-col>-->
<!--                <el-col :span="4">-->
<!--                    <el-button type="primary" @click="dialogVisible=true">添加用户</el-button>-->
<!--                </el-col>-->
<!--            </el-row>-->

<!--            &lt;!&ndash;        用户列表区域&ndash;&gt;-->
<!--            <el-table :data="userList" border stripe>-->
<!--                &lt;!&ndash;            :tata数组&ndash;&gt;-->
<!--                <el-table-column type="index"></el-table-column>-->
<!--                <el-table-column prop="username" label="姓名"></el-table-column>-->
<!--                <el-table-column prop="email" label="电子邮件"></el-table-column>-->
<!--                <el-table-column prop="mobile" label="电话号码"></el-table-column>-->
<!--                <el-table-column prop="role_name" label="角色"></el-table-column>-->
<!--                <el-table-column label="状态">-->
<!--                    &lt;!&ndash;            <template v-slot:scope="scope">&ndash;&gt;-->
<!--                    <template v-slot="scope">-->
<!--                        &lt;!&ndash;                v-slot:相当于接收了userList，scope是自定义名字,scope.row:拿到对应这一行的数据&ndash;&gt;-->
<!--                        &lt;!&ndash;                {{scope.row}}&ndash;&gt;-->
<!--                        &lt;!&ndash;                通过插槽slot获取这一行信息&ndash;&gt;-->

<!--                        &lt;!&ndash;                @change="":element自带的回调函数 当开关状态改变的时候执行回调change&ndash;&gt;-->
<!--                        <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)">-->
<!--                        </el-switch>-->
<!--                    </template>-->
<!--                </el-table-column>-->
<!--                <el-table-column label="操作">-->
<!--                    &lt;!&ndash;                template v-slot="scope"：作用域插槽&ndash;&gt;-->
<!--                    <template v-slot="scope">-->
<!--                        &lt;!&ndash;                    修改&ndash;&gt;-->
<!--<div>{{scope.row}}</div>-->
<!--                        <el-button type="primary" icon="el-icon-edit" size="mini"-->
<!--                                   @click="showEditDialog(scope.row.id)"></el-button>-->
<!--                        &lt;!&ndash;                    删除&ndash;&gt;-->
<!--                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.id)"></el-button>-->
<!--                        &lt;!&ndash;                    分配角色&ndash;&gt;-->
<!--                        &lt;!&ndash;                    :enterable="false":element属性，不遮挡其他&ndash;&gt;-->
<!--                        <el-tooltip effect="dark" content="分配角色" placement="bottom-start" :enterable="false">-->
<!--                            <el-button type="warnig" icon="el-icon-setting" size="mini"></el-button>-->
<!--                        </el-tooltip>-->
<!--                    </template>-->
<!--                </el-table-column>-->
<!--                &lt;!&ndash;            prop：接收data里的属性&ndash;&gt;-->
<!--            </el-table>-->
<!--            &lt;!&ndash;            分页&ndash;&gt;-->
<!--            <el-pagination-->
<!--                    @size-change="handleSizeChange"-->
<!--                    @current-change="handleCurrentChange"-->
<!--                    :current-page="queryInfo.pagenum"-->
<!--                    :page-sizes="[3, 6, 10, 15,30,50,100]"-->
<!--                    :page-size="queryInfo.pagesize"-->
<!--                    layout="total, sizes, prev, pager, next, jumper">-->
<!--                &lt;!&ndash;                    :total="total"&ndash;&gt;-->
<!--                >-->
<!--            </el-pagination>-->
<!--            &lt;!&ndash;layout：展示的小组件功能&ndash;&gt;-->
<!--        </el-card>-->
<!--        &lt;!&ndash;        添加用户对话框&ndash;&gt;-->
<!--        <el-dialog-->
<!--                title="添加用户"-->
<!--                :visible.sync="dialogVisible"-->
<!--                width="30%"-->
<!--                @close="clearForm">-->
<!--            &lt;!&ndash;            @close按取消时候触发该函数&ndash;&gt;-->
<!--            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">-->
<!--                <el-form-item label="用户名" prop="username">-->
<!--                    <el-input v-model="addForm.username"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="密码" prop="password">-->
<!--                    <el-input v-model="addForm.password"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="邮箱" prop="email">-->
<!--                    <el-input v-model="addForm.email"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="手机" prop="mobile">-->
<!--                    <el-input v-model="addForm.mobile"></el-input>-->
<!--                </el-form-item>-->
<!--            </el-form>-->
<!--            <span slot="footer" class="dialog-footer">-->
<!--    <el-button @click="dialogVisible = false">取 消</el-button>-->
<!--    <el-button type="primary" @click="addUser">确 定</el-button>-->
<!--  </span>-->
<!--        </el-dialog>-->
<!--        &lt;!&ndash;        //修改用户的对话框&ndash;&gt;-->
<!--        <el-dialog-->
<!--                title="修改用户"-->
<!--                :visible.sync="editDialogVisible"-->
<!--                width="30%"-->
<!--                @close="editDialogClosed"-->
<!--        >-->
<!--            &lt;!&ndash;            :visible.sync:是否显示对话框&ndash;&gt;-->
<!--            <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">-->
<!--                <el-form-item label="用户名" >-->
<!--                    &lt;!&ndash;                    disabled：禁用状态&ndash;&gt;-->
<!--                    <el-input v-model="editForm.username" disabled></el-input>-->
<!--                </el-form-item>-->
<!--                    <el-form-item label="邮箱"  prop="email">-->
<!--                        <el-input v-model="editForm.email" ></el-input>-->
<!--                    </el-form-item>-->
<!--                    <el-form-item label="手机" prop="mobile">-->
<!--                        <el-input v-model="editForm.mobile" ></el-input>-->
<!--                    </el-form-item>-->
<!--            </el-form>-->
<!--            <span slot="footer" class="dialog-footer">-->
<!--    <el-button @click="editDialogVisible = false">取 消</el-button>-->
<!--    <el-button type="primary" @click="editUserInfo">确 定</el-button>-->
<!--  </span>-->
<!--        </el-dialog>-->
<!--    </div>-->
<!--</template>-->

<!--<script>-->
<!--    export default {-->
<!--        name: "Users",-->
<!--        data() {-->
<!--            // 自定义邮箱规则-->
<!--            //value接收input上的内容-->
<!--            let checkEmail = (rule, value, callback) => {-->
<!--                const regEmail = /^\w+@\w+(\.\w+)+$/;-->
<!--                if (regEmail.test(value)) {-->
<!--                    // 合法邮箱-->
<!--                    return callback()-->
<!--                }-->
<!--                callback(new Error('请输入合法邮箱'))-->
<!--            };-->
<!--            // 自定义手机号规则-->
<!--            let checkMobile = (rule, value, callback) => {-->
<!--                const regMobile = /^1[3456789]\d{9}$/;-->
<!--                if (regMobile.test(value)) {-->
<!--                    return callback()-->
<!--                }-->
<!--                // 返回一个错误提示-->
<!--                callback(new Error('请输入合法的手机号码'))-->
<!--            };-->
<!--            return {-->
<!--                queryInfo: {-->
<!--                    query: '',-->
<!--                    //当前显示页码-->
<!--                    pagenum: 1,-->
<!--                    //当前显示煤业显示多少数据-->
<!--                    pagesize: 6-->
<!--                },-->
<!--                userList: [],-->
<!--                total: 6,-->
<!--                //控制对话框隐藏与显示-->
<!--                dialogVisible: false,-->
<!--                addForm: {-->
<!--                    username: '',-->
<!--                    password: '',-->
<!--                    email: '',-->
<!--                    mobile: ''-->
<!--                },-->
<!--                //存取用户信息对象-->
<!--                editForm: {-->
<!--                    username: '',-->
<!--                    password: '',-->
<!--                    email: '',-->
<!--                    mobile: ''-->
<!--                },-->

<!--                //表单规则-->
<!--                addFormRules: {-->
<!--                    username: [-->
<!--                        {-->
<!--                            required: true,-->
<!--                            message: "请输入用户名",-->
<!--                            trigger: 'blur'-->
<!--                        },-->
<!--                        {-->
<!--                            min: 3,-->
<!--                            max: 10,-->
<!--                            message: "用户名输入长度为3~10之间",-->
<!--                            trigger: 'blur'-->
<!--                        }-->
<!--                    ],-->
<!--                    password: [-->
<!--                        {-->
<!--                            required: true,-->
<!--                            message: "请输入密码",-->
<!--                            trigger: 'blur'-->
<!--                        },-->
<!--                        {-->
<!--                            min: 3,-->
<!--                            max: 16,-->
<!--                            message: "密码输入长度为3~16之间",-->
<!--                            trigger: 'blur'-->
<!--                        }-->
<!--                    ],-->
<!--                    email: [-->
<!--                        {-->
<!--                            required: true,-->
<!--                            message: "请输入电子邮件",-->
<!--                            trigger: 'blur'-->
<!--                        },-->
<!--                        {-->
<!--                            min: 3,-->
<!--                            max: 21,-->
<!--                            message: "邮件输入长度为3~21之间",-->
<!--                            trigger: 'blur'-->
<!--                        },-->
<!--                        {-->
<!--                            validator: checkEmail, trigger: 'blur'-->
<!--                        }-->
<!--                    ],-->
<!--                    mobile: [-->
<!--                        {-->
<!--                            required: true,-->
<!--                            message: "请输入手机号",-->
<!--                            trigger: 'blur'-->
<!--                        },-->
<!--                        {-->
<!--                            min: 11,-->
<!--                            max: 11,-->
<!--                            message: "请输入正确手机号",-->
<!--                            trigger: 'blur'-->
<!--                        },-->
<!--                        {-->
<!--                            validator: checkMobile, trigger: 'blur'-->
<!--                        }-->
<!--                    ]-->
<!--                },-->
<!--                editDialogVisible: false,-->
<!--                editFormRules:{-->
<!--                    email:[  {-->
<!--                        required: true,-->
<!--                        message: "请输入电子邮件",-->
<!--                        trigger: 'blur'-->
<!--                    },-->
<!--                        {-->
<!--                            min: 3,-->
<!--                            max: 21,-->
<!--                            message: "邮件输入长度为3~21之间",-->
<!--                            trigger: 'blur'-->
<!--                        },-->
<!--                        {-->
<!--                            validator: checkEmail, trigger: 'blur'-->
<!--                        }],-->
<!--                        mobile: [-->
<!--                            {-->
<!--                                required: true,-->
<!--                                message: "请输入手机号",-->
<!--                                trigger: 'blur'-->
<!--                            },-->
<!--                            {-->
<!--                                min: 11,-->
<!--                                max: 11,-->
<!--                                message: "请输入正确手机号",-->
<!--                                trigger: 'blur'-->
<!--                            },-->
<!--                            {-->
<!--                                validator: checkMobile, trigger: 'blur'-->
<!--                            }-->
<!--                        ]-->
<!--                }-->
<!--            }-->

<!--        },-->
<!--        created() {-->
<!--            this.getUserList();-->
<!--        },-->
<!--        methods: {-->
<!--            // async getUserList(){-->
<!--            //   const {data:res} = await  this.$http.get('users',{params:this.queryInfo});-->
<!--            //    console.log(res);-->
<!--            //     if (res.meta.status!==200){-->
<!--            //         return this.$message.error('获取数据失败')-->
<!--            //     }-->
<!--            //     //data是对象,但是pro希望接收的数组-->
<!--            //     for(let i in res){-->
<!--            //         this.userList.push(res[i]);-->
<!--            //         console.log('数组:'+  this.userList.push(res[i]))-->
<!--            //     }-->
<!--            //     this.total = res.data.total;-->
<!--            //     // this.userList = res.data;-->
<!--            //     console.log(this.userList)-->
<!--            //  }-->
<!--            // async getUserList() {-->
<!--            //     const {data: res} = await this.$http.get('users', {-->
<!--            //         params: this.queryInfo-->
<!--            //     });-->
<!--            //     if (res.meta.status !== 200) {-->
<!--            //         return this.$message.error('获取用户列表失败！')-->
<!--            //     }-->
<!--            //     this.userList = res.data.users;-->
<!--            //     this.totle = res.data.totle-->
<!--            //     // console.log(this.userList)-->
<!--            //     // this.$message.success('获取用户列表成功！')-->
<!--            // },-->
<!--            async getUserList () {-->
<!--                const { data: res } = await this.$http.get('users', {-->
<!--                    params: this.queryInfo-->
<!--                });-->
<!--                if (res.meta.status !== 200) {-->
<!--                    return this.$message.error('获取用户列表失败！')-->
<!--                }-->
<!--                this.userList = res.data.users;-->
<!--                this.totle = res.data.totle-->
<!--            },-->
<!--            //当下拉列表(page-sizes)页码发生改变触发这个函数-->
<!--            // newSize：接收改变后的下拉列表值-->
<!--            handleSizeChange(newSize) {-->
<!--                // console.log("当前条数"+newSize);-->
<!--                this.queryInfo.pagesize = newSize;-->
<!--                this.getUserList()-->
<!--            },-->
<!--            //当页码发生改变就触发这个函数-->
<!--            //newPage改变后的页码-->
<!--            handleCurrentChange(newPage) {-->
<!--                this.queryInfo.pagenum = newPage;-->
<!--                // console.log("当前页码"+newPage);-->
<!--                this.getUserList()-->
<!--            },-->
<!--            //监听状态开关的转变-->
<!--            //在状态开关发生改变时候，下次进来记住这次状态-->
<!--            async userStateChanged(userInfo) {-->
<!--                // console.log(userInfo)-->
<!--                const {data: res} = await this.$http.put(-->
<!--                    `users/${userInfo.id}/state/${userInfo.mg_state}`-->
<!--                );-->
<!--                // console.log(res);-->
<!--                if (res.meta.status !== 200) {-->
<!--                    userInfo.mg_state = !userInfo.mg_state;-->
<!--                    return this.$message.error('更新用户状态失败')-->
<!--                }-->
<!--                this.$message.success('更新用户状态成功！')-->
<!--            },-->
<!--            //清空表单-->
<!--            clearForm() {-->
<!--                this.$refs.addFormRef.resetFields();-->
<!--            },-->
<!--            -->
<!--            //验证表单便且添加数据到后台-->
<!--            addUser() {-->
<!--                // 提交请求前，表单预验证-->
<!--                this.$refs.addFormRef.validate(async valid => {-->
<!--                    // console.log(valid)-->
<!--                    // 表单预校验失败-->
<!--                    if(!valid) return this.$message.error('更新列表失败！');-->
<!--                    const {data: res} = await this.$http.put('users/', this.addForm);-->
<!--                    if (res.meta.status !== 201) {-->
<!--                        this.$message.error('添加用户失败！');-->
<!--                        // console.log(res.meta);-->
<!--                        return-->
<!--                    }-->
<!--                    this.$message.success('添加用户成功！');-->
<!--                    // 隐藏添加用户对话框-->
<!--                    this.dialogVisible = false;-->
<!--                    this.getUserList()-->
<!--                })-->
<!--            },-->

<!--             editDialogVisible(){-->
<!--               -->
<!--             },-->
<!--            //是否展示修改编辑框-->
<!--            async showEditDialog(id) {-->
<!--                // console.log(id)-->
<!--                const {data: res} = await this.$http.get('users/' + id);-->
<!--                if (res.meta.status !== 200) {-->
<!--                    this.$message.error('获取用户信息失败!')-->
<!--                }-->
<!--                this.editForm = res.data;-->
<!--                this.editDialogVisible = true;-->
<!--            },-->
<!--            //清空表单的验证-->
<!--            editDialogClosed(){-->
<!--                this.$refs.editFormRef.resetFields();-->
<!--            },-->
<!--            -->
<!--            //验证表单便且添加数据到后台-->
<!--            editUserInfo(){-->
<!--                this.$refs.editFormRef.validate(async valid => {-->
<!--                    if(!valid) return this.$message.error('更新列表失败！');-->
<!--                    const {data: res} = await this.$http-->
<!--                        .put('users/'+this.editForm.id, -->
<!--                        {email:this.editForm.email,-->
<!--                            mobile:this.editForm.mobile-->
<!--                        });-->
<!--                    console.log(res);-->
<!--                    if (res.meta.status !== 200) {-->
<!--                        // console.log('错了');-->
<!--                        return this.$message.error('编辑用户失败');-->
<!--                    }-->
<!--                    this.getUserList();-->
<!--                    this.$message.success('编辑用户成功请刷新页面!');-->
<!--                    this.editDialogVisible = false;-->
<!--                })-->
<!--            },-->
<!--            //根据id删除用户信息-->
<!--            async removeUserById(id){-->
<!--                // $confirm：Elements方法-->
<!--              const confirmResulr = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {-->
<!--                    confirmButtonText: '确定',-->
<!--                    cancelButtonText: '取消',-->
<!--                    type: 'warning'-->
<!--                }).catch(err=>err);-->
<!--                // console.log("返回的是promise对象"+confirmResulr)，用promise转换成正常-->
<!--                //确认：返回confirm  取消：返回cancel-->
<!--                console.log(confirmResulr);-->
<!--                if (confirmResulr!=="confirm") {-->
<!--                    return -->
<!--                }-->
<!--                const {data:res} = await this.$http.delete('users/'+id);-->
<!--                if(res.meta.status!==200){-->
<!--                    return this.$message.info('删除失败!');-->
<!--                }-->
<!--                this.$message.success('确认删除,请刷新页面');-->
<!--                this.getUserList()-->
<!--            }-->
<!--        }-->
<!--    }-->
<!--</script>-->

<!--<style lang="less" scoped>-->
<!--    /*#app{*/-->
<!--    /*    height: 100%;*/-->
<!--    /*    margin:0;*/-->
<!--    /*    padding: 0;*/-->
<!--    /*}*/-->
<!--    #app .el-breadcrumb {-->
<!--        margin-bottom: 15px;-->
<!--        font-size: 12px;-->
<!--    }-->

<!--    #app .el-card {-->
<!--        box-shadow: 0 1px rgba(0, 0, 0, 0.15px) !important;-->
<!--    }-->

<!--</style>-->
<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图 -->
        <el-card>
            <!-- 搜索 添加 -->
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList">
                        <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
                </el-col>
            </el-row>
            <!-- 用户列表区域 -->
            <el-table :data="userlist" border stripe>
                <!-- stripe: 斑马条纹
                border：边框-->
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column prop="username" label="姓名"></el-table-column>
                <el-table-column prop="email" label="邮箱"></el-table-column>
                <el-table-column prop="mobile" label="电话"></el-table-column>
                <el-table-column prop="role_name" label="角色"></el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                type="primary"
                                icon="el-icon-edit"
                                size="mini"
                                circle
                                @click="showEditDialog(scope.row.id)"
                        ></el-button>
                        <el-button
                                type="danger"
                                icon="el-icon-delete"
                                size="mini"
                                circle
                                @click="removeUserById(scope.row.id)"
                        ></el-button>
<!--                        placement：弹窗在上-->
                        <el-tooltip
                                class="item"
                                effect="dark"
                                content="角色分配"
                                :enterable="false"
                                placement="top"
                        >
                            <el-button
                                    type="warning"
                                    icon="el-icon-setting"
                                    size="mini"
                                    circle
                                    @click="showSetRole(scope.row)"
                            ></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页区域 -->
            <el-pagination

                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="queryInfo.pagenum"
                    :page-sizes="[5, 6, 10, 15,30,50,100]"
                    :page-size="queryInfo.pagesize"
                    layout="total, sizes, prev, pager, next, jumper">
                <!-- :total="total"-->
            </el-pagination>
        </el-card>

        <!-- 添加用户的对话框 -->
        <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
            <!-- 内容主体 -->
            <el-form
                    :model="addUserForm"
                    ref="addUserFormRef"
                    :rules="addUserFormRules"
                    label-width="100px"
            >
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="addUserForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addUserForm.password"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="addUserForm.email"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="mobile">
                    <el-input v-model="addUserForm.mobile"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
        </el-dialog>

        <!-- 修改用户的对话框 -->
        <el-dialog
                title="修改用户信息"
                :visible.sync="editDialogVisible"
                width="50%"
                @close="editDialogClosed"
        >
            <!-- 内容主体 -->
            <el-form
                    :model="editUserForm"
                    ref="editUserFormRef"
                    :rules="editUserFormRules"
                    label-width="70px"
            >
                <el-form-item label="用户名">
                    <el-input v-model="editUserForm.username" disabled></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="editUserForm.email"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="mobile">
                    <el-input v-model="editUserForm.mobile"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </span>
        </el-dialog>

        <!-- 分配角色对话框 -->
        <el-dialog
                title="分配角色"
                :visible.sync="setRoleDialogVisible"
                @close="setRoleDialogClosed"
                width="30%">
            <div>
                <p>当前用户：{{userInfo.username}}</p>
                <p>当前角色：{{userInfo.role_name}}</p>
                <p>
                    分配新角色： 
                    <el-select v-model="selectRoleId" placeholder="请选择">
<!--                        :label:下拉列表名名称-->
<!--                        :value和model是绑定的,当选中的是什么，v-model和value就是他的id -->
                    <el-option
                            v-for="item in rolesList"
                            :key="item.id"
                            :label="item.roleName"
                            :value="item.id">
                    </el-option>
                </el-select>
<!--                    {{selectRoleId}}-->
                </p>
            </div>
            <span slot="footer" class="dialog-footer">
    <el-button @click="setRoleDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            // 自定义邮箱规则
            let checkEmail = (rule, value, callback) => {
                const regEmail = /^\w+@\w+(\.\w+)+$/;
                if (regEmail.test(value)) {
                    // 合法邮箱
                    return callback()
                }
                callback(new Error('请输入合法邮箱'))
            };
            // 自定义手机号规则
            let checkMobile = (rule, value, callback) => {
                const regMobile = /^1[3456789]\d{9}$/;
                if (regMobile.test(value)) {
                    return callback()
                }
                // 返回一个错误提示
                callback(new Error('请输入合法的手机号码'))
            };
            return {
                // 获取用户列表查询参数对象
                queryInfo: {
                    query: '',
                    // 当前页数
                    pagenum: 1,
                    // 每页显示多少数据
                    pagesize: 5
                },
                userlist: [],
                totle: 0,
                // 添加用户对话框
                addDialogVisible: false,
                // 用户添加
                addUserForm: {
                    username: '',
                    password: '',
                    email: '',
                    mobile: ''
                },
                // 用户添加表单验证规则
                addUserFormRules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {
                            min: 2,
                            max: 10,
                            message: '用户名的长度在2～10个字',
                            trigger: 'blur'
                        }
                    ],
                    password: [
                        {required: true, message: '请输入用户密码', trigger: 'blur'},
                        {
                            min: 6,
                            max: 18,
                            message: '用户密码的长度在6～18个字',
                            trigger: 'blur'
                        }
                    ],
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                        {validator: checkEmail, trigger: 'blur'}
                    ],
                    mobile: [
                        {required: true, message: '请输入手机号码', trigger: 'blur'},
                        {validator: checkMobile, trigger: 'blur'}
                    ]
                },
                // 修改用户
                editDialogVisible: false,
                editUserForm: {},
                // 编辑用户表单验证
                editUserFormRules: {
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                        {validator: checkEmail, trigger: 'blur'}
                    ],
                    mobile: [
                        {required: true, message: '请输入手机号码', trigger: 'blur'},
                        {validator: checkMobile, trigger: 'blur'}
                    ]
                },
                // 分配角色对话框
                setRoleDialogVisible: false,
                // 当前需要被分配角色的用户
                userInfo: {},
                // 所有角色数据列表
                rolesList: [],
                // 已选中的角色Id值
                selectRoleId: ''
            }
        },
        created() {
            this.getUserList()
        },
        methods: {
            async getUserList() {
                const {data: res} = await this.$http.get('users', {
                    params: this.queryInfo
                })
                if (res.meta.status !== 200) {
                    return this.$message.error('获取用户列表失败！')
                }
                this.userlist = res.data.users
                this.totle = res.data.totle
            },
            handleSizeChange(newSize) {
                // console.log("当前条数"+newSize);
                this.queryInfo.pagesize = newSize;
                this.getUserList()
            },
            //当页码发生改变就触发这个函数-->
            //newPage改变后的页码-->
            handleCurrentChange(newPage) {
                this.queryInfo.pagenum = newPage;
                // console.log("当前页码"+newPage);
                this.getUserList()
            },

            // 监听 switch开关 状态改变
            async userStateChanged(userInfo) {
                // console.log(userInfo)
                const {data: res} = await this.$http.put(
                    `users/${userInfo.id}/state/${userInfo.mg_state}`
                )
                if (res.meta.status !== 200) {
                    userInfo.mg_state = !userInfo.mg_state
                    return this.$message.error('更新用户状态失败')
                }
                this.$message.success('更新用户状态成功！')
            },
            // 监听 添加用户对话框的关闭事件
            addDialogClosed() {
                this.$refs.addUserFormRef.resetFields()
            },
            // 添加用户
            addUser() {
                // 提交请求前，表单预验证
                this.$refs.addUserFormRef.validate(async valid => {
                    // console.log(valid)
                    // 表单预校验失败
                    if (!valid) return
                    const {data: res} = await this.$http.post('users', this.addUserForm)
                    if (res.meta.status !== 201) {
                        this.$message.error('添加用户失败！')
                    }
                    this.$message.success('添加用户成功！')
                    // 隐藏添加用户对话框
                    this.addDialogVisible = false
                    this.getUserList()
                })
            },
            // 编辑用户信息
            async showEditDialog(id) {
               
                this.editDialogVisible = true
            },
            // 监听修改用户对话框的关闭事件
            editDialogClosed() {
                this.$refs.editUserFormRef.resetFields()
            },
            // 修改用户信息
            editUser() {
                // 提交请求前，表单预验证
                this.$refs.editUserFormRef.validate(async valid => {
                    // console.log(valid)
                    // 表单预校验失败
                    if (!valid) return
                    const {data: res} = await this.$http.put(
                        'users/' + this.editUserForm.id,
                        {
                            email: this.editUserForm.email,
                            mobile: this.editUserForm.mobile
                        }
                    );
                    if (res.meta.status !== 200) {
                        this.$message.error('更新用户信息失败！')
                    }
                    // 隐藏添加用户对话框
                    this.editDialogVisible = false;
                    this.$message.success('更新用户信息成功！');
                    this.getUserList()
                })
            },
            // 删除用户
            async removeUserById(id) {
                const confirmResult = await this.$confirm(
                    '此操作将永久删除该用户, 是否继续?',
                    '提示',
                    {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }
                ).catch(err => err)
                // 点击确定 返回值为：confirm
                // 点击取消 返回值为： cancel
                if (confirmResult !== 'confirm') {
                    return this.$message.info('已取消删除')
                }
                const {data: res} = await this.$http.delete('users/' + id)
                if (res.meta.status !== 200) return this.$message.error('删除用户失败！')
                this.$message.success('删除用户成功！')
                this.getUserList()
            },
            // 展示分配角色的对话框
            async showSetRole(role) {
                this.userInfo = role;
                 // console.log(role);
                // 展示对话框之前，获取所有角色列表
                const {data:res}=await this.$http.get('roles');
                if (res.meta.status!==200) return this.$message.error('获取角色列表失败');
               this.rolesList=res.data;
                // console.log(res);
               // console.log(this.rolesList);
                this.setRoleDialogVisible = true
            },
            // 分配角色
            async saveRoleInfo() {
                if (!this.selectRoleId) return this.$message.error('请选择角色');
                const {data:res} = await this.$http.put(`users/${this.userInfo.id}/role`,{rid:this.selectRoleId});
                if (res.meta.status!==200)return this.$message.error('切换角色失败');
                this.$message.success('切换角色成功');
                this.getUserList();
                this.setRoleDialogVisible=false;
            },
            // 分配角色对话框关闭事件
            setRoleDialogClosed() {
                //清楚当前和之前已经选中id
                this.selectRoleId = ''
                this.userInfo = {}
            }
        }
    }
</script>

<style lang="less" scoped>
</style>