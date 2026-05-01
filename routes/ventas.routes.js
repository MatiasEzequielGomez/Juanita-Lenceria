import { Router } from "express";
import { get_ventas_by_fecha,  get_ventas_by_usuarioID } from "../utils/ventas.js";

const router = Router();

//ventas por fecha
router.get("/byDate/:from/:to", (req, res) => {
  const from = req.params.from;
  const to = req.params.to;

  try {
    const result = get_ventas_by_fecha(from, to);

    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json(`No hay ventas entre ${from} y ${to}`);
    }

  } catch (error) {
    res.status(500).json("Error al buscar ventas por fecha");
  }
});

//ventas por usuario
router.get("/byUserID/:id", (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const result = get_ventas_by_usuarioID(id);

    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json(`No hay ventas del usuario ${id}`);
    }

  } catch (error) {
    res.status(500).json("Error al buscar ventas del usuario");
  }
});
export default router;