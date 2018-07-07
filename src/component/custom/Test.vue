<template>
    <div class="container Test">
        <!--按钮-->
        <button class="btn">default</button>
        <button class="btn" disabled>disabled</button>
        <br>
        <br>
        <!--提示框-->
        <div class="popup">
            <div>
                <i class="iconfont icon-chongzhishibai"></i>
                <span>删除提示</span>
            </div>
            <div>
                <p>我是提示文本</p>
            </div>
            <div>
                <button class="btn-reverse">取消</button>
                <button class="btn">确定</button>
            </div>
        </div>
        <br>
        <!--提示气泡-->
        <div class="bubble">
            <p>我是提示信息</p>
        </div>
        <br>
        <!-- 输入框 -->
        <div class="input">
            <label>
                <span>常规：</span>
                <div>
                    <input type="text" value="test" />
                </div>
            </label>
        </div>
        <br>
        <div class="input">
            <label>
                <span>禁用状态：</span>
                <div>
                    <input disabled type="text" value="test" />
                </div>
            </label>
        </div>
        <br>
        <div class="input">
            <label>
                <span style="text-align-last:justify">禁用了：</span>
                <div>
                    <input disabled type="text" value="test" />
                </div>
            </label>
        </div>
        <br>
        <div class="input required">
            <label>
                <span>必填：</span>
                <div>
                    <input required type="text" value="test" />
                </div>
            </label>
        </div>
        <!-- 表格 -->
        <aside class="table">
            <table width="100%">
                <thead>
                    <tr>
                        <th>姓名</th>
                        <th>年龄</th>
                        <th>出生年月</th>
                        <th>手机号码</th>
                        <th>单位</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>张三</td>
                        <td>18</td>
                        <td>1990-9-9</td>
                        <td>13682299090</td>
                        <td>阿里巴巴</td>
                    </tr>
                </tbody>
            </table>
        </aside>
        <!-- 树-->
        <ul class="am-tree">
            <!-- 包含子级的条目模板 -->
            <li class="am-tree-branch am-hide" data-template="treebranch">
                <div class="am-tree-branch-header">
                    <button class="am-tree-branch-name">
                        <span class="am-tree-icon am-tree-icon-folder"></span>
                        <span class="am-tree-label"></span>
                    </button>
                </div>
                <ul class="am-tree-branch-children"></ul>
                <div class="am-tree-loader">Loading...</div>
            </li>
            <!-- 不包含子级的条目模板 -->
            <li class="am-tree-item am-hide" data-template="treeitem">
                <button class="am-tree-item-name">
                    <span class="am-tree-icon am-tree-icon-item"></span>
                    <span class="am-tree-label"></span>
                </button>
            </li>
        </ul>
        <div class="mydiv"></div>
        <!-- 标注弹窗 -->
        <div class="popup">
            <div>
                <span>新建地区</span>
            </div>
            <div class="content">
                <table>
                    <tr>
                        <td>
                            <span class="four">地区代码:</span> 01001
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="input">
                                <label>
                                    <span class="required">常规：</span>
                                    <div>
                                        <input type="text" value="test" />
                                    </div>
                                </label>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span class="four">上级代码:</span>0100
                        </td>
                    </tr>
                    <tr class="bor">
                        <td>
                            <span class="four">上级名称:</span> 杭州市
                        </td>
                    </tr>
                </table>
            </div>
            <div>
                <button class="btn">保存</button>
                <button class="btn">保存并新建</button>
                <button class="btn" @click="alert=false">取消</button>
            </div>
        </div>
    </div>
</template>
<script>
// import "amazeui-tree"
// import '../../../node_modules/amazeui-tree/dist/amazeui.tree.min.css'
export default {
    data() {
            return {
                data: [{
                    title: '浙江省',
                    type: 'folder',
                    products: [{
                        title: '杭州市',
                        type: 'folder',
                        products: [{
                                title: '上城区',
                                type: 'item',
                            }, {
                                title: '下城区',
                                type: 'item',
                            },

                        ]
                    }, {
                        title: '上海市',
                        type: 'item'
                    }, ]
                }, ],
            }
        },
        mounted() {
            // $('.am-tree').tree({
            //     dataSource: (options, callback) => {
            //         // 模拟异步加载
            //         console.log(this.data)
            //         callback({
            //             data: options.products || this.data
            //         });
            //     },
            //     multiSelect: false,
            //     cacheItems: true,
            //     folderSelect: false
            // });
        }
}
</script>
<style lang="less">
// @import "../../assets/css/element.less";
// @import "../../assets/css/reset01.less";
// @import '../../assets/css/base01.less';
.mydiv {
    border: 1px solid red;
    height: 100px;
}
</style>
