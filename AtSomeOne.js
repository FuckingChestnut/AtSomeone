/**
 * temp_options说明
 * comment：评论框节点
 * tag_class：标签类名
 */

(function() {
    var window = (function() {
            return this;
        }()),
        document = window.document,
        //获取浏览器信息
        temp_browser_info = (function() {
            var temp_ua = window.navigator.userAgent,
                temp_browser = {
                    "name": undefined,
                    "version": undefined
                },
                temp_chrome_regexp = /chrome\/(\d|\.)*/g,
                temp_ie_regexp = /msie\s(\d|\.)*/g,
                temp_firefox_regexp = /firefox\/(\d|\.)*/g,
                temp_safari_regexp = /safari\/(\d|\.)*/g;
            temp_ua = temp_ua.toLocaleLowerCase();
            if (temp_chrome_regexp.test(temp_ua)) {
                temp_browser.name = "chrome";
            }
            else if (temp_firefox_regexp.test(temp_ua)) {
                temp_browser.name = "firefox";
            }
            else if (temp_safari_regexp.test(temp_ua)) {
                temp_browser.name = "safari";
            }
            else if (temp_ie_regexp.test(temp_ua)) {
                temp_browser.name = "ie";
            }
            return temp_browser;
        }()),
        pengchuan = function(temp_options) {
            this.states = {
                "selection": undefined,
                "range": undefined
            };
            this.property = {
                "browser": temp_browser_info
            };
            this.options = temp_options;

        };
    //挂载到全局变量
    window.pengchuan = pengchuan;
    //基本函数
    pengchuan.prototype.basicFun = {
        //获取selection对象
        getSelection: function() {
            var temp_selection = document.getSelection();
            return temp_selection;
        },
        //获取range对象
        getRange: function(temp_selection) {
            var temp_range_count = temp_selection.rangeCount,
                temp_range = undefined;
            if (temp_range_count > 0) {
                temp_range = temp_selection.getRangeAt(0);
            }
            return temp_range;
        },
        //设置光标位置
        setSelectPosition: function(temp_selection, temp_node, temp_index) {
            temp_selection.collapse(temp_node, temp_index, temp_node, temp_index);
        },
        setRangePosition: function(temp_range, temp_node, temp_index) {
            temp_range.setStart(temp_node, temp_index);
            temp_range.setEnd(temp_node, temp_index);
        },
        //获取前一个字符
        getPreWord: function(temp_range) {
            var temp_start_index = temp_range.startOffset,
                temp_word = undefined;
            if (temp_start_index > 0) {
                temp_start_index = temp_start_index - 1;
                temp_range.setStart(temp_range.startContainer, temp_start_index);
                temp_word = temp_range.toString();
            }
            return temp_word;
        },
        //创建文字节点
        createTextNode: function(temp_string) {
            var temp_node = document.createTextNode(temp_string);
            return temp_node;
        },
        //创建元素节点
        createElement: function(temp_options) {
            //temp_options属性
            // {
            //     tag_name: "input",
            //     inner_html: "",
            //     attributes: {
            //         type: "button"
            //     }
            // }
            var temp_node = undefined,
                temp_tag_name = temp_options.tag_name,
                temp_attributes = temp_options.attributes,
                temp_inner_html = temp_options.inner_html;
            temp_node = document.createElement(temp_tag_name);
            if (temp_attributes != undefined) {
                for (var temp_key in temp_attributes) {
                    var temp_value = temp_attributes[temp_key];
                    temp_node.setAttribute(temp_key, temp_value);
                }
            }
            if (temp_inner_html != undefined) {
                temp_node.innerHTML = temp_inner_html;
            }
            return temp_node;
        },
        //是否以换行标签结尾
        endWithBr: function(temp_node) {
            var temp_last_node = temp_node.lastChild,
                temp_result = false;
            if (temp_last_node == null) {
                return temp_result;
            };
            var temp_last_node_name = temp_last_node.tagName;
            if (temp_last_node_name == "BR") {
                temp_result = true;
            }
            return temp_result;
        },
        //是否以空白文字节点结尾
        endWithSpace: function(temp_node) {
            var temp_last_node = temp_node.lastChild,
                temp_result = false;
            if (temp_last_node == null) {
                return temp_result;
            };
            var temp_last_node_value = temp_last_node.textContent;
            if (temp_last_node_value === "\u00A0") {
                temp_result = true;
            }
            return temp_result;
        },
        //是否是父子元素
        isChild: function(temp_parent_node, temp_child_node) {
            var temp_document_node = document.documentElement;
            if (temp_document_node === temp_child_node) {
                return false;
            }
            else {
                var temp_superior_node = temp_child_node.parentNode;
                if (temp_parent_node == temp_superior_node) {
                    return true;
                }
                else {
                    return arguments.callee(temp_parent_node, temp_superior_node);
                }
            }
        },
        //在元素的后面添加元素
        inserAfter: function(temp_parent_node, temp_index, temp_node) {
            var temp_last_node = temp_parent_node.childNodes[temp_index];
            if (!temp_last_node) {
                temp_parent_node.appendChild(temp_node);
            }
            else {
                temp_parent_node.insertBefore(temp_node, temp_last_node);
            }
        },
        //深度复制对象
        copyObject: function(temp_object) {
            if (temp_object === null) {
                return temp_object;
            }
            var temp_object_type = typeof temp_object;
            if (temp_object_type !== "object") {
                return temp_object;
            }
            var temp_object_is_window = temp_object.window === temp_object ? true : false,
                temp_new_object = {};
            if (temp_object_is_window) {
                return temp_object;
            };
            for (var temp_key in temp_object) {
                var temp_value = temp_object[temp_key],
                    temp_value_type = typeof temp_value;
                if (temp_value_type === "object") {
                    temp_value = arguments.callee(temp_value);
                };
                temp_new_object[temp_key] = temp_value;
            }
            return temp_new_object;
        }
    };
    //逻辑函数
    pengchuan.prototype.logicFun = {
        //创建名字节点
        createNameNode: function(temp_name, temp_class_name) {
            var temp_node = undefined,
                temp_bowser_name = this.property.browser.name,
                temp_options = {
                    "attributes": {
                        "class": temp_class_name
                    }
                };
            if (temp_bowser_name == "chrome" || temp_bowser_name == "safari" || temp_bowser_name == "ie") {
                temp_options.tag_name = "button";
                temp_options.inner_html = temp_name;
                temp_options.attributes.contenteditable = "false";
                temp_node = this.basicFun.createElement(temp_options);
            }
            else if (temp_bowser_name == "firefox") {
                temp_options.tag_name = "input";
                temp_options.attributes.value = temp_name;
                temp_options.attributes.type = "button";
                temp_node = this.basicFun.createElement(temp_options);
            }
            else {
                temp_options.tag_name = "span";
                temp_options.inner_html = temp_name;
                temp_options.attributes.contenteditable = "false";
                temp_node = this.basicFun.createElement(temp_options);
            }
            return temp_node;
        },
        //组织节点
        concatNode: function(temp_range, temp_node) {
            var old_text_node = temp_range.startContainer;
            if (old_text_node === this.options.comment) {
                old_text_node = this.basicFun.createTextNode("");
            };
            var old_text_string = old_text_node.textContent,
                temp_end_index = temp_range.endOffset - this.options.cover_number,
                pre_text_string = old_text_string.slice(0, temp_end_index),
                temp_start_index = temp_end_index + this.options.cover_number,
                next_text_string = old_text_string.slice(temp_start_index),
                pre_text_node = this.basicFun.createTextNode(pre_text_string + '\u00A0'),
                //pre_text_node = this.basicFun.createTextNode(pre_text_string),
                next_text_node = this.basicFun.createTextNode('\u00A0' + next_text_string),
                //next_text_node = this.basicFun.createTextNode(next_text_string),
                return_map = [pre_text_node, temp_node, next_text_node];
            return return_map;
        },
        //插入节点
        insertNode: function(temp_map) {
            //判断末尾换行符
            var temp_selection = this.states.selection,
                temp_range = this.states.range,
                temp_rang_node = temp_range.startContainer,
                temp_comment_node = this.options.comment,
                temp_node_index = temp_range.startOffset,
                //temp_end_with_br = this.basicFun.endWithBr(temp_comment_node);
                temp_end_with_br = this.basicFun.endWithBr(temp_comment_node);
            if (temp_rang_node === temp_comment_node) {
                for (var i = 0; i < temp_map.length; i++) {
                    var temp_item = temp_map[i];
                    this.basicFun.inserAfter(temp_comment_node, temp_node_index, temp_item);
                };
                //设置正确光标
                this.basicFun.setSelectPosition(temp_selection, temp_map[0], 1);
            }
            else {
                for (var i = 0; i < temp_map.length; i++) {
                    var temp_item = temp_map[i];
                    temp_comment_node.insertBefore(temp_item, temp_rang_node);
                };
                temp_comment_node.removeChild(temp_rang_node);
                //设置正确光标
                this.basicFun.setSelectPosition(temp_selection, temp_map[2], 1);
            }
            //末尾添加换行符
            //var temp_end_with_br = this.basicFun.endWithBr(temp_comment_node);
            if (temp_end_with_br == false) {
                var temp_options = {
                        "tag_name": "br"
                    },
                    temp_new_line_node = this.basicFun.createElement(temp_options);
                //temp_new_line_space = this.basicFun.createTextNode("\u00A0");
                temp_comment_node.appendChild(temp_new_line_node);
                //temp_comment_node.appendChild(temp_new_line_space);
            };
        }
    };
    //添加标签
    pengchuan.prototype.setTag = function(tag_options) {
        //获取range对象
        this.states.selection = pengchuan.prototype.basicFun.getSelection();
        this.states.range = pengchuan.prototype.basicFun.getRange(this.states.selection);
        if (this.states.range == undefined) {
            console.log("请先选中编辑框");
            return;
        }
        //检测是否为子元素
        var temp_is_child = this.basicFun.isChild(this.options.comment, this.states.range.startContainer) || this.options.comment === this.states.range.startContainer;
        if (temp_is_child) {
            var temp_node = this.logicFun.createNameNode.call(this, "demo", this.options.tag_class),
                temp_node_map = this.logicFun.concatNode.call(this, this.states.range, temp_node);
            this.logicFun.insertNode.call(this, temp_node_map);
        }
        else {
            console.log("请在编辑框中使用此功能");
        }
    };


}());
