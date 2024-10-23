import { useState, FormEvent, useEffect } from 'react';
import styles from './home.module.css';
import { BsSearch } from  'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { DataProps, CoinProps } from '../../interfaces/interfaces';

export function Home() {

  const [input, setInput] = useState('');
  const [coins, setCoins] = useState<CoinProps[]>([]);
  const [offset, setOffset] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    getDataCoin();
  }, [offset]);

  async function getDataCoin(){
    fetch(`https://api.coincap.io/v2/assets?limit=10&offset=${offset}`)
    .then((response) => response.json())
    .then((data: DataProps) => {
      const coinsData = data.data

      const formatedResult = coinsData.map((item) => {
        const price = Intl.NumberFormat('es-Us', {
          style: 'currency',
          currency: 'USD'
        });

        const priceCompact = Intl.NumberFormat('es-Us', {
          style: 'currency',
          currency: 'USD',
          notation: 'compact'
        });

        const formated = {
          ...item,
          formatedPrice: price.format(Number(item.priceUsd)),
          formatedMarket: priceCompact.format(Number(item.marketCapUsd)),
          formatedVolume: priceCompact.format(Number(item.volumeUsd24Hr))
        }

        return formated;
      });

      const listCoins = [...coins, ...formatedResult]

      setCoins(listCoins);
    });
  }

  function handleSubmit(e: FormEvent){
    e.preventDefault();
    navigate(`/detail/${input}`);
  };

  function handleGetMore(){
    setOffset(offset + 10)
  };

  function openDetails(item: string){
    navigate(`/detail/${item}`)
  }

  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input 
          type="text"
          placeholder="ex: bitcoin"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">
          <BsSearch size={30} color="#FFF" />
        </button>
      </form>


      <table>
        <thead>
          <tr>
            <th scope="col">Moeda</th>
            <th scope="col">Valor mercado</th>
            <th scope="col">Preço</th>
            <th scope="col">Volume</th>
            <th scope="col">Mudança 24h</th>
          </tr>
        </thead>

        <tbody id="tbody">

          {coins.length > 0 && coins.map((item, index) => (
            <tr key={index} className={styles.tr} onClick={() => openDetails(item.id)}>
              <td className={styles.tdLabel} data-label="Moeda">
                <div className={styles.name}>
                    <img className={styles.logo} src={`https://assets.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png`} alt={`Logo ${item.symbol}`} />
                    <span>{item.name}</span> {item.symbol}
                </div>
              </td>

              <td className={styles.tdLabel} data-label="Valor mercado">
                {item.formatedMarket}
              </td>

              <td className={styles.tdLabel} data-label="Preço">
                {item.formatedPrice}
              </td>

              <td className={styles.tdLabel} data-label="Volume">
                {item.formatedVolume}
              </td>

              <td className={Number(item.changePercent24Hr) > 0 ? styles.tdProfit : styles.tdLoss} data-label="Mudança 24h">
                <span>{Number(item.changePercent24Hr).toFixed(3)}</span>
              </td>

            </tr>
          ))}

          

        </tbody>
      </table>

      <button type="button" className={styles.buttonMore} onClick={handleGetMore}>
        mais cripto
      </button>
    </main>
  )
}
