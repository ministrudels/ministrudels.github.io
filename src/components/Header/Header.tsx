import { Button, Toolbar } from '@mui/material';

type SectionArray = Array<{ title: string; url: string }>;

export default function Header(props: { sections: SectionArray }) {
  const { sections } = props;

  return (
    <>
      <Toolbar
        disableGutters
        variant='dense'
        sx={{
          overflowX: 'auto',
          borderBottom: '1px solid',
          borderBottomColor: 'theme.palette.divider',
        }}
      >
        {sections.map((section) => {
          return (
            <Button
              variant='text'
              href={section.url}
              sx={{
                padding: 'theme.spacing(2)',
                flexShrink: 0,
              }}
            >
              {section.title}
            </Button>
          );
        })}

        {/* <section
          style={{
            margin: "auto",
            marginRight: 12,
          }}
        >
          <ButtonGroup variant="text" size="small" aria-label="small outlined button group">
            <Button href="https://observablehq.com/@minimumness">
              <img src={ObservableIcon} alt="" />
            </Button>
            <Button href="https://github.com/ministrudels">
              <GitHubIcon />
            </Button>
            <Button href="https://www.linkedin.com/in/huanmingan/">
              <LinkedInIcon />
            </Button>
          </ButtonGroup>
        </section> */}
      </Toolbar>
    </>
  );
}
