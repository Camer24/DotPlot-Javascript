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
