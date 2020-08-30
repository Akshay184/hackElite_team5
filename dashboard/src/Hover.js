import React from 'react';


const hover = (props) => {
    return (
        <div className="Hover">
            <p>
                <span>Bus Code :</span>
                <span>{props.bus_code}</span>
                &nbsp;&nbsp;&nbsp;
                <span>color :</span>
                <span>{props.color}</span>
            </p>

            <p>
                <span>Corridor :</span>
                <span>{props.corridor}</span>
                &nbsp;&nbsp;&nbsp;
                <span>Course :</span>
                <span>{props.course}</span>
            </p>

            <p>
                <span>dtd :</span>
                <span>{props.dtd}</span>
                &nbsp;&nbsp;&nbsp;
                <span>Speed :</span>
                <span>{props.speed}</span>
            </p>

            <p>
                <span>Longitude :</span>
                <span>{props.log}</span>
                &nbsp;&nbsp;&nbsp;
                <span>Latitude :</span>
                <span>{props.lat}</span>
            </p>
            <button className='btn' onClick={props.clicked}>Close</button>
        </div>
    );
}

export default hover; 