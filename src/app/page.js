'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsTrigger, TabsContent, TabsList } from '@/components/ui/tabs'
import { useState } from 'react'
import { v4 } from 'uuid'
import Image from 'next/image'
import * as bg from '@/app/assets/bg-violet.jpg'

export default function Home() {

  const [valueInput, setValueInput] = useState('')
  const [listTasks, setListTasks] = useState([])
  const [IsChecked, setIsChecked] = useState(false)

  function HandleNewTask() {
    if (!valueInput) {
      alert('digite algo para continuar')
    } else {
      setListTasks([{ id: v4(), name: valueInput, checked: IsChecked }, ...listTasks])
      setValueInput('')
    }

  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
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
          <h1 className='font-bold text-2xl my-5'>Pagina de lista de tarefas</h1>
          <div className='flex gap-3'>
            <Input
              onChange={(e) => setValueInput(e.target.value)}
              placeholder="Digite uma nova tarefa..."
              onKeyDown={handleKeyDown}
            />
            <Button
              onClick={HandleNewTask}
            >
              Adicionar
            </Button>
          </div>
          <ul className='mt-7'>
            {listTasks.map((item) => (
              <li
                className='flex items-center gap-3'
                key={item.id}
              >
                <Checkbox
                  checked={item.checked}
                  onCheckedChange={() => HandleCheck(item.id)}
                />
                <span className={`${item.checked ? "line-through text-zinc-500" : "text-zinc-900"}`}>{item.name}</span>
              </li>
            ))}
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
