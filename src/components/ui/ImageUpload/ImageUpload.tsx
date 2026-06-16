import { useRef, ChangeEvent, ReactNode } from 'react';
import { Avatar, Box, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

type Props = {
  src?: string | null;
  alt?: string;
  size?: number;
  loading?: boolean;
  disabled?: boolean;
  fallback?: ReactNode;
  onUpload: (file: File) => void | Promise<void>;
};

const ImageUploader = ({ src, alt, size = 100, loading = false, disabled = false, fallback, onUpload }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await onUpload(file);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: size,
        height: size,
      }}
    >
      <input ref={fileInputRef} type="file" hidden accept="image/*" onChange={handleChange} />

      <Avatar
        src={src || ''}
        alt={alt}
        sx={{
          width: size,
          height: size,
          cursor: !loading && !disabled ? 'pointer' : 'default',
        }}
        onClick={() => {
          if (!loading && !disabled) {
            fileInputRef.current?.click();
          }
        }}
      >
        {!src && fallback}
      </Avatar>

      {!loading && !disabled && (
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
            transition: 'opacity 0.2s ease',
            '&:hover': {
              opacity: 1,
            },
          }}
        >
          <EditIcon sx={{ color: 'white' }} />
        </Box>
      )}

      {loading && (
        <>
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              bgcolor: 'rgba(0,0,0,0.4)',
              borderRadius: '50%',
            }}
          />

          <CircularProgress
            size={36}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              mt: '-18px',
              ml: '-18px',
            }}
          />
        </>
      )}
    </Box>
  );
};

export default ImageUploader;
