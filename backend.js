const express = require("express");
const path = require("path");
const fs = require("fs");
const fasta = require("bionode-fasta");

const axios = require("axios");

const app = express();

// CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.get("/fetch", async (req, res) => {
    const id = req.query.id;

    if (!id) {
        return res.status(400).json({ error: "Falta parámetro id" });
    }

    const url = `https://www.rcsb.org/fasta/entry/${id}`;

    try {
        const response = await axios.get(url);
        const fastaText = response.data;

        // guardar archivo temporal
        const tempPath = path.join(__dirname, `temp_${id}.fasta`);
        fs.writeFileSync(tempPath, fastaText);

        let result = null;

        fasta
            .obj(tempPath)
            .on("data", record => {
                result = {
                    id: record.id,
                    sequence: record.seq
                };
            })
            .on("end", () => {
                fs.unlinkSync(tempPath);
                res.json(result);
            })
            .on("error", err => {
                res.status(500).json({ error: err.message });
            });

    } catch (err) {
        res.status(500).json({ error: "No se pudo descargar el FASTA. ¿ID correcto?" });
    }
});

app.listen(5001, () => {
    console.log("Servidor Node escuchando en http://localhost:5001");
});

