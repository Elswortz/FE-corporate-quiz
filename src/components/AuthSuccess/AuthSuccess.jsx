import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthSuccess = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // navigate('/');
  }, []);
  return (
    <>
      <h1>dsad</h1>
    </>
  );
};

export default AuthSuccess;
