import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { setAuthTokens } from '../../store/authSlice';
import { fetchUserProfile } from '../../store/authThunks';
import { useDispatch } from 'react-redux';

const AuthSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get('access_token');
    const refreshToken = params.get('refresh_token');

    if (accessToken && refreshToken) {
      dispatch(setAuthTokens({ accessToken, refreshToken }));
      dispatch(fetchUserProfile())
        .unwrap()
        .then(() => {
          navigate('/');
        })
        .catch(() => {
          navigate('/login');
        });
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, location]);
  return <div>SSO Authorization successful. Redirecting...</div>;
};

export default AuthSuccess;
