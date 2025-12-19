export function renderDotPlot(points, seq1, seq2, window) {

    // Limpiar gráfico previo
    d3.select("#dotplot").selectAll("*").remove();

    const width = 600;
    const height = 600;

    //crea una etiqueta <svg> dentro del contenedor
    const svg = d3.select("#dotplot")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    //setea las escalas de los ejes de coordenadas segun el tamaño de las cadenas 
    const xScale = d3.scaleLinear()
        .domain([0, seq1]) //datos
        .range([0, width]); //mapeo a pixeles de pantalla

    const yScale = d3.scaleLinear()
        .domain([0, seq2])
        .range([0, height]);

    // Grafico de los puntos
    svg.selectAll("circle")
        .data(points)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.x))
        .attr("cy", d => yScale(d.y))
        .attr("r", 2)
        .attr("fill", "blue");
}