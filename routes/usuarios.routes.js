import { Router } from 'express'
import { get_usuarios, get_usuarios_byID, add_usuario, modificar_estado_usuario, delete_usuario } from "../utils/usuarios.js"
const router = Router()

//muestra todos los usuarios
router.get("/", (req, res) => {
  const result = get_usuarios();
  res.status(200).json(result);
});

//elije usuario por id
router.get('/byID/:id', (req, res)=>{
    const id = parseInt (req.params.id)
    const result = get_usuarios_byID(id)

    if(result){
        res.status(200).json(result)
    }else{
        res.status(404).json(`El usuario con el ID ${id} no se encuentra`)
    }
})

//agregar usuario
router.post("/", async (req, res) => {
    try {
        const nuevoUsuario = await add_usuario(req.body);
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        res.status(500).json("Error al agregar usuario");
    }
});

//modificar estado "true" o "false"
router.put("/:id/estado", async (req, res) => {
  const id = parseInt(req.params.id);
  const { activo } = req.body;

  try{
    const result = await modificar_estado_usuario(id, activo);

    if (result) {
        res.status(200).json(result);
    } else {
    res.status(404).json(`El usuario con el ID ${id} no se encuentra`);
    }

    } catch (error){
        res.status(500).json("Error al modificar estado");
    }
});

//eliminar usuario
router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const result = await delete_usuario(id);

    if (result === "TIENE_VENTAS") {
      res.status(400).json("No se puede eliminar porque tiene ventas asociadas");
    } else if (result) {
      res.status(200).json("Usuario eliminado");
    } else {
      res.status(404).json("No se encontró al usuario");
    }

  } catch (error) {
    res.status(500).json("Error al eliminar usuario");
  }
});
export default router