function updatePlot(singleId) {
    // Using d3 to Read in samples.json
    d3.json("samples.json").then((importedData) => {
        // Data
        var data = importedData;
        console.log("Data",data);

        // Array of Metadata
        var metadata = data.metadata;
        console.log("MetaData",metadata);

        // Array of Samples
        var samples = data.samples;
        console.log("Samples",samples);

        // Filter Samples
        var filterSamples = samples.filter(sampleObject => sampleObject.id == singleId)[0];
        // Seeking Sample Values, OTU_Ids, and OTU_Label
        var sampleValues = filterSamples.sample_values;
        var OTU_Ids = filterSamples.otu_ids;
        var OTU_Labels = filterSamples.otu_labels;
        // Grabbing the Top 10 and Reversing to Account for Plotly's Defaults
        var top10Samples = sampleValues.slice(0, 10).reverse();
        var top10Otus = OTU_Ids.slice(0, 10).reverse();
        var top10Labels = OTU_Labels.slice(0, 10).reverse();
        console.log("Top 10 Samples", top10Samples);
        console.log("Top 10 OTU Ids", top10Otus);
        console.log("Top 10 Labels", top10Labels);
     
        // Array of OTU_Ids & OTU_Labels
        var top10OtuIds = top10Otus.map(d => "OTU " + d); // WHY THE .MAP
        console.log(top10OtuIds);
        
        // Array of Ids
        var ids = data.names;
        console.log("IDs",ids);

        var trace = {
            x: top10Samples,
            y: top10OtuIds,
            text: top10Labels,
            type: "bar",
            orientation: "h"
        }

        var chartData = [trace];

        Plotly.newPlot("bar", chartData);

    });
}
updatePlot(940);

