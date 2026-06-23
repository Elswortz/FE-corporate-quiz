import * as XLSX from 'xlsx';
import { QuizzFormData } from '../schemas/quizzFormSchema';

type QuizRow = {
  Question: string;
  Answer: string;
  Correct: boolean | string | number;
};

export const parseQuizExcel = async (file: File): Promise<QuizzFormData> => {
  const buffer = await file.arrayBuffer();

  const workbook = XLSX.read(buffer);

  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  const rows = XLSX.utils.sheet_to_json<QuizRow>(sheet);

  const questionsMap = new Map<
    string,
    {
      question_text: string;
      answers: {
        answer_text: string;
        is_correct: boolean;
      }[];
    }
  >();

  rows.forEach(row => {
    const question = row.Question?.trim();
    const answer = row.Answer?.trim();

    if (!question || !answer) return;

    const isCorrect = row.Correct === true || row.Correct === 'TRUE' || row.Correct === 'true' || row.Correct === 1;

    if (!questionsMap.has(question)) {
      questionsMap.set(question, {
        question_text: question,
        answers: [],
      });
    }

    questionsMap.get(question)?.answers.push({
      answer_text: answer,
      is_correct: isCorrect,
    });
  });

  return {
    title: '',
    description: '',
    questions: Array.from(questionsMap.values()),
  };
};
