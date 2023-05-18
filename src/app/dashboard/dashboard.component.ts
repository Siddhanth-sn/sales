import { Component, OnInit} from '@angular/core';
import { FlaskapiService } from '../flaskapi.service';
import { Details } from '../models/Details';
import {Router} from '@angular/router'
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {

  constructor(private flaskApiService:FlaskapiService,private router:Router) { }

  public file:any
  public busy: boolean | undefined;

public detailForm=new FormGroup({
  storeID:new FormControl('',Validators.required),
  productID:new FormControl('',Validators.required),
  predictSales:new FormControl('',Validators.required),
  timePeriod:new FormControl('',Validators.required),
  fileName:new FormControl('',Validators.required),
  cover:new FormControl('',Validators.required)
})

public handleInput(event:any){
  //getting the image or files
  this.file = event.target["files"]
  console.log(this.file);
}

public addDetails(formData: any){
  this.busy = true;
  this.flaskApiService.addDetail(formData, this.file).subscribe(res => {
    this.busy = false;
    console.log(res);
    alert("Predicted Successfully")
  });
}

ngOnInit(): void {

}
}









  /*name:string="";
  file:any
  getName(name: string){
    this.name = name
  }

  getFile(event: any){
    this.file = event.target.files[0]
    console.log("file",this.file)
  }

  submitData(){
    console.log("submitted file")




    let formData=new FormData();
    formData.set("name",this.name)
    formData.set("file",this.file)


    this.http.post<any>("http://127.0.0.1:5000/api",formData)
    .subscribe((res)=>{
      alert("File Uploaded Successfully")
    },err=>{
      alert("Error! Try Again")
    })
  }*/



