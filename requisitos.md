# API 

## Modelo de Productos

- Recuperar todos los productos
    - GET /api/products
    PRUEBAS:
        - Que la URL funcione (que el status sea 200)
        - Que la respuesta sea en formato JSON
        - Que la respuesta sea un array con productos

- Crear un producto
    - POST /api/products
    - En el body de la petición recibimos todos los datos del nuevo producto
    PRUEBAS:
        - Que la URL funcione y nos devuelva un JSON
        - Que la respuesta disponga de la propiedad _id
        - Que la respuesta tenga los mismos datos que yo inserto

- Editar un producto
    - PUT /api/products/PRODUCTID
    - En el Body recibimos todos los datos a editar
    PRUEBAS:
        - Que la URL funcione y nos devuelva un JSON
        - Comprobar que en la respuesta se ven reflejados los cambios

- Borrar un producto
    - DELETE /api/products/PRODUCTOID
    PRUEBAS: 
        - Que la URL funcione y nos devuelva un JSON
        - Comprobar si el producto se ha borrado de la BD

- Recuperar un único producto
    - GET /api/products/IDPRODUCTO (findById)

- Recuperar una lista de productos por precio

   - GET /api/products/price/PRICE

- Recuperar una lista de productos por departamento

   - GET /api/products/department/DEPARTAMENTO


- Colocar como NO DISPONIBLES a todos aquellos productos que esten disponible y su stock sea menor de 10


### Modelo de USER

- Url para registrar usuarios
   - POST /api/user/register
   - Dentro del body recibimos todos los datos del usuario
   - Insertamos un documento nuevo por cada petición