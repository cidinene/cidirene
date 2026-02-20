import React from 'react';
import { Box, Typography, Card, CardContent, Chip, Grid, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const CVContent = ({ data, themeStyles }) => {
    if (!data) return <Typography>Loading...</Typography>;

    const { personalInfo, socialLinks, experience, education, skills } = data;

    // Section wrapper: accepts a specific titleColor per section
    const Section = ({ id, title, titleColor, children }) => (
        <Box id={id} component="section" sx={{ mb: 6, scrollMarginTop: '80px' }}>
            <Typography
                variant="h4"
                component="h2"
                gutterBottom
                sx={{
                    borderBottom: '2px solid',
                    borderColor: titleColor || 'primary.main',
                    color: titleColor || 'primary.main',
                    pb: 1,
                    mb: 3,
                    display: 'inline-block',
                }}
            >
                {title}
            </Typography>
            {children}
        </Box>
    );

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>

            {/* About */}
            <Section id="about" title="About Me">
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'flex-start', gap: 4 }}>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h3" color={themeStyles?.bioColor?.title || 'text.secondary'} gutterBottom>{personalInfo.name}</Typography>
                        <Typography variant="h5" color={themeStyles?.bioColor?.title || 'text.secondary'} gutterBottom>{personalInfo.title}</Typography>
                        <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <EmailIcon fontSize="small" sx={{ color: themeStyles?.bioColor?.icon || 'action' }} />
                                <Typography color={themeStyles?.bioColor?.email || 'text.secondary'} variant="body2">{personalInfo.email}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <LocationOnIcon fontSize="small" sx={{ color: themeStyles?.bioColor?.icon || 'action' }} />
                                <Typography
                                    variant="body2"
                                    component="a"
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(personalInfo.location)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{ color: 'bioColor.body', textDecoration: 'underline', cursor: 'pointer' }}
                                >
                                    {personalInfo.location}
                                </Typography>
                            </Box>
                        </Box>
                        <Typography color={themeStyles?.bioColor?.body || 'text.secondary'}>{personalInfo.summary}</Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            {socialLinks.github && (
                                <IconButton href={socialLinks.github} target="_blank"><GitHubIcon sx={{ color: themeStyles?.bioColor?.redes }} /></IconButton>
                            )}
                            {socialLinks.linkedin && (
                                <IconButton href={socialLinks.linkedin} target="_blank"><LinkedInIcon sx={{ color: themeStyles?.bioColor?.redes }} /></IconButton>
                            )}
                            {socialLinks.twitter && (
                                <IconButton href={socialLinks.twitter} target="_blank"><TwitterIcon sx={{ color: themeStyles?.bioColor?.redes }} /></IconButton>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Section>

            {/* Experience */}
            <Section id="experience" title="Experience" titleColor={themeStyles?.experienceTitleColor}>
                {experience.map((job) => (
                    <Card key={job.id} sx={{ mb: 3, boxShadow: 3 }}>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={8}>
                                    <Typography variant="h6">{job.role}</Typography>
                                    <Typography variant="subtitle1" color="primary">{job.company}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={4} sx={{ textAlign: { sm: 'right' } }}>
                                    <Typography variant="body2" color="text.secondary">{job.period}</Typography>
                                </Grid>
                            </Grid>
                            <Typography variant="body2" paragraph sx={{ mt: 1 }}>
                                {job.description}
                            </Typography>
                            <Box component="ul" sx={{ pl: 2, m: 0 }}>
                                {job.achievements.map((achievement, index) => (
                                    <Typography component="li" variant="body2" key={index} gutterBottom>
                                        {achievement}
                                    </Typography>
                                ))}
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Section>

            {/* Education */}
            <Section id="education" title="Education" titleColor={themeStyles?.educationTitleColor}>
                {education.map((edu) => (
                    <Card key={edu.id} sx={{ mb: 2 }}>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={8}>
                                    <Typography variant="h6">{edu.institution}</Typography>
                                    <Typography variant="subtitle1">{edu.degree}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={4} sx={{ textAlign: { sm: 'right' } }}>
                                    <Typography variant="body2" color="text.secondary">{edu.period}</Typography>
                                </Grid>
                            </Grid>
                            <Typography variant="body2" sx={{ mt: 1 }}>{edu.description}</Typography>
                        </CardContent>
                    </Card>
                ))}
            </Section>

            {/* Skills */}
            <Section id="skills" title="Skills" titleColor={themeStyles?.skillsTitleColor}>
                <Grid container spacing={3}>
                    {skills.map((skillGroup, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <Card sx={{ height: '100%' }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom color="primary">
                                        {skillGroup.category}
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                        {skillGroup.items.map((skill, idx) => (
                                            <Chip key={idx} label={skill} size="small" variant="outlined" />
                                        ))}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Section>

        </Box>
    );
};

export default CVContent;
