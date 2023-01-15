import { Component, HostListener, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'Rachunki v.2';
  bigMenu = true;

  ngOnInit(): void {
    this.onWindowResize();
  }

   //nasłuchuje zmiany rozmiaru ekranu
  @HostListener('window:resize', ['$event'])
  onWindowResize(): void {
    if (window.innerWidth < 992){
      this.bigMenu=false;
    } else {
      this.bigMenu=true;
    }
  }
}
