"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import RegisterClients from "@/components/client";
import Modal from "@/components/modal";

interface Pedido {
  id: number;
  name: string;
  totalBread: number;
}

export default function Home() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [qtdBread, setQtdBread] = useState<number>(0);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [Id, setId] = useState<number>(1);
  const [totalBread, setTotalBread] = useState<number>(0);
  const [totalValue, setTotalValue] = useState<number>(0);

  const handleValueChanges = (name: string, qtdBread: number) => {
    setName(name);
    setQtdBread(qtdBread);
  };

  const cadastraPedido = (name: string, qtdBread: number) => {
    const novoPedido: Pedido = {
      id: Id,
      name: name,
      totalBread: qtdBread,
    };
    setId(Id + 1);
    return novoPedido;
  };

  const handleSubmit = () => {
      const novoPedido = cadastraPedido(name, qtdBread);
      setPedidos([...pedidos, novoPedido]);
      setTotalBread(totalBread + qtdBread);
      setTotalValue((totalBread + qtdBread) * 0.5);
      handleCloseModal();

  };

  const handleDelete = (id: number) => {
    const updtPedidos = pedidos.filter((pedido) => pedido.id !== id);
    setPedidos(updtPedidos);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <main>
      <header>
        <div>
          <Image src="/img/logo.svg" alt="imagem com a logo de La Padarie" width={115} height={113} className="logo"/>
        </div>
        <div className="box-content">
          <div className="painel-content">
            <div className="text-content">
              <h1>Pessoas na fila</h1>
              <Image src="/img/people.svg" alt="ícone de uma pessoa" width={25} height={22} />
            </div>
            <p className="display">{pedidos.length}</p>
          </div>
          <div className="painel-content">
            <div className="text-content">
              <h2>Pães vendidos</h2>
              <Image src="/img/market.svg" alt="ícone de um carrinho de mercado" width={25} height={22} />
            </div>
            <p className="display">{totalBread}</p>
          </div>
          <div className="painel-content input-content">
            <div className="text-content">
              <h2>Entrada</h2>
              <Image src="/img/money.svg" alt="ícone de um cifrão de dinheiro" width={25} height={22} />
            </div>
            <p className="display">R$ {totalValue.toFixed(2)}</p>
          </div>
        </div>
      </header>
      <section>
        <div className="clients-container">
          <div>
            <button className="add-button" onClick={handleOpenModal}>
              + Adicionar pessoas à fila
            </button>
          </div>
          <div className="clients-painel">
            {pedidos.map((pedido) => (
              <RegisterClients
                key={pedido.id}
                pedido={pedido}
                onDelete={() => handleDelete(pedido.id)}
              />
            ))}
          </div>
        </div>
        <footer>Com 💛 Info Jr UFBA 2022</footer>
      </section>
      {showModal && (
        <div className="background-modal">
          <div className="modal-content">
            <Modal
              onChange={handleValueChanges}
              onSubmit={handleSubmit}
              onClose={handleCloseModal}
            />
          </div>
        </div>
      )}
    </main>
  );
}
