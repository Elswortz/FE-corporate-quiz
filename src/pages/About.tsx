import { Box, Container, Typography, Grid, Card, CardContent, Stack, Avatar, Button } from '@mui/material';

import GroupsIcon from '@mui/icons-material/Groups';
import BusinessIcon from '@mui/icons-material/Business';

import SchoolIcon from '@mui/icons-material/School';
import InsightsIcon from '@mui/icons-material/Insights';

const features = [
  {
    title: 'Company Quizzes',
    description: 'Companies can create quizzes for onboarding, education, certification, and employee evaluation.',
    icon: <BusinessIcon fontSize="large" />,
  },
  {
    title: 'Team Collaboration',
    description: 'Invite employees, manage members, and organize learning inside your company workspace.',
    icon: <GroupsIcon fontSize="large" />,
  },
  {
    title: 'Interactive Learning',
    description: 'Users can complete quizzes, improve their knowledge, and track their progress.',
    icon: <SchoolIcon fontSize="large" />,
  },
  {
    title: 'Performance Tracking',
    description: 'Monitor quiz results and evaluate user performance through detailed statistics.',
    icon: <InsightsIcon fontSize="large" />,
  },
];

const About = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        <Stack spacing={8}>
          <Box textAlign="center">
            <Typography variant="h3" fontWeight={700} gutterBottom>
              Quiz Platform for Companies
            </Typography>

            <Typography variant="body1" color="text.secondary" maxWidth={800} mx="auto">
              A modern platform where companies can create quizzes, manage employees, and improve learning through
              interactive assessments and progress tracking.
            </Typography>

            <Button variant="contained" sx={{ mt: 3 }}>
              Get started
            </Button>
          </Box>

          <Box>
            <Typography variant="h4" fontWeight={600} mb={4} textAlign="center">
              Main Features
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
