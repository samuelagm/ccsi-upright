import { Injectable } from '@angular/core';

import { Chart } from "frappe-charts/dist/frappe-charts.min.esm";

interface ChartData {
  name?: string,
  values: Array<number>
}

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  constructor() { }

  axisChart(data: Array<ChartData>, labels: Array<string>, container: HTMLDivElement, title: string = '', isBar: boolean = false) {
    return new Chart(container, {
      title: title,
      type: isBar ? 'bar' : 'line',
      height: 300,
      axisOptions: {
        xIsSeries: true // default: false
    },
    lineOptions: {
      hideDots: 1 // default: 0
  },
      data: {
        labels: labels || [],
        datasets: data || []
      }
    })
  }

  aggChart(data: Array<ChartData>, labels: Array<string>, container: HTMLDivElement, title: string = '', isPerc: boolean = false) {
    return new Chart(container, {
      title: title,
      type: isPerc ? 'percentage' : 'pie',
      // height: 500,
      data: {
        labels: labels || [],
        datasets: data || []
      }
    })
  }
}

// or 'bar', 'line', 'pie', 'percentage'