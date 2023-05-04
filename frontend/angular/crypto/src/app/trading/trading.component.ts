import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs';
import { Chart, registerables } from 'chart.js';
import { BaseChartDirective, baseColors } from 'ng2-charts';

@Component({
  selector: 'app-trading',
  templateUrl: './trading.component.html',
  styleUrls: ['./trading.component.scss'],
  providers: [BaseChartDirective]
})
export class TradingComponent implements OnInit {
  crypto:Crypto | null = null;
  ngOnInit(): void {
  }
  buy(){
    console.log(this.crypto);
    this.crypto = crypto;
  }

}


