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
                if (this.items[i]['name'] === 'bin9' || this.items[i]['name'] === 'bin4' || this.items[i]['name'] === 'bin3' || this.items[i]['name'] === 'up') {
                  this.shelf1.push(this.items[i]);
                } else if (this.items[i]['name'] === 'bin1' || this.items[i]['name'] === 'bin6' || this.items[i]['name'] === 'Object 1' || this.items[i]['name'] === 'up1') {
                  this.shelf2.push(this.items[i]);
                } else if (this.items[i]['name'] === 'com') {
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

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
