const Base = require('../base.js');

module.exports = class extends Base {
	__before() {
		return this.checkAuth()
	}
	
	indexAction() {
		return this.json({msg:"admin page"})
	}

	async productlistAction(){
		let page = this.get('page')?this.get('page'):1;
		let productlist = await this.model('product')
		    .join({
		        table:'category',
		        join:"left",
		        as:'l',
		        on:['categoryid','id']
		    })
		    .field('cmswing_product.id,cmswing_product.title,cmswing_product.imgs,cmswing_product.price,categoryid,price,sku,content,name as category')
		    .page(page,10).select();
		    let total = await this.model("product").count()
		    return this.json({productlist,total})
	}
	
	// 删除
	async delproductAction(){
	     let productid = this.get('id');
	     await this.model('product').where({id:productid}).delete()
	     this.json({
	         "msg":"删除成功"
	     })
	}
	
	// 添加
	async addproductAction(){
	    if(this.method=='POST'){
	        let product = this.post();
	        this.model('product').add(product);
	        this.json({msg:"添加成功"})
	    }
	}
	
	//更新
	 async editproductAction(){
	    if(this.method=='POST'){
	        let product = this.post();
			// 解构
			let tempProduct = {...product};
			delete tempProduct.id;
	        await this.model('product').where({id:product.id}).update(tempProduct)
	        this.json({msg:"更新成功"})
	    }
	}
};
