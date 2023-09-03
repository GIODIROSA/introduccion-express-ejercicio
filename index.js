const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

app.listen(3000, console.log("¡Servidor encendido!"));

app.use(express.json());
app.use(cors());

app.post("/canciones", (req, res) => {
  const cancion = req.body;
  const canciones = JSON.parse(fs.readFileSync("canciones.json"));
  canciones.push(cancion);
  fs.writeFileSync("canciones.json", JSON.stringify(canciones));
  res.send("¡Canción agregado con éxito!");
});

app.get("/canciones", (req, res) => {
  const canciones = JSON.parse(fs.readFileSync("canciones.json"));
  res.json(canciones);
});

app.put("/canciones/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  const cancion = req.body;
  const canciones = JSON.parse(fs.readFileSync("canciones.json"));
  const index = canciones.findIndex((p) => p.id == id);
  canciones[index] = cancion;
  fs.writeFileSync("canciones.json", JSON.stringify(canciones));
  res.send("La canción fue modificada con éxito");
});

app.delete("/canciones/:id", (req, res) => {
  const { id } = req.params;
  const canciones = JSON.parse(fs.readFileSync("canciones.json"));

  const index = canciones.findIndex((cancion) => cancion.id == id);

  if (index !== -1) {
    canciones.splice(index, 1);
    fs.writeFileSync("canciones.json", JSON.stringify(canciones));
    res.send("La canción fue eliminada con éxito");
  } else {
    res.status(404).send("No se encontró la canción con el ID proporcionado");
  }
});
