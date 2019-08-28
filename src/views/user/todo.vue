<template>
  <a-card :bordered="false">
    <main id="todolist">
      <a-button type="primary" @click="showModal">新增待办</a-button>
      <h1>
        待办事务
        <span>仅展示今日待办事务,今日以外的事务请在日程中查看。</span>
      </h1>
      <div class="todolist-wrapper">
        <div class="todoitem" v-for="(item,index) in todo" :key="index" :class="{'has-done':item.done}">
          <div class="todo-label">{{item.label}}</div>
          <div class="todo-action">
            <!-- <a-checkbox :checked="item.done" title="完成" @click="changeState(index)"></a-checkbox> -->
            <div>
              <a-switch
                :checked="item.done"
                @click="changeState(index)"
                checkedChildren="已完成"
                unCheckedChildren="待完成"
              />
            </div>
            <!-- <a-icon type="delete" title="删除"/> -->
          </div>
        </div>
      </div>
    </main>
    <!-- 新增 -->
    <div>
      <a-modal title="新增待办事务" v-model="visible" @ok="handleSubmit">
        <a-form :form="form">
          <a-form-item label="事务内容" :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }">
            <a-input
              placeholder="请输入事务内容"
              v-decorator="[
          'label',
          {rules: [{ required: true, message: '事务内容为必填项！' }]}
        ]"
            />
          </a-form-item>
          <a-form-item label="事务完成日期" :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }">
            <a-date-picker
              v-decorator="[
          'date'
        ]"
              style="width:100%"
              @change="onChange"
              :defaultValue="defaultDate"
            />
          </a-form-item>
          <a-alert message="今日以外的事务将自动添加到日程中。" banner closable/>
        </a-form>
      </a-modal>
    </div>
  </a-card>
</template>
<script>
import moment from 'moment'
export default {
  data () {
    return {
      form: this.$form.createForm(this),
      newitem: '',
      sortByStatus: false,
      isactive: false,
      visible: false,
      defaultDate: moment(),
      todo: [
        { id: 1, label: 'Learn VueJs', done: true },
        { id: 2, label: 'Code a todo list', done: false },
        { id: 3, label: 'Learn something else', done: false }
      ]
    }
  },
  computed: {
    todoByStatus: function () {
      if (!this.sortByStatus) {
        return this.todo
      }

      var sortedArray = []
      var doneArray = this.todo.filter(function (item) {
        return item.done
      })
      var notDoneArray = this.todo.filter(function (item) {
        return !item.done
      })

      sortedArray = [...notDoneArray, ...doneArray]
      return sortedArray
    }
  },
  methods: {
    showModal () {
      this.visible = true
    },
    handleOk (e) {
      this.visible = false
    },
    onChange (date, dateString) {
    },
    onToogle: function () {
      this.$emit('clicked', this.isactive)
    },
    changeState (index) {
      this.$set(this.todo, index, {
        ...this.todo[index],
        done: !this.todo[index].done
      })
    },
    addItem: function () {
      this.todo.push({
        id: Math.floor(Math.random() * 9999) + 10,
        label: this.newitem,
        done: false
      })
      this.newitem = ''
    },
    markAsDoneOrUndone: function (item) {
      item.done = !item.done
    },
    deleteItemFromList: function (item) {
      let index = this.todo.indexOf(item)
      this.todo.splice(index, 1)
    },
    clickontoogle: function (active) {
      this.sortByStatus = active
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.visible = false
          this.todo.unshift({ ...values, done: false })
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
#todolist {
  padding-top: 10px;
}
#todolist h1 {
  /*text-align:center;*/
  font-weight: normal;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #eee;
}
#todolist h1 span {
  display: block;
  font-size: 12px;
  margin-bottom: 10px;
  margin-left: 3px;
  margin-top: 0.2rem;
}
.todolist-wrapper {
  .todoitem {
    min-height: 50px;
    line-height: 1.5;
    background: #f8f8f8;
    display: flex;
    color: #333;
    margin-bottom: 8px;
    &.has-done {
      .todo-label {
        text-decoration: line-through;
        color: #ccc;
      }
    }
    .todo-label {
      flex: 1;
      font-size: 18px;
      padding-top: 10px;
      padding-left: 10px;
    }
    .todo-action {
      width: 100px;
      line-height: 50px;
      display: flex;
      justify-content: space-around;
      .anticon-delete {
        line-height: 50px;
        cursor: pointer;
      }
    }
  }
}
</style>
