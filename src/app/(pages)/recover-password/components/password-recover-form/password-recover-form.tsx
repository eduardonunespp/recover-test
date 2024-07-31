import { IRecover } from "@/app/shared/domain-types/models";
import { useState } from "react";
import { Form, Row } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { IoEye, IoEyeOff } from "react-icons/io5";

type Props = {
  onSubmit: (data: IRecover) => void;
};

const PasswordRecoverForm: React.FC<Props> = ({ onSubmit }) => {
  const { register, formState, handleSubmit } = useFormContext<IRecover>();

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const togglePasswordConfirmVisibility = () => {
    setShowPasswordConfirm((prev) => !prev);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="formPassword">
          <Row className="mb-4">
            <Form.Label className="text-slate-500">Senha:</Form.Label>
            <div className="position-relative">
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Entre com sua senha"
                {...register("password")}
                isInvalid={!!formState.errors.password}
                className="h-12 text-sm bg-slate-100 w-100"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="position-absolute end-10 top-0 mt-3 me-2 border-0 bg-transparent text-orange-500 text-lg"
                style={{ cursor: "pointer" }}
              >
                {showPassword ? <IoEyeOff /> : <IoEye />}
              </button>
              <Form.Control.Feedback type="invalid" className="text-xs">
                {formState.errors.password?.message}
              </Form.Control.Feedback>
            </div>
          </Row>
          <Row>
            <Form.Label className="text-slate-500">
              Confirmação de Senha:
            </Form.Label>
            <div className="position-relative">
              <Form.Control
                type={showPasswordConfirm ? "text" : "password"}
                placeholder="Confirme sua Senha"
                {...register("confirmPassword")}
                isInvalid={!!formState.errors.confirmPassword}
                className="h-12 text-sm bg-slate-100 w-100"
              />
              <button
                type="button"
                onClick={togglePasswordConfirmVisibility}
                className="position-absolute end-10 top-0 mt-3 me-2 border-0 bg-transparent text-orange-500 text-lg"
                style={{ cursor: "pointer" }}
              >
                {showPasswordConfirm ? <IoEyeOff /> : <IoEye />}
              </button>
              <Form.Control.Feedback type="invalid" className="text-xs">
                {formState.errors.confirmPassword?.message}
              </Form.Control.Feedback>
            </div>
          </Row>
        </Form.Group>
      </Form>
    </div>
  );
};

export default PasswordRecoverForm;
