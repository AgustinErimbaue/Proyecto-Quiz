const punctuations2 = JSON.parse(localStorage.getItem("punctuation")
) || []

const data = {
    labels: ["Partida 1", "Partida 2", "Partida 3", "Partida 4", "Partida 5", "Partida 6", "Partida 7", "Partida 8", "Partida 9", "Partida 10"],
    datasets: [{
        label: 'Preguntas correctas',
        backgroundColor: 'rgb(0, 255, 0)',
        borderColor: 'rgb(255, 99, 132)',
        data: punctuations2,
    }]
};

const config = {
    type: 'bar',
    data: data,
    options: {
        scales: {
            x: {
                grid: {
                    color: 'rgba(255, 0, 0, 0.3)',
                },
                ticks: {
                    color: 'white', 
                }
            },
            y: {
                grid: {
                    color: 'rgba(0, 255, 255, 0.3)',
                },
                ticks: {
                    color: 'white',
                }
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Gráfico de preguntas correctas',
            },
            legend: {
                labels: {
                    color: 'black'
                }
            }
        }
    }
};

const myChart = new Chart('myChart', config);
