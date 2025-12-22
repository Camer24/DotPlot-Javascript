import { computeDotPlot } from "./dotplot.js";
import { renderDotPlot } from "./render.js";

async function fetchById(id) {
  const res = await fetch(`http://localhost:5001/fetch?id=${id}`);
  const data = await res.json();

  if (!data.sequence) {
    throw new Error("No se pudo obtener secuencia para el ID " + id);
  }

  return data.sequence;
}

export function toggleManual(n) {
  const checkbox = document.getElementById(`manual${n}`);
  const textarea = document.getElementById(`seq${n}`);
  const inputId = document.getElementById(`id${n}`);

  if (checkbox.checked) {
    textarea.classList.remove("hidden");
    inputId.disabled = true; 
  } else {
    textarea.classList.add("hidden");
    inputId.disabled = false;
  }
}

window.toggleManual = toggleManual;

document.getElementById("compareBtn").addEventListener("click", async () => {
  try {
    let seq1;
    if (document.getElementById("manual1").checked) {
      const seq = document.getElementById("seq1").value.trim();
      if (!seq) return alert("Ingrese la secuencia 1.");
      seq1 = seq.toUpperCase().replace(/[^A-Z]/g, "");
    } else {
      const id = document.getElementById("id1").value.trim();
      if (!id) return alert("Ingrese el ID de la proteína 1.");
      const data = await fetchById(id);
      seq1 = data;
    }

    let seq2;
    if (document.getElementById("manual2").checked) {
      const seq = document.getElementById("seq2").value.trim();
      if (!seq) return alert("Ingrese la secuencia 2.");
      seq2 = seq.toUpperCase().replace(/[^A-Z]/g, "");
    } else {
      const id = document.getElementById("id2").value.trim();
      if (!id) return alert("Ingrese el ID de la proteína 2.");
      const data = await fetchById(id);
      seq2 = data;
    }

    const windowSize = parseInt(document.getElementById("window").value);
    const threshold = parseInt(document.getElementById("threshold").value);

    const { points, totalMatches } = computeDotPlot(
      seq1,
      seq2,
      windowSize,
      threshold
    );

    document.getElementById("dotplot").innerHTML = "";
    renderDotPlot(points, seq1.length, seq2.length);

    document.getElementById(
      "result"
    ).innerHTML = `Matches encontrados: <b>${totalMatches}</b>`;
  } catch (err) {
    alert("Error: " + err.message);
  }
});
