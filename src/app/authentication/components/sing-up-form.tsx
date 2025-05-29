import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from "zod";
import {Loader2} from "lucide-react"

const registerSchema = z.object({
    name: z.string().min(1, { message: "Nome é obrigatório" }).max(50),
    email: z.string().email({ message: "E-mail inválido" }),
    password: z.string().min(8, { message: "A senha deve ter pelo menos 8 caracteres" }),
  });
  

const SingUpForm = () => {
    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
          name: "",
          email: "",
          password: "",
        },
      });
    
      async function onSubmit(values: z.infer<typeof registerSchema>) {
        try {
          const response = await fetch('/api/auth/sign-up/email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: values.email,
              password: values.password,
              name: values.name,
              callbackURL: `${window.location.origin}/dashboard`,
            }),
          });

          if (!response.ok) {
            throw new Error('Erro ao criar usuário');
          }

          const data = await response.json();
          // Redirecionar para o dashboard após o sucesso
          window.location.href = '/dashboard';
        } catch (error) {
          console.error('Erro:', error);
        }
      }

    return(
        <Card className="border-none shadow-none">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl font-bold">Criar conta</CardTitle>
                  <CardDescription>Preencha os dados para se cadastrar</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                          <Input placeholder="Seu nome completo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-mail</FormLabel>
                        <FormControl>
                          <Input placeholder="Seu melhor e-mail" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Senha</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Crie uma senha segura" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={form.formState.isSubmitting} >
                  {form.formState.isSubmitting ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ): ("Criar Conta")}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
    );
}

export default SingUpForm;