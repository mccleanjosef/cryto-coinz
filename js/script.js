$('document').ready(function(){

    console.log("script is linked");

    let url ="https://rest.coinapi.io/v1/quotes/BITSTAMP_SPOT_BTC_USD/history?time_start=2022-02-01T12:00:00&time_end=2022-02-07T12:00:00&limit=10";

    // let url = "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD";

      $.ajax({
        method: 'GET',
        url: url,
        headers: { 'X-CoinAPI-Key': key },
        success: function(data){
            console.log(data);
            const bitcoinPrice = [];
            const secondIntervals = [];

          function getBtcData(){
            
            document.getElementById("info").innerHTML = '<b>1 BTC = ' + data.USD + ' USD</b>'
            bitcoinPrice.push(data.USD);
            // console.log(bitcoinPrice);
          }
          getBtcData();
        

          tcount=setInterval(function(){
            tcount++
            // console.log(tcount);s
            if (tcount==10) {getBtcData(); tcount=0}
            document.getElementById("infotime").innerHTML = 'Next update in ' + (10-tcount) + ' seconds'
          },1000);

        //   for (let i = 0; i < data.length; i++) {
            
        //     const time = new Date(data[i].time_exchange).toLocaleTimeString('en',{ timeStyle: 'short', hour12: false, timeZone: 'UTC' });
        //     console.log(time);

        //     const date = new Date(data[i].time_exchange);
        //     date.toISOString().substring(0,10);

        //     console.log(date);
            
        //     date = new Date(data[i].time_exchange);
        //     year = date.getFullYear();
        //     month = date.getMonth()+1;
        //     dt = date.getDate();

        //     if (dt < 10) {
        //       dt = '0' + dt;
        //     }
        //     if (month < 10) {
        //       month = '0' + month;
        //     }

        //     console.log(year+'-' + month + '-'+dt);
            
        //   }
        var ctx = document.getElementById("chart").getContext("2d");
        var chart = new Chart(ctx, {
           type: 'line',
          data: {
            labels: [],
            datasets: [{
              label: "My First dataset",
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
                    Math.floor(10 + Math.random() * 80)
                  );
                },
                delay: 2000
              }
            }
          }
        });

        }
    });

    // var currentDate = new Date();
    // currentDate.setSeconds(0,0);
    
    // console.log("The current date is as follows="+currentDate.toISOString());

    
    

    

});