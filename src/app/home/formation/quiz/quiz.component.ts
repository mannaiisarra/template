import {Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Quiz } from 'src/app/model/quiz';
import { Response } from 'src/app/model/response';
import { QuizService } from 'src/app/_services/quiz.service';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  quiz: Quiz = {} as Quiz;

  correct: any = {};
  quusu:any;
  quizz:any;
  responses: Response[] | undefined=[];
  constructor(private quizService: QuizService,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getAllQuiz();
  }

  addQuestion() {
    this.quizService.addQuiz(this.quiz).subscribe(res => {
      this.quiz = res.data;
      console.log("quiz",this.quiz)
     
    })
  }
  
  setResponse() {
    this.quiz.correct = this.correct;
   }

   findResponse(id: number) {
    this.quizService.getQuizById(id).subscribe(res => {
      this.quusu = res;
    })
    }

    
    getAllQuiz(){
      this.quizService.getAllQuiz().subscribe(res=>{
        console.log("get all quiz",res.data);
        this.quizz = res.data;
      
      
         
    
      })
    
    }
}
