import modalLogo from "../assets/img/logoModalGR.png";

const FormHeader = () => {
  return (
    <header className="flex flex-col items-center">
      <img src={modalLogo} alt="Logo da ModalGR" className="max-w-[150px] h-auto" />
      <h1 className="text-slate-700 font-semibold font-roboto lg:text-3xl text-[20px] mt-3">
        Sistema de Cadastro - RH ModalGR
      </h1>
      <p className="text-slate-600 font-roboto text-[14px] text-center lg:text-[16px]">
        Preencha os dados abaixo para realizar o cadastro de uma nova pessoa.
      </p>
    </header>
  );
};

export default FormHeader;
