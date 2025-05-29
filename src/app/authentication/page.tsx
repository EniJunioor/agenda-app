"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SingUpForm from "./components/sing-up-form";



const AuthenticationPage = () => {

  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-gradient-to-br from-gray-100 to-white px-4">
      <Tabs defaultValue="login" className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        <TabsList className="grid w-full grid-cols-2 mb-4 bg-gray-100 rounded-xl p-1">
          <TabsTrigger value="login" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md">
            Login
          </TabsTrigger>
          <TabsTrigger value="register" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md">
            Criar conta
          </TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <Card className="border-none shadow-none">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Login</CardTitle>
              <CardDescription>Faça login para continuar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="E-mail" />
              <Input placeholder="Senha" type="password" />
            </CardContent>
            <CardFooter>
              <Button className="w-full">Entrar</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="register">
          <SingUpForm/>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthenticationPage;
