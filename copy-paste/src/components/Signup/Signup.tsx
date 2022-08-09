import * as Yup from "yup";
import { useForm, yupResolver } from "@mantine/form";
import { TextInput, Button, Box, Group, PasswordInput } from "@mantine/core";

import Shell from "../Shell/Shell";
import { signup } from "../../utils/api";

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email"),
  password: Yup.string()
    .required("Please Enter a Password")
    .min(8, "Your password is too short"),
  confirm: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export default function Signup() {
  const form = useForm({
    validate: yupResolver(schema),
    initialValues: {
      email: "",
      password: "",
      confirm: "",
    },
  });

  return (
    <Shell>
      <Box sx={{ maxWidth: 340 }} mx="auto">
        <form
          onSubmit={form.onSubmit(async (values) => {
            console.log(values);
            const response = await signup(values);
            console.log(response);
          })}
        >
          <TextInput
            required
            label="Email"
            placeholder="example@mail.com"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            required
            label="Password"
            {...form.getInputProps("password")}
          />
          <PasswordInput
            required
            label="Confirm Password"
            {...form.getInputProps("confirm")}
          />

          <Group position="right" mt="xl">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Box>
    </Shell>
  );
}
