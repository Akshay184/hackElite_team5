import React from 'react';
import MultiSelect from 'react-multi-select-component';

const multiselect = (props) => {
    const vechicles = [];
    console.log(props.data)
    for (var x of props.data) {
        vechicles.push({ label: x.value, value: x.value });
    }
    console.log(vechicles);
    return (
        <div>
            <h1>Vehicle Select</h1>
            <MultiSelect
                options={vechicles}
                // value={props.visibility}
                onChange={props.changed}
                labelledBy={"Select"}
            />
        </div>
    );
};

export default multiselect; 
