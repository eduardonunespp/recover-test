import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Modal } from "react-bootstrap";
import { SendEmailValidator } from "@/app/shared/validators";
import { IEmail } from "@/app/shared/domain-types/models";

type Props = {
  show: boolean;
  handleClose: () => void;
};

const EmailSended: React.FC<Props> = ({
  show,
  handleClose,
}) => {
  const form = useForm<IEmail>({
    mode: "onChange",
    resolver: yupResolver(SendEmailValidator),
  });

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton className="border-b-0">
          <Modal.Title className="text-textPrimary text-lg">
            Recuperação de Senha
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-0  pb-4">
          <p className="text-textPrimary mb-3 text-sm leading-6 ">
            Enviamos um link de recuperação para o seu email cadastrado. Por
            favor, verifique a sua caixa de entrada e a pasta de spam, se
            necessário.
          </p>

          <button onClick={handleClose}
          type="submit"
          className="w-100 h-10 mt-4 rounded-xl bg-orange-500 text-white transition-all filter hover:opacity-90"
        >
          Entendido
        </button>
        </Modal.Body>
       
      </Modal>
    </>
  );
};

export default EmailSended;
