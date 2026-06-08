import { z } from 'zod';

export const quizzFormSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  description: z.string().min(3, 'Description is required'),
  questions: z
    .array(
      z.object({
        question_text: z.string().min(1, 'Question is required'),
        answers: z
          .array(
            z.object({
              answer_text: z.string().min(1, 'Answer is required'),
              is_correct: z.boolean(),
            })
          )
          .min(2, 'At least 2 answers required')
          .refine(answers => answers.some(answer => answer.is_correct), 'At least one correct answer is required'),
      })
    )
    .min(1, 'At least one question is required'),
});

export type QuizzFormData = z.infer<typeof quizzFormSchema>;
