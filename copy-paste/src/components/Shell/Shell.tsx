import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { useForm, yupResolver } from "@mantine/form";
import { Link } from "react-router-dom";
import { MdHome, MdLogin } from "react-icons/md";
import { RiLoginBoxFill } from "react-icons/ri";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import {
  Menu,
  Button,
  ThemeIcon,
  UnstyledButton,
  TextInput,
  Group,
  Modal,
  Text,
  AppShell,
  Navbar,
  Header,
  Box,
  useMantineTheme,
} from "@mantine/core";

import { IconDoorExit, IconPlus } from "@tabler/icons";
import { forage } from "@tauri-apps/tauri-forage";
import { invoke } from "@tauri-apps/api";
import { logout, authPost } from "../../utils/api";

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  link: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required(),
});

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

function User({}) {
  const theme = useMantineTheme();
  const [email, setEmail] = useState("");
  const [machineId, setMachineId] = useState("");
  const [opened, setOpened] = useState(false);
  const [token, setToken] = useState("");

  const form = useForm({
    validate: yupResolver(schema),
    initialValues: {
      name: "",
    },
  });

  useEffect(() => {
    async function getUser() {
      const email = await forage.getItem({ key: "email" })();
      const userToken = await forage.getItem({ key: "token" })();
      const rustMachineId: string = await invoke("get_machine_uid");
      setEmail(email);
      setMachineId(rustMachineId);
      setToken(userToken);
    }

    getUser();
  }, []);

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          setOpened(false);
        }}
        title="What is your device name?"
      >
        <form
          onSubmit={form.onSubmit(async (values) => {
            const newValues = { token, type: "Desktop", ...values };
            console.log(newValues);
            const response = await authPost(
              "api/v1/user/add-device",
              newValues
            );
            console.log(response);
            forage.setItem({ key: "deviceName", value: values.name });
          })}
        >
          <TextInput
            required
            placeholder="My New Device"
            {...form.getInputProps("name")}
          />
          <Group position="center" mt="xl">
            <Button
              type="submit"
              onClick={() => {
                setOpened(false);
              }}
            >
              Submit
            </Button>
          </Group>
        </form>
      </Modal>
      <Box
        sx={{
          paddingTop: theme.spacing.xs,
          borderTop: `1px solid ${
            theme.colorScheme === "dark"
              ? theme.colors.dark[4]
              : theme.colors.gray[2]
          }`,
        }}
      >
        <Menu shadow={"md"} width={200}>
          <Menu.Target>
            <UnstyledButton
              sx={{
                display: "block",
                width: "100%",
                padding: theme.spacing.xs,
                borderRadius: theme.radius.sm,
                color:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[0]
                    : theme.black,

                "&:hover": {
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[6]
                      : theme.colors.gray[0],
                },
              }}
            >
              <Group>
                <Box sx={{ flex: 1 }}>
                  <Text color="dimmed" size="xs">
                    {email}
                  </Text>
                </Box>

                {theme.dir === "ltr" ? (
                  <BsChevronRight size={18} />
                ) : (
                  <BsChevronLeft size={18} />
                )}
              </Group>
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>Application</Menu.Label>
            <Menu.Item
              onClick={() => {
                setOpened(true);
              }}
              icon={<IconPlus size={14} />}
            >
              Add Device
            </Menu.Item>
            <Menu.Item
              icon={<IconDoorExit size={14} />}
              onClick={() => {
                setEmail("");
                logout();
              }}
            >
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Box>
    </>
  );
}

function Shell(props: any) {
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar p="xs" width={{ base: 300 }}>
          <Navbar.Section grow>
            <MainLinks />
          </Navbar.Section>
          <Navbar.Section>
            <User />
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={80} px="md">
          <h1>Copy Paste</h1>
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
