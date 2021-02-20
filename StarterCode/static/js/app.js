function updatePlot(singleId) {
    // Using d3 to Read in samples.json
    d3.json("samples.json").then((importedData) => {
        // Data
        var data = importedData;
        console.log("Data",data);
        
        // Array of Ids
        var ids = data.names;
        console.log("IDs",ids);

        // Array of Metadata
        var metadata = data.metadata;
        console.log("MetaData",metadata);

        // Array of Samples
        var samples = data.samples;
        console.log("Samples",samples);

        //Filter Samples
        var filterSamples = samples.filter(sampleObject => sampleObject.id == singleId)[0];
        var sampleValues = filterSamples.sample_values;
        console.log(sampleValues);
        
        // Array of Ids Labels
        var labels = ids.map(d => "OTU " + d);
        console.log(labels);

    });
}
updatePlot();

