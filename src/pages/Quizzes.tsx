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
import { createQuizz, getCompanyQuizzes } from '@/features/quizzes/store/quizzesThunks';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { LoadMoreButton } from '@/components/ui';
import { QuizzFormModal } from '@/features/quizzes/components/QuizzFormModal/QuizzFormModal';
import QuizzesList from '@/features/quizzes/components/QuizzesList/QuizzesList';
import { QuizzFormData } from '@/features/quizzes/schemas/quizzFormSchema';
import { showNotification } from '@/features/notifications/store/notificationsSlice';
import { selectUserRoleInCompany } from '@/features/companies/store/companiesSelectors';

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
  const role = useAppSelector(selectUserRoleInCompany);
  const isAdmin = role === 'owner' || role === 'admin';

  const { limit, offset, loadMore } = usePagination({});
  const dispatch = useAppDispatch();

  const handleCreate = async (data: QuizzFormData) => {
    try {
      dispatch(createQuizz({ companyId: selectedCompanyId, payload: data })).unwrap();
      dispatch(showNotification({ message: 'Quizz successfuly created', severity: 'success' }));
    } catch (error: any) {
      dispatch(showNotification({ message: error || 'Failed to create quizz', severity: 'error' }));
    }
  };

  useEffect(() => {
    dispatch(getCompanyQuizzes({ companyId: selectedCompanyId, params: { limit, offset } }));
  }, [dispatch, limit, offset]);

  return (
    <>
      {isAdmin && (
        <Button sx={{ mb: 2 }} variant="contained" color="primary" onClick={() => setModalOpen(true)}>
          Create quizz
        </Button>
      )}
      <QuizzesList quizzes={quizzes} isLoading={quizzesLoading} error={quizzesError} />
      <LoadMoreButton hasMore={quizzesMeta?.has_next} isLoading={quizzesLoading} onClick={loadMore} />
      <QuizzFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        isLoading={createQuizzLoading}
        error={createQuizzError}
        onSubmit={handleCreate}
      />
    </>
  );
};

export default Quizzes;
