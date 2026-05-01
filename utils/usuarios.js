import { readFile, writeFile } from "fs/promises";

const fileUsuarios = await readFile('./data/usuarios.json', 'utf-8')
const userData = JSON.parse(fileUsuarios)

export const get_usuarios = () => {
  return userData;
}

export const get_usuarios_byID = (id) => {
    return userData.find(e => e.id === id)
}

export const add_usuario = async (nuevoUsuario) => {
  const nuevoId = userData.length > 0 ? userData[userData.length - 1].id + 1 : 1;

  const usuario = {
    id: nuevoId,
    nombre: nuevoUsuario.nombre,
    apellido: nuevoUsuario.apellido,
    email: nuevoUsuario.email,
    contraseña: nuevoUsuario.contraseña,
    activo: true
  };

  userData.push(usuario);

  await writeFile("./data/usuarios.json", JSON.stringify(userData, null, 2));

  return usuario;
}

export const modificar_estado_usuario = async (id, activo) => {
  const usuario = userData.find(e => e.id === id);

  if (!usuario) {
    return null;
  }

  usuario.activo = activo;

  await writeFile("./data/usuarios.json", JSON.stringify(userData, null, 2));

  return usuario;
};

export const delete_usuario = async (id) => {
  const index = userData.findIndex(e => e.id === id);

  if (index !== -1) {

    const fileVentas = await readFile("./data/ventas.json", "utf-8");
    const ventasData = JSON.parse(fileVentas);

    const tieneVentas = ventasData.some(e => e.id_usuario === id);

    if (tieneVentas) {
      return "TIENE_VENTAS";
    }

    const usuarioEliminado = userData.splice(index, 1);

    await writeFile("./data/usuarios.json", JSON.stringify(userData, null, 2));

    return usuarioEliminado[0];

  } else {
    return null;
  }
};