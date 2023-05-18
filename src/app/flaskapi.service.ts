import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Details } from './models/Details';

@Injectable({
  providedIn: 'root'
})
export class FlaskapiService {

  constructor(private http:HttpClient) { }

  public server:string="http://localhost:5000/api/"

  public getDetails(){
    return this.http.get<Details>(this.server+"dashboard")
  }

  /*public getDetail(detailId:string){
    return this.http.get<Details>(this.server+`dashboard/${detailId}`)
  }*/

  public addDetail(detailObj:Details,file:any){
    console.log(file)

    const {storeID,productID,predictSales,timePeriod,fileName} = detailObj

    const formData:FormData=new FormData();

      formData.append("storeID", storeID)
      formData.append("productID",productID)
      formData.append("predictSales",predictSales)
      formData.append("timePeriod",timePeriod)
      formData.append("fileName",fileName)
      formData.append("cover",file[0],file['filename'])

      return this.http.post<Details>(this.server+"dashboard",formData)

  }

}
