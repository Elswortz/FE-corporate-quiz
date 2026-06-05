import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  LinearProgress,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { selectSelectedCompany } from '@/features/companies/store/companiesSelectors';
import { showNotification } from '@/features/notifications/store/notificationsSlice';
import {
  selectDeleteQuizzError,
  selectDeleteQuizzLoading,
  selectQuizzAnswers,
  selectQuizzAnswersError,
  selectQuizzAnswersLoading,
  selectQuizzResults,
  selectQuizzResultsError,
  selectQuizzResultsLoading,
  selectSelectedQuizz,
  selectSelectedQuizzError,
  selectSelectedQuizzLoading,
  selectUpdateQuizzError,
  selectUpdateQuizzLoading,
} from '@/features/quizzes/store/quizzesSelectors';
import { clearCurrentQuizz } from '@/features/quizzes/store/quizzesSlice';
import {
  attemptQuizz,
  deleteQuizz,
  getQuizz,
  getQuizzAnswers,
  updateQuizz,
} from '@/features/quizzes/store/quizzesThunks';
import { AttemptQuizzPayload, UpdateQuizzPayload } from '@/features/quizzes/types/quizzesTypes';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getUserRoleInCompany } from '@/utils/companyHelpers';
import { useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const QuizzDetails = () => {
  const { companyId, quizzId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, user } = useAuth();

  const selectedCompany = useAppSelector(selectSelectedCompany);

  const quizz = useAppSelector(selectSelectedQuizz);
  const quizzLoading = useAppSelector(selectSelectedQuizzLoading);
  const quizzError = useAppSelector(selectSelectedQuizzError);

  const quizzResults = useAppSelector(selectQuizzResults);
  const quizzResultsLoading = useAppSelector(selectQuizzResultsLoading);
  const quizzResultsError = useAppSelector(selectQuizzResultsError);

  const quizzAnswers = useAppSelector(selectQuizzAnswers);
  const quizzAnswersLoadng = useAppSelector(selectQuizzAnswersLoading);
  const quizzAnswersError = useAppSelector(selectQuizzAnswersError);

  const updateQuizzLoading = useAppSelector(selectUpdateQuizzLoading);
  const updateQuizzError = useAppSelector(selectUpdateQuizzError);

  const deleteQuizzLoading = useAppSelector(selectDeleteQuizzLoading);
  const deleteQuizzError = useAppSelector(selectDeleteQuizzError);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showAnswers, setShowAnswers] = useState(false);

  const role = useMemo(() => {
    if (!selectedCompany || !user) return null;
    return getUserRoleInCompany(selectedCompany, user.id);
  }, [selectedCompany, user]);

  const backLinkHref = location.state?.from ?? `/companies/${companyId}`;

  const isCompleted = quizz?.questions.every(q => answers[q.id]) ?? false;

  useEffect(() => {
    if (!companyId || !quizzId) return;
    dispatch(getQuizz({ companyId, quizzId }));

    return () => {
      dispatch(clearCurrentQuizz());
    };
  }, [dispatch, companyId, quizzId]);

  const handleAnswerChange = (questionId: string, answerId: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerId,
    }));
  };

  const handleSubmitQuiz = () => {
    if (!quizz) return;

    const payload: AttemptQuizzPayload = {
      questions: quizz.questions.map(question => ({
        question_id: question.id,
        selected_answer_id: answers[question.id],
      })),
    };
    console.log(payload);
    handleAttempt(payload);
  };

  const handleUpdate = async (payload: UpdateQuizzPayload) => {
    if (!companyId || !quizzId) return;
    try {
      await dispatch(updateQuizz({ companyId, quizzId, payload })).unwrap();
      dispatch(showNotification({ message: 'Quizz updated successfuly', severity: 'success' }));
    } catch (err: any) {
      dispatch(showNotification({ message: err || 'Failed to update quizz', severity: 'error' }));
    }
  };

  const handleDelete = async () => {
    if (!companyId || !quizzId) return;
    try {
      await dispatch(deleteQuizz({ companyId, quizzId })).unwrap();
      dispatch(showNotification({ message: 'Quizz deleted successfuly', severity: 'success' }));
    } catch (err: any) {
      dispatch(showNotification({ message: err || 'Failed to delete quizz', severity: 'error' }));
    }
  };

  const handleAttempt = async (payload: AttemptQuizzPayload) => {
    if (!companyId || !quizzId) return;
    try {
      await dispatch(attemptQuizz({ companyId, quizzId, payload })).unwrap();
      dispatch(showNotification({ message: 'Quizz successfuly attempted', severity: 'success' }));
    } catch (err: any) {
      dispatch(showNotification({ message: err || 'Failed to attempt quizz', severity: 'error' }));
    }
  };

  const handleGetAnswers = async () => {
    if (!companyId || !quizzId) return;
    try {
      await dispatch(getQuizzAnswers({ companyId, quizzId })).unwrap();
      dispatch(showNotification({ message: 'Successfuly load quiz answers', severity: 'success' }));
    } catch (err: any) {
      dispatch(showNotification({ message: err || 'Failed to load quizz answers', severity: 'error' }));
    }
  };

  if (quizzLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  if (quizzError) {
    return <Alert severity="error">{quizzError}</Alert>;
  }

  if (!quizz) {
    return <Alert severity="info">Quiz not found</Alert>;
  }

  return (
    <Container>
      <Stack spacing={3}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(backLinkHref)} sx={{ alignSelf: 'flex-start' }}>
          Back
        </Button>

        <Card>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h4">{quizz.title}</Typography>

              <Typography color="text.secondary">{quizz.description}</Typography>

              <Chip label={`${quizz.questions.length} questions`} sx={{ alignSelf: 'flex-start' }} />

              {(role === 'owner' || role === 'admin') && (
                <Stack direction="row" spacing={2}>
                  <Button variant="outlined" startIcon={<EditIcon />} onClick={() => setIsEditOpen(true)}>
                    Edit
                  </Button>

                  <Button
                    color="error"
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={() => setIsConfirmDeleteOpen(true)}
                  >
                    Delete
                  </Button>
                </Stack>
              )}
            </Stack>
          </CardContent>
        </Card>

        {!quizzResults && (
          <>
            {quizz.questions.map((question, index) => (
              <Card key={question.id}>
                <CardContent>
                  <Stack spacing={2}>
                    <Typography variant="h6">
                      {index + 1}. {question.question_text}
                    </Typography>

                    <FormControl>
                      <RadioGroup
                        value={answers[question.id] ?? ''}
                        onChange={e => handleAnswerChange(question.id, e.target.value)}
                      >
                        {question.answers.map(answer => (
                          <FormControlLabel
                            key={answer.id}
                            value={answer.id}
                            control={<Radio />}
                            label={answer.answer_text}
                          />
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </Stack>
                </CardContent>
              </Card>
            ))}

            <Button variant="contained" disabled={!isCompleted || quizzResultsLoading} onClick={handleSubmitQuiz}>
              Submit Quiz
            </Button>
          </>
        )}

        {quizzResults && (
          <Card>
            <CardContent>
              <Stack spacing={3}>
                <Typography variant="h5">Quiz completed</Typography>

                <LinearProgress
                  variant="determinate"
                  value={(quizzResults.correct_answers_count / quizzResults.total_questions) * 100}
                />

                <Typography variant="h4">{quizzResults.score}%</Typography>

                <Typography>
                  Correct answers: {quizzResults.correct_answers_count} / {quizzResults.total_questions}
                </Typography>

                <Typography color="text.secondary">
                  Last attempt: {new Date(quizzResults.last_attempt_time).toLocaleString()}
                </Typography>

                <Button
                  variant="outlined"
                  onClick={() => {
                    handleGetAnswers();
                    setShowAnswers(true);
                  }}
                >
                  Show Correct Answers
                </Button>
              </Stack>
            </CardContent>
          </Card>
        )}

        {showAnswers && quizzAnswers && (
          <Card>
            <CardContent>
              <Stack spacing={3}>
                <Typography variant="h5">Answers Review</Typography>

                {quizzAnswers.map((answer, index) => (
                  <Box key={answer.question_id}>
                    <Typography variant="subtitle1">
                      {index + 1}. {answer.question_text}
                    </Typography>

                    <Typography color={answer.is_correct ? 'success.main' : 'error.main'}>
                      Your answer: {answer.selected_answer_text}
                    </Typography>

                    <Chip
                      color={answer.is_correct ? 'success' : 'error'}
                      label={answer.is_correct ? 'Correct' : 'Incorrect'}
                      size="small"
                    />

                    <Divider sx={{ mt: 2 }} />
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        )}
      </Stack>
    </Container>
  );
};

export default QuizzDetails;
