import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Student } from '../student';
import { StudentService } from '../student.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  s: Student = new Student;

studentdetails !:FormGroup;
actionBtn: string="Save";

  
  constructor(private formBuilder :FormBuilder, 
    private student :StudentService, 
    private dialogRef :MatDialogRef<DialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public editData:any) {

   }

  ngOnInit(): void {

  this.studentdetails=this.formBuilder.group({
   name:['',Validators.required],
   subjects:['',Validators.required]
  })
 if(this.editData)
 {
   this.actionBtn="Update";
   this.studentdetails.controls['name'].setValue(this.editData.name);
   this.studentdetails.controls['subjects'].setValue(this.editData.subjects);
 }
  
  }

  save()
  {
    if(!this.editData){
    this.s.name = this.studentdetails.value.name;
    this.s.subjects = this.studentdetails.value.subjects;
    this.student.addStudentList(this.s).subscribe(data=> {
    
      console.log(data);
      alert("Added Successfully!!");
      this.studentdetails .reset();
      this.dialogRef.close('save');

    
    })

  }else{
    this.update()
  }
  }
  update()
  {
    this.student.updateStudentList(this.studentdetails.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("updated successfully");
        
        this.studentdetails.reset();
        this.dialogRef.close('update');
      },
      error:()=>
      {
        alert("error while updating the record");
      }
    })
  }
}
