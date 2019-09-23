<template>
  <div>
    <v-actionbar>
      <a-button type="dashed" @click="getAuth">获取鉴权</a-button>
      <a-button type="dashed" @click="visible=true">历史接口</a-button>
    </v-actionbar>
    <v-card style="margin-top:10px">

      <div class="example">
        <div class="example-box">
          <div class="block">
            <a-divider orientation="left">鉴权信息</a-divider>
            <div style="font-size:12px" v-if="token">
              {{token}}
              {{storeid}}
            </div>
             <a-alert v-else message="还没有鉴权信息，请先获取鉴权" banner />
            <a-divider orientation="left">参数JSON格式</a-divider>
            <a-textarea v-model="currData" placeholder="请输入参数JSON格式" autosize />
            <a-divider orientation="left">方法及地址</a-divider>
            <a-input-group compact>
              <a-select v-model="currApi.method" style="width:90px">
                <a-select-option value="get">get</a-select-option>
                <a-select-option value="post">post</a-select-option>
                <a-select-option value="put">put</a-select-option>
                <a-select-option value="delete">delete</a-select-option>
              </a-select>
              <a-input style="width: 50%" placeholder="输入接口地址查询结果" v-model="currApi.url" />
              <a-button type="primary" style="width:100px" @click="onSearch" :loading="loading">查询</a-button>
            </a-input-group>
            <a-divider orientation="left">响应结果</a-divider>
            <vue-json-pretty
              v-if="renderOK"
              :data="json"
              path="res"
              :deep="3"
              :show-double-quotes="false"
              :highlight-mouseover-node="true"
              :highlight-selected-node="true"
              :show-length="true"
              :show-line="true"
              :select-on-click-node="true"
              v-model="value"
              :path-selectable="((path, data) => typeof data !== 'number')"
              :selectable-type="'single'"
              :show-select-controller="false"
            ></vue-json-pretty>
            <div v-else-if="error" style="font-size:14px;color:red">{{error}}</div>
            <div v-else style="font-size:14px;color:#999">暂无数据，点击查询查看结果</div>
          </div>
        </div>
      </div>
    </v-card>

    <a-drawer :visible="visible" :width="370" @close="visible=false" :show-btns="false" mode="code">
      <a-radio-group v-model="currApi" class="apilist">
        <a-radio :style="{display:'block'}" v-for="(item,i) in apiList" :key="i" :value="item">
          <div style="display:inline-block">
            <h1>
              <a-tag color="#2db7f5">{{item.key}}</a-tag>
              {{item.remark}}
            </h1>
            <p>
              <a-tag color="cyan" v-if="item.method=='get'">get</a-tag>
              <a-tag color="blue" v-if="item.method=='post'">post</a-tag>
              <a-tag color="orange" v-if="item.method=='put'">put</a-tag>
              <a-tag color="red" v-if="item.method=='delete'">delete</a-tag>
              {{item.url}}
            </p>
          </div>
          <a-divider dashed style="margin:5px 0"></a-divider>
        </a-radio>
      </a-radio-group>
    </a-drawer>
    <div style="height:500px"></div>
  </div>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty'
import axios from 'axios'
import { apiSource } from '@/api'
import qs from 'qs'
let apiArr = []
let keys = Object.keys(apiSource)
apiArr = keys.map(v => {
  return {
    method: apiSource[v].method,
    url: apiSource[v].url,
    remark: apiSource[v].__remark,
    data: { ...apiSource[v].__argus, ...apiSource[v].data },
    key: v
  }
})
export default {
  name: 'app',
  components: {
    VueJsonPretty
  },
  data () {
    return {
      visible: false,
      url: 'http://gank.io/api/today',
      renderOK: false,
      loading: false,
      error: '',
      // 当前的接口
      currApi: {
        url: '',
        method: 'get',
        data: {},
        remark: '',
        key: ''
      },
      val: '',
      value: 'res.error',
      apiList: apiArr,
      token: '',
      storeid: '',
      currData: '{}'
    }
  },
  created () {},
  watch: {
    currApi: {
      handler (val) {
        this.currData = JSON.stringify(val.data, null, 2)
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    json () {
      try {
        return JSON.parse(this.val)
      } catch (err) {
        return this.cache
      }
    }
  },
  methods: {
    getAuth () {
      this.currApi = {
        url: 'login',
        method: 'post',
        data: {
          username: 15926290460,
          code: 778899,
          password: 290460
        }
      }
      this.$nextTick(() => {
        this.onSearch()
      })
    },
    onSearch () {
      this.renderOK = false
      this.loading = true
      let curData = {}
      try {
        curData = JSON.parse(this.currData)
      } catch (e) {
        curData = this.currApi.data
      }
      let data = this.currApi.method !== 'get' ? curData : {}
      axios({
        url: this.currApi.url,
        method: this.currApi.method || 'get',
        baseURL: '/api/',
        params: this.currApi.method === 'get' ? curData : {},
        data: qs.stringify(data, {
          arrayFormat: 'indices',
          allowDots: true
        }),
        responseType: 'json',
        headers: {
          'Cache-Control': 'no-cache',
          'Content-type': 'application/x-www-form-urlencoded',
          token: this.token,
          storeid: this.storeid
        },
        proxy: {
          '/store': {
            host: 'https://www.easy-mock.com/mock/5d5b9eddaf6abb3d1b4270ad'
          }
        }
      }).then(res => {
        this.error = false
        this.val = JSON.stringify(res.data)

        if (this.currApi.url === 'login') {
          this.token = res.data.message
          this.storeid = res.data.data
        }
        this.$nextTick(() => {
          this.renderOK = true
          this.loading = false
        })
      }).catch((err) => {
        this.error = err
      })
    }
  }
}
</script>

<style lang="less" scoped>
.apilist {
  h1 {
    font-size: 16px;
    margin-bottom: 2px;
  }
  p {
    font-size: 12px;
  }
}
</style>
<style>
.vjs-tree .vjs-value__string{
    word-break: break-all;
  }
</style>
