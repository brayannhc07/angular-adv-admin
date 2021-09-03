import { Component, Input, OnInit } from '@angular/core';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [],
})
export class DonaComponent implements OnInit {
  public colors: Color[] = [
    { backgroundColor: ['#6857e6', '#009fee', '#f02059'] },
  ];

  constructor() {}

  @Input('titulo') titulo: string = 'Sin título';
  @Input('etiquetas') doughnutChartLabels: Label[] = [
    'Label1',
    'Label2',
    'Label3',
  ];
  @Input('valores') doughnutChartData: MultiDataSet = [[350, 450, 100]];

  ngOnInit(): void {}
}
