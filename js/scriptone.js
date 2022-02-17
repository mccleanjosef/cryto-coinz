$(window).load(function(){
    let url = "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD";

    $.ajax({
        method: 'GET',
        url: url,
        // headers: { 'X-CoinAPI-Key': 'B61656E4-8B15-4E80-BD57-45CBBDC0322B' },
        success: function(data){
    
            const bitcoinPrice = [];
    
          function getBtcData(){
                
            // document.getElementById("info").innerHTML = '<b>1 BTC = ' + data.USD + ' USD</b>'
            bitcoinPrice.push(data.USD);
            console.log(bitcoinPrice);
          }
          getBtcData();
            
    
          tcount=setInterval(function(){
            tcount++
            // console.log(tcount);s
            if (tcount==10) {getBtcData(); tcount=0}
            // document.getElementById("infotime").innerHTML = 'Next update in ' + (10-tcount) + ' seconds'
          },1000);

          var ctx = document.getElementById("chart").getContext("2d");
          var chart = new Chart(ctx, {
             type: 'line',
            data: {
              labels: [],
              datasets: [{
                label: "Bitcoin USD",
                backgroundColor: "rgba(95,186,88,0.7)",
                borderColor: "rgba(95,186,88,1)",
                pointBackgroundColor: "rgba(0,0,0,0)",
                pointBorderColor: "rgba(0,0,0,0)",
                pointHoverBackgroundColor: "rgba(95,186,88,1)",
                pointHoverBorderColor: "rgba(95,186,88,1)",
                data: []
              }]
            },
            options: {
              scales: {
                xAxes: [{
                  type: 'realtime'
                }]
              },
              plugins: {
                streaming: {
                  onRefresh: function(chart) {
                    chart.data.labels.push(Date.now());
                    chart.data.datasets[0].data.push(
                       data.USD
                    );
                  },
                  delay: 10000
                }
              }
            }
          });

        }
    });

    
});