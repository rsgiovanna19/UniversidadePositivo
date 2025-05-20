import axios from "axios";
import { useEffect, useState } from "react";
import MarmitaItemCard from "./MarmitaItemCard.jsx";
import { Navigate } from "react-router-dom";
import { useMessage } from "../Context/MessageContext.jsx";
import Message from "./Message.jsx";

function MarmitaCard({ searchTerm }) {
  const [marmitas, setMarmitas] = useState([]);
  const [itemAdicionado, setItem] = useState("");
  const [qnt, setQuant] = useState(1);
  const { showMessage, message, clearMessage } = useMessage();

  useEffect(() => {
    const buscarMarmitas = async () => {
      try {
        const response = await axios.get("http://localhost:5294/api/buscar-todas-marmitas");
        let lista = response.data;

        if (searchTerm?.trim()) {
          
          lista = lista.filter((m) =>
            m.descricao.toLowerCase().includes(searchTerm.toLowerCase())
          );
          
        } else {
          lista = lista.sort(() => 0.5 - Math.random()).slice(0, 6);
        }

        setMarmitas(lista);
      } catch (error) {
        console.error("Erro ao buscar as marmitas", error);
      }
    };

    buscarMarmitas();
  }, [searchTerm]); 

  useEffect(() => {
    if(itemAdicionado != "") {
      let mensagem = qnt > 1 ? (qnt + " " + itemAdicionado + " adicionados ao carrinho!") : (itemAdicionado + " adicionado ao carrinho!");
      showMessage(mensagem);
      setQuant(1);
    }

  }, [itemAdicionado]); 

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {message && (
          <Message msg={message} onClose={clearMessage} />
        )}
      {marmitas.map((marmita) => (
        <MarmitaItemCard key={marmita.id} marmita={marmita} setItem = {setItem} setQuant={setQuant} />
      ))}
    </div>
  );
}

export default MarmitaCard;
