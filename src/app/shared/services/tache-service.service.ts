import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TacheInterface } from 'src/app/interfaces/tache';

@Injectable({
  providedIn: 'root'
})
export class TacheService {

  constructor(private httpClient: HttpClient) { }

  public getAllTaches(): Observable<any[]> {
    return this.httpClient.get<any[]>(
        environment.apiRoot + 'private/tache'
      );
  }

  public saveTache(tache: TacheInterface): Observable<any> {
    const uri: string = environment.apiRoot + 'private/tache';

    let date: Date = null;

    if(tache.dateEcheance !== null) {
      date = tache.dateEcheance.toDate();
    }

    const tacheToSave = {
      contenu: tache.contenu,
      dateEcheance: date,
      priorite: tache.priorite,
      projet: tache.projet
    };

    return this.httpClient.post<any>(
      uri,
      tacheToSave
    );
  }

  public modifyTache(tache: TacheInterface): Observable<any> {
    const uri: string = environment.apiRoot + 'private/tache';

    let date: Date = null;

    if(tache.dateEcheance !== null) {
      date = tache.dateEcheance.toDate();
    }

    const tacheToSave = {
      id: tache.id,
      contenu: tache.contenu,
      dateEcheance: date,
      priorite: tache.priorite,
      projet: tache.projet
    };

    return this.httpClient.put<any>(
      uri,
      tacheToSave
    );
  }

  public deleteTache(id: number): Observable<any> {
    return this.httpClient.delete<any>(environment.apiRoot + 'private/tache/' + id);
  }

  public valideTache(id: number): Observable<any> {
    return this.httpClient.get<any>(environment.apiRoot + 'private/tache/' + id);
  }
}
