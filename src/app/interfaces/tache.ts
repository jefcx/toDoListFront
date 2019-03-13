import * as moment from 'moment';
import { ProjetInterface } from './projet';

export interface TacheInterface {
  id: number;
  contenu: string;
  dateEcheance: moment.Moment;
  priorite: number;
  projet: ProjetInterface;
  delete?: boolean;
  modify?: boolean;
  idUtilisateur?: number;
}
