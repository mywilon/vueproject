var vm=new Vue({
	el:"#app",
	data:{
		delFlag:false,
		productList:[],
		checkAllFlag:false,
		curProduct:'',
	},
	filters:{
		formatMoney(value){
			return "￥"+value.toFixed(2);
		}
	},
	mounted:function(){
		this.$nextTick(function(){
			this.cartView();
		});
	},
	computed:{
		totalPrice:function(){
			var total=0;
			this.productList.forEach(function(item,index){
				if(item.checked){
					total+=item.productPrice*item.productQuantity;
				}
			});
			return total
		}
	},
	methods:{
		cartView:function(){
			this.$http.get('data/cartData.json',{id:1}).then(res=>{
				this.productList=res.data.result.list;
			});
		},
		changeMoney:function(product,type){
			if(type){
				product.productQuantity++;
			}else if(product.productQuantity>1){
				product.productQuantity++;
			}
		},
		selectedPro:function(product){
			if(!product.checked){
				Vue.set(product,"checked",true);
			}else{
				product.checked=!product.checked;
			}
			var num=0;
			this.productList.forEach(function(item,index){
				if(item.checked){
					num++;
				}
			});
			if(num==this.productList.length){
				this.checkAllFlag=true;
			}else{
				this.checkAllFlag=false;
			}
		},
		checkAll:function(flag){
			this.checkAllFlag = flag;
			//进行遍历
			this.productList.forEach(function(item,index){
				if(!item.checked){
					Vue.set(item,"checked",flag);
				}else{
					item.checked=flag;
				}
			});
		},
		delConfirm:function(item){
			this.curProduct=item;
			this.delFlag=true;
		},
		delSure:function(){
			//获取要删除的那个元素在数组的位置
			var index=this.productList.indexOf(this.curProduct);
			this.productList.splice(index,1);
			this.delFlag=false;
		}
	}
});