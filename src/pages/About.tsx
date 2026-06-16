import { Box, Container, Typography, Grid, Card, CardContent, Stack, Avatar, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import GroupsIcon from '@mui/icons-material/Groups';
import BusinessIcon from '@mui/icons-material/Business';
import SchoolIcon from '@mui/icons-material/School';
import InsightsIcon from '@mui/icons-material/Insights';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation('about');

  const features = [
    {
      title: t('features.feature1.title'),
      description: t('features.feature1.text'),
      icon: <BusinessIcon fontSize="large" />,
    },
    {
      title: t('features.feature2.title'),
      description: t('features.feature2.text'),
      icon: <GroupsIcon fontSize="large" />,
    },
    {
      title: t('features.feature3.title'),
      description: t('features.feature3.text'),
      icon: <SchoolIcon fontSize="large" />,
    },
    {
      title: t('features.feature4.title'),
      description: t('features.feature4.text'),
      icon: <InsightsIcon fontSize="large" />,
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Stack spacing={8}>
          <Box textAlign="center">
            <Typography variant="h3" fontWeight={700} gutterBottom>
              {t('hero.title')}
            </Typography>

            <Typography variant="body1" color="text.secondary" maxWidth={800} mx="auto">
              {t('hero.text')}
            </Typography>

            <Button variant="contained" sx={{ mt: 3 }} component={RouterLink} to="/companies">
              {t('hero.buttonText')}
            </Button>
          </Box>

          <Box>
            <Typography variant="h4" fontWeight={600} mb={4} textAlign="center">
              {t('features.title')}
            </Typography>

            <Grid container spacing={3}>
              {features.map(feature => (
                <Grid key={feature.title} size={{ xs: 12, md: 6 }}>
                  <Card
                    sx={{
                      height: '100%',
                      borderRadius: 4,
                    }}
                  >
                    <CardContent
                      sx={{
                        p: 3,
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 2,
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 52,
                          height: 52,
                          flexShrink: 0,
                          bgcolor: 'primary.main',
                        }}
                      >
                        {feature.icon}
                      </Avatar>

                      <Box>
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                          {feature.title}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                          {feature.description}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
};

export default About;
