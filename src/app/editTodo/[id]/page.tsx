import EditTodoPage from "@/components/EditTodo"

type Params = Promise<{ id: string }>
const page = async ({ params } : { params: Params }) => {
  const {id} = await params;
  return (
    <>
    <EditTodoPage id={id} />
    </>

  )
}

export default page