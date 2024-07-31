"use client";

import PasswordRecoverForm from "./components/password-recover-form/password-recover-form";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IRecover } from "@/app/shared/domain-types/models";
import { AuthRecoverPasswordValidator } from "@/app/shared/validators";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { sendPasswordRecover } from "@/app/shared/services";
import { SuccessModal } from "@/app/shared/components";

const RecoverPassword: React.FC = () => {
  const form = useForm<IRecover>({
    mode: "onChange",
    resolver: yupResolver(AuthRecoverPasswordValidator),
  });

  const { handleSubmit, formState } = form;
  const { isValid } = formState;

  const searchParams = useSearchParams();
  const resetToken = searchParams.get("token");

  const [showModal, setShowModal] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const onSubmit: SubmitHandler<IRecover> = (data) => {
    setIsLoading(true);
    try {
      const dataFormatted = {
        ...data,
        resetToken: resetToken ? resetToken : "",
      };
      onSuccess();
      sendPasswordRecover(dataFormatted);
    } catch (error: any) {
      setIsLoading(false);
    }
  };

  const onSuccess = () => {
    handleShowModal();
    setIsLoading(false);
  };

  return (
    <>
      <main className="w-full h-dvh pt-4 bg-white flex items-center justify-center flex-col max-md:px-4">
        <div className="w-1/3 h-auto bg-slate-200 rounded-lg px-4 py-4 max-md:w-full max-md:px-5 max-lg:w-2/3">
          <div className="w-full flex pt-8 flex-col items-center justify-center">
            <h2 className="text-xl text-textPrimary font-bold">
              Redefinir Senha
            </h2>
            <p className="my-2 text-sm text-textPrimary">
              Redefina sua senha com no mínimo 6 caracteres
            </p>
          </div>
          <FormProvider {...form}>
            <PasswordRecoverForm onSubmit={onSubmit} />
          </FormProvider>
          <div className="w-full">
            <h3 className="text-textPrimary font-bold my-4">
              Crie uma senha segura
            </h3>
            <ul className="list-disc text-textPrimary pl-5 text-sm">
              <li>use letras maiúsculas e minúsculas, simbolos e números</li>
              <li>não use informações pessoais como data de aniversário</li>
              <li>não use uma senha igual a anterior</li>
            </ul>
          </div>
        </div>
        <button
          type="submit"
          disabled={!isValid}
          onClick={handleSubmit(onSubmit)}
          className={`w-1/3 mt-4 h-10 rounded-md bg-orange-500 text-white transition-all filter max-md:w-full max-lg:w-2/3 ${
            !isValid
              ? "opacity-70 bg-orange-700 cursor-not-allowed"
              : "hover:opacity-90"
          }`}
        >
          {isLoading ? <Spinner size="sm" /> : "Salvar Senha"}
        </button>
        <SuccessModal
          headerTitle="aa"
          bodyText="aa"
          show={showModal}
          handleClose={handleCloseModal}
        />
      </main>
    </>
  );
};

export default RecoverPassword;
