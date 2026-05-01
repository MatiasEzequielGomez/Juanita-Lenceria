import { readFile } from "fs/promises";

const fileVentas = await readFile("./data/ventas.json", "utf-8");
const ventasData = JSON.parse(fileVentas);

export const get_ventas_by_fecha = (from, to) => {
  const result = ventasData.filter(e => e.fecha >= from && e.fecha <= to);

  return result;
};

export const get_ventas_by_usuarioID = (id) => {
  const result = ventasData.filter(e => e.id_usuario === id);

  return result;
};