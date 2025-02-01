import { Input } from "./ui/input";
import { Label } from "./ui/label";
import InputMask from 'react-input-mask';

const Form = () => {
  return (
    <form className="mt-9">
      <div className="mb-3">
        <Label htmlFor="name" className="text-[18px] font-medium">
          Nome Completo
        </Label>
        <Input type="text" id="name" className="mt-2" />
        <div className="min-h-4">
          <p className="text-xs text-red-400 mt-1">O nome é obrigatório.</p>
        </div>
      </div>

      <div className="mb-3">
        <Label htmlFor="email" className="text-[18px] font-medium">
          E-mail
        </Label>
        <Input type="email" id="email" className="mt-2" />
        <div className="min-h-4">
          <p className="text-xs text-red-400 mt-1">O e-mail é obrigatório.</p>
        </div>
      </div>

      <div className="mb-3">
        <Label htmlFor="cpf" className="text-[18px] font-medium">
          CPF
        </Label>
        <InputMask 
          mask="999.999.999-99"
          id="cpf"
          className="input"
        >
          {(inputProps: any) => <Input {...inputProps} type="text" />}
        </InputMask>
        <div className="min-h-4">
          <p className="text-xs text-red-400 mt-1">O CPF é obrigatório.</p>
        </div>
      </div>


      <div className="mb-3">
        <Label htmlFor="birthDate" className="text-[18px] font-medium">
          Data de Nascimento
        </Label>
        <Input
          type="date"
          id="birthDate"
          className="mt-2"
          max={new Date().toISOString().split("T")[0]}
        />
        <div className="min-h-4">
          <p className="text-xs text-red-400 mt-1">
            A data de nascimento é obrigatória.
          </p>
        </div>
      </div>

      <div className="mb-3">
        <Label htmlFor="cep" className="text-[18px] font-medium">
          CEP
        </Label>
        <InputMask
          mask="99999-999"
          id="cep"
          className="input"
        >
          {(inputProps: any) => <Input {...inputProps} type="text" />}
        </InputMask>
        <div className="min-h-4">
          <p className="text-xs text-red-400 mt-1">O CEP é obrigatório.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="input-group">
          <Label htmlFor="logradouro" className="text-[18px] font-medium">
            Logradouro
          </Label>
          <Input
            type="text"
            id="logradouro"
            name="logradouro"
            readOnly
            className="mt-2 bg-gray-50"
            placeholder="Preenchimento automático"
          />
        </div>

        <div className="input-group">
          <Label htmlFor="bairro" className="text-[18px] font-medium">
            Bairro
          </Label>
          <Input
            type="text"
            id="bairro"
            name="bairro"
            readOnly
            className="mt-2 bg-gray-50"
            placeholder="Preenchimento automático"
          />
        </div>

        <div className="input-group">
          <Label htmlFor="cidade" className="text-[18px] font-medium">
            Cidade
          </Label>
          <Input
            type="text"
            id="cidade"
            name="cidade"
            readOnly
            className="mt-2 bg-gray-50"
            placeholder="Preenchimento automático"
          />
        </div>

        <div className="input-group">
          <Label htmlFor="estado" className="text-[18px] font-medium">
            Estado
          </Label>
          <Input
            type="text"
            id="estado"
            name="estado"
            readOnly
            className="mt-2 bg-gray-50"
            placeholder="Preenchimento automático"
          />
        </div>
      </div>
    </form>
  );
};

export default Form;