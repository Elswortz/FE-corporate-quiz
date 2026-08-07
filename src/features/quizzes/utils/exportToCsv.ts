import { Answer, AnswerForDetails, QuizzDetails } from '../types/quizzesTypes';

export const exportToCsv = (quizz: QuizzDetails<Answer>, quizzAnswers: AnswerForDetails[]) => {
  if (!quizzAnswers) return;

  const headers = ['Question', 'Selected Answer', 'Correct'];

  const rows = quizzAnswers.map(answer => [
    answer.question_text,
    answer.selected_answer_text,
    answer.is_correct ? 'Yes' : 'No',
  ]);

  const csvContent = [headers, ...rows]
    .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n');

  const blob = new Blob([csvContent], {
    type: 'text/csv;charset=utf-8;',
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `${quizz.title}-results.csv`;
  a.click();

  URL.revokeObjectURL(url);
};
