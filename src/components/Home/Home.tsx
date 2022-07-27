import {
  Button,
  ButtonGroup,
  Divider,
  Grid,
  Link,
  Typography,
  makeStyles,
} from '@mui/material';

import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MenuBook from '@mui/icons-material/MenuBook';
import ObservableIcon from '../../assets/observablehq-logo.svg';
import Studio from '../Studio';

const hoverColor = '#00bcd4';

function Intro() {
  return (
    <Grid item>
      <Typography align='justify' variant='body1'>
        Hi, my name is Huan Min and I'm a software engineer based in London with
        an interest in data visualisation, data engineering and infrastructure
        technology. I graduated from Imperial College London with a Distinction
        in MSc Computing Science in 2019, and from University College London
        with a 1st class honours in MEng Mechanical Engineering in 2018.
      </Typography>
    </Grid>
  );
}
function Projects() {
  return (
    <Grid item>
      <Typography align='justify' variant='h6'>
        Other Projects
      </Typography>
      <Divider />
      <Typography variant='body1'>
        <ul>
          <li>
            <Typography>
              Object detection on TfL traffic cameras
              <Link href='http://doi.org/10.1016/j.eswa.2021.115154'></Link>
              <Button href='https://github.com/ministrudels/JamCam-Detector'>
                <MenuBook
                  color='action'
                  sx={{
                    ':hover': {
                      color: hoverColor,
                    },
                  }}
                />
              </Button>
              <Button href='https://github.com/ministrudels/JamCam-Detector'>
                <GitHubIcon
                  color='action'
                  sx={{
                    ':hover': {
                      color: hoverColor,
                    },
                  }}
                />
              </Button>
            </Typography>
          </li>
          <li>
            <Typography>
              Generating travel history from Google Maps location data
              <Button href='https://github.com/ministrudels/my-travel-history'>
                <GitHubIcon
                  color='action'
                  sx={{
                    ':hover': {
                      color: hoverColor,
                    },
                  }}
                />
              </Button>
            </Typography>
          </li>
          <li>
            <Typography>
              Find study rooms near you in UCL.
              <Button href='https://github.com/checo193/FloppyDons'>
                <GitHubIcon
                  color='action'
                  sx={{
                    ':hover': {
                      color: hoverColor,
                    },
                  }}
                />
              </Button>
            </Typography>
          </li>
        </ul>
      </Typography>
    </Grid>
  );
}

function Socials() {
  return (
    <Grid item container justifyContent='center'>
      <ButtonGroup variant='text'>
        <Button href='https://observablehq.com/@huanmingan'>
          <img
            style={{
              width: 100,
            }}
            src={ObservableIcon}
            alt=''
          />
        </Button>
        <Button href='https://github.com/ministrudels'>
          <GitHubIcon
            color='action'
            style={{
              color: 'black',
              fontSize: 100,
            }}
          />
        </Button>
        <Button href='https://www.linkedin.com/in/huanmingan/'>
          <LinkedInIcon
            style={{
              fontSize: 100,
            }}
          />
        </Button>
      </ButtonGroup>
    </Grid>
  );
}

export default function Home() {
  return (
    <Grid container justifyContent='left' textAlign='left' spacing={8}>
      <Grid item></Grid>
      <Intro />
      <Socials />
      <Projects />
      <Grid item>
        <Typography align='justify' variant='h6'>
          Studio
        </Typography>
        <Divider />
        <Studio />
      </Grid>
    </Grid>
  );
}
