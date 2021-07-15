import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Course } from "./course";
import { CourseService } from "./course.service";

@Component({
  templateUrl:'course-info.component.html'
})
export class CourseInfoComponent implements OnInit{

  courseId!: number;
  course!:Course;

  constructor(private route:ActivatedRoute, private courseService:CourseService){

  }

  ngOnInit(): void {
    this.courseId = +this.route.snapshot.paramMap.get('id')!;
    //this.course=this.courseService.getById(this.courseId);
    this.getByIdHttp();
  }

  getByIdHttp(): void{
    this.courseService.getByIdHttp(this.courseId).subscribe({
      next: courseHttp=> this.course=courseHttp,
      error: err=> console.log('Error', err)
    });
  }

  save():void{
    //this.courseService.save(this.course);
    this.courseService.saveHttp(this.course).subscribe({
      next: courseHttp=> this.course=courseHttp,
      error: err=> console.log('Error', err)
    });
  }

}
