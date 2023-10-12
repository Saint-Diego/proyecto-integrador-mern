import React, { useEffect, useState } from "react";
import { showAlertWithTimer } from "../../utils/alerts";

const newInput = {
  title: "",
  description: "",
};

const FormEditTask = ({ index, tasks, setTasks }) => {
  const [input, setInput] = useState(newInput);

  useEffect(() => {
    console.log(`index-${index}`)
    const { title, description } = tasks[index];
    setInput({ ...input, title, description });
  }, []);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: [e.target.value] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    tasks[index] = { ...tasks[index], ...input };
    setTasks(tasks);
    showAlertWithTimer("Tarea actualizada correctamente", "", "success");
    clearInputs();
  };

  const clearInputs = () => {
    setInput(newInput);
  };

  return (
    <div
      className="modal fade"
      id="editTask"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="editTaskLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="editTaskLabel">
              Actualizar Tarea
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  className="form-control"
                  type="text"
                  id="task-name"
                  name="title"
                  value={input.title}
                  placeholder="Ingrese tarea"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  id="description-text"
                  name="description"
                  cols="10"
                  rows="3"
                  value={input.description}
                  placeholder="Ingrese una breve descripción"
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-primary">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEditTask;
