import EditTodoPage from "@/components/EditTodo"


const page = async ({ params }: { params: { id: string } }) => {
  const {id} = await params;
  return (
    <>
    <EditTodoPage id={id} />
    </>

  )
}

export default page