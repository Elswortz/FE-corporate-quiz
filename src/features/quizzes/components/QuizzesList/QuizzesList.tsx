import { Alert, Card, CardContent, CardActionArea, Chip, Grid, Skeleton, Stack, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Quizz } from '../../types/quizzesTypes';
import { useTranslation } from 'react-i18next';

type QuizzesListProps = {
  quizzes: Quizz[];
  isLoading: boolean;
  error: string | null;
};

const QuizzesList = ({ quizzes, isLoading, error }: QuizzesListProps) => {
  const navigate = useNavigate();
  const { companyId } = useParams();
  const { t } = useTranslation('quizzes');

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (isLoading && quizzes.length === 0) {
    return (
      <Grid container spacing={2}>
        {Array.from({ length: 4 }).map((_, index) => (
          <Grid size={{ xs: 12, md: 6 }} key={index}>
            <Card>
              <CardContent>
                <Stack spacing={1}>
                  <Skeleton width="60%" height={32} />
                  <Skeleton width="100%" />
                  <Skeleton width="90%" />
                  <Skeleton width={120} />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  if (!quizzes.length) {
    return <Alert severity="info">No quizzes found</Alert>;
  }

  return (
    <Grid container spacing={2}>
      {quizzes.map(quizz => (
        <Grid key={quizz.id} size={{ xs: 12, md: 6, lg: 4 }}>
          <Card
            variant="outlined"
            sx={{
              height: '100%',
            }}
          >
            <CardActionArea
              sx={{ height: '100%' }}
              onClick={() => navigate(`/companies/${companyId}/quizzes/${quizz.id}`)}
            >
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="h6" component="h2">
                    {quizz.title}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {quizz.description}
                  </Typography>

                  <Chip label={`${t('completed')}: ${quizz.counter}`} size="small" sx={{ alignSelf: 'flex-start' }} />
                </Stack>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default QuizzesList;
