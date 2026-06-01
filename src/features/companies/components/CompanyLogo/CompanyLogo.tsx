import { Company } from '../../types/companiesTypes';
import { useRef, ChangeEvent } from 'react';
import { Box, Avatar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

type Props = {
  company: Company;
  isOwner: boolean;
  onChangeLogo: (formData: FormData) => Promise<void>;
};

const CompanyLogo = ({ company, isOwner, onChangeLogo }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const formData = new FormData();

    formData.append('logo_file', file);

    await onChangeLogo(formData);
  };

  return (
    <Box position="relative" width={80} height={80}>
      <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handleFileChange} />

      <Avatar
        src={company.company_logo_url}
        alt={company.company_name}
        sx={{
          width: 80,
          height: 80,
          fontSize: 24,
          cursor: isOwner ? 'pointer' : 'default',
        }}
        onClick={() => {
          if (isOwner) {
            fileInputRef.current?.click();
          }
        }}
      >
        {!company.company_logo_url &&
          company.company_name
            ?.split(' ')
            .map(word => word[0])
            .slice(0, 2)
            .join('')}
      </Avatar>

      {isOwner && (
        <Box
          onClick={() => fileInputRef.current?.click()}
          sx={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            bgcolor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0,
            cursor: 'pointer',
            transition: 'opacity 0.2s ease-in-out',
            '&:hover': {
              opacity: 1,
            },
          }}
        >
          <EditIcon
            sx={{
              color: 'white',
              fontSize: 26,
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default CompanyLogo;
