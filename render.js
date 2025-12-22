export function renderDotPlot(points, seq1, seq2, window) {
    d3.select("#dotplot").selectAll("*").remove();

    const width = 600;
    const height = 600;
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select("#dotplot")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    const plotArea = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleLinear()
        .domain([0, seq1])
        .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
        .domain([0, seq2])
        .range([innerHeight, 0]); // Invertido para que Y crezca hacia arriba

    // Ejes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    plotArea.append("g")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(xAxis);

    plotArea.append("g")
        .call(yAxis);

    // Puntos
    plotArea.selectAll("circle")
        .data(points)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.x))
        .attr("cy", d => yScale(d.y))
        .attr("r", 2)
        .attr("fill", "blue");
}
