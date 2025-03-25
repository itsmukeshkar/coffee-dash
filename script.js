document.addEventListener('DOMContentLoaded', function() {
    // Tab navigation
    const tabs = document.querySelectorAll('nav button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const target = this.dataset.tab;
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show selected tab content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === target) {
                    content.classList.add('active');
                }
            });
        });
    });
    
    // Chart.js Charts
    
    // Color schemes
    const colors = {
        purple: 'rgba(136, 132, 216, 0.8)',
        purpleBorder: 'rgba(136, 132, 216, 1)',
        blue: 'rgba(83, 166, 237, 0.8)',
        blueBorder: 'rgba(83, 166, 237, 1)',
        green: 'rgba(130, 202, 157, 0.8)',
        greenBorder: 'rgba(130, 202, 157, 1)',
        orange: 'rgba(255, 159, 64, 0.8)',
        orangeBorder: 'rgba(255, 159, 64, 1)',
        red: 'rgba(255, 99, 132, 0.8)',
        redBorder: 'rgba(255, 99, 132, 1)',
        yellow: 'rgba(255, 205, 86, 0.8)',
        yellowBorder: 'rgba(255, 205, 86, 1)'
    };
    
    // Default chart options
    Chart.defaults.font.family = "'Segoe UI', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
    Chart.defaults.font.size = 12;
    Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    
    // Chart 1: Revenue by Time Slot
    const revenueByTimeCtx = document.getElementById('revenueByTimeChart').getContext('2d');
    new Chart(revenueByTimeCtx, {
        type: 'bar',
        data: {
            labels: ['Morning', 'Afternoon', 'Evening'],
            datasets: [{
                label: 'Revenue',
                data: [126000, 68000, 35000],
                backgroundColor: colors.purple,
                borderColor: colors.purpleBorder,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
    
    // Chart 2: Weekly Trends
    const weeklyTrendsCtx = document.getElementById('weeklyTrendsChart').getContext('2d');
    new Chart(weeklyTrendsCtx, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
            datasets: [{
                label: 'Revenue',
                data: [50000, 58000, 61000, 58000, 6000],
                borderColor: colors.orangeBorder,
                backgroundColor: colors.orange,
                tension: 0.1,
                fill: false
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return '$' + context.parsed.y.toLocaleString();
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
    
    // Chart 3: Revenue by Category
    const revenueByCategoryCtx = document.getElementById('revenueByCategoryChart').getContext('2d');
    new Chart(revenueByCategoryCtx, {
        type: 'bar',
        data: {
            labels: ['Coffee', 'Tea', 'Bakery', 'Drinking Chocolate', 'Coffee beans', 'Branded', 'Flavours', 'Loose Tea', 'Packaged Chocolate'],
            datasets: [{
                label: 'Revenue',
                data: [90948, 65374, 27508, 24249, 10000, 5000, 2500, 2000, 1000],
                backgroundColor: [
                    colors.purple, colors.blue, colors.green, 
                    colors.orange, colors.red, colors.yellow,
                    'rgba(153, 102, 255, 0.8)', 'rgba(54, 162, 235, 0.8)', 'rgba(255, 159, 64, 0.8)'
                ],
                borderColor: [
                    colors.purpleBorder, colors.blueBorder, colors.greenBorder,
                    colors.orangeBorder, colors.redBorder, colors.yellowBorder,
                    'rgba(153, 102, 255, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return '$' + context.parsed.x.toLocaleString();
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
    
    // Revenue Distribution Chart (Pie)
    const revenueDistributionCtx = document.getElementById('revenueDistributionChart').getContext('2d');
    new Chart(revenueDistributionCtx, {
        type: 'pie',
        data: {
            labels: ['Coffee', 'Tea', 'Bakery', 'Drinking Chocolate', 'Other'],
            datasets: [{
                data: [90948, 65374, 27508, 24249, 20921],
                backgroundColor: [
                    colors.purple, colors.blue, colors.green, colors.orange, colors.red
                ],
                borderColor: [
                    colors.purpleBorder, colors.blueBorder, colors.greenBorder, colors.orangeBorder, colors.redBorder
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: $${value.toLocaleString()} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
    
    // Revenue by Week Chart
    const revenueByWeekCtx = document.getElementById('revenueByWeekChart').getContext('2d');
    new Chart(revenueByWeekCtx, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
            datasets: [{
                label: 'Revenue',
                data: [50000, 58000, 61000, 58000, 6000],
                backgroundColor: colors.green,
                borderColor: colors.greenBorder,
                tension: 0.1,
                fill: false
            }]
        },
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return '$' + context.parsed.y.toLocaleString();
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
    
    // Sales by Time Chart
    const salesByTimeCtx = document.getElementById('salesByTimeChart').getContext('2d');
    new Chart(salesByTimeCtx, {
        type: 'bar',
        data: {
            labels: ['Morning', 'Afternoon', 'Evening'],
            datasets: [{
                label: 'Sales',
                data: [39000, 21000, 11000],
                backgroundColor: colors.green,
                borderColor: colors.greenBorder,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    // Sales by Week Chart
    const salesByWeekCtx = document.getElementById('salesByWeekChart').getContext('2d');
    new Chart(salesByWeekCtx, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
            datasets: [{
                label: 'Sales',
                data: [16000, 17500, 18000, 18500, 2000],
                backgroundColor: colors.purple,
                borderColor: colors.purpleBorder,
                tension: 0.1,
                fill: false
            }]
        },
        options: {
            responsive: true
        }
    });
    
    // Profit by Scenario Chart
    const profitByScenarioCtx = document.getElementById('profitByScenarioChart').getContext('2d');
    new Chart(profitByScenarioCtx, {
        type: 'bar',
        data: {
            labels: ['Holiday', 'Normal Day', 'Promotion'],
            datasets: [
                {
                    label: 'Morning',
                    data: [210, 190, 215],
                    backgroundColor: 'rgba(53, 162, 235, 0.8)',
                    borderColor: 'rgba(53, 162, 235, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Afternoon',
                    data: [300, 200, 310],
                    backgroundColor: 'rgba(153, 102, 255, 0.8)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Evening',
                    data: [270, 195, 295],
                    backgroundColor: 'rgba(255, 159, 64, 0.8)',
                    borderColor: 'rgba(255, 159, 64, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': $' + context.parsed.y;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value;
                        }
                    }
                }
            }
        }
    });
    
    // Product Category Pie Chart
    const categoryPieCtx = document.getElementById('categoryPieChart').getContext('2d');
    new Chart(categoryPieCtx, {
        type: 'pie',
        data: {
            labels: ['Coffee', 'Tea', 'Bakery', 'Chocolate', 'Other'],
            datasets: [{
                data: [35, 25, 15, 15, 10],
                backgroundColor: [
                    colors.purple, colors.blue, colors.green, colors.orange, colors.red
                ],
                borderColor: [
                    colors.purpleBorder, colors.blueBorder, colors.greenBorder, colors.orangeBorder, colors.redBorder
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.parsed}%`;
                        }
                    }
                }
            }
        }
    });
    
    // Product Comparison Chart
    const productComparisonCtx = document.getElementById('productComparisonChart').getContext('2d');
    new Chart(productComparisonCtx, {
        type: 'bar',
        data: {
            labels: ['Barista Espresso', 'Gourmet Coffee', 'Hot Chocolate', 'Black Tea', 'Premium Coffee'],
            datasets: [
                {
                    label: 'Quantity',
                    data: [650, 600, 550, 500, 450],
                    backgroundColor: colors.purple,
                    borderColor: colors.purpleBorder,
                    borderWidth: 1,
                    yAxisID: 'y'
                },
                {
                    label: 'Revenue',
                    data: [2200, 1800, 1900, 1600, 1700],
                    backgroundColor: colors.green,
                    borderColor: colors.greenBorder,
                    borderWidth: 1,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Quantity'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Revenue'
                    },
                    grid: {
                        drawOnChartArea: false
                    },
                    ticks: {
                        callback: function(value) {
                            return '$' + value;
                        }
                    }
                }
            }
        }
    });
    
    // Populate product table
    const productTableBody = document.getElementById('productTable');
    const products = [
        { name: 'Barista Espresso', quantity: 650, revenue: 2200 },
        { name: 'Gourmet brewed coffee', quantity: 600, revenue: 1800 },
        { name: 'Hot chocolate', quantity: 550, revenue: 1900 },
        { name: 'Brewed Black tea', quantity: 500, revenue: 1600 },
        { name: 'Premium brewed coffee', quantity: 450, revenue: 1700 },
        { name: 'Organic brewed coffee', quantity: 400, revenue: 1500 },
        { name: 'Drip coffee', quantity: 350, revenue: 1300 },
        { name: 'Brewed Chai tea', quantity: 300, revenue: 1200 },
        { name: 'Scone', quantity: 250, revenue: 900 }
    ];
    
    products.forEach(product => {
        const row = document.createElement('tr');
        
        const nameCell = document.createElement('td');
        nameCell.textContent = product.name;
        
        const quantityCell = document.createElement('td');
        quantityCell.textContent = product.quantity;
        
        const revenueCell = document.createElement('td');
        revenueCell.textContent = '$' + product.revenue.toLocaleString();
        
        const avgPriceCell = document.createElement('td');
        avgPriceCell.textContent = '$' + (product.revenue / product.quantity).toFixed(2);
        
        row.appendChild(nameCell);
        row.appendChild(quantityCell);
        row.appendChild(revenueCell);
        row.appendChild(avgPriceCell);
        
        productTableBody.appendChild(row);
    });
});
