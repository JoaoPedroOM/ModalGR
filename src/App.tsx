import { useState } from "react";
import Form from "./components/Form";
import FormHeader from "./components/FormHeader";
import type { FormData } from "./types/types";
import UserList from "./components/UserList";
import { Card, CardContent } from "./components/ui/card";

const App = () => {
  const [users, setUsers] = useState<FormData[]>([]);

  const addUser = (user: FormData) => {
    setUsers((prevUsers) => [user, ...prevUsers]);
  };

  return (
    <main className="bg-slate-50 min-h-screen lg:p-10 p-5">
      <div className="mx-auto container max-w-[950px] lg:px-10 px-2 py-6 border-slate-300 border-2 rounded-2xl">
        <FormHeader />
        <Form addUser={addUser} />
      </div>
      {users.length > 0 && (
        <Card className="mt-10 container mx-auto">
          <CardContent>
            <UserList users={users} />
          </CardContent>
        </Card>
      )}
    </main>
  );
};

export default App;
