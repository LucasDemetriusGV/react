import { useEffect, useState } from 'react';
import './App.css';
import Formulario from './Formulario';
import Tabela from './Tabela';

function App() {

  //Objeto produto 
  const produto = {
    id: 0,
    nome: '',
    marca: ''
  }

  //useState
  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [produtos, setProdutos] = useState([]);
  const [objProduto, setObjProduto] = useState(produto);

  //useEffect
  useEffect(() => {
    fetch("http://localhost:8080/listar")
      .then(retorno => retorno.json())
      .then(retorno_convertido => {
        setProdutos(retorno_convertido);
      });
  }, []);

  //Obtendo os dados do formulario
  const aoDigitar = (e) => {
    setObjProduto({ ...objProduto, [e.target.name]: e.target.value });
  }

  //Cadastrar produto
  const cadastrar = () => {
    fetch('http://localhost:8080/cadastrar', {
      method: 'post',
      body: JSON.stringify(objProduto),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {

        if (retorno_convertido.mensagem !== undefined) {
          alert(retorno_convertido.mensagem);
        } else {
          setProdutos([...produtos, retorno_convertido]);
          alert('Cadastro realizado!');
          limparFormulario();
        }

      })
  }

  //Alterar produto
  const alterar = () => {
    fetch('http://localhost:8080/alterar', {
      method: 'put',
      body: JSON.stringify(objProduto),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {

        if (retorno_convertido.mensagem !== undefined) {
          alert(retorno_convertido.mensagem);
        } else {

          alert('Produto alterado com sucesso!');

          //Copia do nosso vetor de produto pois não podemos modificar o original
          let vetorTemp = [...produtos];

          //Posicionando no indice para fazer as alterações
          let indice = vetorTemp.findIndex((p) => {
            return p.id === objProduto.id;
          });

          //Alterar o vetor
          vetorTemp[indice] = objProduto;

          //Atualizando o vetor de produtos
          setProdutos(vetorTemp);

          limparFormulario();
        }

      })
  }

  //Remover produto
  const remover = () => {
    fetch('http://localhost:8080/remover/' + objProduto.id, {
      method: 'delete',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {

        alert(retorno_convertido.mensagem);

        let vetorTemp = [...produtos];

        let indice = vetorTemp.findIndex((p) => {
          return p.id === objProduto.id;
        });

        //removendo o produto do vetor
        vetorTemp.splice(indice, 1);

        //Atualizando o vetor de produtos
        setProdutos(vetorTemp);

        //Limpar formulario
        limparFormulario();

      })
  }

  //Limpando o formulario
  const limparFormulario = () => {
    setObjProduto(produto);
    setBtnCadastrar(true);
  }

  //Selecionando produto
  const selecionarProduto = (indice) => {
    setObjProduto(produtos[indice]);
    setBtnCadastrar(false);
  }

  return (
    <div>
      <Formulario
        botao={btnCadastrar}
        eventoTeclado={aoDigitar}
        cadastrar={cadastrar}
        obj={objProduto}
        cancelar={limparFormulario}
        remover={remover}
        alterar={alterar} />
      <Tabela
        vetor={produtos}
        selecionar={selecionarProduto} />
    </div>
  );
}

export default App;
