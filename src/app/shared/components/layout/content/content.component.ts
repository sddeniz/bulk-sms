import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as feather from 'feather-icons';
import { fadeInAnimation } from '../../../data/router-animation/router-animation';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/firebase/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {any} from 'codelyzer/util/function';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  animations: [fadeInAnimation]
})
export class ContentComponent implements OnInit, AfterViewInit {
  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
  fileUploadForm: File;
  fileInputLabel: string;
  public smsForm: FormGroup;
  public content = 'sms';
  public users :any;
  constructor(private route: ActivatedRoute,
              public router: Router,
              private authService: AuthService,
              private fb: FormBuilder,
              public afAuth: AngularFireAuth,
              private formBuilder: FormBuilder


  ) {
    this.smsForm = this.fb.group({
      message: ['', [Validators.required]],
      msisdn: ['', Validators.required],
      smsNo: ['', Validators.required]
    });
  }
  ngAfterViewInit() {
    setTimeout(() => {
      feather.replace();
    });
  }

  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

  ngOnInit() {
  }

  sendSms() {
    this.afAuth.authState.subscribe(user => {
      if (localStorage.getItem('token')) {
        let body = {};
        body = {
          'message': this.smsForm.value['message'],
          'smsNo': this.smsForm.value['smsNo'],
          'MSISDN': this.smsForm.value['msisdn'],
        };
        this.authService.sendSms(body);

      } else {
        this.router.navigate(['/auth/signup'])

      }
    });

  }

setFile(event:any){
    if (event.target.files.length > 0) {
    const file = event.target.files[0];
    this.fileUploadForm=file;

  }
  //   let file:File;
  //   console.log(event);
  // let formData:FormData = new FormData();
  // formData.append('upload',file,file.name)
  // let headers = new Headers();
  // headers.append('Content-Type', 'multipart/form-data');
  // headers.append('Accept', 'application/json');
  // this.authService.sendBatchFile(formData)

}
sendBatchFile(){
  if (!this.fileUploadForm == null) {
    return false;
  }

  let formData:FormData  = new FormData();
  formData.append('file',this.fileUploadForm );
  this.authService.sendBatchFile(formData);


}
  getUsers(){
    if(this.content == 'sms') {
      this.content = 'users';
      this.authService.getUsers().subscribe(
          (data => {
            this.users = data;
          })
      );

    }else if(this.content == 'users') {
      this.content = 'sms';
    }





  }

}
