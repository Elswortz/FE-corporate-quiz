import { useTranslation } from 'react-i18next';
import { Select, MenuItem, FormControl, Box, SelectChangeEvent } from '@mui/material';

type LanguageCode = 'en' | 'ua';

type LanguageConfig = {
  flag: string;
  label: string;
};

const languages: Record<LanguageCode, LanguageConfig> = {
  en: { flag: '🇬🇧', label: 'English' },
  ua: { flag: '🇺🇦', label: 'Українська' },
};

function LangSelector() {
  const { i18n } = useTranslation('header');

  const handleChange = (e: SelectChangeEvent<LanguageCode>) => {
    const newLang = e.target.value as LanguageCode;
    i18n.changeLanguage(newLang);
    localStorage.setItem('lang', newLang);
  };

  return (
    <Box sx={{ mr: 8 }}>
      <FormControl variant="standard" sx={{ minWidth: 120 }}>
        <Select<LanguageCode>
          value={(i18n.language as LanguageCode) || 'en'}
          onChange={handleChange}
          disableUnderline
          sx={{
            color: 'white',
            '& .MuiSvgIcon-root': { color: 'white' },
          }}
        >
          {Object.entries(languages).map(([lng, { flag, label }]) => (
            <MenuItem key={lng} value={lng}>
              <span style={{ marginRight: 8 }}>{flag}</span>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default LangSelector;
