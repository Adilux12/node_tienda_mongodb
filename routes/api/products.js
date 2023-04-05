const router = require('express').Router();

const Product = require('../../models/product.model');

router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

router.get('/department/:departmentName', async (req, res) => {
    const { departmentName } = req.params
    try {
        const products = await Product.find({
            department: { $eq: departmentName }
        })
        res.json(products)
    } catch {
        res.json({ fatal: error.message })
    }
});

router.get('/price/:minPrice', async (req, res) => {
    const { minPrice } = req.params;
    try {//$gte,$lt,$lte,$eq, $neq, $in
        //Buscar productos de mayor igual minPrice y available
        const products = await Product.find({
            price: { $gte: minPrice },
            available: true
        });
        res.json(products);
    } catch (error) {
        res.json({ fatal: error.message })
    }
})

router.get('/:productId', async (req, res) => {
    const { productId } = req.params;

    try {
        const product = await Product.findById(productId);
        res.json(product);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.json(newProduct);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

router.put('/stock', async (req, res) => {
    try {
        const products = await Product.updateMany(
            {
                available: true,
                stock: { $lte: 10 } //menor que 10
            },
            { available: false }//cambia available a false
        );
        res.json(products);

    } catch (error) {
        res.json({ fatal: error.message })
    }
})

router.put('/:productId', async (req, res) => {
    const { productId } = req.params;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });
        res.json(updatedProduct);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});


router.delete('/:productId', async (req, res) => {
    const { productId } = req.params
    try {
        const deleteProduct = await Product.findByIdAndDelete(productId)
        res.json(deleteProduct);
    } catch (error) {
        res.json({ fatal: error.message })
    }
})

module.exports = router;