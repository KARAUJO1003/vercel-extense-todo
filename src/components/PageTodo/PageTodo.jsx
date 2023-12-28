"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { CalendarIcon, SortAscendingIcon } from "@heroicons/react/outline";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FilterIcon, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import { v4 } from "uuid";

export function PageTodo() {
  const [valueInput, setValueInput] = useState("");
  const [IsChecked, setIsChecked] = useState(false);
  const [sortType, setSortType] = useState(null);
  const [listTasks, setListTasks] = useState([]);

  function HandleNewTask() {
    if (valueInput === "") {
      alert("digite algo para continuar");
    } else {
      setListTasks((prevList) => [
        { id: v4(), name: valueInput, checked: IsChecked },
        ...prevList,
      ]);
      setValueInput(""); // Modifique aqui para setar diretamente uma string vazia
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      HandleNewTask();
    }
  };

  function HandleCheck(id) {
    setListTasks((prevTasks) => {
      return prevTasks.map((task) =>
        task.id === id ? { ...task, checked: !task.checked } : task
      );
    });
  }

  const toggleSort = (sortKey) => {
    if (sortType === sortKey) {
      setSortType(null);
    } else {
      setSortType(sortKey);
    }
  };

  const sortList = () => {
    let sortedList = [...listTasks];

    if (sortType === "date") {
      sortedList = sortedList.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
    } else if (sortType === "name") {
      sortedList = sortedList.sort((a, b) => a.name.localeCompare(b.name));
    }

    setListTasks(sortedList);
  };

  const filterByStatus = (status) => {
    const filteredList = listTasks.filter((task) =>
      status === "all" ? true : task.checked === status
    );
    setListTasks(filteredList);
  };


  function handleDelete (id){
    setListTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
  }
  //---------------------------------------------------------------------------CODIGO JSX --------------------------------------------------------------------------------------------
  return (
    <div>
      <div className="flex gap-3 px-10">
        <Input
          className="relative"
          value={valueInput}
          onChange={(e) => setValueInput(e.target.value)}
          placeholder="Digite uma nova tarefa..."
          onKeyDown={handleKeyDown}
        />

        <Popover className="absolute right-0 top-0">
          <PopoverTrigger asChild>
            <Button variant="outline">
              <FilterIcon className="w-4 h-4" />{" "}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">
                  Filtros e Ordenação
                </h4>
                <p className="text-sm text-muted-foreground">
                  Utilize os filtros e ordenação para personalizar a
                  visualização das tarefas.
                </p>
              </div>

              <Separator />

              <div className="grid gap-3">
                <div className="flex items-center justify-start gap-2">
                  <Checkbox
                    id="filter-all"
                    onChange={() => filterByStatus("all")}
                  />
                  <Label htmlFor="all">Todas as Tarefas</Label>
                </div>

                <div className="flex items-center justify-start gap-2">
                  <Checkbox
                    id="checked"
                    onChange={() => filterByStatus(true)}
                  />
                  <Label htmlFor="checked">Concluídas</Label>
                </div>

                <div className="flex items-center justify-start gap-2">
                  <Checkbox
                    id="unchecked"
                    onChange={() => filterByStatus(false)}
                  />
                  <Label htmlFor="unchecked">Não Concluídas</Label>
                </div>

                

                <div className="flex items-center space-x-2">
                  <button id="dt" onClick={() => toggleSort("date")}>
                    <CalendarIcon className="w-5 h-5" />
                  </button>
                  <Label htmlFor="dt">Ordenar por Data</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <button id="nm" onClick={() => toggleSort("name")}>
                    <SortAscendingIcon className="w-5 h-5" />
                  </button>
                  <Label htmlFor="nm">Ordenar por Nome</Label>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Button onClick={HandleNewTask}>Adicionar</Button>
      </div>
      <ul className="mt-7 h-80 gap-2 overflow-hidden  border bg-zinc-100 px-10 py-5 ">
        <ScrollArea className="h-80">
          {listTasks.map((item) => (
            <li
              key={item.id}
              className="flex items-start gap-3 break-all rounded  divide-y-reverse divide-y-[1px] py-1 px-2 mb-1"
            >
              <Checkbox
                checked={item.checked}
                className="mt-1 hover:bg-zinc-200 accent-sky-500"
                onCheckedChange={() => HandleCheck(item.id)}
              />
              <span
                className={`pb-1 capitalize w-full ${
                  item.checked ? "line-through text-zinc-500" : "text-zinc-900"
                } `}
              >
                {item.name}
              </span>
              <Button 
              variant="link" 
              className="m-0 p-0 h-auto w-auto bg-transparent border-none"
              onClick={() => handleDelete(item.id)}
              >
                <X className="w-5 h-5 text-red-500 rounded hover:text-red-700 " />
              </Button>
            </li>
          ))}
        </ScrollArea>
      </ul>
    </div>
  );
}
