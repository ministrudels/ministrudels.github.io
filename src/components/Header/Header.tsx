import { Button, ButtonGroup, Toolbar } from "@mui/material";

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ObservableIcon from "../../assets/observablehq-logo.svg";

type SectionArray = Array<{ title: string; url: string }>;

export default function Header(props: { sections: SectionArray }) {
  const { sections } = props;

  return (
    <>
      <Toolbar
        disableGutters
        variant="dense"
        sx={{
          overflowX: "auto",
          borderBottom: "1px solid",
          borderBottomColor: "theme.palette.divider",
        }}
      >
        {sections.map((section) => {
          return (
            <Button
              href={section.url}
              sx={{
                color: "black",
                padding: "theme.spacing(2)",
                flexShrink: 0,
              }}
            >
              {section.title}
            </Button>
          );
        })}

        <section
          style={{
            margin: "auto",
            marginRight: 12,
          }}
        >
          <ButtonGroup
            variant="text"
            size="small"
            aria-label="small outlined button group"
          >
            <Button href="https://observablehq.com/@minimumness">
              <img src={ObservableIcon} alt="" />
            </Button>
            <Button href="https://github.com/ministrudels">
              <GitHubIcon
                style={{
                  color: "black",
                }}
              />
            </Button>
            <Button href="https://www.linkedin.com/in/huanmingan/">
              <LinkedInIcon />
            </Button>
          </ButtonGroup>
        </section>
      </Toolbar>
    </>
  );
}
