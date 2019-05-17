<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <h2>{{obj.a}}</h2>
    <input type="text" name="code" placeholder="输入遍历的次数，小于5个" style="width: 230px"><br /><br />
    <el-form :model="formName" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="活动名称" prop="name">
        <el-input :rules="rules" v-model="formName.name" ref="rulePhone" style="width:320px"></el-input>
      </el-form-item>
    </el-form>

    <el-button type="primary" @click="submitRule('ruleForm')" round>test ElemeRules</el-button>
    <button @click="sendGet()">发送Get请求</button>
    <button @click="sendPost()">发送Post请求</button>
    <button @click="pushToNext()">跳转新标签页</button><br />
    <ol>
      <li v-for="item in items">
        {{item}}<br />
      </li>
    </ol>
  </div>
</template>

<script>
import business from "@/business/login.js"
import router from '@/router'
import config from '@/global/openRequestConfig.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

export default {
  name: 'HelloWorld',
  data () {
    return business.vdata;
  },
  methods:{
    submitRule(name){
      this.$refs[name].validate((valid) => {
        alert(valid);
      });
    },
    sendGet(){
      business.getSms({
        "phone" : "18513588911",
        "type" : 3
      },this).catch((err)=>{
        // console.log(err);
        this.formName.name = err.status;
        alert(err.message);
      }).finally(()=>{
        alert("请求结束");
      });
    },
    sendPost(){
      business.userNameLogin({
        'username': "sxb187903",
        'password': "1234561"
      },this.data);
    },
    pushToNext(){
      business.userNameLogin1({
        'username': "sxb187903",
        'password': "123456"
      },this.data);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
