import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./modal.css";

interface propsModal {
  onClose: () => void;
  onSubmit: () => void;
  onChange: (client: string, bread: number) => void;
}

const Modal = ({ onClose, onSubmit, onChange }: propsModal) => {
  const [client, setClient] = React.useState<string>();
  const [bread, setBread] = React.useState<number>();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  useEffect(() => {
    onChange(client as string, bread as number);
  }, [client, bread]);
  return (
    <form className="modal-forms" onSubmit={handleSubmit}>
      <div>
        <h1>Adicionar pessoas a fila</h1>
        <input
          type="text"
          id="client-name"
          onChange={(e) => setClient(e.target.value)}
          placeholder="Nome completo do cliente"
        />
        <input
          type="number"
          id="total-bread"
          onChange={(e) => setBread(Number(e.target.value))}
          placeholder="Total de paes:"
        />
      </div>
      <div>
        <button type="submit" id="send">
          Enviar
        </button>
        <button onClick={onClose} id="cancel">
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default Modal;
