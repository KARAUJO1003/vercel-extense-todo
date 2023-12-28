"use client";

import { Separator } from "@/components/ui/separator";
import { Tabs, TabsTrigger, TabsContent, TabsList } from "@/components/ui/tabs";
import Image from "next/image";
import * as bg from "@/app/assets/bg-violet.jpg";
import { PageTodo } from "@/components/PageTodo/PageTodo";
import { PageConversor } from "@/components/PageConversor/PageConversor";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="h-[200px] w-full overflow-hidden bg-zinc-100 flex items-center justify-center">
        <Image
          className="bg-cover z-0"
          sizes="(max-width: 1560px) 100vw, (max-width: 1200px) 50vw, 33vw"
          src={bg}
          alt="pictre"
        />
      </div>

      <Separator />

      <Tabs defaultValue="todolist">
        <TabsList className="w-full flex justify-center  rounded-none px-10">
          <TabsTrigger value="todolist">Lista de Tarefas</TabsTrigger>
          <TabsTrigger value="conversor">Conversor de números</TabsTrigger>
        </TabsList>

        <TabsContent
          className="px-64 pb-10 max-lg:px-20 max-md:px-5"
          value="todolist"
        >
          <Card>
            <CardHeader>
              <CardTitle>Lista de tarefas</CardTitle>
              <CardDescription>Adicione suas tarefas</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <PageTodo />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conversor">
          <PageConversor />
        </TabsContent>
      </Tabs>
    </main>
  );
}
