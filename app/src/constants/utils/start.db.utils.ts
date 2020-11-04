import axios from 'axios';
import { ENV_VAR } from '../../../config';
import { exceptionErrors } from '../errors/exeptionsErrors';

export class dbUtils {

  private static host = ENV_VAR.host

  static async initializeStaticDbItems() {
    // Promise.all([
    //   this.addRoles(),
    //   this.addCuisines(),
    //   this.addCounty(),
    // ]).then(() => console.log('susses initialize'))
    //   .catch((error) => {
    //   console.log(error)
    //    //new exceptionErrors.mongoDbError(error);
    // });
    // await dbUtils.addRoles()
   //await this.addCuisines()
   //await this.addCounty()
    return axios.post(`${this.host}/roles/generate`);
  }

  private static addRoles(): Promise<any> {
    return axios.post(`${this.host}/roles/generate`);
  }

  private static addCuisines(): Promise<any> {
    return axios.post(`${this.host}/cuisine/generate`);
  }

  private static addCounty(): Promise<any> {
    return axios.post(`${this.host}/country/generate`);
  }
}