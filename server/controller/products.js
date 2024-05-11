const ProductSchema = require("../model/productModel");

//create products 

exports.createProducts = async (req, res) => {
    try {
        const { productName, description, price } = req.body;
        console.log("product", productName, description, price)

        if (!productName || !description || !price) {
            return res.status(400).json({
                success: false,
                message: "products filed is missing!"
            })
        }


        const productsData = await ProductSchema.create({ productName, description, price });

        return res.status(201).json({
            success: true,
            data: productsData,
            message: "products created"

        })

    }
    catch (error) {
        return res.status(501).json({
            success: false,
            message: error.message
        })
    }
}

//find products by Id

exports.findProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "missing ID"
            })
        }

        const productData = await ProductSchema.findById({ _id: id });
        return res.status(201).json({
            success: true,
            data: productData,
            message: "get products"
        })


    }
    catch (error) {
        return res.status(501).json({
            success: false,
            message: error.message
        })

    }
}


//update by id 

exports.editProduct = async (req, res) => {
    try {
        const {id}=req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "missing ID"
            })
        }
        const {productName ,description ,price}=req.body;

        const updatedData=await ProductSchema.findByIdAndUpdate({_id:id},{productName ,description ,price},{new:true});

        return res.status(201).json({
            success: true,
            data:updatedData,
            message: "product updated successfully"
        })

    } catch (error) {
        return res.status(501).json({
            success: false,
            message: error.message
        })
    }
}

// delete by id 

exports.deleteProduct=async(req ,res)=>{
    try{
        const {id}=req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "missing ID"
            })
        }

        const deleteProduct=await ProductSchema.findByIdAndDelete({_id:id});

        return res.status(201).json({
            success:true ,
            data:deleteProduct,
            message:"product deleted"
        })

        
    }
    catch(error){
        return res.status(501).json({
            success: false,
            message: error.message
        })

    }
}