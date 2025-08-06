import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { ChartsService } from '../charts.service';
@Component({
  selector: 'ngx-chartjs-multiple-xaxis',
  template: `
    <chart type="line" [data]="data" [options]="options"></chart>
  `,
})
export class ChartjsMultipleXaxisComponent implements OnDestroy {
  data: {};
  options: any;
  themeSubscription: any;

  constructor(private theme: NbThemeService,private  chartsService :ChartsService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      chartsService.getPriceByDayVo().subscribe(
        (response) => {
          
          let datas = response.data


      
      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      //caculate average data
      let totalSpent = 0;
      let averageSpent = 0;
      let couldSaveTotal = 0;
      let necessaryAverageSpent = 0;
      for(let item of datas){
        totalSpent+=item.pricees;
        couldSaveTotal+=item.couldSave;
      }
      averageSpent = parseFloat((totalSpent/datas.length).toFixed(2));
      necessaryAverageSpent = parseFloat(((totalSpent-couldSaveTotal)/datas.length).toFixed(2))
      this.data = {
        labels: datas.map((item) => {
          return item.spentDate; 
      }),
        datasets: [ {
          label: '每日消费',
          data: datas.map((item) => {
            return item.pricees; 
        }),
          borderColor: '#FF6384',
          backgroundColor: '#FF6384',
          fill: false,
          pointRadius: 8,
          pointHoverRadius: 10,
        },
        {
          label: '平均消费',
          data: datas.map((item) => {
            return averageSpent; 
        }),
          borderColor: colors.info,
          backgroundColor: colors.info,
          fill: false,
          pointRadius: 8,
          pointHoverRadius: 10,
        }
        ,
        {
          label: '本可以节省',
          data: datas.map((item) => {
            return item.couldSave; 
        }),
          borderColor: colors.success,
          backgroundColor: colors.success,
          fill: false,
          pointRadius: 8,
          pointHoverRadius: 10,
        },
        {
          label: '必要平均消费',
          data: datas.map((item) => {
            return necessaryAverageSpent; 
        }),
          borderColor: colors.primary,
          backgroundColor: colors.primary,
          fill: false,
          pointRadius: 8,
          borderDash: [5, 5],
          pointHoverRadius: 10,
        }
      ],
      };

      this.options = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: 'bottom',
          labels: {
            fontColor: chartjs.textColor,
          },
        },
        hover: {
          mode: 'index',
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: '',
              },
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Value',
              },
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
        },
      };


        },
        (error) => {
          
          console.error('Error fetching data:', error); // Log any errors
        }
      )

    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  private random() {
    return Math.round(Math.random() * 100);
  }
}
