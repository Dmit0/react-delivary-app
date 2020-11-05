import axios from 'axios';
import { forkJoin } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ENV_VAR } from '../../../config';
import { exceptionErrors } from '../errors/exeptionsErrors';

export class dbUtils {
  private static host = ENV_VAR.host;

  static async initializeStaticDbItems() {
    const arr = await Promise.all([
      this.addRoles(),
      this.addCuisines(),
      this.addCounty(),
    ]).then((res) => console.log(res))
      .catch((err) => new exceptionErrors.mongoDbError(err));
    console.log(arr);
  }

  private static addRoles() {
    console.log(`${ this.host }/roles/generate`)
    return axios.post(`${ this.host }/roles/generate`);
  }

  private static addCuisines(): Promise<any> {
    return axios.post(`${ this.host }/cuisine/generate`);
  }

  private static addCounty(): Promise<any> {
    return axios.post(`${ this.host }/country/generate`);
  }
}