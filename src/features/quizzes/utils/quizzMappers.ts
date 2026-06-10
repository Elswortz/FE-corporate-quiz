import { QuizzFormData } from '../schemas/quizzFormSchema';
import { Answer, QuizzDetails } from '../types/quizzesTypes';

export const mapQuizzToFormData = (quizz: QuizzDetails<Answer>): QuizzFormData => ({
  title: quizz.title,
  description: quizz.description,
  questions: quizz.questions.map(question => ({
    question_text: question.question_text,
    answers: question.answers.map(answer => ({
      answer_text: answer.answer_text,
      is_correct: answer.is_correct ?? false,
    })),
  })),
});
