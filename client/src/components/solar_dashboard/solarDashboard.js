import React from 'react';
import Card from './card';
import Chart from './energy_chart';
import "./styles/solarDashboard.css"; 

function SolarDashboard() {
    console.log("SolarDashboard component rendered");

    const dailyRevenueChartData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        data: [12, 14, 13, 15, 14, 16, 15], // Revenue in euros per day
        label: 'Revenue (€)',
    };
    
    const consumptionChartData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        data: [65, 70, 72, 68], // Weekly consumption in kWh
        label: 'Consumption (kWh)',
    };

    const estimatedSavings = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        data: [14, 16, 15, 14], // Weekly savings in euros
        label: 'Savings (€)',
    };

    // Calculate total values dynamically
    const calculateTotal = (data) => data.reduce((sum, value) => sum + value, 0);

    return (
        <div className="solar-dashboard">
            <div className="card-container">
                <Card 
                    title="Daily Revenue" 
                    value={`€ ${calculateTotal(dailyRevenueChartData.data).toFixed(2)}`} 
                    chartData={dailyRevenueChartData} 
                />
                <Card 
                    title="Consumption" 
                    value={`${calculateTotal(consumptionChartData.data)} kWh`} 
                    chartData={consumptionChartData} 
                />
                <Card 
                    title="Estimated Savings" 
                    value={`€ ${calculateTotal(estimatedSavings.data).toFixed(2)}`} 
                    chartData={estimatedSavings} 
                />
            </div>

            <div className='second-row'>
                <Chart title="Energy Production" />

                <div className="performance-monitoring">
                    <h2>Performance Monitoring</h2>
                    <div className='charging-usage'>
                        <div className='charging'>
                            <h3>Total Energy Produced</h3>
                            <h1>1.200 kWh</h1>
                            <p>Min. 150 kWh Max. 400 kWh</p>
                        </div>
                        <div className='usage'>
                            <h3>Household Usage</h3>
                            <h1>1.070 kWh</h1>
                            <p>1 Hour Usage: 3 kWh</p>
                        </div>
                    </div>
                    <div className='capacity-yield'>
                        <div className='capacity'>
                            <h3>Capacity</h3>
                            <h4>3.500 kWh</h4>
                        </div>
                        <div className='yield'>
                            <h3>Total Yield</h3>
                            <h4>1.200 kWh</h4>
                        </div>
                    </div>
                </div>            
            </div>
        </div>
    );
}

export default SolarDashboard;
