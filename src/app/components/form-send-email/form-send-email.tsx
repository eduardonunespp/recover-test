import { IEmail, ISignIn } from "@/app/shared/domain-types/models";
import { useState } from "react";
import { Form, Button, Container, Row, Spinner } from "react-bootstrap";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";

type Props = {
  onSubmit: SubmitHandler<IEmail>;
  isLoading?: boolean,
  errorMessage?: string | null,
  onFocus?: () => void;
};

const SendEmailForm: React.FC<Props> = ({ onSubmit, isLoading, errorMessage, onFocus }) => {
  const { register, formState, handleSubmit } = useFormContext<IEmail>();

  return (
    <div className="w-100">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="formPassword">
          <Row className="mb-3">
            <Form.Label className="text-slate-500">Email:</Form.Label>
            <div>
              <Form.Control
                type="email"
                placeholder="Entre com seu email"
                {...register("email")}
                onFocus={onFocus}
                isInvalid={!!formState.errors.email}
                className="h-11 text-sm bg-slate-100 w-100"
              />
              <Form.Control.Feedback type="invalid" className="text-xs">
                {formState.errors.email?.message} 
              </Form.Control.Feedback>

              <p className="text-xs mt-2 text-red-600">{errorMessage}</p>
            </div>
          </Row>
        </Form.Group>

        <button
          type="submit"
          disabled={!formState.isValid}
          className={`w-100 h-10 rounded-xl bg-orange-500 text-white transition-all filter ${
            !formState.isValid
              ? "opacity-70 bg-orange-700 cursor-not-allowed"
              : "hover:opacity-90"
          }`}
        >
          {isLoading ? <Spinner size="sm" /> : "Enviar"}
        </button>
      </Form>
    </div>
  );
};

export default SendEmailForm;
