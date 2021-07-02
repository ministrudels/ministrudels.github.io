import { makeStyles } from "@material-ui/core/styles";
import { Toolbar, Link, Button, ButtonGroup } from "@material-ui/core";

import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';


const useStyles = makeStyles((theme) => ({
  toolbar: {
    overflowX: "auto",
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  rightToolbar: {
    margin: "auto",
    marginRight: 12
  }
}));

type SectionArray = Array<{ title: string; url: string }>;

export default function Header(props: { sections: SectionArray }) {
  const classes = useStyles();
  const { sections } = props;
  return (
    <>
      <Toolbar disableGutters variant="dense" className={classes.toolbar}>
        {sections.map((section) => (
          <Link
            color={
              section.url === window.location.pathname ? "primary" : "inherit"
            }
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            className={classes.toolbarLink}
          >
            {section.title}
          </Link>
        ))}
        <section className={classes.rightToolbar}>
          <ButtonGroup variant="text" size="small" aria-label="small outlined button group">
            <Button href="https://github.com/ministrudels"><GitHubIcon /></Button>
            <Button href="https://www.linkedin.com/in/huan-min-gan-b9801210a/"><LinkedInIcon /></Button>
          </ButtonGroup>
        </section>
      </Toolbar>
    </>
  );
}
