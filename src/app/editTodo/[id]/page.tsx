"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Todo } from "@/models/Todo";
import axios from "axios"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";



type Todo = {
  _id: string;
  title: string;
  description: string;
};

const EditTodoPage = ({ params }: { params: { id: string } }) => {
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const router = useRouter();
 
  const paramId = params.id ;

  // Fetch the todo by ID
  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const res = await axios.get(`/api/todo/${paramId}`);
        setTodo(res.data);
        setFormData({ title: res.data.title, description: res.data.description });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching todo:", error);
        setLoading(false);
      }
    };
    fetchTodo();
  }, [paramId]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Update the todo
  const updateTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`/api/todo/${paramId}`, formData);
      router.push("/"); // Redirect to the home page or todos list
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  if (!todo) return <div>Todo not found.</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Todo</h1>
      <form onSubmit={updateTodo} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-lg font-medium">
            Title
          </label>
          <Input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-lg font-medium">
            Description
          </label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <Button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Update
        </Button>
      </form>
    </div>
  );
};

export default EditTodoPage;
