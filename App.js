import ProductManager from "./Clases/productManager.js";



///IMPORTACIONES Y SERVIDORES
import express from "express";

const PORT = 8080;


const app = express()

app.use(express.json())

app.get("/", (req,res)=>{
  res.send("Hola Buenos días")
})

app.listen(PORT, ()=>{
  console.log(`Server listening on port ${PORT}`)
})

//pedido de productos por ID
app.get("/products/:pid", async (req,res)=>{
    const pid = req.params.pid
    res.send(await ejecutar.getProductById(parseInt(pid)))
  })
  
  //Pedido de listado completo
  app.get("/products/:limit?", async (req,res)=>{
    const limit = parseInt(req.query.limit)
    res.send(await ejecutar.getProducts(limit))
  })

const ejecutar = new ProductManager();

//////////////////////////////////////////////////////////////////////////////////////

/////////////////// npm start para correr el programa/////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////

/* rutas para el testing desde navegador

http://localhost:8080/products  ===> RETORNA LISTADO COMPLETO

http://localhost:8080/products?limit={#} ===> RETORNA EL LISTADO CON TOPE DE ENTRADAS

http://localhost:8080/products/{id del producto} ===> RETORNA PRODUCTO QUE COINCIDA CON NRO DE ID


*/

//////////////////////////////////////////////////////////////////////////////////////



