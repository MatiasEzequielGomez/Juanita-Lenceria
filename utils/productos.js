import { readFile, writeFile } from "fs/promises";

const fileProductos = await readFile('./data/productos.json', 'utf-8')
const productosData = JSON.parse(fileProductos)

//agregar productos 
export const add_producto = async (nuevoProducto) => {
  const nuevoId = productosData.length > 0 ? productosData[productosData.length - 1].id + 1 : 1;

  const producto = {
    id: nuevoId,
    nombre: nuevoProducto.nombre,
    desc: nuevoProducto.desc,
    categoria: nuevoProducto.categoria,
    tipo: nuevoProducto.tipo,
    precio: nuevoProducto.precio,
    imagen: nuevoProducto.imagen
  };

  productosData.push(producto);

  await writeFile("./data/productos.json", JSON.stringify(productosData, null, 2));

  return producto;
};

//modificar precio de productos 
export const update_precio_producto = async (id, nuevoPrecio) => {
  const index = productosData.findIndex(e => e.id === id);

  if (index !== -1) {

    productosData[index].precio = nuevoPrecio;

    await writeFile("./data/productos.json", JSON.stringify(productosData, null, 2));

    return productosData[index];

  } else {
    return null;
  }
};

//eliminar producto
export const delete_producto = async (id) => {
  const index = productosData.findIndex(e => e.id === id);

  if (index !== -1) {

    const fileVentas = await readFile("./data/ventas.json", "utf-8");
    const ventasData = JSON.parse(fileVentas);


    const tieneVentas = ventasData.some(venta =>
        venta.productos.some(e => e.id_producto === id)
    );

    if (tieneVentas) {
      return "TIENE_VENTAS";
    }

    const productoEliminado = productosData.splice(index, 1);

    await writeFile("./data/productos.json", JSON.stringify(productosData, null, 2));

    return productoEliminado[0];

  } else {
    return null;
  }
};