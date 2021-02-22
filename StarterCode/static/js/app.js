function buildPlots(singleId) {
    // Using d3 to Read in samples.json
    d3.json("samples.json").then((importedData) => {
        // Data
        var data = importedData;

        // Array of Metadata
        var metadata = data.metadata;

        // Array of Samples
        var samples = data.samples;

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
     
        // Array of OTU_Ids & OTU_Labels
        var top10OtuIds = top10Otus.map(d => "OTU " + d); // WHY THE .MAP;

        // Create Trace for Bar Plot
        var trace = {
            x: top10Samples,
            y: top10OtuIds,
            text: top10Labels,
            type: "bar",
            orientation: "h"
        }

        // Create Trace1 for Bubble Chart
        var trace1 = {
            x: OTU_Ids,
            y: sampleValues,
            marker: sampleValues,
            text: OTU_Labels,
            mode: "markers",
            marker: {
                color: OTU_Ids,
                opacity: [1, 0.8, 0.6, 0.4],
                size: sampleValues
            }
        }

        var layout = {
            showlegend: false,
            height: 900,
            width: 930
          }

        var chartData = [trace];
        var chartData1 = [trace1];

        Plotly.newPlot("bar", chartData);
        Plotly.newPlot("bubble", chartData1, layout);
    });
}

// Calling Function to Build Plots
buildPlots(940);

// // On Change to DOM, Call dropDown
// d3.selectAll("#selDataset").on("change", dropDown);

// function dropDown() {
//     // Selecting Id
//     var dropDownMenu = d3.select("#selDataset");
//     // Assign the Value of the Dropdown Menu to a Variable
//     var id = dropDownMenu.property("value");
    
//     d3.json("samples.json").then((importedData) => {
//         // Data
//         var data = importedData;
//         for (var i=0; i<data.names.length; i++) {
//             if (id == data.names[i]) {
//                 buildPlots(i);
//                 return
//             }
//         }
//     });
// }

// dropDown();

