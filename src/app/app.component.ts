import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
    private rowDataUrl = 'https://api.myjson.com/bins/15psn9';
    @ViewChild('agGrid') agGrid: AgGridAngular;
    title = 'app';

    columnDefs = [
        { headerName: 'Make', field: 'make', 
          sortable: true, filter: true, checkboxSelection: true },
        { headerName: 'Model', field: 'model', sortable: true, filter: true },
        { headerName: 'Price', field: 'price', sortable: true, filter: true }
    ];

    rowData: any;

    constructor(private http: HttpClient) {}

    ngOnInit() {
      this.rowData = this.http.get(this.rowDataUrl);
    }

    getSelectedRows() {
      const selectedNodes = this.agGrid.api.getSelectedNodes();
      const selectedData = selectedNodes.map(node => node.data);
      const selectedDataStringPresentation = selectedData.map(node => node.make + ' ' + node.model).join(', ');
      alert(`Selected nodes: ${selectedDataStringPresentation}`);
    }    
}
