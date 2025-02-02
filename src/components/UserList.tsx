import type { FormData } from "../types/types";
import { calculateAge, formatCEP, formatCPF } from "@/utils/validators";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface UserListProps {
  users: FormData[];
}

const UserList = ({ users }: UserListProps) => {
  return (
    <>
      {users.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow className="w-full">
              <TableHead className="table-cell">Nome</TableHead>
              <TableHead className="hidden md:table-cell">E-mail</TableHead>
              <TableHead className="table-cell">Idade</TableHead>
              <TableHead className="table-cell">CPF</TableHead>
              <TableHead className="table-cell">Endereço</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="font-medium">{user.nome}</div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="hidden md:inline text-sm text-muted-foreground">
                    {user.email}
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    {calculateAge(new Date(user.dataNascimento))}
                  </div>
                </TableCell>
                <TableCell>{formatCPF(user.cpf)}</TableCell>
                <TableCell>
                  <div className="font-medium">
                    {formatCEP(user.cep)}</div>
                  <div className="hidden md:inline text-sm text-muted-foreground">
                    {`${user.logradouro}, ${user.bairro}, ${user.cidade} - ${user.estado}`}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default UserList;
