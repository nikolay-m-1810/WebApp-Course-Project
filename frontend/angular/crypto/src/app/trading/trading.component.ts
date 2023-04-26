import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs';
import { BaseChartDirective } from 'ng2-charts/lib/base-chart.directive';

@Component({
  selector: 'app-trading',
  templateUrl: './trading.component.html',
  styleUrls: ['./trading.component.scss']
})
export class TradingComponent implements OnInit {
    public lineChartData: any[] = [
      { data: [], label: 'Kiopek Coin Price' }
    ];
    public lineChartLabels: string[] = [];
    public lineChartOptions: any = {
      responsive: true,
      scales: {
        xAxes: [{
          display: true
        }],
        yAxes: [{
          display: true
        }]
      }
    };
    public lineChartColors: any[] = [
      {
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.😎'
      }
    ];
    public lineChartLegend = true;
    public lineChartType = 'line';
  
    private apiEndpoint = 'http://localhost:3000/price';
    private interval$ = interval(1000);
    private data$: Observable<any> | undefined;
  
    constructor(private http: HttpClient) { }
  
    ngOnInit() {
      this.data$ = this.interval$.pipe(
        map(() => this.http.get(this.apiEndpoint))
      );
  
      this.data$.subscribe(data => {
        const price = data.price;
        this.lineChartData[0].data.push(price);
        this.lineChartLabels.push(new Date().toLocaleTimeString());
      });
    }
  
    buy() {
      // TODO: implement buy logic
      console.log('Buy Kiopek Coin');
    }
  
    sell() {
      // TODO: implement sell logic
      console.log('Sell Kiopek Coin');
    }
  }

