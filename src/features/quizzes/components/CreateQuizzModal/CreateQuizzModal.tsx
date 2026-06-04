import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateQuizzFormData, createQuizzSchema } from '../../schemas/createQuizzSchema';
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
import { useAppDispatch } from '@/store/hooks';
import { createQuizz } from '../../store/quizzesThunks';
import { showNotification } from '@/features/notifications/store/notificationsSlice';

type Props = {
  open: boolean;
  onClose: () => void;
  companyId: string;
  isLoading: boolean;
  error: string | null;
};

export const CreateQuizzModal = ({ open, onClose, companyId, isLoading, error }: Props) => {
  const dispatch = useAppDispatch();
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateQuizzFormData>({
    resolver: zodResolver(createQuizzSchema),
    defaultValues: {
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
    },
  });

  const {
    fields: questions,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control,
    name: 'questions',
  });

  const onSubmit = (data: CreateQuizzFormData) => {
    try {
      dispatch(createQuizz({ companyId, payload: data }));
      reset();
      onClose();
      dispatch(showNotification({ message: 'New quizz successfuly created', severity: 'success' }));
    } catch (error: any) {
      dispatch(
        showNotification({ message: error.response?.data?.message || 'Failed to create a quizz', severity: 'error' })
      );
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Create Quiz</DialogTitle>

      <DialogContent>
        <Stack spacing={3} mt={1}>
          <TextField
            label="Title"
            fullWidth
            {...register('title')}
            error={!!errors.title}
            helperText={errors.title?.message}
          />

          <TextField
            label="Description"
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
            Add Question
          </Button>

          {error && <Typography color="error">{error}</Typography>}
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button loading={isLoading} variant="contained" onClick={handleSubmit(onSubmit)}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

type QuestionBlockProps = {
  questionIndex: number;
  control: any;
  register: any;
  removeQuestion: (index: number) => void;
};

const QuestionBlock = ({ questionIndex, control, register, removeQuestion }: QuestionBlockProps) => {
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
          <Typography variant="h6">Question {questionIndex + 1}</Typography>

          <IconButton onClick={() => removeQuestion(questionIndex)}>
            <DeleteIcon />
          </IconButton>
        </Stack>

        <TextField fullWidth label="Question" {...register(`questions.${questionIndex}.question_text`)} />

        {answers.map((answer, answerIndex) => (
          <Stack key={answer.id} direction="row" spacing={2} alignItems="center">
            <TextField
              fullWidth
              label={`Answer ${answerIndex + 1}`}
              {...register(`questions.${questionIndex}.answers.${answerIndex}.answer_text`)}
            />

            <Controller
              control={control}
              name={`questions.${questionIndex}.answers.${answerIndex}.is_correct`}
              render={({ field }) => (
                <FormControlLabel
                  label="Correct"
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
          Add Answer
        </Button>
      </Stack>
    </Box>
  );
};
