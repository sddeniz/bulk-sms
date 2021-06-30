import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DragulaModule } from 'ng2-dragula';
import { TranslateModule } from '@ngx-translate/core';
import { FeatherIconsComponent } from './components/feather-icons/feather-icons.component';
import { ContentComponent } from './components/layout/content/content.component';
import { FullComponent } from './components/layout/full/full.component';
import { LoaderComponent } from './components/loader/loader.component';


@NgModule({
  declarations: [
    ContentComponent,
    FeatherIconsComponent,
    FullComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    DragulaModule.forRoot(),
    TranslateModule
  ],
  providers: [
  ],
  exports: [
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    LoaderComponent,
    FeatherIconsComponent,
  ],
})
export class SharedModule { }
