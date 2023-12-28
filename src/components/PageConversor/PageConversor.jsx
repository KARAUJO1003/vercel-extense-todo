"use client";

import extenso from "extenso";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
  CardHeader,
} from "../ui/card";

export function PageConversor() {
  const [valueInput, setValueInput] = useState();
  const [result, setResult] = useState();

  function AddValue() {
    let valorExtenso = extenso(valueInput, {
      mode: "currency",
      currency: { type: "BRL" },
    });
    setResult(valorExtenso);
  }

  return (
    <div className="w-full flex justify-center">
      <Card className="max-w-96 gap-3">
        <CardHeader>
          <CardTitle>Extenso</CardTitle>
          <CardDescription>Converta números para extenso</CardDescription>
        </CardHeader>
        <CardContent className=" flex gap-3 ">
          <Input
            value={valueInput}
            onChange={(e) => setValueInput(e.target.value)}
            placeholder="Digite um numero..."
          />

          <Button onClick={AddValue}>Adicionar</Button>
        </CardContent>
        <CardFooter className="min-h-40 border p-3 text-sm font-semibold bg-zinc-100">
          <p className="uppercase">{result}</p>
        </CardFooter>
      </Card>
    </div>
  );
}
