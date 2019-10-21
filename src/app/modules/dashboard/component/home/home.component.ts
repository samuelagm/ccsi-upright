import { Component, OnInit, AfterViewInit } from "@angular/core";
import { StatsService, MONTHS } from "../../services/stats.service";
import { forkJoin } from "rxjs";
import { ChartService } from "../../services/chart.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit, AfterViewInit {
  countData: any;
  activityData: any;
  loading: boolean;
  month = new Date().getMonth();
  message: string;
  months = MONTHS;
  year = new Date().getFullYear();
  years;

  constructor(
    private service: StatsService,
    private chartService: ChartService
  ) {
    this.years = service.getYears();
    this.loading = true;
  }

  getActivityTrend() {
    this.loading = true;
    const [m, y] = [+this.month, +this.year];
    return this.service.activityMap(m, y).subscribe(
      res => {
        this.loading = false;
        if (res) {
          this.month = m;
          this.year = y;
          this.chartService.axisChart(
            Object.keys(res).map(it => {
              return { values: res[it].count as number[], name: it };
            }),
            res.products.days,
            document.querySelector("#daytopchart"),
            `Model Creation Actions for the ${this.months[m]}, ${y}`
          );
        } else {
          alert("Ooops data couldn't be fetched from the server at the moment");
        }
      },
      err => {
        this.loading = false;
        alert("Ooops data couldn't be fetched from the server at the moment");
      }
    );
  }

  getStats() {
    this.loading = true;
    forkJoin([this.service.counts(), this.service.activityMap()]).subscribe(
      res => {
        this.loading = false;
        if (res.length) {
          this.countData = res[0];
          this.activityData = res[1];
          this.chartService.axisChart(
            Object.keys(res[1]).map(it => {
              return { values: res[1][it].count as number[], name: it };
            }),
            res[1].products.days,
            document.querySelector("#daytopchart"),
            `Model Creation Actions for the ${this.months[this.month]}, ${
              this.year
            }`
          );
        } else {
          alert("Ooops data couldn't be fetched from the server at the moment");
        }
      },
      err => {
        this.loading = false;
        alert("Ooops data couldn't be fetched from the server at the moment");
      }
    );
  }

  ngOnInit() {
    
  }

  ngAfterViewInit(): void {
    const placeholderArr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
    this.chartService.axisChart(
      [{values: Array(31).fill(0)}],
      placeholderArr.map(it => `${this.month + 1}/${(it)}/${this.year}`),
      document.querySelector("#daytopchart"),
      `Model Creation Actions for the ${this.months[this.month]}, ${
        this.year
      }`
    );
    this.getStats();
  }

  // deletePost(id) {
  //   console.log("bing!")
  //   if (confirm('You\'re about to delete a post, continue ?')) {
  //     this.postService.deletePost(id).subscribe(data => {
  //       alert('Post deleted');
  //       console.log(this.posts);
  //       this.posts = this.posts.filter((el) => el.id !== id);

  //     });
  //   }
  // }

  // loadPosts() {
  //   this.postService.getPosts().subscribe((data: any) => {
  //     this.posts = data;
  //     console.log(data);
  //   });
  // }

  // filterPosts() {
  //   console.log(this.selected);
  // }

  // featurePost(element: HTMLInputElement, id: string): void {
  //   if (element.checked) {
  //     this.postService.updatePosts(id, { featured: true }).subscribe((data: any) => {
  //       this.loadPosts();
  //     });
  //   } else {
  //     this.postService.updatePosts(id, { featured: false }).subscribe((data: any) => {
  //       this.loadPosts();
  //     });
  //   }
  // }
}
