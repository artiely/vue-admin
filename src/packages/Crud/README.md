## api

| 属性          | 说明                                               | 默认  |
| ------------- | -------------------------------------------------- | ----- |
| sourceColumns | 列描述数据对象 详见下 sourceColumns 表             | []    |
| dataSource    | 数据对象                                           | []    |
| loading       | 加载动画                                           | false |
| initRow       | 新增时的初始数据一般用来初始 radio switch checkbox | {}    |
| labelCol      | 表单 label 的栅格宽度                              | 5     |
| wrapperCol    | 表单的栅格宽度                                     | 18    |

### sourceColumns

| 属性           | 说明                                                                                                          | 类型                        | 默认   |
| -------------- | ------------------------------------------------------------------------------------------------------------- | --------------------------- | ------ |
| hidden         | 表格是否不展示对应字段 (有些字段在表格里可能不需要展示，但是在新增的时候却需要他比如新增管理员里管理员的密码) | Boolean                     | false  |
| formOptions    | 表单的参数 详见下 sourceColumns.formOptions 表                                                                | Object                      | {}     |
| align          | 设置列内容的对齐方式                                                                                          | 'left' , 'right' , 'center' | 'left' |
| dataIndex      | 列数据在数据项中对应的 key，支持 a.b.c 的嵌套写法                                                             | string                      | -      |
| filterDropdown | 可以自定义筛选菜单，此函数只负责渲染图层，需要自行编写各种交互                                                | VNode,slot -                |
| title          | 列头显示文字                                                                                                  | string,slot                 | -      |
| width          | 列宽度                                                                                                        | string,number               | -      |

### sourceColumns.formOptions

| 属性     | 说明                                                                                                                             | 类型                                        | 默认  |
| -------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- | ----- |
| el       | 表单元素                                                                                                                         | input,radio,checkbox,select,datepicker,tree,slider,rate,switch,textarea |       |
| options  | 特定元素的可选值 radio,checkbox                                                                                                  | [{label:x,value:x}]                         |       |
| values   | 特定元素的可选值 tree                                                                                                            | [{title:x,key:x}]                         |       |
| type     | 声明 元素 类型，同原生 input 标签的 type 属性， datepicker(week,range...)                                                        | string                                      |       |
| visible  | 填写表单时是否展示对应的字段 {add:Boolean,edit:Boolean} （使用场景比如创建时间，我们需要在表格展示他，但我们新增和编辑都不要他） | boolean                                     | true  |
| disabled | 填写表单时是否禁用对应的字段 {add:Boolean,edit:Boolean} （使用场景比如某个字段，我们新增时需要，修改时是禁止修改的）             | boolean                                     | false |
| schema   | 表单的模型对象 详见 sourceColumns.formOptions.schema 表                                                                          | object                                      |       |
| rules    | 表单的验证规则 详见 sourceColumns.formOptions.rules 表                                                                           | object                                      |       |

## event

| 事件名称        | 说明             | 回调参数                    |
| --------------- | ---------------- | --------------------------- |
| handle-submit   | 新增或修改时确定 | function(values, event)     |

