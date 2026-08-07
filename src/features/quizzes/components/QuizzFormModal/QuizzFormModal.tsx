import { useEffect } from 'react';
import { Controller, useFieldArray, useForm, Control, UseFormRegister } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { QuizzFormData, quizzFormSchema } from '../../schemas/quizzFormSchema';
import { parseQuizExcel } from '../../utils/quizzImport';
import { downloadQuizTemplate } from '../../utils/quizzTemplate';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DownloadIcon from '@mui/icons-material/Download';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';

type Props = {
  open: boolean;
  onClose: () => void;
  isLoading: boolean;
  error: string | null;

  initialData?: QuizzFormData;
  onSubmit: (data: QuizzFormData) => void;
};

const emptyValues: QuizzFormData = {
  title: '',
  description: '',
  questions: [
    {
      question_text: '',
      answers: [
        {
          answer_text: '',
          is_correct: false,
        },
        {
          answer_text: '',
          is_correct: false,
        },
      ],
    },
  ],
};

export const QuizzFormModal = ({ open, onClose, isLoading, error, initialData, onSubmit }: Props) => {
  const { t } = useTranslation('quizzes');
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuizzFormData>({
    resolver: zodResolver(quizzFormSchema),
    defaultValues: emptyValues,
  });

  const {
    fields: questions,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control,
    name: 'questions',
  });

  useEffect(() => {
    if (!open) return;

    reset(initialData ?? emptyValues);
  }, [open, initialData, reset]);

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const importedQuiz = await parseQuizExcel(file);
      reset(importedQuiz);
    } catch (error) {
      console.error(error);
    }
    event.target.value = '';
  };

  const handleFormSubmit = (data: QuizzFormData) => {
    onSubmit(data);
    onClose();
  };

  const handleClose = () => {
    reset(emptyValues);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{initialData ? t('modals.edit.title') : t('modals.create.title')}</Typography>

          <Stack direction="row" spacing={1}>
            <Button size="small" variant="outlined" startIcon={<DownloadIcon />} onClick={downloadQuizTemplate}>
              {t('modals.create.buttons.template')}
            </Button>

            <Button component="label" size="small" variant="outlined" startIcon={<UploadFileIcon />}>
              {t('modals.create.buttons.import')}
              <input hidden type="file" accept=".xlsx,.xls" onChange={handleImport} />
            </Button>
          </Stack>
        </Stack>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3} mt={1}>
          <TextField
            label={t('modals.create.fields.title')}
            fullWidth
            {...register('title')}
            error={!!errors.title}
            helperText={errors.title?.message}
          />

          <TextField
            label={t('modals.create.fields.description')}
            multiline
            rows={3}
            fullWidth
            {...register('description')}
            error={!!errors.description}
            helperText={errors.description?.message}
          />

          {questions.map((question, questionIndex) => (
            <QuestionBlock
              key={question.id}
              control={control}
              register={register}
              questionIndex={questionIndex}
              removeQuestion={removeQuestion}
            />
          ))}

          <Button
            startIcon={<AddIcon />}
            onClick={() =>
              appendQuestion({
                question_text: '',
                answers: [
                  {
                    answer_text: '',
                    is_correct: false,
                  },
                  {
                    answer_text: '',
                    is_correct: false,
                  },
                ],
              })
            }
          >
            {t('modals.create.buttons.addQuestion')}
          </Button>

          {error && <Typography color="error">{error}</Typography>}
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>{t('modals.create.buttons.cancel')}</Button>

        <Button loading={isLoading} variant="contained" onClick={handleSubmit(handleFormSubmit)}>
          {initialData ? t('modals.edit.buttons.save') : t('modals.create.buttons.create')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

type QuestionBlockProps = {
  questionIndex: number;
  control: Control<QuizzFormData>;
  register: UseFormRegister<QuizzFormData>;
  removeQuestion: (index: number) => void;
};

const QuestionBlock = ({ questionIndex, control, register, removeQuestion }: QuestionBlockProps) => {
  const { t } = useTranslation('quizzes');
  const {
    fields: answers,
    append: appendAnswer,
    remove: removeAnswer,
  } = useFieldArray({
    control,
    name: `questions.${questionIndex}.answers`,
  });

  return (
    <Box
      sx={{
        border: 1,
        borderColor: 'divider',
        borderRadius: 2,
        p: 2,
      }}
    >
      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6">{`${t('modals.create.fields.question')} ${questionIndex + 1}`}</Typography>

          <IconButton onClick={() => removeQuestion(questionIndex)}>
            <DeleteIcon />
          </IconButton>
        </Stack>

        <TextField
          fullWidth
          label={t('modals.create.fields.question')}
          {...register(`questions.${questionIndex}.question_text`)}
        />

        {answers.map((answer, answerIndex) => (
          <Stack key={answer.id} direction="row" spacing={2} alignItems="center">
            <TextField
              fullWidth
              label={`${t('modals.create.fields.answer')} ${answerIndex + 1}`}
              {...register(`questions.${questionIndex}.answers.${answerIndex}.answer_text`)}
            />

            <Controller
              control={control}
              name={`questions.${questionIndex}.answers.${answerIndex}.is_correct`}
              render={({ field }) => (
                <FormControlLabel
                  label={t('modals.create.correct')}
                  control={<Checkbox checked={field.value} onChange={field.onChange} />}
                />
              )}
            />

            <IconButton disabled={answers.length <= 2} onClick={() => removeAnswer(answerIndex)}>
              <DeleteIcon />
            </IconButton>
          </Stack>
        ))}

        <Button
          startIcon={<AddIcon />}
          onClick={() =>
            appendAnswer({
              answer_text: '',
              is_correct: false,
            })
          }
        >
          {t('modals.create.buttons.addAnswer')}
        </Button>
      </Stack>
    </Box>
  );
};
