import { Component } from '@angular/core';
import quizz_questions from '../../../assets/data/quizz_questions.json'



@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent {

  title: string = ''

  questions: any
  questionSelected: any

  answers: string[] = []
  answerSelected: string = ''

  questionIndex: number = 0
  questionMaxIndex: number = 0

  finished: boolean = false

  ngOnInit(): void {
    if (quizz_questions) {
      this.finished = false
      this.title = quizz_questions.title

      this.questions = quizz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length

      console.log(this.questionIndex)
      console.log(this.questionMaxIndex)
    }
  }

  playerChoose(value: string) {
    this.answers.push(value)
    this.nextStep()
  }

  async nextStep() {
    this.questionIndex++

    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex]
    } else {
      const finalAnswer: string = await this.checkResult(this.answers)
      this.finished = true
      this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results]
    }
  }

  async checkResult(answers: string[]) {
    const result = answers.reduce((previus, current, i, arr) => {
      if (
        arr.filter(item => item === previus).length >
        arr.filter(item => item === current).length
      ){
        return previus
      } else {
        return current
      }

    })
    return result
  }
}
