import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { DataService } from './services/data.service';
import { ProductComponent } from './components/product/product.component';

@NgModule({
	imports: [
		BrowserModule,
		HttpModule
	],
	declarations: [
		AppComponent,
		ProductComponent
	],
	providers: [DataService],
	bootstrap: [ AppComponent ]
})

export class AppModule { }
