const mongoose = require('mongoose');
const Product = require('../schemas/product/productSchema');
const Categories = require('../schemas/product/productCategorySchema');
const productAggregations = (offset = 0, limit = 30) => {
    return [
        {
            $project: {
                name: 1,
                inventory: 1,
                brand_id: 1,
                reviews: 1,
                reviewCount: {
                    $size: '$reviews'
                },
                numOfColor: 1,
                price: 1,
                discount_id: 1
            },

        }, {
            $lookup: {
                from: 'brands',
                pipeline: [{
                    $project: {
                        _id: 1,
                        name: 1
                    }
                }],
                localField: 'brand_id',
                foreignField: '_id',
                as: 'brand'
            }
        }, {
            $lookup: {
                from: 'reviews',
                localField: 'reviews',
                foreignField: '_id',
                as: 'reviews'
            }
        }, {
            $lookup: {
                from: 'discounts',
                localField: 'discount_id',
                foreignField: '_id',
                as: 'discounts'
            }
        }, {
            $project: {
                name: 1,
                id: 1,
                brand: { $getField: { field: 'name', input: { $first: "$brand" } } },
                image: { $first: { $getField: { field: 'images', input: { $first: "$inventory" } } } },
                numOfColor: 1,
                star: { $cond: { if: { $gt: ['$reviewCount', 0] }, then: { $divide: [{ $sum: '$reviews.star' }, '$reviewCount'] }, else: 0 } },
                price: 1,
                discounts: {
                    $filter: {
                        input: '$discounts',
                        as: 'discount',
                        cond: { $ne: ['$$discount.active', false] }
                    }
                },
                reviewCount: 1,

            },

        },
        {
            $project: {
                name: 1,
                id: 1,
                brand: 1,
                image: 1,
                numOfColor: 1,
                star: 1,
                price: 1,
                total: { $multiply: [{ $divide: [{ $subtract: [100, { $sum: '$discounts.discount_percent' }] }, 100] }, '$price'] },
                reviewCount: 1,

            },

        },
        { $sort: { createdAt: -1 } },
        { $skip: offset },
        { $limit: limit },

    ];
};

const getProductList = async (req, res) => {
    var user = await req.user;
    var limit = Number(req.query.limit) || 30
    var offset = Number(req.query.page - 1) * limit || 0
    var products = await Product.aggregate(productAggregations(offset, limit))
    products = products.map((el) => {
        if (!user) {
            el.islike = false;
            return el;
        }
        if (user.wishlist.includes(el._id)) {
            el.islike = true
            return el;
        } else {
            el.islike = false;
            return el;
        }

    })
    res.send(products)
}
async function getProductListBysearch(req, res) {
    var user = await req.user;
    var limit = Number(req.query.limit) || 30
    var offset = Number(req.query.page - 1) * limit || 0
    const gender = req.params.gender;
    var { color, brand, size, price } = req.query;
    if(size){
        size = size.split('-');
        size = size.map((e)=>{
            return {sizearray:{$in:[e]}}
        })
    }else{
        size = [{}];
    }



    var colors;
    if (color) {
        color = color.split('-');
        colors = { colorarray: { $in: color } }
    } else {
        colors = {}
    };
    if (brand) {
        brand = brand.split('-');
        brand = brand.map((e) => {
            return { brand: e }
        })
    } else {
        brand = [{}]
    };
    let priceL, priceU;
    if (price) {
        priceL = Number(price.split('-')[0]);
        priceU = Number(price.split('-')[1])
    } else {
        priceL = 0;
        priceU = 9999999999;
    }
    if (req.params.search == 'all') {
       a = [{}]
    }else
   { a = req.params.search.split('-');
    a = a.map((e)=>{
        return { category: { $in: [e] } }
    })}
    var products = await Product.aggregate([{
        $lookup: {
            from: 'productcategories',
            pipeline: [{
                $project: {
                    _id: 0,
                    name: 1
                }
            }],
            localField: 'categories',
            foreignField: '_id',
            as: 'category'
        }
    }, {
        $addFields: {
            category: '$category.name',
            colorarray: {
                $map: {
                    input: '$inventory',
                    as: 'elem',
                    in: { $getField: { field: 'color', input: '$$elem' } }
                }
            },
            numOfColor: { $size: '$inventory' },
        }
    }
        , {
        $match: {
            $and: [
                { category: { $in: [gender] } },
                {$or:a},
                colors
            ]
        }
    },
    { $addFields:{
        inventory: {
            $filter:{
                input: '$inventory',
                as: 'e',
                cond: {$in:[{$getField: { field: 'color', input: '$$e' }},color?color:'$colorarray']}
            }
        }
    }
        
    },{
        $addFields:{
        sizearray: {
            $map: {
                input: '$inventory',
                as: 'elem',
                in: {                   
                        $map:{
                            input: {$getField: { field: 'sizeAndCount', input: '$$elem' }},
                            as:'elem2',
                            in:{
                                $arrayElemAt:['$$elem2',0]
                            }
                        }                   
                    }
            }
        }
        }
    },
    {
        $addFields:{
           "sizearray":{
            $reduce: {
              input: '$sizearray',
              initialValue: [],
              in: {$concatArrays: ['$$value', '$$this']}
            }
          }
        }
    },{
        $match:{
            $or: size
        }
    },
     ...productAggregations(offset, limit),
    {
        $match: {
            $and: [
                { $or: brand },
                { $expr: { $gte: ['$total', priceL] } },
                { $expr: { $lte: ['$total', priceU] } }

            ]
        }
    }
    ]);
    console.log(products)
    products = products.map((el) => {
        if (!user) {
            el.islike = false;
            return el;
        }
        if (user.wishlist.includes(el._id)) {
            el.islike = true
            return el;
        } else {
            el.islike = false;
            return el;
        }

    })
    res.send(products)
}

module.exports = {
    getProductList,
    getProductListBysearch
}