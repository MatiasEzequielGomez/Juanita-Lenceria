import { Router } from 'express'
import { add_producto, update_precio_producto, delete_producto } from "../utils/productos.js"

const router = Router();

//agregar productos 
router.post("/", async (req, res) => {
  try {
    const nuevoProducto = await add_producto(req.body);
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json("Error al agregar producto");
  }
});

//modificar precio de productos 
router.put("/:id/precio", async (req, res) => {
  const id = parseInt(req.params.id);
  const nuevoPrecio = req.body.precio;

  try {
    const result = await update_precio_producto(id, nuevoPrecio);

    if (result) {
      res.status(200).json("Precio modificado");
    } else {
      res.status(404).json("No se encontró el producto");
    }

  } catch (error) {
    res.status(500).json("Error al modificar precio");
  }

});

//eliminar producto
router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const result = await delete_producto(id);

    if (result === "TIENE_VENTAS") {
      res.status(400).json("No se puede eliminar porque tiene ventas asociadas");
    } else if (result) {
      res.status(200).json("Producto eliminado");
    } else {
      res.status(404).json("No se encontró el producto");
    }

  } catch (error) {
    res.status(500).json("Error al eliminar producto");
  }
});

export default router;