import * as Yup from "yup";
import { useForm, yupResolver } from "@mantine/form";
import { TextInput, Button, Box, Group, PasswordInput } from "@mantine/core";

import Shell from "../Shell/Shell";
import { login } from "../../utils/api";

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Please enter an email"),
  password: Yup.string().required("Please Enter a Password"),
});

export default function Login() {
  const form = useForm({
    validate: yupResolver(schema),
    initialValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Shell>
      <Box sx={{ maxWidth: 340 }} mx="auto">
        <form
          onSubmit={form.onSubmit(async (values) => {
            console.log(values);
            const response = await login(values);
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

          <Group position="right" mt="xl">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Box>
    </Shell>
  );
}
