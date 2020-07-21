<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!--        卡片区域-->
        <el-card>
            <el-row>
                <el-col>
<!--                    添加角色按钮-->
                    <el-button type="primary" @click="AddRoleDialogVisible=true">添加角色</el-button>
                </el-col>
            </el-row>
            <!--            角色列表-->
            <el-table :data="roleslist" border stripe>
                <!--    展开列-->
                <el-table-column type="expand">
                    <!--v-slot:scope-->
                    <template v-slot="scope">
                        <!--    <pre> {{scope.row}}</pre>-->
                        <!--   绑定样式，三目运算-->
                        <el-row :class="['bdbottom',i1===0?'bdtop':'','vcenter']"
                                v-for="(item1,i1) in scope.row.children"
                                :key="item1.id">
                            <!--  一级权限-->
                            <!-- :span:宽度-->
                            <el-col :span="5">
                                <el-tag  closable @close="removeRightById(scope.row,item1.id)">{{item1.authName}}</el-tag>
                                <i class="el-icon-caret-right"></i>
                            </el-col>
                            <el-col :span="19">
                                <el-row :class="['bdbottom',i2===0?'':'bdtop','vcenter']"
                                        v-for="(item2,i2) in item1.children"
                                        :key="item2.id">
                                    <el-col :span="6">
                                        <el-tag type="success"  closable @close="removeRightById(scope.row,item2.id)">{{item2.authName}}</el-tag>
                                        <i class="el-icon-caret-right"></i>
                                    </el-col>
                                    <el-col :span="18">
                                        <!-- closable:删除样式-->
                                        <!--  @close:关闭tag也就是点删除样式时候发生-->
                                        <el-tag type="warning" v-for="item3 in item2.children" :key="item3.id" closable @close="removeRightById(scope.row,item3.id)">
                                            {{item3.authName}}
                                        </el-tag>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column type="index"></el-table-column>
                <el-table-column prop="roleName" label="角色名称"></el-table-column>
                <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
                <el-table-column label="操作" width="300px">
                    <template v-slot="scope">
                        <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
                        <el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
                        <el-button type="warning" size="mini" icon="el-icon-setting" @click="showSetRightDialog(scope.row)">分配权限</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        
<!--         添加用户的对话框 -->
<!--       @close:关闭对话框前的操作-->
        <el-dialog title="添加角色" :visible.sync="AddRoleDialogVisible" width="40%" @close="addRoleDialogClosed">
<!--            :rules表单规则-->
            <el-form
                    :model="addRoleForm"
                    ref="addRoleFormRef"
                    :rules="addRoleFormRules"
                    label-width="100px"
            >
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="addRoleForm.roleName"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="roleDesc">
                    <el-input v-model="addRoleForm.roleDesc"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button @click="AddRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRoles">确 定</el-button>
      </span>
        </el-dialog>
        
<!--        权限分配对话框-->
        <el-dialog title="权限分配" :visible.sync="setRightDialogVisible" width="40%"  @close="setRightDialogClosed">
<!--            树形控件-->
<!--            props:绑定控件对象，treeProps.label等价于于rightsList.authName  data绑定数据props接收数据->
<!--            show-checkbox：前面的复选框-->
<!--            default-expand-all是否打开所有子节点
                node-key：当选中复选框就会选中id-->
<!--            :default-checked-keys:将默认选中复选框的id放在数组
                ref引用当前值-->
            <el-tree   :data="rightsList" :props="treeProps" show-checkbox 
                       :default-expand-all="true"  :default-checked-keys="defKeys"
                       ref="treeRef" node-key="id" ></el-tree>
            <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights" >确 定</el-button>
      </span>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "roles",
        data() {
            return {
                roleslist: [],
                // dialogVisible: falseRoles,
                // 添加角色表单
                addRoleForm: {},
                AddRoleDialogVisible:false,
                addRoleFormRules: {
                    roleName: [
                        { required: true, message: '请输入角色名称', trigger: 'blur' }
                    ],
                    roleDesc: [
                        { required: true, message: '请输入角色描述', trigger: 'blur' }
                    ]
                },
                //分配权限对话框的显示与否
                setRightDialogVisible:false,
                //权限列表
                rightsList:[],
                //树形控件的属性绑定对象
                treeProps:{
                    //当前控件名称控件
                    label:'authName',
                    //子控件
                    children:'children',
                },
                //defKeys：每个id值, 可以理解为每选中的复选框他的id就会保存到node-key
                defKeys:[],
                roleId:'',
            }
        },
        created() {
            this.getRolesList()
        },
        methods: {
            async getRolesList() {
                const {data: res} = await this.$http.get('roles');
                if (res.meta.status !== 200) {
                    return this.$message.error('获取角色列表失败！')
                }
                this.roleslist = res.data
            },
          
            //根据id删除对应的权限
            async removeRightById(role, rightId) {
                //弹出对话框
                const confirmResult = await this.$confirm(
                    '此操作将永久删除该文件, 是否继续?',
                    '提示',
                    {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }
                ).catch(err => err);
                // 点击确定 返回值为：confirm
                // 点击取消 返回值为： cancel
                if (confirmResult !== 'confirm') {
                    return this.$message.info('取消了删除！')
                }

                const { data: res } = await this.$http.delete(
                    `roles/${role.id}/rights/${rightId}`
                );

                if (res.meta.status !== 200) {
                    return this.$message.error('删除权限失败！')
                }
                //不推荐使用this. getRolesList() 会引起整个页面刷新
                // this.getRolesList()
                role.children = res.data
            },
            // 添加角色对话框的关闭
            addRoleDialogClosed () {
                this.$refs.addRoleFormRef.resetFields()
            },
            //添加角色
            addRoles () {
                this.$refs.addRoleFormRef.validate(async valid => {
                    if (!valid) return;
                    const { data: res } = await this.$http.post('roles', this.addRoleForm);
                    if (res.meta.status !== 201) {
                        this.$message.error('添加角色失败！')
                    }
                    this.$message.success('添加角色成功！');
                    this.AddRoleDialogVisible = false;
                    this.getRolesList()
                })
            },
            //获取权限列表
            async showSetRightDialog(role){
                //当前id值
                this.roleId=role.id;
                const {data:res} = await  this.$http.get('rights/tree');
                if (res.meta.status !== 200) return this.$message.error('获取权限列表失败');
                this.rightsList=res.data;
                //console.log(this.rightsList);当前权限数组
                //获取三级节点
                this.getLeafKeys(role,this.defKeys);
                this.setRightDialogVisible = true;
            },
            //思路：递归遍历拿到三级节点
            //通过递归形式，获取角色下的所有三级权限id，并且保存到数组defKeys中
            getLeafKeys(node,arr){
                //如果当前节点不存在children数组，就说明不是三级权限
                // node当前节点数组名
                if (!node.children){
                    return arr.push(node.id)
                }
                // console.log(node)
                
                // 递归函数
                //循环当前节点的所有子节点
                node.children.forEach(item=>
                this.getLeafKeys(item, arr)
                )
            },
            //每次关闭前清空数组防止id值一直累存，保证每次打开的都是第一个
            setRightDialogClosed () {
                this.defKeys = []
            },
            // 添加三级权限
            async allotRights() {
                const keys = [
                    // getCheckedKeys():element方法，获取复选框id
                    //this.$refs.treeRef.getHalfCheckedKeys()：获取半选框id
                    ...this.$refs.treeRef.getCheckedKeys(),
                    ...this.$refs.treeRef.getHalfCheckedKeys()];
                 console.log(keys);
                //join数组每项用逗号隔开
                const idStr = keys.join(',');
                const {data: res} = await this.$http.post(`roles/${this.roleId}/rights`, {rids:idStr})
                if(res.meta.status!==200){
                    return this.$message.error('分配权限列表失败');
                }
                this.$message.success('分配权限列表成功');
                this.getRolesList();
                this.setRightDialogVisible=false;
            }
        }
    }
</script>

<style scoped lang="less">
    .el-tag {
        margin: 7px;
    }

    .bdtop {
        border-top: 1px solid #eee;
    }

    .bdbottom {
        border-bottom: 1px solid #eee;
    }

    .vcenter {
        display: flex;
        align-items: center;
    }
</style>


<!--<template>-->
<!--    <div>-->
<!--        &lt;!&ndash; 面包屑导航区 &ndash;&gt;-->
<!--        <el-breadcrumb separator-class="el-icon-arrow-right">-->
<!--            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>-->
<!--            <el-breadcrumb-item>权限管理</el-breadcrumb-item>-->
<!--            <el-breadcrumb-item>角色列表</el-breadcrumb-item>-->
<!--        </el-breadcrumb>-->
<!--        &lt;!&ndash; 卡片视图 &ndash;&gt;-->
<!--        <el-card>-->
<!--            &lt;!&ndash; 添加角色按钮 &ndash;&gt;-->
<!--            <el-row>-->
<!--                <el-col>-->
<!--                    <el-button type="primary" @click="AddRoleDialogVisible=true">添加角色</el-button>-->
<!--                </el-col>-->
<!--            </el-row>-->
<!--            &lt;!&ndash; 角色列表 &ndash;&gt;-->
<!--            <el-table :data="rolesList" border stripe>-->
<!--                &lt;!&ndash; 展开列 &ndash;&gt;-->
<!--                <el-table-column type="expand">-->
<!--                    <template v-slot="scope">-->
<!--                        <el-row-->
<!--                                :class="['bdbottom', i1 === 0 ? 'bdtop' : '', 'vcenter']"-->
<!--                                v-for="(item1, i1) in scope.row.children"-->
<!--                                :key="item1.id"-->
<!--                        >-->
<!--                            &lt;!&ndash; 一级权限 &ndash;&gt;-->
<!--                            <el-col :span="5">-->
<!--                                <el-tag closable @close="removeRightById(scope.row, item1.id)">{{ item1.authName}}</el-tag>-->
<!--                                <i class="el-icon-caret-right"></i>-->
<!--                            </el-col>-->
<!--                            &lt;!&ndash; 二级和三级 &ndash;&gt;-->
<!--                            <el-col :span="19">-->
<!--                                &lt;!&ndash; 通过for循环 渲染二级权限 &ndash;&gt;-->
<!--                                <el-row-->
<!--                                        :class="[i2 === 0 ? '' : 'bdtop', 'vcenter']"-->
<!--                                        v-for="(item2, i2) in item1.children"-->
<!--                                        :key="item2.id"-->
<!--                                >-->
<!--                                    <el-col :span="6 ">-->
<!--                                        <el-tag-->
<!--                                                type="success"-->
<!--                                                closable-->
<!--                                                @close="removeRightById(scope.row, item2.id)"-->
<!--                                        >{{ item2.authName }}</el-tag>-->
<!--                                        <i class="el-icon-caret-right"></i>-->
<!--                                    </el-col>-->
<!--                                    <el-col :span="18">-->
<!--                                        <el-tag-->
<!--                                                type="warning"-->
<!--                                                v-for="(item3) in item2.children"-->
<!--                                                :key="item3.id"-->
<!--                                                closable-->
<!--                                                @close="removeRightById(scope.row, item3.id)"-->
<!--                                        >{{ item3.authName}}</el-tag>-->
<!--                                    </el-col>-->
<!--                                </el-row>-->
<!--                            </el-col>-->
<!--                        </el-row>-->
<!--                    </template>-->
<!--                </el-table-column>-->
<!--                &lt;!&ndash; 索引列 &ndash;&gt;-->
<!--                <el-table-column type="index" label="#"></el-table-column>-->
<!--                <el-table-column label="角色名称" prop="roleName"></el-table-column>-->
<!--                <el-table-column label="角色描述" prop="roleDesc"></el-table-column>-->
<!--                <el-table-column label="操作" width="300px">-->
<!--                    <template slot-scope="scope">-->
<!--                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)">编辑</el-button>-->
<!--                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeRoleById(scope.row.id)">删除</el-button>-->
<!--                        <el-button-->
<!--                                type="warning"-->
<!--                                icon="el-icon-setting"-->
<!--                                size="mini"-->
<!--                                @click="showSetRightDialog(scope.row)"-->
<!--                        >分配权限</el-button>-->
<!--                    </template>-->
<!--                </el-table-column>-->
<!--            </el-table>-->
<!--        </el-card>-->
<!--        &lt;!&ndash; 分配权限 &ndash;&gt;-->
<!--        <el-dialog-->
<!--                title="分配权限"-->
<!--                :visible.sync="setRightDialogVisible"-->
<!--                width="50%"-->
<!--                @close="setRightDialogClosed"-->
<!--        >-->
<!--            <el-tree-->
<!--                    :data="rightsList"-->
<!--                    :props="treeProps"-->
<!--                    ref="treeRef"-->
<!--                    show-checkbox-->
<!--                    node-key="id"-->
<!--                    default-expand-all-->
<!--                    :default-checked-keys="defKeys"-->
<!--            ></el-tree>-->
<!--            <span slot="footer" class="dialog-footer">-->
<!--        <el-button @click="setRightDialogVisible = false">取 消</el-button>-->
<!--        <el-button type="primary" @click="allotRights">确 定</el-button>-->
<!--      </span>-->
<!--        </el-dialog>-->
<!--        &lt;!&ndash; 添加角色对话框 &ndash;&gt;-->
<!--        <el-dialog title="添加角色" :visible.sync="AddRoleDialogVisible" width="40%" @close="addRoleDialogClosed">-->
<!--            <el-form-->
<!--                    :model="addRoleForm"-->
<!--                    ref="addRoleFormRef"-->
<!--                    :rules="addRoleFormRules"-->
<!--                    label-width="100px"-->
<!--            >-->
<!--                <el-form-item label="角色名称" prop="roleName">-->
<!--                    <el-input v-model="addRoleForm.roleName"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="角色描述" prop="roleDesc">-->
<!--                    <el-input v-model="addRoleForm.roleDesc"></el-input>-->
<!--                </el-form-item>-->
<!--            </el-form>-->
<!--            <span slot="footer" class="dialog-footer">-->
<!--        <el-button @click="AddRoleDialogVisible = false">取 消</el-button>-->
<!--        <el-button type="primary" @click="addRoles">确 定</el-button>-->
<!--      </span>-->
<!--        </el-dialog>-->
<!--        &lt;!&ndash; 编辑角色对话框 &ndash;&gt;-->
<!--        <el-dialog title="编辑角色" :visible.sync="editRoleDialogVisible" width="40%" @close="addRoleDialogClosed">-->
<!--            <el-form-->
<!--                    :model="editRoleForm"-->
<!--                    ref="editRoleFormRef"-->
<!--                    :rules="editRoleFormRules"-->
<!--                    label-width="100px"-->
<!--            >-->
<!--                <el-form-item label="角色名称" prop="roleName">-->
<!--                    <el-input v-model="editRoleForm.roleName"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="角色描述" prop="roleDesc">-->
<!--                    <el-input v-model="editRoleForm.roleDesc"></el-input>-->
<!--                </el-form-item>-->
<!--            </el-form>-->
<!--            <span slot="footer" class="dialog-footer">-->
<!--        <el-button @click="editRoleDialogVisible = false">取 消</el-button>-->
<!--        <el-button type="primary" @click="editRoles">确 定</el-button>-->
<!--      </span>-->
<!--        </el-dialog>-->
<!--    </div>-->
<!--</template>-->

<!--<script>-->
<!--    export default {-->
<!--        data () {-->
<!--            return {-->
<!--                // 所有角色列表-->
<!--                rolesList: [],-->
<!--                // 分配权限框-->
<!--                setRightDialogVisible: false,-->
<!--                // 权限列表-->
<!--                rightsList: [],-->
<!--                //  树形控件的属性绑定对象-->
<!--                treeProps: {-->
<!--                    label: 'authName',-->
<!--                    children: 'children'-->
<!--                },-->
<!--                //   默认选中节点ID值-->
<!--                defKeys: [],-->
<!--                //   添加用户对话框-->
<!--                AddRoleDialogVisible: false,-->
<!--                // 添加角色表单-->
<!--                addRoleForm: {},-->
<!--                //   添加角色表单验证-->
<!--                addRoleFormRules: {-->
<!--                    roleName: [-->
<!--                        { required: true, message: '请输入角色名称', trigger: 'blur' }-->
<!--                    ],-->
<!--                    roleDesc: [-->
<!--                        { required: true, message: '请输入角色描述', trigger: 'blur' }-->
<!--                    ]-->
<!--                },-->
<!--                //   编辑角色信息-->
<!--                editRoleForm: {},-->
<!--                editRoleDialogVisible: false,-->
<!--                editRoleFormRules: {-->
<!--                    roleName: [-->
<!--                        { required: true, message: '请输入角色名称', trigger: 'blur' }-->
<!--                    ],-->
<!--                    roleDesc: [-->
<!--                        { required: true, message: '请输入角色描述', trigger: 'blur' }-->
<!--                    ]-->
<!--                },-->
<!--                //   当前即将分配权限的Id-->
<!--                roleId: 0-->
<!--            }-->
<!--        },-->
<!--        created () {-->
<!--            this.getRolesList()-->
<!--        },-->
<!--        methods: {-->
<!--            async getRolesList () {-->
<!--                const { data: res } = await this.$http.get('roles')-->
<!--                if (res.meta.status !== 200) {-->
<!--                    return this.$message.error('获取角色列表失败！')-->
<!--                }-->
<!--                this.rolesList = res.data-->
<!--            },-->
<!--            // 根据ID删除对应的权限-->
<!--            async removeRightById (role, rightId) {-->
<!--                // 弹框提示 删除-->
<!--                const confirmResult = await this.$confirm(-->
<!--                    '此操作将永久删除该权限, 是否继续?',-->
<!--                    '提示',-->
<!--                    {-->
<!--                        confirmButtonText: '确定',-->
<!--                        cancelButtonText: '取消',-->
<!--                        type: 'warning'-->
<!--                    }-->
<!--                ).catch(err => err)-->
<!--                // 点击确定 返回值为：confirm-->
<!--                // 点击取消 返回值为： cancel-->
<!--                if (confirmResult !== 'confirm') {-->
<!--                    this.$message.info('已取消权限删除')-->
<!--                }-->
<!--                const { data: res } = await this.$http.delete(-->
<!--                    `roles/${role.id}/rights/${rightId}`-->
<!--                )-->
<!--                if (res.meta.status !== 200) {-->
<!--                    return this.$message.error('删除权限失败！')-->
<!--                }-->
<!--                this.rolesList = res.data-->
<!--                //   不建议使用-->
<!--                this.getRolesList()-->
<!--            },-->
<!--            // 分配权限-->
<!--            async showSetRightDialog (role) {-->
<!--                this.roleId = role.id-->
<!--                // 获取角色的所有权限-->
<!--                const { data: res } = await this.$http.get('rights/tree')-->
<!--                if (res.meta.status !== 200) {-->
<!--                    return this.$message.error('获取权限数据失败！')-->
<!--                }-->
<!--                //   获取权限树-->
<!--                this.rightsList = res.data-->
<!--                //   console.log(res)-->
<!--                //   递归获取三级节点的id-->
<!--                this.getLeafkeys(role, this.defKeys)-->

<!--                this.setRightDialogVisible = true-->
<!--            },-->
<!--            // 通过递归 获取角色下三级权限的 id, 并保存到defKeys数组-->
<!--            getLeafkeys (node, arr) {-->
<!--                // 没有children属性，则是三级节点-->
<!--                if (!node.children) {-->
<!--                    return arr.push(node.id)-->
<!--                }-->
<!--                node.children.forEach(item => this.getLeafkeys(item, arr))-->
<!--            },-->
<!--            // 权限对话框关闭事件-->
<!--            setRightDialogClosed () {-->
<!--                this.rightsList = []-->
<!--            },-->
<!--            // 添加角色对话框的关闭-->
<!--            addRoleDialogClosed () {-->
<!--                this.$refs.addRoleFormRef.resetFields()-->
<!--            },-->
<!--            // 添加角色-->
<!--            addRoles () {-->
<!--                this.$refs.addRoleFormRef.validate(async valid => {-->
<!--                    if (!valid) return-->
<!--                    const { data: res } = await this.$http.post('roles', this.addRoleForm)-->
<!--                    if (res.meta.status !== 201) {-->
<!--                        this.$message.error('添加角色失败！')-->
<!--                    }-->
<!--                    this.$message.success('添加角色成功！')-->
<!--                    this.AddRoleDialogVisible = false-->
<!--                    this.getRolesList()-->
<!--                })-->
<!--            },-->
<!--            // 删除角色-->
<!--            async removeRoleById (id) {-->
<!--                const confirmResult = await this.$confirm(-->
<!--                    '此操作将永久删除该角色, 是否继续?',-->
<!--                    '提示',-->
<!--                    {-->
<!--                        confirmButtonText: '确定',-->
<!--                        cancelButtonText: '取消',-->
<!--                        type: 'warning'-->
<!--                    }-->
<!--                ).catch(err => err)-->
<!--                if (confirmResult !== 'confirm') {-->
<!--                    return this.$message.info('已取消删除')-->
<!--                }-->
<!--                const { data: res } = await this.$http.delete('roles/' + id)-->
<!--                if (res.meta.status !== 200) return this.$message.error('删除角色失败！')-->
<!--                this.$message.success('删除用户成功！')-->
<!--                this.getRolesList()-->
<!--            },-->
<!--            // 编辑角色-->
<!--            async showEditDialog (id) {-->
<!--                const { data: res } = await this.$http.get('roles/' + id)-->
<!--                if (res.meta.status !== 200) return this.$message.error('查询角色信息失败！')-->
<!--                this.editRoleForm = res.data-->
<!--                this.editRoleDialogVisible = true-->
<!--            },-->
<!--            editRoles () {-->
<!--                this.$refs.editRoleFormRef.validate(async valid => {-->
<!--                    // console.log(valid)-->
<!--                    // 表单预校验失败-->
<!--                    if (!valid) return-->
<!--                    const { data: res } = await this.$http.put(-->
<!--                        'roles/' + this.editRoleForm.roleId,-->
<!--                        {-->
<!--                            roleName: this.editRoleForm.roleName,-->
<!--                            roleDesc: this.editRoleForm.roleDesc-->
<!--                        }-->
<!--                    )-->
<!--                    if (res.meta.status !== 200) {-->
<!--                        this.$message.error('更新角色信息失败！')-->
<!--                    }-->
<!--                    // 隐藏编辑角色对话框-->
<!--                    this.editRoleDialogVisible = false-->
<!--                    this.$message.success('更新角色信息成功！')-->
<!--                    this.getRolesList()-->
<!--                })-->
<!--            },-->
<!--            // 分配权限-->
<!--            async allotRights (roleId) {-->
<!--                // 获得当前选中和半选中的Id-->
<!--                const keys = [-->
<!--                    ...this.$refs.treeRef.getCheckedKeys(),-->
<!--                    ...this.$refs.treeRef.getHalfCheckedKeys()-->
<!--                ]-->
<!--                // join() 方法用于把数组中的所有元素放入一个字符串-->
<!--                const idStr = keys.join(',')-->
<!--                const { data: res } = await this.$http.post(`roles/${this.roleId}/rights`, { rids: idStr })-->
<!--                if (res.meta.status !== 200) { return this.$message.error('分配权限失败！') }-->
<!--                this.$message.success('分配权限成功!')-->
<!--                this.getRolesList()-->
<!--                this.setRightDialogVisible = false-->
<!--            }-->
<!--        }-->
<!--    }-->
<!--</script>-->

<!--<style lang="less" scoped>-->
<!--    .el-tag {-->
<!--        margin: 7px;-->
<!--    }-->
<!--    .bdtop {-->
<!--        border-top: 1px solid #eee;-->
<!--    }-->
<!--    .bdbottom {-->
<!--        border-bottom: 1px solid #eee;-->
<!--    }-->
<!--    .vcenter {-->
<!--        display: flex;-->
<!--        align-items: center;-->
<!--    }-->
<!--</style>-->