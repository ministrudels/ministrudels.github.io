import { makeStyles } from "@material-ui/core/styles";
import { Toolbar } from "@material-ui/core";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    overflowX: "auto",
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
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
      </Toolbar>
    </>
  );
}
