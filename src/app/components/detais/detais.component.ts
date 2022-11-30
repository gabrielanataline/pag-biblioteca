import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Livros } from 'src/app/models/livros'

@Component({
  selector: 'app-detais',
  templateUrl: './detais.component.html',
  styleUrls: ['./detais.component.css']
})
export class DetaisComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public livros: Livros) { }

  ngOnInit(): void {
  }

}
