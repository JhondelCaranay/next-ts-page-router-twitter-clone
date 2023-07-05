import { useCallback, useState } from "react";
import Input from "../forms/Input";
import Modal from "./Modal";
import useRegisternModal from "@/hooks/zustand/useRegisterModal";
import useLoginModal from "@/hooks/zustand/useLoginModal";
import useSWRMutation from "swr/mutation";
import axios from "axios";
import registerUser from "@/libs/swr/registerUser";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

type Props = {};

const RegisterModal = (props: Props) => {
  const loginModal = useLoginModal();
  const registerModal = useRegisternModal();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [name, setName] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { trigger } = useSWRMutation("/api/register", registerUser);

  const onSubmit = useCallback(async () => {
    // validate if empty
    if (!email || !username || !name) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setIsLoading(true);
      //wait for 1 second
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // todo: add register and login
      await trigger({ email, password, username, name });
      console.log("run after trigger");

      setIsLoading(false);

      toast.success("Account created.");

      signIn("credentials", {
        email,
        password,
      });

      registerModal.onClose();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [email, password, registerModal, username, name]);

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }

    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal, isLoading]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        disabled={isLoading}
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        disabled={isLoading}
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        disabled={isLoading}
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        disabled={isLoading}
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  );

  const footerContent = (
    <div className="mt-4 text-center text-neutral-400">
      <p>
        Already have an account?
        <span
          onClick={onToggle}
          className="
            cursor-pointer 
            pl-1 
            text-white
            hover:underline 
          "
        >
          Sign in
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      title="Create an account"
      actionLabel="Register"
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};
export default RegisterModal;
