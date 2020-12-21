(function($) {

  // line bar chart
  //var stacked_bar_labels = [];
  //var stacked_bar_distributed_data = [];
  //var stacked_bar_received_data = [];
  var time = [];
  var temperature = [];
  var humidity = [];

  $.ajax({
    url: "https://zapfhahn.azurewebsites.net/app/functions/get_stacked_barchart_data.php",
    method: "GET",
    success: function(data) {
      var newArr = JSON.parse(data);
      var arrayLength = newArr.length;
      for (var i = 0; i < arrayLength; i++) {
        time.push(newArr[i].timestamp);
        temperature.push(newArr[i].temperature);
        humidity.push(newArr[i].humidity);

      }
      'use strict';
      $(function() {
        if ($("#stackedbarChart").length) {
          var stackedbarChartCanvas = $("#stackedbarChart").get(0).getContext("2d");
          var stackedbarChart = new Chart(stackedbarChartCanvas, {
            type: 'line',
            data: {
              labels: time,
              datasets: [{
                  label: "Temperature in °C",
                  fill: false,
                  backgroundColor: ChartColor[3],
                  borderColor: ChartColor[3],
                  borderWidth: 3,
                  data: temperature
                },
                {
                  label: "Relative Humidity in %",
                  backgroundColor: ChartColor[5],
                  borderColor: ChartColor[5],
                  borderWidth: 3,
                  fill: "false",
                  data: humidity
                }
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: true,
              legend: false,
              categoryPercentage: 0.5,
              stacked: true,
              layout: {
                padding: {
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0
                }
              },
              scales: {
                xAxes: [{

                  display: true,
                  scaleLabel: {
                    display: true,
                    labelString: 'Date',
                    fontSize: 12,
                    lineHeight: 2,
                    data: time,
                  },
                  ticks: {
                    fontColor: '#000000',
                    stepSize: 24,
                    min: 1,
                    max: 168,
                    autoSkip: false,
                    autoSkipPadding: 15,
                    maxRotation: 45,
                    maxTicksLimit: 100
                  },
                  gridLines: {
                    display: false,
                    drawBorder: false,
                    color: 'transparent',
                    zeroLineColor: '#eeeeee'
                  }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                      display: true,
                      labelString: 'Temperature in °C',
                      fontSize: 12,
                      lineHeight: 2
                    },

                    ticks: {
                      fontColor: '#bfccda',
                      stepSize: 50,
                      min: -50,
                      max: 50,
                      autoSkip: true,
                      autoSkipPadding: 15,
                      maxRotation: 0,
                      maxTicksLimit: 10

                    },
                    id: "left",
                    stacked: false,
                    ticks: {
                      beginAtZero: true
                    }
                  },
                  {
                    scaleLabel: {
                      display: true,
                      labelString: "Relative Humidity (in %)"
                    },
                    id: "right",
                    position: "right",
                    stacked: false,
                    ticks: {
                      beginAtZero: true,
                      stepSize: 50,
                      min: 0,
                      max: 100,
                      autoSkip: true,
                      autoSkipPadding: 15,
                      maxRotation: 0,
                      maxTicksLimit: 10
                    },
                    gridLines: {
                      drawBorder: false
                    }
                  }
                ]

              },
              legend: {
                display: false
              },
              tooltips: {
                intersect: false,
                mode: "index",
                position: "nearest",
                callbacks: {}
              },

              legendCallback: function(chart) {
                var text = [];
                text.push('<div class="chartjs-legend"><ul>');
                for (var i = 0; i < chart.data.datasets.length; i++) {
                  // console.log(chart.data.datasets[i]); // see what's inside the obj.
                  text.push('<li>');
                  text.push('<span style="background-color:' + chart.data.datasets[i].backgroundColor + '">' + '</span>');
                  text.push(chart.data.datasets[i].label);
                  text.push('</li>');
                }
                text.push('</ul></div>');
                return text.join("");
              },
              elements: {
                point: {
                  radius: 0
                }
              }
            }
          });
          document.getElementById('stacked-bar-traffic-legend').innerHTML = stackedbarChart.generateLegend();
        }

        // End line bar chart

      });

    },
    error: function(data) {},

  });

  //soilmoisture

  var timee = [];
  var soilmoisture = [];

  $.ajax({
    url: "https://zapfhahn.azurewebsites.net/app/functions/get_stacked_barchart_data1.php",
    method: "GET",
    success: function(data) {
      var newArr = JSON.parse(data);
      var arrayLength = newArr.length;
      for (var i = 0; i < arrayLength; i++) {
        timee.push(newArr[i].timestamp);
        soilmoisture.push(newArr[i].soilmoisture);

      }
      'use strict';
      $(function() {
        if ($("#stackedbarChart1").length) {
          var stackedbarChartCanvas1 = $("#stackedbarChart1").get(0).getContext("2d");
          var stackedbarChart1 = new Chart(stackedbarChartCanvas1, {
            type: 'line',
            data: {
              labels: time,
              datasets: [{
                  label: "Soilmoisture",
                  fill: false,
                  backgroundColor: ChartColor[3],
                  borderColor: ChartColor[3],
                  borderWidth: 3,
                  data: soilmoisture
                },

              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: true,
              legend: false,
              categoryPercentage: 0.5,
              stacked: true,
              layout: {
                padding: {
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0
                }
              },
              scales: {
                xAxes: [{

                  display: true,
                  scaleLabel: {
                    display: true,
                    labelString: 'Date',
                    fontSize: 12,
                    lineHeight: 2,
                    data: time,
                  },
                  ticks: {
                    fontColor: '#000000',
                    stepSize: 24,
                    min: 1,
                    max: 168,
                    autoSkip: false,
                    autoSkipPadding: 15,
                    maxRotation: 45,
                    maxTicksLimit: 100
                  },
                  gridLines: {
                    display: false,
                    drawBorder: false,
                    color: 'transparent',
                    zeroLineColor: '#eeeeee'
                  }
                }],
                yAxes: [{
                  display: true,
                  scaleLabel: {
                    display: true,
                    labelString: 'Humidity',
                    fontSize: 12,
                    lineHeight: 2
                  },

                  ticks: {
                    fontColor: '#bfccda',
                    stepSize: 50,
                    min: 0,
                    max: 100,
                    autoSkip: false,
                    autoSkipPadding: 15,
                    maxRotation: 0,
                    maxTicksLimit: 10

                  },

                  gridLines: {
                    drawBorder: false
                  }
                }]

              },
              legend: {
                display: false
              },
              tooltips: {
                intersect: false,
                mode: "index",
                position: "nearest",
                callbacks: {}
              },

              legendCallback: function(chart) {
                var text = [];
                text.push('<div class="chartjs-legend"><ul>');
                for (var i = 0; i < chart.data.datasets.length; i++) {
                  // console.log(chart.data.datasets[i]); // see what's inside the obj.
                  text.push('<li>');
                  text.push('<span style="background-color:' + chart.data.datasets[i].backgroundColor + '">' + '</span>');
                  text.push(chart.data.datasets[i].label);
                  text.push('</li>');
                }
                text.push('</ul></div>');
                return text.join("");
              },
              elements: {
                point: {
                  radius: 0
                }
              }
            }
          });
          document.getElementById('stacked-bar-traffic-legend').innerHTML = stackedbarChart.generateLegend();
        }

      });

    },
    error: function(data) {},

  });
  //Waterlevel

  var timeee = [];
  var waterlevel = [];

  $.ajax({
    url: "https://zapfhahn.azurewebsites.net/app/functions/get_stacked_barchart_data2.php",
    method: "GET",
    success: function(data) {
      var newArr = JSON.parse(data);
      var arrayLength = newArr.length;
      for (var i = 0; i < arrayLength; i++) {
        timeee.push(newArr[i].timestamp);
        waterlevel.push(newArr[i].waterlevel);

      }
      'use strict';
      $(function() {
        if ($("#stackedbarChart2").length) {
          var stackedbarChartCanvas2 = $("#stackedbarChart2").get(0).getContext("2d");
          var stackedbarChart2 = new Chart(stackedbarChartCanvas2, {
            type: 'line',
            data: {
              labels: timeee,
              datasets: [{
                  label: "Waterlevel",
                  fill: false,
                  backgroundColor: ChartColor[3],
                  borderColor: ChartColor[3],
                  borderWidth: 3,
                  data: waterlevel
                },

              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: true,
              legend: false,
              categoryPercentage: 0.5,
              stacked: true,
              layout: {
                padding: {
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0
                }
              },
              scales: {
                xAxes: [{

                  display: true,
                  scaleLabel: {
                    display: true,
                    labelString: 'Date',
                    fontSize: 12,
                    lineHeight: 2,
                    data: timeee,
                  },
                  ticks: {
                    fontColor: '#000000',
                    stepSize: 24,
                    min: 1,
                    max: 168,
                    autoSkip: false,
                    autoSkipPadding: 15,
                    maxRotation: 45,
                    maxTicksLimit: 100
                  },
                  gridLines: {
                    display: false,
                    drawBorder: false,
                    color: 'transparent',
                    zeroLineColor: '#eeeeee'
                  }
                }],
                yAxes: [{
                  display: true,
                  scaleLabel: {
                    display: true,
                    labelString: 'Waterlevel',
                    fontSize: 12,
                    lineHeight: 2
                  },

                  ticks: {
                    fontColor: '#bfccda',
                    stepSize: 50,
                    min: 0,
                    max: 100,
                    autoSkip: false,
                    autoSkipPadding: 15,
                    maxRotation: 0,
                    maxTicksLimit: 10

                  },

                  gridLines: {
                    drawBorder: false
                  }
                }]

              },
              legend: {
                display: false
              },
              tooltips: {
                intersect: false,
                mode: "index",
                position: "nearest",
                callbacks: {}
              },

              legendCallback: function(chart) {
                var text = [];
                text.push('<div class="chartjs-legend"><ul>');
                for (var i = 0; i < chart.data.datasets.length; i++) {
                  // console.log(chart.data.datasets[i]); // see what's inside the obj.
                  text.push('<li>');
                  text.push('<span style="background-color:' + chart.data.datasets[i].backgroundColor + '">' + '</span>');
                  text.push(chart.data.datasets[i].label);
                  text.push('</li>');
                }
                text.push('</ul></div>');
                return text.join("");
              },
              elements: {
                point: {
                  radius: 0
                }
              }
            }
          });
          document.getElementById('stacked-bar-traffic-legend').innerHTML = stackedbarChart.generateLegend();
        }

      });

    },
    error: function(data) {},

  });

})(jQuery);
