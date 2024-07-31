"use client";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import SignInForm from "./components/form-sign-in/form-sign-in";
import { ISignIn } from "./shared/domain-types/models";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthSignInValidator } from "./shared/validators";
import SendEmailModal from "./components/send-email-modal/send-email-modal";
import EmailSended from "./components/email-sended/email-sended";


export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [showSendedEmailModal, setShowSendedEmailModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleShowSendedEmailModal = () => setShowSendedEmailModal(true);
  const handleCloseSendedEmailModal = () => setShowSendedEmailModal(false);

  const onEmailSended = () => {
    handleCloseModal()
    handleShowSendedEmailModal()
  }

  const sim = () => {
    console.log('aaa')
  }

  const form = useForm<ISignIn>({
    mode: "onChange",
    resolver: yupResolver(AuthSignInValidator),
  });

  const onSubmit: SubmitHandler<ISignIn> = (data) => {
    console.log(data, 'aaaa');
  
  };

  return (
    <main className="w-full h-dvh flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 h-dvh bg-white flex items-center flex-col justify-center pl-10 pr-10">
        <div className="w-100 h-28 mb-4 rounded-md bg-slate-600 flex items-center justify-center text-4xl sm:hidden">
          <h2>Logo</h2>
        </div>
        <div className="w-full sm:w-1/2">
          <FormProvider {...form}>
            <SignInForm onSubmit={onSubmit} onHandleModal={handleShowModal} />
          </FormProvider>
        </div>
      </div>
      <div className="w-full md:w-1/2 h-dvh bg-slate-300 items-center justify-center hidden md:flex">
        <div className="w-1/2 h-40 rounded-md bg-slate-600 flex items-center justify-center text-4xl">
          <h2>Logo</h2>
        </div>
      </div>

      <SendEmailModal show={showModal} handleClose={handleCloseModal} onEmailSent={onEmailSended} />

      <EmailSended
      show={showSendedEmailModal} 
      handleClose={handleCloseSendedEmailModal}      
      />
    </main>
  );
}
