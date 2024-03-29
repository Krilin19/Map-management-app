import React, { useEffect, useState } from 'react';
import ObjectLoader from '@speckle/objectloader';
import { Viewer, DefaultViewerParams, SpeckleLoader } from "@speckle/viewer";
import { CameraController, SelectionExtension } from "@speckle/viewer";
//import Viewer from '@speckle/viewer'


function SpeckleLoader2() {
    const [streamId, setStreamId] = useState('c581c30077'); // State for streamId input
    const [objectId, setObjectId] = useState('ca84caa314c111b5e58305a8240b15b5'); // State for objectId input
    const [serverUrl, setServerUrl] = useState('https://latest.speckle.dev'); // State for serverUrl input
    const [data, setData] = useState([]); // State to store loaded data
    const [levels, setLevels] = useState([]); // State to store loaded data
    const [parameters, setParameters] = useState([]); // State to store loaded data

    const loadSpeckleData = async () => {
        try {

            const token = '73c0008e22'; // Add your token here

            const loader = new ObjectLoader({
                serverUrl,
                token,
                streamId,
                objectId,
            });

            let total = null;
            let count = 0;
            const loadedData = [];
            const levels = []
            const parameters = []
            for await (let obj of loader.getObjectIterator()) {
                if (!total) total = obj.totalChildrenCount;
                loadedData.push(obj);
                if (obj.level){
                    levels.push(obj.level);
                    console.log("level", obj.level);
                }
                if (obj.parameters){

                    parameters.push(obj.parameters);
                    console.log("parameters", obj.parameters);
                }
               // console.log(obj, `Progress: ${count++}/${total}`);
            }
            setData(loadedData);
            setLevels(levels);
            setParameters(parameters);

            
        } catch (error) {
            console.error('Error loading Speckle data:', error);
        }
        const container = document.getElementById("root");

            /** Configure the viewer params */
            const params = DefaultViewerParams;
            params.showStats = true;
            params.verbose = true;
          
            /** Create Viewer instance */
            const viewer = new Viewer(container, params);
            /** Initialise the viewer */
            await viewer.init();
          
            /** Add the stock camera controller extension */
            viewer.createExtension(CameraController);
            /** Add the selection extension for extra interactivity */
            viewer.createExtension(SelectionExtension);
          
            /** Create a loader for the speckle stream */
            const loader2 = new SpeckleLoader(
              viewer.getWorldTree(),
              "https://latest.speckle.dev/streams/92b620fb17/objects/32978115e9bb09a43407d535ea313a09",
              ""
            );
            /** Load the speckle data */
            await viewer.loadObject(loader2, 1, true);

    };

    useEffect(() => {
        // You can call loadSpeckleData here if you want to load data automatically when the component mounts.<iframe src="https://latest.speckle.dev/embed?stream=c581c30077&commit=f47d03ab3e" width="600" height="400" frameborder="1"></iframe>
    }, []); // Make sure to specify any dependencies if needed

    return (
        
      
    
      
        <div>
            <div>
                <label style={labelStyle} htmlFor="streamId">Stream ID:</label>
                <input
                    style={inputStyle}
                    type="text"
                    id="streamId"
                    value={streamId}
                    onChange={(e) => setStreamId(e.target.value)}
                />
            </div>
            <div>
                <label
                    style={labelStyle}
                    htmlFor="objectId">Object ID:</label>
                <input
                    type="text"
                    style={inputStyle}
                    id="objectId"
                    value={objectId}
                    onChange={(e) => setObjectId(e.target.value)}
                />
            </div>
            <div>
                <label
                    style={labelStyle}
                    htmlFor="serverUrl">Server URL:</label>
                <input
                    type="text"
                    style={inputStyle}
                    id="serverUrl"
                    value={serverUrl}
                    onChange={(e) => setServerUrl(e.target.value)}
                />
            </div>
            <button onClick={loadSpeckleData} style={buttonStyle}>Load Data</button>
            <h3>Level Data</h3>
            <table style={tableStyle}>
                <thead>
                <tr>
                    <th style={headerStyle}>Name</th>
                    <th style={headerStyle}>ObjectID</th>
                    <th style={headerStyle}>ElementId</th>
                    <th style={headerStyle}>Category</th>
                    <th style={headerStyle}>Elevation</th>
                    <th style={headerStyle}>Units</th>
                    {/* Add additional table headers for your data properties */}
                </tr>
                </thead>
                <tbody>
                {levels.map((item) => (
                    <tr key={item.id}>
                        <td style={cellStyle}>{item.name}</td>
                        <td style={cellStyle}>{item.id}</td>
                        <td style={cellStyle}>{item.elementId}</td>
                        <td style={cellStyle}>{item.category}</td>
                        <td style={cellStyle}>{item.elevation}</td>
                        <td style={cellStyle}>{item.units}</td>
                        {/* Add additional table cells for your data properties */}
                    </tr>
                ))}
                </tbody>
            </table>
            <h3>Object Data</h3>
            <table style={tableStyle}>
                <thead>
                <tr>
                    <th style={headerStyle}>Name</th>
                    <th style={headerStyle}>ObjectID</th>
                    <th style={headerStyle}>ElementId</th>
                    <th style={headerStyle}>Units</th>
                    <th style={headerStyle}>Category</th>
                    <th style={headerStyle}>Model Path</th>
                    {/* Add additional table headers for your data properties */}
                </tr>
                </thead>
                <tbody>
                {data.map((item) => (
                    <tr key={item.id}>

                        <td style={cellStyle}>{item.name}</td>
                        <td style={cellStyle}>{item.id}</td>
                        <td style={cellStyle}>{item.elementId}</td>
                        <td style={cellStyle}>{item.units}</td>
                        <td style={cellStyle}>{item.category}</td>
                        <td style={cellStyle}>{item.revitLinkedModelPath}</td>
                        {/* Add additional table cells for your data properties */}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default SpeckleLoader2;

// Set style for the component labels, inputs
const labelStyle = {
    display: 'inline-block',
    width: '150px',
    textAlign: 'left',
}
const inputStyle = {
    width: '100%',
    padding: '12px 20px',
    margin: '8px 0',
    boxSizing: 'border-box',
}


const buttonStyle = {
    backgroundColor: '#007bff', // Background color
    fontWeight: 'bold', // Make the text bold
    width: '100%', // Full width
    margin: '8px 0', // Add some space around the button
    color: '#fff', // Text color
    padding: '10px 20px', // Padding
    border: 'none', // Remove the border
    borderRadius: '4px', // Rounded corners
    cursor: 'pointer', // Add a pointer cursor on hover
};
const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%',
    border: '1px solid black',

};

const headerStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    border: '1px solid black',
    alignItems: 'center',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '10px',
};

const cellStyle = {
    padding: '10px',
    border: '1px solid black',
};