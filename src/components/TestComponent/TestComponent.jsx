import { useDispatch, useSelector } from 'react-redux';
import { changeString } from '../../store/test/testSlice';

const TestComponent = () => {
  const dispatch = useDispatch();
  const stringFromState = useSelector(state => state.test.test);

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    dispatch(changeString(form.elements.stringfield.value));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="stringfield" />
        <button type="submit">Change string</button>
      </form>
      <p>State string: {stringFromState}</p>
    </>
  );
};

export default TestComponent;
