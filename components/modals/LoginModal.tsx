import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegiserModal";
import Input from "../Input";
import Modal from "../Modal";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
    if (isLoading) return;

    loginModal.onClose();
    registerModal.onOpen();
  }, [isLoading, loginModal, registerModal]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      
      await signIn("credentials", {
        email,
        password
      });

      setIsLoading(false);
      loginModal.onClose();
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }, [loginModal, email, password]);

  const bodyContent = (
    <div
      className="flex flex-col gap-4"
    >
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
    )

    const footerContent = (
      <div className="text-neutral-400 text-center mt-4">
        <p>First time using Twitter?
          <span className="text-blue-500 cursor-pointer hover:underline"
           onClick={onToggle} > Create an Accpimt</span>
        </p>
      </div>
    )

  return (
    <Modal
      disable={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Sign in"
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
}
export default LoginModal;