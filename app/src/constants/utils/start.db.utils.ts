import axios from 'axios';
import { ENV_VAR } from '../../../config';
import { exceptionErrors } from '../errors/exeptionsErrors';

export class dbUtils {

  private static host = ENV_VAR.host

  static initializeStaticDbItems() {
    Promise.all([
      this.addRoles(),
      this.addCuisines(),
      this.addCounty(),
    ]).catch((error) => {
       new exceptionErrors.mongoDbError(error);
    });
  }

  private static addRoles(): any {
    return axios.post(`${this.host}/roles/generate`);
  }

  private static addCuisines(): Promise<any> {
    return axios.post(`${this.host}/cuisine/generate`);
  }

  private static addCounty(): Promise<any> {
    return axios.post(`${this.host}/country/generate`);
  }
}