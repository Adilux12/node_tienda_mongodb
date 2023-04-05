const router = require('express').Router();
const bcrypt = require('bcryptjs');

const User = require('../../models/user.model');
const { createToken } = require('../../helpers/utils');
const { checkToken } = require('../../helpers/middleware')

router.get('/buy/:productId', checkToken, async (req, res) => {
    const { productId } = req.params;
    //console.log(productId, req.user._id)
    req.user.cart.push(productId);//inserta idproduct dentro de cart que creaste en Schema user
    await req.user.save();//Guarda en la modificacion base de datos

    res.json({ success: 'Producto agregado' })
})

router.get('/cart', checkToken, (req, res) => {
    res.json(req.user.cart);
})

router.post('/register', async (req, res) => {

    req.body.password = bcrypt.hashSync(req.body.password, 8);//donde encritar y la dificulatad

    try {
        const newuser = await User.create(req.body)
        res.json(newuser);
    } catch (error) {
        res.json({ fatal: error.message })
    }
})

router.post('/login', async (req, res) => {

    try {
        //Comprobamos si el email esta 
        const user = await User.findOne({ email: req.body.email })
        console.log(req.body.email)//saca emiil
        console.log(req.body.password);
        if (!user) {
            return res.json({ fatal: 'Error en usuario y/o contraseña' })
        }

        const iguales = bcrypt.compareSync(req.body.password, user.password);
        if (!iguales) {
            return res.json({ fatal: "Error en usuario y/o contraseña" })
        }
        res.json(
            {
                success: "Login correcto!!",
                token: createToken(user)
            })
    } catch (error) {
        res.json({ fatal: error.message })
    }

});



module.exports = router