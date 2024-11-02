import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { ChartsService } from '../charts.service';

@Component({
  selector: 'ngx-chartjs-category-pie',
  template: `
    <chart type="pie" [data]="data" [options]="options"></chart>
  `,
})
export class ChartjsCategoryPieComponent implements OnDestroy {
  data: any;
  options: any;
  themeSubscription: any;

  constructor(private theme: NbThemeService,private chartsService: ChartsService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      chartsService.getPriceByCategoryVo().subscribe(
        (response) => {
          debugger
          let data = response.data
     


          const colors: any = config.variables;
          const chartjs: any = config.variables.chartjs;
    
          this.data = {
              labels:data.map((item) => {
                return item.categoryName; 
            }),

            datasets: [{
              data: data.map((item) => {
                return item.pricees; 
            }),
              backgroundColor: [colors.primaryLight, colors.infoLight, colors.successLight],
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
