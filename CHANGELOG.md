> **版本号说明**
>
> 规则：`主版本号.次版本号.日期版本号_阶段版本号`
>
> - 出现重大的重构或升级，且没有阶段版本号，则主版本号 `加 1`
> - 出现不兼容的变动，且没有阶段版本号，次版本号 `加 1`
> - 日期版本号会在每次发布时改为 `当天发布的日期`
> - 阶段版本号：`bate`（测试版：不稳定，会不断增加新功能）、`rc`（发布候选版：稳定，只做修复、优化）

## v3.7.todo
- 料号排序、一次性添加多个料号（TODO）
- 动态密码可以随时删除
- 在站别测试项目页面，增加查看测试项目在哪个站别使用的页面
- 机型页面的多语言功能


## V3.7.230413

- [x] 测试项目页面增加状态栏，显示当前测试项目的状态
- [x] 机型页面的多语言功能
- [x] 增加更新日志引导按钮，点击查看更新日志

## v3.6.221130

### 功能优化

- [x] 测试项目页面：添加测试项目时，默认会选择序号1
- [x] 用户管理页面：权限列表旁边会显示权限等级

### 问题修复

- [x] 修复删除机型后，没有删除相关的料号配置的Bug
- [x] 修复删除料号配置后，没有删除相关料号的Bug

## v3.6.221101

### 新功能

- [x] 权限角色：现在每个用户拥有一个权限角色，每个角色拥有不同等级的权限（1~8）

## v3.5.221022

### 新功能

- [x] 动态密码：现在机型可以使用动态密码进行上锁

## v3.5.221012

### 功能优化

- [x] 料号配置
	- [x] 在没有选中料号配置时，不可以添加料号
	- [x] 在添加料号时会移除空格

### 问题修复

- [x] 通用测试项目页面
	- [x] 修复参数顺序错误的Bug
- [x] 站别测试项目
	- [x] 修复分配站别测项目时超时的Bug
- [x] 操作记录
	- [x] 修复大文本下比对差异文本耗时，导致请求超时的Bug
## v3.5.220929

### 新功能

- [x] 操作记录页面：用于替代请求记录页面，查询用户的操作。目前对支持机型、站别、料号配置、测试项目、站别测试项目操作的记录。

### 问题修复

- [x] 通用测试项目：
	- [x] 修复切换项目组但测试项目不清空的Bug
	- [x] 修复参数无序的Bug
	- [x] 修复生成调用命令没有补全参数的Bug

### 废弃功能

- [x] 请求记录页面：因使用困难，难以理解，移除这个功能

## v3.4.220924

### 问题修复

- [x] 通用测试项目表单组件：选择测试项目后，清空上一个测试项目的参数
- [x] 通用测试项目页面：修复添加通用测试项目后，测试项目无参数的问题

## v3.4.220922

### 功能优化

- [x] 分配机型页面
	- [x] 简化表格
	- [x] 重新设计分配操作，更易用

- [x] 侧边栏中无权限的页面将被隐藏

## v3.3.220921

### 功能优化

- [x] 动态化通用测试项目
- [x] 站别测试项目会比对测试项目名称和调用命令（而非只比对调用命令），以此来检查是否有更改

### 问题修复

- [x] 选中料号配置模板并删除，后面的料号配置模板即使选中，面板也不会显示
- [x] 删除选中的料号配置模板后，应该情况料号列表
- [x] 分配机型页面的机型选择器不可清空，防止分配空机型
- [x] 修复修改密码功能
- [x] 添加机型后，添加者拥有添加的机型的权限

## v3.3.220815

### 问题修复

- [x] 修复导出测试项目功能，隐藏项目不为0的问题
- [x] 修复点击通用测试项目方法选择器无反应的问题

## v3.3.220720

### 新功能

- [x] 机型分配
- [x] 请求日志
- [x] 用户管理
- [x] 修改密码

### 功能优化

- [x] 配置编辑器从本地加载而不是网络
- [x] 现在每个人只能获取分配的机型

### 问题修复

- [x] 现在配置可以正确的映射空值


## v3.2.220413

### 功能优化

- [x] 表单配置
  - [x] 一份配置对应多个料号
  - [x] 一个机型拥有一份料号配置表单
  - [x] 一个机型拥有多份料号配置
  - [x] 机型拥有多个料号

### 数据库改动

**model表**

| 改动类型 | 字段        |
| -------- | ----------- |
| 废弃字段 | config_form |

**part_no_config**

| 改动类型 | 字段                          |
| -------- | ----------------------------- |
| 增加字段 | id、model_id、config、part_no |

**删除part_no表**

## v3.1.220412

### 新功能

- [x] **料号配置：**新增料号配置页面，管理每个机型的料号，及其对应的配置

### 问题修复

- [x] **导入测试项目：**修复上下限反的问题
- [x] **测试项目单位：**单位长度最长为20个字符

### 弃用功能

- [x] **添加站别：**移除一次性添加多个站别的功能
- [x] **测试项目编号/比对方式：**移除自动填写编号，请手动选择！
- [x] 测试项目表格：移除精简信息，现在会显示完整信息

### 功能优化

- [x] **登录：**账户与权限管理系统同步

### 数据库改动

**model表**

| 改动类型           | 字段        |
| ------------------ | ----------- |
| 增加字段           | config_form |
| 废弃字段（未删除） | config      |

**part_no表**

| 改动类型 | 字段                 |
| -------- | -------------------- |
| 增加字段 | id、model_id、config |

## v3.0.220111_rc

### 问题修复

- [x] **添加测试项目**：上下限为空不会自动补N/A
- [x] **通用测试项目**：
  - 继电器：在不同分辨率下可能会导致显示不完全
  - 听侧：提示文字显示错误
  - 8342：选项文字显示错误
  - 其他：补充缺失的通用测试项目，校对显示内容

## v3.0.121217_bate

### 问题修复

- **站别测试项目列表**：显示测试顺序会跳过隐藏的测试项目
- **编辑测试项目**：
  - 现在编号会正确地修改
  - 上下限可以设置为空字符串

### 功能优化

- **添加/编辑测试项目**：表单的上限栏、下限栏、单位栏合并为一栏显示
- **搜索测试项目**：在搜索框前缀增加站别选择器，选定后过滤为此站别的测试项目
- **删除测试项目**：删除时会提示使用此项的站别列表
- **添加站别**：支持一次性添加多个站别
- **消息提示**：简化样式
- **登录**：默认30天免登录

### 新功能
- **通用测试项目**：点击调用命令栏后面的图标可以快捷地添加通用测试项目

### 弃用功能

- **公用设备Dll**：此功能被**通用测试项目**功能替代，移除所有相关代码（路由、请求、实体、页面），相关数据库会在正式版发布后移除

## v3.0.211206_bate
### 问题修复

- **添加测试项目**：调用编号将正确地添加
- **从Txt导入测试项**：站别测试项目不再累加
- **删除站别**：修复无法删除站别的Bug

### 功能优化

- **从Txt导入测试项**：优化性能，防止请求超时
- **搜索测试项目**：不再大小写敏感，支持搜索调用命令
- **编辑模板配置**：保存按钮始终在顶栏，保存成功后自动关闭面板

## v3.0.211126_bate

> **提示**
>
> 此版本为重大更新，新模板程序后台见http://10.55.22.160:9125
>
> 此版本为`bate`版，依然会增加新功能，请酌情使用

### 问题修复

- **导出站别测试项目**：上限与下限的顺序现在会正确的导出
- **从Txt导入测试项目**：上限与下限的顺序现在会正确的导入

### 功能优化

- **删除/更新 机型**：操作按钮移入下拉菜单
- **删除/更新 站别**：操作按钮移入下拉菜单
- **更新模板配置**：使用表单设置，左侧增加预览编辑器
- **更新测试项目**
	- 现在可以在表格中设置隐藏此项和始终执行选项
	- 编号将根据上下限推算
- **添加测试项目到站别**：改为拖动添加
- **调整测试项目顺序**：改为拖动调整
- **新页面**：新增后台配置页面，默认的模板程序配置表单移入至此

### 样式更改

- **测试项目表格**：上下限、编号、单位，合并在比对条件表栏
- **站别测试项目列表**：现在会标出是否隐藏和是否始终执行的Tag以及测试顺序

## v2.4.1 2021/10/13

**站别测试页面**

- [修复] 站别测试项目列表不能搜索的Bug

**机型页面**
- [调整] 同步模板配置功能会同步所有的站别，禁用机型配置的编辑功能

**分配机型页面**

- [优化] 管理员权限的账号不会显示在被分配列
- [调整] 现在管理员权限的账号所分配的权限，可以由其他管理员共同更改

## v2.4.0 2021/10/8 

**机型&站别页面**

- [新增] 为其他用户分配机型的功能
- [新增] 同步模板配置的功能，用于同步新的配置所有机型

**其他**

- [优化] 侧边菜单栏增加对应的图标 

**开发者日志**

- 数据库新增 model_permission 表来管理用户可操作的机型

## v2.3.2 2021/9/10 

**机型&站别**

- [调整] 每次保存机型配置后，都会将新增的键同步添加到站别配置


## v.2.3.1 2021//9/8 

**测试项目页面**

- [移除] 根据上下限自动推断编号

## v2.3.0 2021/8/26

**其他**

- [优化] 后端Furion版本升级为v2.18，并更改相应代码

**测试项目页面**

- [优化] 添加/编辑 测试项目时，会根据上下限自动设置测试项目的编号

**站别测试项目**

- [优化] "所有测试项目"列表，鼠标悬停在测试项目名称上时，会显示调用命令

**配置管理页面**

- [移除] 此页面

**机型&站别页面**

- [新增] 配置管理功能，点击紫色齿轮![][1]即可进行编辑

**审计页面**

- [修复] 更新类型的审计不能获取的旧值，且有冗余数据的bug
- [优化] 操作时间列改用相对时间显示
- [优化] 操作类型列改用标签显示，~~并增加过滤条件~~
- [优化] 表格增加滚动条，防止页面滚动
- [优化] 更新类型的审计会在新值中显示与旧值的差异

## v2.2.0 2021/8/7

**修复**

- 导出为Txt功能失效

**新增**

- 公用Dll管理功能，用以代替旧版的~~仪器&设备~~页面
- 配置管理功能，见页面"配置管理"

**优化**

- 修改ElementUI的主题色使其更鲜艳
- 简化form-generator功能，并入将代码并入此项目

**移除**

- 移除DeviceDllParam(设备Dll参数)、DeviceDll相关功能

**调整**

- 测试项序号同步为新模板
- 现在站别的测试项目为空时，将不能点击保存更改
- 后端数据库迁移至MES服务器

## v2.1.0

**优化**

- 设备Dll的参数设计，改为自定义表单

## v2.0.3

- **新特性**：
  - [新增] 测试项目页面的搜索测试项目的功能（根据名称和调用命令）
- **突破性变化**：
  - [移除] user_model表(用户机型分配表)及相关功能
- **问题修复**：
  - [修复] 特殊情况下（用作分割的制表符不一致时），从Txt导入测试项目，条目对不上
- **其他更改**：
  - [优化] 机型列表、站别列表、设备Dll列表、测试项目列表将按照名称排序显示
  - [优化] 设备Dll参数列表将按照插入时间来排序显示
  - [优化] 测试项目的添加与编辑将共用一个模态框
  - [优化] 添加测试项目时，非必选项会自动添加“N/A”
  - [优化] 选择测试项目编号的表单项，改为单选框，并增加每个编号的相关介绍

## v2.0.2

- **新特性**：
  - [新增] 更新双向列表组件的样式，并增加垂直滚动条，防止页面滚动
  - [新增] 在站别测试项目页面增加修改测试项目配置的功能（**此功能后续会移入测试项目页面）**
- **突破性变化**：
  - [调整] 在站别测试项目页面，任何导致站别测试项目变动的操作必须点击“保存更改”才能有效更改，**从“Txt导入测试项目”除外**
- **问题修复**：
  - [修复] 删除机型时，没有清空站别
  - [修复] 判断相同测试项的逻辑，改为相同名称则视为相同（而非相同的调用命令）
  - [修复] 特殊情况下，从Txt导入测试项目时，会报“已有此测试项目”错误
- **其他更改**：
  - [调整] 因使用率过低，暂时隐藏用户管理页面，但保留Api
  - [调整] “公共设备”页面现在更名为“仪器&设备”

## v2.0.1

- **新特性**：
  - [新增] 清空站别测试项目的Api
  - [新增] 站别可以添加重复的测试项目
  - [新增] 搜索测试项目功能
-  **问题修复**：
  - [修复] 调整测试项目顺序时偶尔会乱序
  - [修复] 测试项目顺序不是从1开始而是0
- **其他更改**：
  - [调整] 站别测试项目页面的样式改为双向列表
  - [优化] 修改双向列表组件的样式，使其更为简洁美观
  - [优化] 调整测试顺序的按钮增加loading状态，防止连续点击



图片编号映射(以base64形式内嵌图片)

[1]:data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAgCAYAAADqgqNBAAAEX0lEQVRYhe2X348TVRTHP3On86PTabsLm80CUtG1WZXFzQZEyKaiJITwQAwxPqjRB2OM8cEHw1/hAzE+EmJ8MDGRbIwhxGyIAiE8LLppChsVG2BZWShN3bLd6bSd6cz40C5dl5YW1BATvk+TO2fO997v/d57zkhBEAQ8IohHRfyYvDdUa1j+vcM1q4b7kOSh7iF1Cpll0ic8/Bc99u03WjP2bS4ds8mFbJJvRRlZ10O6VZA6u92jlrdJf1OjUKCpkYS5TaCvhFg+hStB450P2rjG2AGDQVX+B+TVMunjVRauBBCSGDgYYftTDuc+c7DXSp9QSb2rkjtZJpsOQEiYe3R27olgdCFvr5MKtVsBqDIjh/tJqgAKE4d10FW0pu6+42AjY4Zk4q/pbHmmyA/HPewSLXXug/aGExFG9whwPP5IV5uDMprRIgYQqop5V+Iq2WkPH0Hi1UhPTm6/cr/M7FkfDJnNYytr8KjlK/zyk8vSNR/XEMSHFbbsDjf3WOfp3RXm5z3mT5d5/mD3CbTd89ypP/n5PAy808euYRlwmDuxzOxMI1TEJOR6gGsDQmLgzSi7kirgMXfiDrMzMPThenYM9UruVLh6uY6Lz62TLtZmlb1vxzDuJgxQxjS2H4wy0NTLXVzmwlc1iotSa6LVEmc+dbCHFYZfEKCH2JIMo7UhbylTcrgyWSM76WJVIT4abri1YJGdCRBbdVKHWsQAyrooEx/o9BsBhe8tCgB6mA1J8LMu2cka2SmH5Q4rv2fPtd1hdk4o6IYCQOHXOjUEif1m+6Ojm4ymHM5N1bm5CAPrFJKvxxhyXLJfVMjdR/Z7PaEL4mbL1cVcAEiEY52TxPskIGD5djOpqhI3BXIXx3U9EUZMajy0uddX4NcBJLRot2xdyGvnbaaOLJJu6rUhIQCPhYzTIYXDbxc9EIL4xsZI7uwiU0dsbi32Si4klJiEooNb8slfshvDIxpDfWCdspjNe2s+98hPW8xlQXlJY1gA2NxI+7g2yKaEEpc6krc55y6Xv14ie11m5JPG1ernlzhz1MX2QXtOYdOzAtnxKUy7FPPARoWd78cZFGBfKnJm0iN6KE5qTLnvytteMv6NO5w6VsfbqvPKGw2X+1aZzHdVFrKrwkMS8ZTOeCqCKYCqxfnPqxTVEOMf97Gpi6M6lFSP/Ok7XDgbYOwz2Tuxqkz4Lpbt4wlB1FBW7VuVi0ct5m9KbPqoj/HB7mW1w9w8lvIBCMHgtjX1SSiYpkb8b8QAOk+OCSDAur3WG+3RvrDkK8xdBggopMtYqQgmFS5+abPUL2MmZDTLo3TDo5oweDkVBqvM1d8bIi6dq5DfpjLYhbxjJ+NbZTLfNhsKU2Zw2CefaRMqJPq3C6wZD5dGI7FjxQMPS96Ah3WtTOakQ7FAo2t5L0Z85XWpxI/N7kbbqjJyIELC7K2F6oF8BXUKGYvc+iijT6xO7rEwvYyVNB+4eXwA8v8G/5Ofhsfk/yL+Aur4yAUROKZkAAAAAElFTkSuQmCC



[2]:data:image/png;base64,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