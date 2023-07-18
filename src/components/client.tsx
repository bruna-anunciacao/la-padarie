import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Image from "next/image";
import "./client.css"

interface Pedido {
    id: number;
    name: string;
    totalBread: number;
}

interface propsClients {
    pedido: Pedido | undefined;
    onDelete: () => void;
}

const RegisterClients = ({pedido, onDelete}: propsClients) => {
    return (
        <div>
          {pedido && (
            <div className="client-box">
              <div>
                <h1>{pedido.name}</h1>
                <div className="total-content">
                  <h2><span>Total de pães:</span> {pedido.totalBread}</h2>
                  <h2><span>Total a pagar:</span> R$ {pedido.totalBread * 0.5}</h2>
                </div>
              </div>  
                <div>
                  <Image src="/img/del.svg" alt="ícone de uma lixeira" width={24} height={25} onClick={onDelete} className="del-image"/>
                </div>

            </div>
          )}
        </div>
      );
}

export default RegisterClients;