import InputMask from "react-input-mask";
import { FieldValues, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FormValues } from "../schema";
import { formSchema } from "../schema";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

import { useToast } from "@/hooks/use-toast";
interface FormProps {
  addUser: (user: FormValues) => void;
}

const Form = ({addUser} : FormProps) => {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>({ resolver: zodResolver(formSchema) });

  const handleCepInfos = async (e: React.FocusEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, "");

    if (cep.length !== 8) return;

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();

      if (data.erro) {
        toast({
          variant: "destructive",
          title: "CEP não encontrado",
          description:
            "Verifique se o CEP digitado está correto e tente novamente.",
        });
      } else {
        setValue("logradouro", data.logradouro);
        setValue("bairro", data.bairro);
        setValue("cidade", data.localidade);
        setValue("estado", data.uf);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao buscar o CEP",
        description:
          "Ocorreu um problema ao buscar as informações do CEP. Tente novamente mais tarde.",
      });
    }
  };

  function onSubmit(data: FieldValues) {
    addUser(data as FormValues);

    toast({
      title: "Usuário cadastrado com sucesso!",
      description: "Os dados foram salvos.",
    });

    reset({
      nome: '',
      email: '',
      cpf: '',
      cep: '',
      logradouro: '',
      bairro: '',
      cidade: '',
      estado: '',
    });
    console.log("Dados do form:", data);
  }

  return (
    <form className="mt-9" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <Label htmlFor="name" className="text-[18px] font-medium">
          Nome Completo
        </Label>
        <Input type="text" id="name" className="mt-2" {...register("nome")} />
        <p className="text-xs text-red-400 mt-1">
          <ErrorMessage errors={errors} name="nome" />
        </p>
      </div>

      <div className="mb-3">
        <Label htmlFor="email" className="text-[18px] font-medium">
          E-mail
        </Label>
        <Input
          type="email"
          id="email"
          className="mt-2"
          {...register("email")}
        />
        <p className="text-xs text-red-400 mt-1">
          <ErrorMessage errors={errors} name="email" />
        </p>
      </div>

      <div className="mb-3">
        <Label htmlFor="cpf" className="text-[18px] font-medium">
          CPF
        </Label>
        <InputMask
          mask="999.999.999-99"
          id="cpf"
          className="input"
          {...register("cpf")}
        >
          {(inputProps: any) => <Input {...inputProps} type="text" />}
        </InputMask>
        <p className="text-xs text-red-400 mt-1">
          <ErrorMessage errors={errors} name="cpf" />
        </p>
      </div>

      <div className="mb-3">
        <Label htmlFor="cep" className="text-[18px] font-medium">
          CEP
        </Label>
        <InputMask
          mask="99999-999"
          id="cep"
          className="input"
          {...register("cep")}
          onBlur={handleCepInfos}
        >
          {(inputProps: any) => <Input {...inputProps} type="text" />}
        </InputMask>
        <p className="text-xs text-red-400 mt-1">
          <ErrorMessage errors={errors} name="cep" />
        </p>
      </div>

      <div className="mb-3">
        <Label htmlFor="dataNascimento" className="text-[18px] font-medium">
          Data de Nascimento
        </Label>
        <Input
          type="date"
          id="dataNascimento"
          className="mt-2"
          max={new Date().toISOString().split("T")[0]}
          {...register("dataNascimento")}
        />
        <p className="text-xs text-red-400 mt-1">
          <ErrorMessage errors={errors} name="dataNascimento" />
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="input-group">
          <Label htmlFor="logradouro" className="text-[18px] font-medium">
            Logradouro
          </Label>
          <Input
            type="text"
            id="logradouro"
            readOnly
            className="mt-2 bg-gray-50"
            placeholder="Preenchimento automático"
            {...register("logradouro")}
          />
        </div>

        <div className="input-group">
          <Label htmlFor="bairro" className="text-[18px] font-medium">
            Bairro
          </Label>
          <Input
            type="text"
            id="bairro"
            {...register("bairro")}
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
            {...register("cidade")}
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
            {...register("estado")}
            readOnly
            className="mt-2 bg-gray-50"
            placeholder="Preenchimento automático"
          />
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        Enviar
      </Button>
    </form>
  );
};

export default Form;
