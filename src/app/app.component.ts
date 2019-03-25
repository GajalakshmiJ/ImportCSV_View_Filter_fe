import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'import-view-csv';
  issues :any[];
  filteredIssues :string[];
  private searchString: string;
  header: string[];
  final: any[];
  constructor() {
    this.issues = [];
    this.header = [];
    this.final = [];
  }
  getSearchString() :string {
    return this.searchString;
  }
  setSearchString(value : string) {
    this.searchString = value;
  }
  public changeListener(files: FileList){
    console.log(files);
    if(files && files.length > 0) {
       let file : File = files.item(0); 
         let reader: FileReader = new FileReader();
         reader.readAsText(file);
         reader.onload = (e) => {
            let csv: string = reader.result as string;
            this.convertToArray(csv);
         }
      }
  }
  public convertToArray(input: string) :string[] {
    let entries=input.split('\n');
    this.header=entries[0].split(',');
    for(let k=0; k<this.header.length; k++) {
      this.header[k] = this.header[k].replace("\"","");
      this.header[k] = this.header[k].replace("\"","");
    }  
    for(let i=1; i<entries.length; i++) {
      let row = entries[i].split(',');
      let object = {};
      for(let j=0; j<row.length; j++) {
          object[this.header[j]]=row[j];
      }
      this.final.push(object);
    }
    return entries;
  }
}

