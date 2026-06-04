import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectCompanyQuizzes,
  selectCompanyQuizzesError,
  selectCompanyQuizzesLoading,
  selectCompanyQuizzesMeta,
  selectCreateQuizzError,
  selectCreateQuizzLoading,
} from '@/features/quizzes/store/quizzesSelectors';
import { usePagination } from '@/hooks/usePagination';
import { getCompanyQuizzes } from '@/features/quizzes/store/quizzesThunks';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { LoadMoreButton } from '@/components/ui';
import { CreateQuizzModal } from '@/features/quizzes/components/CreateQuizzModal/CreateQuizzModal';
import QuizzesList from '@/features/quizzes/components/QuizzesList/QuizzesList';

const Quizzes = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const params = useParams();
  const selectedCompanyId = params.companyId;
  if (!selectedCompanyId) return null;

  const quizzes = useAppSelector(selectCompanyQuizzes);
  const quizzesLoading = useAppSelector(selectCompanyQuizzesLoading);
  const quizzesError = useAppSelector(selectCompanyQuizzesError);
  const quizzesMeta = useAppSelector(selectCompanyQuizzesMeta);
  const createQuizzLoading = useAppSelector(selectCreateQuizzLoading);
  const createQuizzError = useAppSelector(selectCreateQuizzError);

  const { limit, offset, loadMore } = usePagination({});
  const dispatch = useAppDispatch();

  const handleCreate = () => setModalOpen(true);

  useEffect(() => {
    dispatch(getCompanyQuizzes({ companyId: selectedCompanyId, params: { limit, offset } }));
  }, [dispatch, limit, offset]);

  return (
    <>
      <Button sx={{ mb: 2 }} variant="contained" color="primary" onClick={handleCreate}>
        Create quizz
      </Button>
      <QuizzesList quizzes={quizzes} isLoading={quizzesLoading} error={quizzesError} />
      <LoadMoreButton hasMore={quizzesMeta?.has_next} isLoading={quizzesLoading} onClick={loadMore} />
      <CreateQuizzModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        companyId={selectedCompanyId}
        isLoading={createQuizzLoading}
        error={createQuizzError}
      />
    </>
  );
};

export default Quizzes;
