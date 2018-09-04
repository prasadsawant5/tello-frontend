import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServerService } from './service/server.service';
import { DataSource } from '@angular/cdk/table';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  items: Array<Object>;
  interval: any;
  flag: boolean;
  shelf1: Array<Object>;
  shelf2: Array<Object>;
  shelf3: Array<Object>;

  constructor(public serverService: ServerService) {}

  ngOnInit() {
    this.interval = setInterval(() => {
      this.serverService.getConfig()
        .subscribe(
          res => {
            console.log(res);
            this.items = res['obj'];
            if (this.items.length > 0) {
              this.flag = true;

              this.shelf1 = [];
              this.shelf2 = [];
              this.shelf3 = [];

              for (var i = 0; i < this.items.length; i++) {
                if (this.items[i]['name'] === '01.01' || this.items[i]['name'] === '01.02' || this.items[i]['name'] === '01.03' || this.items[i]['name'] === '01.04') {
                  this.shelf1.push(this.items[i]);
                } else if (this.items[i]['name'] === '02.01' || this.items[i]['name'] === '02.02' || this.items[i]['name'] === '02.03' || this.items[i]['name'] === '02.04') {
                  this.shelf2.push(this.items[i]);
                } else if (this.items[i]['name'] === '03.01' || this.items[i]['name'] === '03.02') {
                  this.shelf3.push(this.items[i]);
                }
              }

              // shelf1 => 9, 4, 3, up
              // shelf2 => 1, 6, Object1, up1
              // shelf3 => Object1, com
            } else {
              this.flag = false;
            }
          },
          err => {
            console.error(err);
            this.flag = false;
          }
        )
    }, 2000);
  }

  refreshData(): void {
    this.serverService.getConfig()
      .subscribe(
        res => {
          if (res['obj'] != []) {
            this.items = res['obj'];
            console.log(this.items.length);
          }
      },err => {
        console.error(err);
      });
  }

  clearDb(): void {
    this.serverService.clearDb()
      .subscribe(
        res => {
          console.log(res);
      },err => {
        console.error(err);
      });
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
