import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Modal } from "react-bootstrap";
import SendEmailForm from "../form-send-email/form-send-email";
import { SendEmailValidator } from "@/app/shared/validators";
import { IEmail } from "@/app/shared/domain-types/models";
import { sendEmail } from "@/app/shared/services/email-service";
import { useState } from "react";

type Props = {
  show: boolean;
  handleClose: () => void;
  onEmailSent: () => void;
};

const EmailSendModal: React.FC<Props> = ({
  show,
  handleClose,
  onEmailSent,
}) => {
  const form = useForm<IEmail>({
    mode: "onChange",
    resolver: yupResolver(SendEmailValidator),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>("");

  const onSubmit: SubmitHandler<IEmail> = async (data) => {
    setIsLoading(true);
    try {
      await sendEmail(data);
      onSuccess();
    } catch (error: any) {
      setErrorMessage(error.message);
      setIsLoading(false);
    }
  };

  const onFocus = () => {
    setErrorMessage(null);
  };

  const onSuccess = () => {
    onEmailSent();
    handleClose();
    setIsLoading(false);
    setErrorMessage(null);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton className="border-b-0">
          <Modal.Title className="text-textPrimary text-lg">
            Recuperar Senha
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-2 pb-8">
          <p className="text-textPrimary mb-3 text-sm">
          Para recuperar sua senha, por favor, digite o email que você usou no cadastro.
          </p>

          <FormProvider {...form}>
            <SendEmailForm
              onSubmit={onSubmit}
              isLoading={isLoading}
              errorMessage={errorMessage}
              onFocus={onFocus}
            />
          </FormProvider>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EmailSendModal;
