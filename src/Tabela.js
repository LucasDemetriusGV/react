import React, { useState } from "react";

function Tabela({ vetor, selecionar }) {
    const [termo, setTermo] = useState("");
  
    const pesquisar = (event) => {
      setTermo(event.target.value);
    };
  
    const vetorFiltrado = termo
      ? vetor.filter((obj) => obj.nome.toLowerCase().includes(termo.toLowerCase()))
      : vetor;
  
    return (
      <div>
        <input
          type="text"
          name="txtPesquisar"
          placeholder="Pesquisar..."
          className="form-control pesquisa"
          onChange={pesquisar}
        />
  
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>Marca</th>
              <th>Selecionar</th>
            </tr>
          </thead>
  
          <tbody>
            {vetorFiltrado.map((obj, indice) => (
              <tr key={indice}>
                <td>{indice + 1}</td>
                <td>{obj.nome}</td>
                <td>{obj.marca}</td>
                <td>
                  <button
                    onClick={() => {
                      selecionar(indice);
                    }}
                    className="btn btn-success"
                  >
                    Selecionar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default Tabela;
  