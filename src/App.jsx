import { useState, useEffect } from "react";
import { data } from "autoprefixer";
import { useForm, useFieldArray } from "react-hook-form";

const App = () => {
  const [toDos, setToDos] = useState([]);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data?.task?.trim().length > 0) {
      console.log(errors?.task?.message);
      setToDos([data.task.trim(), ...toDos]);
    }
  };

  /**
   * Closures
   */
  const removeItem = (index) => {
    return () => {
      const filtered = toDos.filter((item, innerIndex) => index !== innerIndex);
      setToDos(filtered);
    };
  };

  return (
    <main className="min-h-screen bg-black text-white p-5 flex flex-col gap-10">
      <form
        className="w-full flex justify-center items-center gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          className="bg-white text-black p-2 max-w-sm w-full"
          name="task"
          {...register("task", {
            minLength: 1,
            message: "Task cannot be blanks",
          })}
        />
        <button className="bg-sky-500 text-black p-2 rounded">Agregar</button>
        {errors?.task?.message && (
          <p className="text-red-500">{errors.task.message}</p>
        )}
      </form>

      <div className="flex flex-col gap-2">
        {toDos.map((item, index) => {
          return (
            <div
              className="w-full flex justify-center items-center gap-2"
              key={`item-${index}`}
            >
              <p className="max-w-sm w-full">{item}</p>
              <button
                className="bg-lime-500 text-black p-2 rounded"
                onClick={removeItem(index)}
              >
                Done
              </button>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default App;
