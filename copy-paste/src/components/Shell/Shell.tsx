import { Link } from "react-router-dom";
import { MdHome, MdLogin } from "react-icons/md";
import { RiLoginBoxFill } from "react-icons/ri";
import {
  ThemeIcon,
  UnstyledButton,
  Group,
  Text,
  AppShell,
  Navbar,
  Header,
  Center,
} from "@mantine/core";

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  link: string;
}

function MainLink({ icon, color, label, link }: MainLinkProps) {
  return (
    <UnstyledButton
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      })}
    >
      <Link to={link} style={{ textDecoration: "none", color: "white" }}>
        <Group>
          <ThemeIcon color={color} variant="light">
            {icon}
          </ThemeIcon>

          <Text size="sm">{label}</Text>
        </Group>
      </Link>
    </UnstyledButton>
  );
}

const data = [
  { icon: <MdHome size={16} />, color: "blue", label: "Home", link: "/" },
  {
    icon: <MdLogin size={16} />,
    color: "blue",
    label: "Login",
    link: "/login",
  },
  {
    icon: <RiLoginBoxFill size={16} />,
    color: "blue",
    label: "Create an Account",
    link: "/signup",
  },
];

function MainLinks() {
  const links = data.map((link) => <MainLink {...link} key={link.label} />);
  return <div>{links}</div>;
}

function Shell(props: any) {
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar p="xs" width={{ base: 300 }}>
          <Navbar.Section>
            <MainLinks />
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={80} px="md">
          {/* <Center> */}
          <h1>Copy Paste</h1>
          {/* </Center> */}
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {props.children}
    </AppShell>
  );
}

export default Shell;
