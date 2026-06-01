import { Button } from '@mui/material';

type Props = {
  onLeave: () => void;
};

const MemberCompanyActions = ({ onLeave }: Props) => {
  return (
    <Button onClick={onLeave} size="small" variant="contained" color="error">
      Leave
    </Button>
  );
};

export default MemberCompanyActions;
