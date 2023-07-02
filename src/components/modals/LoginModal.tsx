import useLoginModal from "@/hooks/zustand/useLoginModal";
import { useCallback, useState } from "react";
import Input from "../forms/Input";
import Modal from "./Modal";

type Props = {};
const LoginModal = (props: Props) => {
  const loginModal = useLoginModal();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      //wait for 1 second
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // todo: add login

      loginModal.onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }

    try {
    } catch (error) {}
  }, [loginModal]);

  const onToggle = useCallback(() => {
    loginModal.onClose();
    // registerModal.onOpen();
  }, [loginModal]); //registerModal

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
      />
      <Input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div className="mt-4 text-center text-neutral-400">
      <p>
        First time using Twitter?
        <span
          onClick={onToggle}
          className="
            cursor-pointer 
            text-white 
            hover:underline
          "
        >
          Create an account
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      title="Login"
      actionLabel="Sign in"
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};
export default LoginModal;
