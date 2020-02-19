import { Component, OnInit } from '@angular/core';
import { DataService } from './../shared/data.service';

@Component({
  selector: 'app-count',
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.css']
})
export class CountComponent implements OnInit {

  constructor(private dataService: DataService) { }
  countDown: number;

  ngOnInit(): void {
    this.countDown = 0;
    this.dataService.currentCounter.subscribe(count => this.countDown = count);
  }

}
