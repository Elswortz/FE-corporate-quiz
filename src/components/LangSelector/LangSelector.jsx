import { useTranslation } from 'react-i18next';
import { Select, MenuItem, FormControl, Box } from '@mui/material';

const languages = {
  en: { flag: '🇬🇧', label: 'English' },
  ua: { flag: '🇺🇦', label: 'Українська' },
};

function LangSelector() {
  const { i18n } = useTranslation();

  const handleChange = e => {
    i18n.changeLanguage(e.target.value);
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
