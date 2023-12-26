'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsTrigger, TabsContent, TabsList } from '@/components/ui/tabs'
import { useState } from 'react'
import { v4 } from 'uuid'

export default function Home() {

  const [ valueInput, setValueInput ] = useState('')
  const [ listTasks, setListTasks ] = useState([])
  const [ IsChecked, setIsChecked ] = useState(false)

  function HandleNewTask() {
    setListTasks([{ id: v4(), name: valueInput, checked: IsChecked }, ...listTasks])
    console.log(listTasks)
  }

  return (
    <main className="flex min-h-screen flex-col">
      <div className='h-[200px] w-full bg-zinc-100 flex items-center justify-center'>
        <h1>background image</h1>
      </div>
      <Separator />
      <Tabs
        defaultValue='todolist'
      >
        <TabsList className='w-full flex justify-center bg-zinc-200 rounded-none px-10'>
          <TabsTrigger value="todolist">Lista de Tarefas</TabsTrigger>
          <TabsTrigger value="conversor">Conversor de números</TabsTrigger>
        </TabsList>
        <TabsContent
          className="px-64"
          value="todolist">
          <h1 className='font-bold text-2xl my-5'>Pagina de lista de tarefas</h1>
          <div className='flex gap-3'>
            <Input
              onChange={(e) => setValueInput(e.target.value)}
              placeholder="Digite uma nova tarefa..."
            />
            <Button
              onClick={HandleNewTask}
            >
              Adicionar
            </Button>
          </div>
          <ul className='mt-7'>
            {listTasks.map((item) =>  (
              <li
                className='flex items-center gap-3' 
                key={item.id}
              >
                <Checkbox
                  onCheckedChange={(e) => setIsChecked(e)}
                />
                <span className={`${item.checked ? "text-red-500" : "line-through"}`}>{item.name}</span>
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
