<template>
    <div class="fillcontain">
        <head-top></head-top>
        <el-row type="flex" class="top_bar" justify="end">
            <el-col :span="24" >
                <el-button type="danger" icon="el-icon-delete" @click="news_del" style="float:right;margin-right:20px;">删除</el-button>
                <el-button type="primary" icon="el-icon-plus" @click="news_add()" style="float:right;margin-right:20px;">添加</el-button>
            </el-col>
        </el-row>
        <div class="table_container">
            <el-table :data="tableData" highlight-current-row border style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="45">
                </el-table-column>
                <el-table-column property="title" label="标题" width="180">
                </el-table-column>
                <el-table-column property="type" :formatter="formatter" label="分类">
                </el-table-column>
                <el-table-column property="sort" sortable label="排序">
                </el-table-column>
                <el-table-column label="启用状态">
                    <template scope="scope">
                        <el-switch v-model="scope.row.state"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column property="update_user" label="更新者">
                </el-table-column>
                <el-table-column property="update_time" label="更新时间" width="180">
                </el-table-column>
                <el-table-column label="操作" width="80">
                    <template scope="scope">
                        <el-button size="small" @click="news_edit(scope.$index, scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination 
                    @size-change="handleSizeChange" 
                    @current-change="handleCurrentChange" 
                    :page-sizes="[10,20,50]"
                    :current-page="currentPage" 
                    :page-size="limit" 
                    layout="total, sizes, prev, pager, next, jumper" 
                    :total="count">
                </el-pagination>
            </div>
        </div>
        <el-dialog title="编辑资讯" :visible.sync="dialogFormVisible">
            <el-form :model="form" ref="form" :rules="rules">
                <el-form-item label="标题："  prop="title" label-width="120px" >
                    <el-input v-model="form.title" placeholder="请输入标题"></el-input>
                </el-form-item>
                <el-form-item label="摘要：" label-width="120px">
                    <el-input v-model="form.sub_title" placeholder="请输入摘要"></el-input>
                </el-form-item>
                 <el-form-item label="文章类型：" label-width="120px">
                    <el-select v-model="type" placeholder="请选择文章类型">
                        <el-option label="置顶" value="0"></el-option>
                        <el-option label="精华" value="1"></el-option>
                        <el-option label="分享" value="2"></el-option>
                        <el-option label="打假" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="排序：" label-width="120px">
                    <el-input type="number" v-model="form.sort" placeholder="排序值"></el-input>
                </el-form-item>
                <el-form-item label="文章内容：" label-width="120px">
                    <quill-editor v-model="form.description"
                    ref="myQuillEditor"
                    class="editer"
                    :options="editorOption"
                    @ready="onEditorReady($event)">
                </quill-editor>
                </el-form-item>
            </el-form>
            <div slot="footer" >
                <el-button @click="resetForm('form')">取 消</el-button>
                <el-button type="primary" @click="submitForm('form')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import headTop from '../components/headTop'
import {mapState} from 'vuex'
import newsForm from '../components/newsForm'
import { quillEditor } from 'vue-quill-editor'
import dtime from 'time-formater'
import { getNewsCount,getNewsList,addNews,editNews,delNews } from '@/api/getData'

export default {
    data() {
        return {
            editor:0,
            form: {},
            type:'',
            editorOption: {},
            rules:{
                title: [
                    { required: true, message: '请输入标题', trigger: 'blur' }
                  ],
            },
            tableData: [],
            currentRow: null,
            offset: 0,
            limit: 10,
            count: 0,
            currentPage: 1,
            dialogFormVisible: false,
            multipleSelection:[],
            delIds:[],
        }
    },
    created() {
        this.initData();
    },
    computed: {
        ...mapState(['adminInfo']),
    },
    components: {
        headTop,
        quillEditor
    },
    methods: {
        async initData() {
            try {
                const countData = await getNewsCount({ });
                if (countData.code == 0) {
                    this.count = countData.data;
                } else {
                    throw new Error('获取数据失败');
                }
                this.getNews();
            } catch (err) {
                console.log('获取数据失败', err);
            }
        },
        async getNews(){
            try {
                const News = await getNewsList({offset: this.offset, limit: this.limit,});
                if(News.code ==0){
                    News.data.forEach((n,i)=>{
                        n.state = (n.delflg==0?true:false)
                        n.update_time = dtime(n.update_time).format('YYYY-MM-DD HH:mm:ss')
                    })
                    this.tableData = News.data;
                }else {
                    throw new Error('获取数据失败');
                }
            } catch (err) {
                console.log('获取数据失败', err);
            }
        },
        news_add() {
            this.editor = 0;
            this.form={};
            this.type='';
            this.dialogFormVisible = true;
        },
        news_edit(index, row) {
            this.editor = 1;
            this.form = row;
            this.type = row.type;
            this.dialogFormVisible = true;
        },
        handleSelectionChange(val){
            this.multipleSelection = val;
        },
        news_del(){
            this.delIds=[];
            this.multipleSelection.forEach((n,i)=>{
                this.delIds.push(n._id);
            })
            if(this.delIds.length >0){
                this.NewsDel(this.delIds.join(','));
            }
        },
        submitForm(formName) {
            this.form.type=this.type;
            this.$refs[formName].validate((valid) => {
                if(!valid){
                    return false;
                }
                if(!!this.editor){
                    this.NewsEdit(this.form)
                }else{
                    this.NewsAdd(this.form)
                }
            })
        },
        resetForm(formName){
            this.$refs[formName].resetFields();
            this.dialogFormVisible = false;
        },
        async NewsAdd(data){
            try {
                data.admin_id = this.adminInfo.id;
                const NewsAdd = await addNews(data);
                if(NewsAdd.code ==0){
                    this.$message({
                    type: 'success',
                    message: '新增成功'
                });
                this.dialogFormVisible = false;
                this.initData();
                }else {
                    throw new Error('新闻新增失败');
                }
            } catch (err) {
                console.log('新闻新增失败', err);
            }
        },
        async NewsEdit(data){
            try {
                data.admin_id = this.adminInfo.id;
                const NewsEdit = await editNews(data);
                if(NewsEdit.code ==0){
                    this.$message({
                    type: 'success',
                    message: '修改成功'
                });
                this.dialogFormVisible = false;
                this.initData();
                }else {
                    throw new Error('新闻修改失败');
                }
            } catch (err) {
                console.log('新闻修改失败', err);
            }
        },
        async NewsDel(Ids){
            try {
                const NewsDel = await delNews({ids:Ids});
                if(NewsDel.code ==0){
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    });
                    this.initData();
                }
            } catch (err) {
                console.log('新闻修改失败', err);
            }
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.limit = val;
            this.initData();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.offset = (val - 1) * this.limit;
            console.log(this.currentPage, this.offset)
            this.getNews()
        },
        formatter(row, column) {
            let type;
            switch(row.type){
                case '0':
                    type="置顶";
                    break;
                case '1':
                    type="精华";
                    break;
                case '2':
                    type="分享";
                    break;
                case '3':
                    type="打假";
                    break;
                default:
                    type="其他";
                    break;

            }
            return type;
        },
        onEditorReady(editor) {
            console.log('editor ready!', editor)
        },
    }
}

</script>
<style lang="less">
@import '../style/mixin';
.top_bar {
    margin-top: 10px;
}

.table_container {
    padding: 20px;
}

</style>
