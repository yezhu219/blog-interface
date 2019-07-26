# 项目总结

## 1. mongoose 知识点
### 1.1 mongoose 查询结果返回指定字段  

`db.getCollection('sfhotdays').findOne({"_id" : ObjectId("5d37fa149225df3dd4141e55")},{title:1,_id:0})`


### 1.2 isNew属性
 - 文档对象的一个属性，返回值为Boolean，如果文档是新创建的就返回true

### 1.3 ref属性

### 1.4 给model添加静态方法

```js
 // Assign a function to the "statics" object of our animalSchema
  animalSchema.statics.findByName = function(name) {
    return this.find({ name: new RegExp(name, 'i') });
  };
  // Or, equivalently, you can call `animalSchema.static()`.
  animalSchema.static('findByBreed', function(breed) {
    return this.find({ breed });
  })
  //或者使用
  TokenSchema.statics = {
  async getAccessToken () {
    const token = await this.findOne({
      name: 'access_token'
    })
  },

  async saveAccessToken(data) {
    await token.save()
    return data
  }
}

``` 
### 1.5 pre方法
- 文档保存之前进行的操作
``` js
var toySchema = new Schema({ name: String, created: Date });

toySchema.pre('save', function(next) {
  if (!this.created) this.created = new Date;
  next();
});

toySchema.pre('validate', function(next) {
  if (this.name !== 'Woody') this.name = 'Woody';
  next();
});

// Equivalent to calling `pre()` on `find`, `findOne`, `findOneAndUpdate`.
toySchema.pre(/^find/, function(next) {
  console.log(this.getFilter());
});

```
### 1.6 属性
``` js
全部可用：

required: 布尔值或函数 如果值为真，为此属性添加 required 验证器
default: 任何值或函数 设置此路径默认值。如果是函数，函数返回值为默认值
select: 布尔值 指定 query 的默认 projections
validate: 函数 adds a validator function for this property
get: 函数 使用 Object.defineProperty() 定义自定义 getter
set: 函数 使用 Object.defineProperty() 定义自定义 setter
alias: 字符串 仅mongoose >= 4.10.0。 为该字段路径定义虚拟值 gets/sets

索引：

index: 布尔值 是否对这个属性创建索引
unique: 布尔值 是否对这个属性创建唯一索引
sparse: 布尔值 是否对这个属性创建稀疏索引

String:

lowercase: 布尔值 是否在保存前对此值调用 .toLowerCase()
uppercase: 布尔值 是否在保存前对此值调用 .toUpperCase()
trim: 布尔值 是否在保存前对此值调用 .trim()
match: 正则表达式 创建验证器检查这个值是否匹配给定正则表达式
enum: 数组 创建验证器检查这个值是否包含于给定数组

Number:

min: 数值 创建验证器检查属性是否大于或等于该值
max: 数值 创建验证器检查属性是否小于或等于该值

Date:

min: Date
max: Date

```
## 2. 接口列表

### 2.1文章列表接口

### 2.2文章详情页接口

### 2.3文章编辑接口

### 2.4侧边导航栏接口

### 2.5用户信息接口

### 2.6未读消息接口

### 2.7数据统计接口（文章点击数，点赞数）

### 2.8文章分类查询接口

### 2.9新建文章接口
