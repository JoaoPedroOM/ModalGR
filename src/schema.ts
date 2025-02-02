import {z} from "zod";

const isValidCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/\D/g, '');
  if (!cpf || cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      return false;
  }

  const calcularDigito = (cpf: string, peso: number[]) => {
      const soma = cpf
          .slice(0, peso.length)
          .split('')
          .reduce((acc, num, index) => acc + parseInt(num) * peso[index], 0);
      const resto = (soma * 10) % 11;
      return resto === 10 || resto === 11 ? 0 : resto;
  };

  const primeiroDigito = calcularDigito(cpf, [10, 9, 8, 7, 6, 5, 4, 3, 2]);
  if (primeiroDigito !== parseInt(cpf[9])) return false;

  const segundoDigito = calcularDigito(cpf, [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]);
  if (segundoDigito !== parseInt(cpf[10])) return false;

  return true;
};

  
export const formSchema = z.object({
    nome: z.string()
      .min(1, 'Nome é obrigatório')
      .max(150, 'Máximo de 150 caracteres')
      .regex(/^[a-zA-ZÀ-ÿ\s']+$/, 'Apenas letras e espaços são permitidos'),
  
    cpf: z.string()
      .min(1, 'CPF é obrigatório')
      .transform(cpf => cpf.replace(/\D/g, ''))
      .refine(cpf => cpf.length === 11, 'CPF deve ter 11 dígitos')
      .refine(cpf => isValidCPF(cpf), 'CPF inválido'),
  
    dataNascimento: z.coerce.date()
      .max(new Date(), 'Data não pode ser no futuro')
      .refine(date => {
        const age = new Date().getFullYear() - date.getFullYear();
        return age >= 18;
      }, 'Deve ser maior de 18 anos'),
  
    email: z.string()
      .min(1, 'E-mail é obrigatório')
      .max(200, 'Máximo de 200 caracteres')
      .email('Formato de e-mail inválido'),
  
    cep: z.string()
      .min(1, 'CEP é obrigatório')
      .transform(cep => cep.replace(/\D/g, ''))
      .refine(cep => cep.length === 8, 'CEP deve ter 8 dígitos'),
  
    logradouro: z.string().min(1, 'Campo obrigatório'),
    bairro: z.string().min(1, 'Campo obrigatório'),
    cidade: z.string().min(1, 'Campo obrigatório'),
    estado: z.string().length(2, 'UF deve ter 2 caracteres')
  });
  

  export type FormValues = z.infer<typeof formSchema>;