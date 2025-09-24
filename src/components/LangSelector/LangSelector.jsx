import { useTranslation } from 'react-i18next';
import { Select, MenuItem, FormControl, Box } from '@mui/material';
import { useEffect } from 'react';

const languages = {
  en: { flag: '🇬🇧', label: 'English' },
  ua: { flag: '🇺🇦', label: 'Українська' },
};

function LangSelector() {
  const { i18n } = useTranslation();

  console.log(i18n);

  const handleChange = e => {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang);
    localStorage.setItem('lang', newLang);
  };

  return (
    <Box sx={{ marginRight: 8 }}>
      <FormControl variant="standard" sx={{ minWidth: 120 }}>
        <Select
          value={i18n.language}
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
