# 更新日志

> 版本号说明
> 
> 
> 规则：`主版本号.次版本号.日期版本号_阶段版本号`
> 
> - 出现重大的重构或升级，且没有阶段版本号，则主版本号 `加 1`
> - 出现不兼容的变动，且没有阶段版本号，次版本号 `加 1`
> - 日期版本号会在每次发布时改为 `当天发布的日期`
> - 阶段版本号：`bate`（测试版：不稳定，会不断增加新功能）、`rc`（发布候选版：稳定，只做修复、优化）

## TODO

- [ ] 通用测试项目面板每部分混乱、不明确、没有使用手册和参考，对新手使用困难，与航宇讨论重新构建这部分功能
- [ ] 对通用测试项目，打开通用测试项目面板后应该把已在输入框中输入的参数值同步到面板中，方便二次编辑
- [ ] 在添加测试项目框输入测试项目名称时，根据输入展示`候选测试项目`下拉框
  - 例如输入播放音乐，展示`候选测试项目`，点击后自动设置测试项目名称和调用命令
  - `候选测试项目`用全局模糊搜索，数据源是测试项目数据库和通用测试项目数据库
- [ ] 在添加或编辑测试项目时，隐藏比对编号选择框，自动推导比对编号（适配无上限或无下限的情况）
- [ ] 新手引导？
- [ ]  一键开关所有测试站别的测试数据上传Flag？
- [ ]  修复导出站别测试项目压缩包的功能，压缩包内部再加一个机型名称的文件夹

## V3.7.230505（当前版本）

- [x]  一键导出多个站别测试项目文件并压缩
- [x]  支持一次性添加多个料号

## V3.7.230427

- [x]  删除机型时，需要输入机型名称后才能删除
- [x]  动态密码可以随时删除
- [x]  料号配置添加料号的报错信息会更详细
- [x]  站别测试项目列表在保存时，对调用命令相同但名称不同的测试项目可进行保存操作

## V3.7.230413

- [x]  测试项目页面增加状态栏，显示当前测试项目的状态
- [x]  合并测试项目页面的上下限文本
- [x]  机型页面的多语言功能
- [x]  增加最近更新按钮，点击查看更新日志

## v3.6.221130

### 功能优化

- [x]  测试项目页面：添加测试项目时，默认会选择序号1
- [x]  用户管理页面：权限列表旁边会显示权限等级

### 问题修复

- [x]  修复删除机型后，没有删除相关的料号配置的Bug
- [x]  修复删除料号配置后，没有删除相关料号的Bug

## v3.6.221101

### 新功能

- [x]  权限角色：现在每个用户拥有一个权限角色，每个角色拥有不同等级的权限（1~8）

## v3.5.221022

### 新功能

- [x]  动态密码：现在机型可以使用动态密码进行上锁

## v3.5.221012

### 功能优化

- [x]  料号配置
    - [x]  在没有选中料号配置时，不可以添加料号
    - [x]  在添加料号时会移除空格

### 问题修复

- [x]  通用测试项目页面
    - [x]  修复参数顺序错误的Bug
- [x]  站别测试项目
    - [x]  修复分配站别测项目时超时的Bug
- [x]  操作记录
    - [x]  修复大文本下比对差异文本耗时，导致请求超时的Bug

## v3.5.220929

### 新功能

- [x]  操作记录页面：用于替代请求记录页面，查询用户的操作。目前对支持机型、站别、料号配置、测试项目、站别测试项目操作的记录。

### 问题修复

- [x]  通用测试项目：
    - [x]  修复切换项目组但测试项目不清空的Bug
    - [x]  修复参数无序的Bug
    - [x]  修复生成调用命令没有补全参数的Bug

### 废弃功能

- [x]  请求记录页面：因使用困难，难以理解，移除这个功能

## v3.4.220924

### 问题修复

- [x]  通用测试项目表单组件：选择测试项目后，清空上一个测试项目的参数
- [x]  通用测试项目页面：修复添加通用测试项目后，测试项目无参数的问题

## v3.4.220922

### 功能优化

- [x]  分配机型页面
    - [x]  简化表格
    - [x]  重新设计分配操作，更易用
- [x]  侧边栏中无权限的页面将被隐藏

## v3.3.220921

### 功能优化

- [x]  动态化通用测试项目
- [x]  站别测试项目会比对测试项目名称和调用命令（而非只比对调用命令），以此来检查是否有更改

### 问题修复

- [x]  选中料号配置模板并删除，后面的料号配置模板即使选中，面板也不会显示
- [x]  删除选中的料号配置模板后，应该情况料号列表
- [x]  分配机型页面的机型选择器不可清空，防止分配空机型
- [x]  修复修改密码功能
- [x]  添加机型后，添加者拥有添加的机型的权限

## v3.3.220815

### 问题修复

- [x]  修复导出测试项目功能，隐藏项目不为0的问题
- [x]  修复点击通用测试项目方法选择器无反应的问题

## v3.3.220720

### 新功能

- [x]  机型分配
- [x]  请求日志
- [x]  用户管理
- [x]  修改密码

### 功能优化

- [x]  配置编辑器从本地加载而不是网络
- [x]  现在每个人只能获取分配的机型

### 问题修复

- [x]  现在配置可以正确的映射空值

## v3.2.220413

### 功能优化

- [x]  表单配置
    - [x]  一份配置对应多个料号
    - [x]  一个机型拥有一份料号配置表单
    - [x]  一个机型拥有多份料号配置
    - [x]  机型拥有多个料号

### 数据库改动

**model表**

| 改动类型 | 字段 |
| --- | --- |
| 废弃字段 | config_form |

**part_no_config**

| 改动类型 | 字段 |
| --- | --- |
| 增加字段 | id、model_id、config、part_no |

**删除part_no表**

## v3.1.220412

### 新功能

- [x]  *料号配置：**新增料号配置页面，管理每个机型的料号，及其对应的配置

### 问题修复

- [x]  *导入测试项目：**修复上下限反的问题
- [x]  *测试项目单位：**单位长度最长为20个字符

### 弃用功能

- [x]  *添加站别：**移除一次性添加多个站别的功能
- [x]  *测试项目编号/比对方式：**移除自动填写编号，请手动选择！
- [x]  测试项目表格：移除精简信息，现在会显示完整信息

### 功能优化

- [x]  *登录：**账户与权限管理系统同步

### 数据库改动

**model表**

| 改动类型 | 字段 |
| --- | --- |
| 增加字段 | config_form |
| 废弃字段（未删除） | config |

**part_no表**

| 改动类型 | 字段 |
| --- | --- |
| 增加字段 | id、model_id、config |

## v3.0.220111_rc

### 问题修复

- [x]  **添加测试项目**：上下限为空不会自动补N/A
- [x]  **通用测试项目**：
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

> 提示
> 
> 
> 此版本为重大更新，新模板程序后台见http://10.55.22.160:9125
> 
> 此版本为`bate`版，依然会增加新功能，请酌情使用
> 

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

- [新增] 配置管理功能，点击紫色齿轮即可进行编辑
    
    [data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAgCAYAAADqgqNBAAAEX0lEQVRYhe2X348TVRTHP3On86PTabsLm80CUtG1WZXFzQZEyKaiJITwQAwxPqjRB2OM8cEHw1/hAzE+EmJ8MDGRbIwhxGyIAiE8LLppChsVG2BZWShN3bLd6bSd6cz40C5dl5YW1BATvk+TO2fO997v/d57zkhBEAQ8IohHRfyYvDdUa1j+vcM1q4b7kOSh7iF1Cpll0ic8/Bc99u03WjP2bS4ds8mFbJJvRRlZ10O6VZA6u92jlrdJf1OjUKCpkYS5TaCvhFg+hStB450P2rjG2AGDQVX+B+TVMunjVRauBBCSGDgYYftTDuc+c7DXSp9QSb2rkjtZJpsOQEiYe3R27olgdCFvr5MKtVsBqDIjh/tJqgAKE4d10FW0pu6+42AjY4Zk4q/pbHmmyA/HPewSLXXug/aGExFG9whwPP5IV5uDMprRIgYQqop5V+Iq2WkPH0Hi1UhPTm6/cr/M7FkfDJnNYytr8KjlK/zyk8vSNR/XEMSHFbbsDjf3WOfp3RXm5z3mT5d5/mD3CbTd89ypP/n5PAy808euYRlwmDuxzOxMI1TEJOR6gGsDQmLgzSi7kirgMXfiDrMzMPThenYM9UruVLh6uY6Lz62TLtZmlb1vxzDuJgxQxjS2H4wy0NTLXVzmwlc1iotSa6LVEmc+dbCHFYZfEKCH2JIMo7UhbylTcrgyWSM76WJVIT4abri1YJGdCRBbdVKHWsQAyrooEx/o9BsBhe8tCgB6mA1J8LMu2cka2SmH5Q4rv2fPtd1hdk4o6IYCQOHXOjUEif1m+6Ojm4ymHM5N1bm5CAPrFJKvxxhyXLJfVMjdR/Z7PaEL4mbL1cVcAEiEY52TxPskIGD5djOpqhI3BXIXx3U9EUZMajy0uddX4NcBJLRot2xdyGvnbaaOLJJu6rUhIQCPhYzTIYXDbxc9EIL4xsZI7uwiU0dsbi32Si4klJiEooNb8slfshvDIxpDfWCdspjNe2s+98hPW8xlQXlJY1gA2NxI+7g2yKaEEpc6krc55y6Xv14ie11m5JPG1ernlzhz1MX2QXtOYdOzAtnxKUy7FPPARoWd78cZFGBfKnJm0iN6KE5qTLnvytteMv6NO5w6VsfbqvPKGw2X+1aZzHdVFrKrwkMS8ZTOeCqCKYCqxfnPqxTVEOMf97Gpi6M6lFSP/Ok7XDgbYOwz2Tuxqkz4Lpbt4wlB1FBW7VuVi0ct5m9KbPqoj/HB7mW1w9w8lvIBCMHgtjX1SSiYpkb8b8QAOk+OCSDAur3WG+3RvrDkK8xdBggopMtYqQgmFS5+abPUL2MmZDTLo3TDo5oweDkVBqvM1d8bIi6dq5DfpjLYhbxjJ+NbZTLfNhsKU2Zw2CefaRMqJPq3C6wZD5dGI7FjxQMPS96Ah3WtTOakQ7FAo2t5L0Z85XWpxI/N7kbbqjJyIELC7K2F6oF8BXUKGYvc+iijT6xO7rEwvYyVNB+4eXwA8v8G/5Ofhsfk/yL+Aur4yAUROKZkAAAAAElFTkSuQmCC](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAgCAYAAADqgqNBAAAEX0lEQVRYhe2X348TVRTHP3On86PTabsLm80CUtG1WZXFzQZEyKaiJITwQAwxPqjRB2OM8cEHw1/hAzE+EmJ8MDGRbIwhxGyIAiE8LLppChsVG2BZWShN3bLd6bSd6cz40C5dl5YW1BATvk+TO2fO997v/d57zkhBEAQ8IohHRfyYvDdUa1j+vcM1q4b7kOSh7iF1Cpll0ic8/Bc99u03WjP2bS4ds8mFbJJvRRlZ10O6VZA6u92jlrdJf1OjUKCpkYS5TaCvhFg+hStB450P2rjG2AGDQVX+B+TVMunjVRauBBCSGDgYYftTDuc+c7DXSp9QSb2rkjtZJpsOQEiYe3R27olgdCFvr5MKtVsBqDIjh/tJqgAKE4d10FW0pu6+42AjY4Zk4q/pbHmmyA/HPewSLXXug/aGExFG9whwPP5IV5uDMprRIgYQqop5V+Iq2WkPH0Hi1UhPTm6/cr/M7FkfDJnNYytr8KjlK/zyk8vSNR/XEMSHFbbsDjf3WOfp3RXm5z3mT5d5/mD3CbTd89ypP/n5PAy808euYRlwmDuxzOxMI1TEJOR6gGsDQmLgzSi7kirgMXfiDrMzMPThenYM9UruVLh6uY6Lz62TLtZmlb1vxzDuJgxQxjS2H4wy0NTLXVzmwlc1iotSa6LVEmc+dbCHFYZfEKCH2JIMo7UhbylTcrgyWSM76WJVIT4abri1YJGdCRBbdVKHWsQAyrooEx/o9BsBhe8tCgB6mA1J8LMu2cka2SmH5Q4rv2fPtd1hdk4o6IYCQOHXOjUEif1m+6Ojm4ymHM5N1bm5CAPrFJKvxxhyXLJfVMjdR/Z7PaEL4mbL1cVcAEiEY52TxPskIGD5djOpqhI3BXIXx3U9EUZMajy0uddX4NcBJLRot2xdyGvnbaaOLJJu6rUhIQCPhYzTIYXDbxc9EIL4xsZI7uwiU0dsbi32Si4klJiEooNb8slfshvDIxpDfWCdspjNe2s+98hPW8xlQXlJY1gA2NxI+7g2yKaEEpc6krc55y6Xv14ie11m5JPG1ernlzhz1MX2QXtOYdOzAtnxKUy7FPPARoWd78cZFGBfKnJm0iN6KE5qTLnvytteMv6NO5w6VsfbqvPKGw2X+1aZzHdVFrKrwkMS8ZTOeCqCKYCqxfnPqxTVEOMf97Gpi6M6lFSP/Ok7XDgbYOwz2Tuxqkz4Lpbt4wlB1FBW7VuVi0ct5m9KbPqoj/HB7mW1w9w8lvIBCMHgtjX1SSiYpkb8b8QAOk+OCSDAur3WG+3RvrDkK8xdBggopMtYqQgmFS5+abPUL2MmZDTLo3TDo5oweDkVBqvM1d8bIi6dq5DfpjLYhbxjJ+NbZTLfNhsKU2Zw2CefaRMqJPq3C6wZD5dGI7FjxQMPS96Ah3WtTOakQ7FAo2t5L0Z85XWpxI/N7kbbqjJyIELC7K2F6oF8BXUKGYvc+iijT6xO7rEwvYyVNB+4eXwA8v8G/5Ofhsfk/yL+Aur4yAUROKZkAAAAAElFTkSuQmCC)
    

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
- **问题修复**：
- [修复] 调整测试项目顺序时偶尔会乱序
- [修复] 测试项目顺序不是从1开始而是0
- **其他更改**：
    - [调整] 站别测试项目页面的样式改为双向列表
    - [优化] 修改双向列表组件的样式，使其更为简洁美观
    - [优化] 调整测试顺序的按钮增加loading状态，防止连续点击

图片编号映射(以base64形式内嵌图片)