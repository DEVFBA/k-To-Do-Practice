import { useState, useEffect } from "react";

const App = () => {
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState([]);

  useEffect(() => {
    console.log("Componente terminó de renderizar");
  }, []);

  useEffect(() => {
    console.log("Hola Tonota");
  }, [toDos]);

  const addHandler = () => {
    if (text.trim().length > 0) {
      setToDos([text.trim(), ...toDos]);
      setText("");
    }
  };

  const keyUpHandler = (event) => {
    if (event.key === "Enter") {
      addHandler();
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
      <div className="w-full flex justify-center items-center gap-2">
        <input
          type="text"
          className="bg-white text-black p-2 max-w-sm w-full"
          onChange={(event) => {
            setText(event.target.value);
          }}
          value={text}
          onKeyUp={keyUpHandler}
        />
        <button
          className="bg-sky-500 text-black p-2 rounded"
          onClick={addHandler}
        >
          Agregar
        </button>
      </div>

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
