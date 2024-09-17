import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {retry, catchError} from 'rxjs/operators'
import { ToastController } from '@ionic/angular';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  films: Observable<any> | undefined;



  constructor(private router: Router, private http: HttpClient, public ToastController: ToastController) {}

  ngOnInit() {
    this.films = this.http.get('https://swapi.dev/api/films').pipe(
    catchError(erro => this.ExibirErro(erro))
  );
  }
  async ExibirErro(erro){
    const toast = await this.ToastController.create({
      message: "Erro ao consultar API " + erro.status + ": " + erro.message,
      duration: 4000,
      color: 'danger',
      position:'middle'
    });
    console.log(erro);
    toast.present();
    return null;
  }

  openDetails(film){
    const split =film.url.split('/');
    const filmID = split[5];
    this.router.navigateByUrl(`/filme-detalhe/${filmID}`)
  }
}
