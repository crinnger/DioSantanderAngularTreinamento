import { Component, OnInit } from "@angular/core";
import { Course } from "./course";
import { CourseService } from './course.service';

@Component({
    templateUrl: './course-list.component.html'
})
export class CourseListComponent implements OnInit {

    _courses: Course[]=[];

    filteredCourses: Course[]=[];

    _filterBy!: string;

    constructor(private courseService: CourseService){   }

    ngOnInit(): void{
        //this._courses=this.courseService.retrieveAll();
        //this.filteredCourses=this._courses
        this.retrieveAllHttp();
    }

    retrieveAllHttp() : void{
      this.courseService.retrieveAllHttp().subscribe({
        next: courses=> {
          this._courses=courses;
          this.filteredCourses=this._courses;
        },
        error: err=> console.log('Error', err)
      });
    }

    set filter(value: string){
      this._filterBy=value;
      this.filteredCourses=this._courses.filter((course: Course)=>
      course.name.toLocaleLowerCase().indexOf(this._filterBy.toLocaleLowerCase())>-1);
    }

    get filter(){
      return this._filterBy;
    }

    deleteById(courseId:number):void{
      this.courseService.deleteByIdHttp(courseId).subscribe({
        next: ()=> {
          console.log('Delete com sucesso');
          this.retrieveAllHttp();
        },
        error: err=> console.log('Error', err)
      });
    }
}
