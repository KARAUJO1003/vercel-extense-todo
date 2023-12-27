'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsTrigger, TabsContent, TabsList } from '@/components/ui/tabs'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { CalendarIcon, SortAscendingIcon } from '@heroicons/react/outline';
import { Label } from '@/components/ui/label'
import { useState, useEffect } from 'react'
import { v4 } from 'uuid'
import Image from 'next/image'
import * as bg from '@/app/assets/bg-violet.jpg'
import { ScrollArea } from '@/components/ui/scroll-area'
import { FilterIcon } from 'lucide-react'

export default function Home() {

  const [valueInput, setValueInput] = useState('')
    const [listTasks, setListTasks] = useState(() => {
    const storedList = localStorage.getItem('taskList');
    return storedList ? JSON.parse(storedList) : [];
  });
  const [IsChecked, setIsChecked] = useState(false)
  const [sortType, setSortType] = useState(null);


  useEffect(() => {
    const storedList = localStorage.getItem('taskList');
    if (storedList) {
      setListTasks(JSON.parse(storedList));
    }
  }, []);

  // Salva os itens no localStorage sempre que a lista é atualizada
  useEffect(() => {
    localStorage.setItem('taskList', JSON.stringify(listTasks));
  }, [listTasks]);


  function HandleNewTask() {
    if (valueInput === '') {
      alert('digite algo para continuar')
    } else {
      setListTasks((prevList) => [{ id: v4(), name: valueInput, checked: IsChecked }, ...prevList]);
      setValueInput(''); // Modifique aqui para setar diretamente uma string vazia
    }

  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      HandleNewTask();
    }
  }

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

    if (sortType === 'date') {
      sortedList = sortedList.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortType === 'name') {
      sortedList = sortedList.sort((a, b) => a.name.localeCompare(b.name));
    }

    setListTasks(sortedList);
  };

  const filterByStatus = (status) => {
    const filteredList = listTasks.filter((task) => (status === 'all' ? true : task.checked === status));
    setListTasks(filteredList);
  };



  return (
    <main className="flex min-h-screen flex-col">
      <div className='h-[200px] w-full overflow-hidden bg-zinc-100 flex items-center justify-center'>
        <Image
          className='bg-cover z-0'
          sizes='(max-width: 1560px) 100vw, (max-width: 1200px) 50vw, 33vw'
          src={bg}
          alt='pictre'
        />
      </div>
      <Separator />
      <Tabs
        defaultValue='todolist'
      >
        <TabsList className='w-full flex justify-center  rounded-none px-10'>
          <TabsTrigger value="todolist">Lista de Tarefas</TabsTrigger>
          <TabsTrigger value="conversor">Conversor de números</TabsTrigger>
        </TabsList>
        <TabsContent
          className="px-64 max-lg:px-20 max-md:px-5"
          value="todolist">
          <h1 className='font-bold text-2xl py-5'>Pagina de lista de tarefas</h1>
          <div className='flex gap-3'>
            <Input
              className="relative"
              value={valueInput}
              onChange={(e) => setValueInput(e.target.value)}
              placeholder="Digite uma nova tarefa..."
              onKeyDown={handleKeyDown}
            />
            <Popover className="absolute right-0 top-0">
              <PopoverTrigger asChild>
                <Button variant="outline"><FilterIcon className='w-4 h-4' /> </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Filtros e Ordenação</h4>
                    <p className="text-sm text-muted-foreground">
                      Utilize os filtros e ordenação para personalizar a visualização das tarefas.
                    </p>
                  </div>
                  <Separator />
                  <div className="grid gap-3">
                    <div className="flex items-center justify-start gap-2">
                      {/* Substitua o input type checkbox pelo componente Checkbox do ShadCn */}
                      <Checkbox id="filter-all" onChange={() => filterByStatus('all')} />
                      <Label htmlFor="all">Todas as Tarefas</Label>
                    </div>
                    <div className="flex items-center justify-start gap-2">
                      <Checkbox id="checked" onChange={() => filterByStatus(true)} />
                      <Label htmlFor="checked">Concluídas</Label>
                    </div>
                    <div className="flex items-center justify-start gap-2">
                      <Checkbox id="unchecked" onChange={() => filterByStatus(false)} />
                      <Label htmlFor="unchecked">Não Concluídas</Label>
                    </div>
                    <Separator />
                    <div className="flex items-center space-x-2">
                      <button id='dt' onClick={() => toggleSort('date')}>
                        <CalendarIcon className="w-5 h-5" />
                      </button>
                      <Label htmlFor="dt">Ordenar por Data</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button id='nm' onClick={() => toggleSort('name')}>
                        <SortAscendingIcon className="w-5 h-5" />
                      </button>
                      <Label htmlFor="nm">Ordenar por Nome</Label>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Button
              onClick={HandleNewTask}
            >
              Adicionar
            </Button>
          </div>
          <ul className='mt-7 h-80'>
            <ScrollArea className="h-80">
              {listTasks.map((item) => (
                <li
                  className='flex items-start gap-3 break-all border-b pb-2'
                  key={item.id}
                >
                  <Checkbox
                    className="mt-1 hover:bg-zinc-200"
                    checked={item.checked}
                    onCheckedChange={() => HandleCheck(item.id)}
                  />
                  <span className={` ${item.checked ? "line-through text-zinc-500" : "text-zinc-900"} `}>{item.name}</span>
                </li>
              ))}
            </ScrollArea>
          </ul>

        </TabsContent>
        <TabsContent
          className="px-10"
          value="conversor">
          <h1>Pagina de conversor</h1>
        </TabsContent>
      </Tabs>
    </main >
  )
}
