import React from "react";
import { Bar } from 'react-chartjs-2';
const bardata = {
    labels: ['Sunday', 'Monday', 'Tuesday',
        'Wednesday', 'Thursday', 'Firday', 'Saturday'],
    datasets: [{
        label: 'Calories',
        backgroundColor: '#fab1b1',
        borderColor: '#f79292',
        borderWidth: 1,
        hoverBackgroundColor: '#f79292',
        hoverBorderColor: '#ff6161',
        
        data: [2100, 1983, 2000, 2156, 1856, 1936, 1805]
    }]
};

var BarChart = props => {
    return (
        <Bar
            width={100}
            height={100}
            data={bardata}            
            options={{
                scales: {
                    yAxes: [{
                        ticks: {
                            min: 1000
                        }
                    }]
                },
                title: {
                    display: true,
                    text: 'Weekly Calories',
                    fontSize: 20
                },

            }}
        />
    );
};

export default BarChart;
