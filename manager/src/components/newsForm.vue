<template>
    <div >
        <el-form >
            <el-form-item label="标题："  required label-width="120px" >
                <el-input v-model="form.title" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="摘要：" label-width="120px">
                <el-input v-model="form.sub_title" placeholder="请输入摘要"></el-input>
            </el-form-item>
             <el-form-item label="文章类型：" required label-width="120px">
                <el-select v-model="form.type" placeholder="请选择文章类型">
                    <el-option label="新闻资讯" value="1"></el-option>
                    <el-option label="系统公告" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="排序：" label-width="120px">
                <el-input v-model="form.sort" placeholder="排序值"></el-input>
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
        <div slot="footer" class="el-dialog__footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="news_save">确 定</el-button>
        </div>
    </div>
</template>
<script>
import { quillEditor } from 'vue-quill-editor'

export default {
    name: "newsForm",
    data() {
        return {
            form:{},
            editorOption: {}
        }
    },
    props: ["formData"],
    components: {
        quillEditor,
    },
    watch: {
        formData:(data)=> {
            if(!data.title){
                this.form={};
            }else{
                this.$nextTick(() => {
                    this.form = {
                        title:data.title,
                    }
                })
            }
        }
    },
    methods:{
        news_save(){
            this.$emit('saveListen',this.form);
        },
        onEditorReady(editor) {
            console.log('editor ready!', editor)
        },
    }
}

</script>
