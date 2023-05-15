import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  styleUrls: ['./directiva.component.scss']
})
export class DirectivaComponent implements OnInit {

  listaCurso: string[] = ['typeScript', 'javascript', 'java SE', 'C#', 'PHP'];
  habilitar = false;

  constructor() { }

  ngOnInit(): void {
  }

  setHabilitar(){
    this.habilitar = !this.habilitar;
  }

}
