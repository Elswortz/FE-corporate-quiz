import * as XLSX from 'xlsx';

export const downloadQuizTemplate = () => {
  const rows = [
    {
      Question: 'What is React?',
      Answer: 'Library',
      Correct: true,
    },
    {
      Question: 'What is React?',
      Answer: 'Framework',
      Correct: false,
    },
    {
      Question: 'What is React?',
      Answer: 'Database',
      Correct: false,
    },
    {
      Question: 'JS creator?',
      Answer: 'Brendan Eich',
      Correct: true,
    },
    {
      Question: 'JS creator?',
      Answer: 'Bill Gates',
      Correct: false,
    },
  ];

  const worksheet = XLSX.utils.json_to_sheet(rows);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Quiz');

  XLSX.writeFile(workbook, 'quiz-template.xlsx');
};
