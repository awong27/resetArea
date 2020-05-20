import React, { useState } from "react";
import { Doughnut } from 'react-chartjs-2';
const piedata = {
    labels: ['Fats', 'Protein', 'Sugar',
        'Carbs', 'Sodium'],
    datasets: [{
        label: 'Nutrition',
        backgroundColor: [
            '#FF6384',
            '#4BC0C0',
            '#FFCE56',
            '#b567db',
            '#36A2EB'
          ],
        hoverBackgroundColor: [
            '#501800',
            '#4B5000',
            '#175000',
            '#003350',
            '#35014F'
        ],
        data: [65, 59, 80, 81, 56]
    }]
};

var DoughnutChart = props => {
    return (
        <Doughnut
            data={piedata}
            options={{
                title: {
                    display: true,
                    text: 'Daily Nutrition',
                    fontSize: 20
                },
                legend: {
                    display: true,
                    position: 'left',
                    fullWidth: true
                }
            }}
        />
    );
};

export default DoughnutChart;
