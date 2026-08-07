import { Answer, AnswerForDetails, AttemptQuizzResponse, QuizzDetails } from '../types/quizzesTypes';

export const exportToJson = (
  quizz: QuizzDetails<Answer>,
  quizzResults: AttemptQuizzResponse | null,
  quizzAnswers: AnswerForDetails[]
) => {
  if (!quizzResults || !quizzAnswers) return;

  const data = {
    quiz: quizz.title,
    score: quizzResults.score,
    correctAnswers: quizzResults.correct_answers_count,
    totalQuestions: quizzResults.total_questions,
    lastAttempt: quizzResults.last_attempt_time,
    answers: quizzAnswers,
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json',
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `${quizz.title}-results.json`;
  a.click();

  URL.revokeObjectURL(url);
};
