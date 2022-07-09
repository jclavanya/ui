import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { StudentService } from '../student.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  displayedColumns: string[] = ['name', 'subjects','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dia: MatDialog , private student: StudentService) { }

  openDialog() 
  {
    this.dia.open(DialogComponent, 
      {
      width :'30%'
      
    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.getDetails();
      }
    })
  }
  
  ngOnInit(): void {
    this.getDetails();
  }


getDetails() {
    this.student.getList().subscribe({
      next:(res)=>
      {
        this.dataSource=new MatTableDataSource(res);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;

      },
      error:(err)=>
      {
        alert("error while fetching the data");
      }
    })
      
    
    
  }
  edit(row:any)
  {
    this.dia.open(DialogComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getDetails();
      }
    })
  }

 delete(id:number)
 {
   this.student.deleteStudentList(id).subscribe({
  next:(res)=>
  {
    alert("deleted successfully");
    this.getDetails();
  },
  error:()=>
  {
    alert("Error While Deleting the Product");
  }

   })
 }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  }
