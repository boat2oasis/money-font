import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { ChartsService } from '../charts.service';

@Component({
  selector: 'ngx-chartjs-used-for-pie',
  template: `
    <chart type="pie" [data]="data" [options]="options"></chart>
  `,
})
export class ChartjsUsedForPieComponent implements OnDestroy {
  data: any;
  options: any;
  themeSubscription: any;

  constructor(private theme: NbThemeService,private chartsService: ChartsService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      chartsService.getPriceByUsedForVo().subscribe(
        (response) => {
          debugger
          let data = response.data


          const colors: any = config.variables;
          const chartjs: any = config.variables.chartjs;
    
          let labelsLenght = data.map((item) => {
              return item.usedForName; 
          })

          this.data = {
              labels:data.map((item) => {
                return item.usedForName; 
            }),

            datasets: [{
              data: data.map((item) => {
                return item.pricees; 
            }),
            //  backgroundColor: Array.from({ length: labelsLenght.length }, () => `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`),
             backgroundColor:  [colors.primaryLight, colors.infoLight, colors.successLight,'#FFDD54','#FF6384'],

            }],
          };
    
          this.options = {
            maintainAspectRatio: false,
            responsive: true,
            scales: {
              xAxes: [
                {
                  display: false,
                },
              ],
              yAxes: [
                {
                  display: false,
                },
              ],
            },
            legend: {
              labels: {
                fontColor: chartjs.textColor,
              },
            },
          };



        },
        (error) => {
          debugger
          console.error('Error fetching data:', error); // Log any errors
        }
      )
        
      


    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
