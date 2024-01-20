import { promises as fs } from "fs";

export default class ProductManager {
  constructor() {
    (this.products = []), 
    (this.ruta = "./products.json");
  }

  async addProduct(input) {
    //chequeo si todos los campos estan completos para agregar el producto
    const check = Object.values(input).some((valor) => valor === undefined);
    //transformo a objeto el archivo json para chequear por duplicados
    const producto = JSON.parse(await fs.readFile(this.ruta, "utf-8"));
    //chequeo si el producto no esta repetido
    const prod = producto.some((prod) => prod.code === input.code);

    try{

      if (check) {
        console.log("Producto Incompleto");
        return;
      }

      if (prod) {
        console.log("Producto ya agregado");
        return;
      } else {
        this.products.push(input);
        await fs.writeFile(this.ruta, JSON.stringify(this.products));
      }
    }
    catch(e){
      console.error("Error al realizar la operacion", e.message)
    }
  }

  async getProducts(limit) {
    const producto = JSON.parse(await fs.readFile(this.ruta, "utf-8"));

    try{  
      if(!limit) {
        console.log("LISTADO COMPLETO DE PRODUCTOS");
        console.table(producto);
        return producto
      }else{
          let respuesta = []
          for(let i=0; i< limit; i++){
          respuesta = respuesta.concat(producto[i])
          }
      console.table(respuesta)
      return respuesta
      }
    } 

    catch(e){
    console.error("Error al consultar listado", e.message);}
  }

  async getProductById(id) {
    const producto = JSON.parse(await fs.readFile(this.ruta, "utf-8"));
    const produ = producto.find((prod) => prod.ID === id);
  
    try{
      if (produ) {
        console.log(`ENCONTRAMOS EL SIGUIENTE PRODUCTO CON ID: ${id}`);
        console.table(produ);
        return (produ);
      } else {
        console.error(`NO HAY PRODUCTOS CON ID ${id} EN LA BASE DE DATOS `);
      }
      }

    catch(e){
    console.error("Error al intentar operación", e.message);}
  }
  

  async updateProduct(id, edicion) {

    const producto = JSON.parse(await fs.readFile(this.ruta, "utf-8"));
    const index = producto.findIndex((prod) => {return prod.id === id;});

    try{
      if (index !== -1) {
        producto[index] = { ...producto[index], ...edicion };
        console.log(` EL PRODUCTO CON ID: ${id} FUE MODIFICADO `);
        console.log(producto[index]);
        await fs.writeFile(this.ruta, JSON.stringify(producto));
        this.getProducts();
      } else {
        console.log("PRODUCTO NO ENCONTRADO");
      }
    }

    catch(e){
    console.error("Error al actualizar producto:", e.message);
  }

  }

  async deleteProduct(id) {
    const producto = JSON.parse(await fs.readFile(this.ruta, "utf-8"));
    const produ = producto.find((prod) => prod.id === id);

    try{
      if (produ) {
        console.log(`EL SIGUIENTE PRODUCTO HA SIDO ELIMINADO CON EXITO`);
        console.log(produ);
        await fs.writeFile(
          this.ruta,
          JSON.stringify(producto.filter((prod) => prod.id != id))
        );
        this.getProducts();
      } else {
        console.log("producto no encontrado");
      }
    }

    catch(e){
      console.error("Error al realizar la operacion", e.message)
    }
  }
}
