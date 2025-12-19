// export function getMatches(seq1, seq2, window) {
//     const points = [];
//     let matchCount = 0;

//     for (let i = 0; i <= seq1.length - window; i++) {
//         for (let j = 0; j <= seq2.length - window; j++) {

//             //se compara la secuencias dentro de la ventana establecida
//             const sub1 = seq1.substring(i, i + window);
//             const sub2 = seq2.substring(j, j + window);

//             if (sub1 === sub2) {
//                 matchCount++; //si coinciden, se cuenta el match 
//                 points.push({ x: i, y: j }); //se almacena el punto para luego graficarlo
//             }
//         }
//     }

//     return [matchCount, points];
// }

export function computeDotPlot(seq1, seq2, window, threshold) {

    const points = [];
    let totalMatches = 0;

    for (let i = 0; i < seq1.length - window + 1; i++) {
        for (let j = 0; j < seq2.length - window + 1; j++) {

            let matches = 0;

            // comparar ventana correctamente
            for (let k = 0; k < window; k++) {
                if (seq1[i + k] === seq2[j + k]) {
                    matches++;
                }
            }

            if (matches >= threshold) {
                points.push({ x: i, y: j });
                totalMatches++;
            }
        }
    }

    return { points, totalMatches };
}
