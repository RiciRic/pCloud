function runter(index)
{
  index++;
  var elmnt = document.getElementById('tr'+index+'');
  elmnt.scrollIntoView({
    behavior: 'smooth',
    block: 'center'
  });
  elmnt.classList.add("trshclick");
  setTimeout(() => {  
    elmnt.classList.remove("trshclick");
   }, 1500);
  
}

async function chartIt(){
    var ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: arrname,
            datasets: [{
                label: 'Password Value',
                data: dat,
                backgroundColor: bgclr,
                borderColor: 'rgb(1, 138, 230, 1)',
                fill: false,
                lineTension: 0.4,
                borderWidth: 1
            },
            {
              data: datzero,
              label: '',
              pointRadius: 0,
              borderColor: 'rgb(177, 177, 177, 0.6)',
              fill: false,
              lineTension: 0.4,
              borderWidth: 1
          }
            ]
        },
        plugins: {
          datalabels: {
              display: false,
          },
      },
        options: {
          legend: {
            display: false,
         },
         interaction: {
          mode: 'x'
        },
         'onClick' : function (evt, item) {
            if(item.length != 0)
            {
              var itemindex = item[0]._index;
              runter(itemindex)
            }
        },
         
            scales: {
                yAxes: [{
                  scaleLabel: {
                    display: true,
                    labelString: 'weak                                                              strong'
                  },
                    ticks: {
                        beginAtZero: false,
                        suggestedMin: -10,
                        suggestedMax: 10
                    }
                }],
                xAxes: [{
                  ticks: {
                      display: false
                  }
              }]
            }
        }
    });
}

module.exports = chartIt;