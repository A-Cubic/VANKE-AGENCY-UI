import Vue from 'vue'
import location         from '../location/location.js';

//没有全选框
Vue.directive('sel',{
	inserted:function (el) {
		$(el).selected()
		$(el).next('.am-selected').on('click','.am-selected-list li', function(event) {
			setTimeout(function () {
				var evt = document.createEvent('HTMLEvents');
				evt.initEvent('change', false, true);
				el.dispatchEvent(evt);
			},0)
		});
	}
})
// 单选提示不联动
Vue.directive('selp',{
	inserted:function (el) {
		$(el).selected()
		$(el).next('.am-selected').find('.am-selected-status').replaceWith("<font class='am-selected-status am-fl'>"+$(el).attr('placeholder')+"</font>")
		$(el).next('.am-selected').on('click','.am-selected-list li', function(event) {
			setTimeout(function () {
				var evt = document.createEvent('HTMLEvents');
				evt.initEvent('change', false, true);
				el.dispatchEvent(evt);
			},0)
		});
	}
})

//获取相关CSS属性


//拖拽的实现




//有全选多选
Vue.directive("seled",{
	inserted:function (el) {
		$(el).selected();
		$(el).next('.am-selected').find('.am-selected-status').replaceWith("<font class='am-selected-status am-fl'>"+$(el).attr('placeholder')+"</font>")
		$(el).next('.am-selected').on('click','.am-selected-list li', function(event) {
			var _this = $(this)
			var can = true;
			if ($(this).index()==0) {
				setTimeout(function() {
					if ($.inArray('all', $(el).val()) != -1) {
						_this.siblings().each(function(index, el) {
							$(this).addClass('am-checked')
						});
						$(el).find('option').each(function(index, el) {
							$(this).prop('selected', true);
						});
					} else {
						$(el).find('option').each(function(index, el) {
							$(this).prop('selected', false);
						});
						_this.siblings().each(function(index, el) {
							$(this).removeClass('am-checked')
						});
					}
				}, 0)
			}else{
				setTimeout(function() {
					var can = true;
					$(el).find('option').not('.all').each(function(index, ell) {
						if (!$(this).is(':selected')) {
							can = false;
						}
					});
					if (can) {
						$(el).find('.all').prop('selected', true);
						$(el).next('.am-selected').find('.am-selected-list li:first-child').addClass('am-checked');
					} else {
						$(el).find('.all').prop('selected', false);
						$(el).next('.am-selected').find('.am-selected-list li:first-child').removeClass('am-checked');
					}
				}, 0)
			}
			setTimeout(function () {
				var evt = document.createEvent('HTMLEvents');
				evt.initEvent('change', false, true);
				el.dispatchEvent(evt);
			},0)
		});
		$(el).change(function(event) {
			if ($(el).val()) {
				$(el).next('.am-selected').find('.am-selected-btn').addClass('choose_base');
			}else{
				$(el).next('.am-selected').find('.am-selected-btn').removeClass('choose_base');
			}
		});
	}
});

//提示联动
Vue.directive("seledp",{
	inserted:function (el) {
		$(el).selected();
		$(el).next('.am-selected').on('click','.am-selected-list li', function(event) {
			var _this = $(this)
			var can = true;
			if ($(this).index()==0){
				setTimeout(function() {
					if ($.inArray('all', $(el).val()) != -1) {
						_this.siblings().each(function(index, el) {
							$(this).addClass('am-checked')
						});
						$(el).find('option').each(function(index, el) {
							$(this).prop('selected', true);
						});
						$(el).next('.am-selected').find('.am-selected-btn span').text('全部')
					} else {
						$(el).find('option').each(function(index, el) {
							$(this).prop('selected', false);
						});
						_this.siblings().each(function(index, el) {
							$(this).removeClass('am-checked')
						});
						$(el).next('.am-selected').find('.am-selected-btn span').text(' ')
					}
				}, 0)
			}else{
				setTimeout(function() {
					var can = true;
					$(el).find('option').not('.all').each(function(index, ell) {
						if (!$(this).is(':selected')) {
							can = false;
						}
					});
					if (can) {
						$(el).find('.all').prop('selected', true);
						$(el).next('.am-selected').find('.am-selected-list li:first-child').addClass('am-checked');
					} else {
						$(el).find('.all').prop('selected', false);
						$(el).next('.am-selected').find('.am-selected-list li:first-child').removeClass('am-checked');
					}
				}, 0)
			}
			// $(el).next('.am-selected').find('.am-selected-status').replaceWith("<font class='am-selected-status am-fl'>"+$(el).attr('placeholder')+"</font>")
			setTimeout(function () {
				var evt = document.createEvent('HTMLEvents');
				evt.initEvent('change', false, true);
				el.dispatchEvent(evt);
			},0)
		});
		$(el).change(function(event) {
			if ($(el).val()) {
				$(el).next('.am-selected').find('.am-selected-btn').addClass('choose_base');
			}else{
				$(el).next('.am-selected').find('.am-selected-btn').removeClass('choose_base');
			}
		});
	}
})
//单日期
Vue.directive("time",{
	inserted:function (el,binding) {
		$(el).datepicker({
			format:"yyyy-mm-dd",
		}).
		on("changeDate.datepicker.amui",function (event) {
			if (event.viewMode == "days") {
				$(this).datepicker('close');
				var date=event.date.toLocaleDateString();
				date = date.replace(/\//g, "-");
				// var month = new Date(event.date.valueOf()).getMonth() + 1
				// month = month >= 10 ? month : '0' + month;
				// var nowDate = new Date(event.date.valueOf()).getFullYear() + '-' + month;
				$(el).prop('value', date)
				setTimeout(function () {
					var evt = document.createEvent('HTMLEvents');
					evt.initEvent('change', false, true);
					el.dispatchEvent(evt);
				},0)
			}

		})
	}
})
Vue.directive('drag',{
	inserted:function (el) {
		var params = {
			left: 0,
			top: 0,
			currentX: 0,
			currentY: 0,
		};
		var bar=$(el).find('.drag')[0];
		//获取相关CSS属性
		var getCss = function(o,key){
			return o.currentStyle? o.currentStyle[key] : document.defaultView.getComputedStyle(o,false)[key];
		};
		//拖拽的实现

		//o是移动对象
		bar.onmousedown = function(event){
			if(getCss(el, "left") !== "auto"){
				params.left =el.offsetLeft;
			}
			if(getCss(el, "top") !== "auto"){
				params.top =el.offsetTop;
			}
			if(!event){
				event = window.event;
				//防止IE文字选中
				bar.onselectstart = function(){
					return false;
				}
			}
			var e = event;
			var width=$(el).width()/2;
			var height=$(el).height()/2;
			params.currentX = e.clientX;
			params.currentY = e.clientY;
			// disX = event.clientX - oDrag.offsetLeft;    
			// disY = event.clientY - oDrag.offsetTop;
			// console.log(params.left)
			$(document).mousemove(function(event){
				var e = event ? event: window.event;
				var nowX = e.clientX;
				var nowY = e.clientY;
				var disX = nowX - params.currentX;
				var disY = nowY - params.currentY;
				if (parseInt(params.left) + disX-width>=0&&parseInt(params.left) + disX+width<=window.innerWidth) {
					el.style.left = parseInt(params.left) + disX + "px";
				}else if (parseInt(params.left) + disX-width<=0) {
					el.style.left =width+'px';
				}else if (parseInt(params.left)+disX+width>=window.innerWidth) {
					el.style.left =window.innerWidth-width+'px';
				}

				if (parseInt(params.top) + disY-height>=0&&parseInt(params.top) + disY +height<=$(window).height()) {
					el.style.top = parseInt(params.top) + disY + "px";
				}else if (parseInt(params.top) + disY -height<=0){
					el.style.top=height+'px';
				}else if (parseInt(params.top) + disY +height>=$(window).height()) {
					el.style.top=$(window).height()-height+'px';
				}
				// if (typeof callback == "function") {
				// callback(parseInt(params.left) + disX, parseInt(params.top) + disY);
				// }
			})
			document.onmouseup = function(){
				$(document).unbind('mousemove');
				if(getCss(el, "left") !== "auto"){
					params.left = getCss(el, "left");
				}
				if(getCss(el, "top") !== "auto"){
					params.top = getCss(el, "top");
				}
			};
		};


	}
})


//全局混合
Vue.mixin({
	methods:{
		//弹框显示
		show_alert(obj){
		    this.$set(this.alert,obj,true)
		},
		//弹框隐藏
		hide_alert(obj){
		    this.$set(this.alert,obj,false)
		},
		//获得当前月份
		getMonth: function() {
			var month = new Date().getMonth() + 1;
			month = month >= 10 ? month : '0' + month;
			var nowDate = new Date().getFullYear() + '-' + month;
			return nowDate;
		},
        //深拷贝对象
        copy(obj){
        	return JSON.parse(JSON.stringify(obj))
        },
        //千位分割
        toThousands(num) {
            num+=''
            num=num.split('.')
            if (num[1]) {
                return num[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')+'.'+num[1]
            }
            return num[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
        },
	}
})
//开始结束日期渲染
// Vue.directive("")

// //创建之前data和$el都还未初始化
// beforeCreate() {
//     console.log(1)
// },
// //表示创建了data还未渲染$el
// created(){
//     console.log(2)
// },
// //data和$el都已经渲染但是数据还未同步到dom
// beforeMount(){
//     console.log(3)
// },
// //数据也渲染完成
// mounted(){
//     console.log(4)
// },
// //数据更新前
// beforeUpdate(){
//     console.log(5)
// },
// //数据更新完成
// updated(){
//     console.log(6)
// },
// //组件销毁前
// beforeDestory(){
//     console.log(7)
// },
// //组件销毁完成
// destoryed(){
//     console.log(8)
// }
//方法
//methods:{
//    console.log(9)
// }
//计算属性
// computed:{
// }

