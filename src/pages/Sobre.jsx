import { useState, useEffect } from 'react';

function Sobre() {
  // --- ESTADOS PARA OS FERIADOS ---
  const [anoFeriado, setAnoFeriado] = useState('2026'); 
  const [feriados, setFeriados] = useState([]);
  const [erroFeriados, setErroFeriados] = useState('');

  // --- ESTADOS PARA A TABELA FIPE (FLUXO COMPLETO) ---
  const [tipoVeiculo, setTipoVeiculo] = useState('carros'); 
  const [marcas, setMarcas] = useState([]);
  const [marcaSelecionada, setMarcaSelecionada] = useState('');
  
  const [modelos, setModelos] = useState([]);
  const [modeloSelecionado, setModeloSelecionado] = useState('');
  
  const [anos, setAnos] = useState([]);
  const [anoSelecionado, setAnoSelecionado] = useState('');
  
  const [precoFinal, setPrecoFinal] = useState(null);

  const [carregandoFipe, setCarregandoFipe] = useState(false);
  const [erroFipe, setErroFipe] = useState('');

  // --- 1. FUNÇÃO PARA BUSCAR FERIADOS ---
  const buscarFeriados = async () => {
    if (!anoFeriado || anoFeriado.length !== 4) {
      alert('Por favor, digite um ano válido com 4 dígitos.');
      return;
    }
    try {
      setErroFeriados('');
      const resposta = await fetch(`https://brasilapi.com.br/api/feriados/v1/${anoFeriado}`);
      if (!resposta.ok) throw new Error();
      const dados = await resposta.json();
      setFeriados(dados);
    } catch (err) {
      setErroFeriados('Erro ao buscar feriados.');
    }
  };

 // --- FIPE FASE 1: BUSCAR MARCAS (100% REAL) ---
  useEffect(() => {
    const buscarMarcas = async () => {
      try {
        setCarregandoFipe(true);
        setErroFipe('');
        // Limpa seleções anteriores ao mudar o tipo
        setMarcas([]); setMarcaSelecionada(''); setModelos([]); setModeloSelecionado(''); setAnos([]); setAnoSelecionado(''); setPrecoFinal(null);

        const resposta = await fetch(`https://brasilapi.com.br/api/fipe/marcas/v1/${tipoVeiculo}`);
        if (!resposta.ok) throw new Error('Não foi possível carregar as marcas.');
        
        const dados = await resposta.json();
        setMarcas(dados); // Salva as marcas reais vindas da API
      } catch (err) {
        setErroFipe('Erro ao carregar as marcas da API.');
      } finally {
        setCarregandoFipe(false);
      }
    };
    buscarMarcas();
  }, [tipoVeiculo]);

  // --- FIPE FASE 2: BUSCAR MODELOS (100% REAL) ---
  useEffect(() => {
    if (!marcaSelecionada) return;
    const buscarModelos = async () => {
      try {
        setCarregandoFipe(true);
        setErroFipe('');
        setModelos([]); setModeloSelecionado(''); setAnos([]); setAnoSelecionado(''); setPrecoFinal(null);

        const resposta = await fetch(`https://brasilapi.com.br/api/fipe/modelos/v1/${tipoVeiculo}/${marcaSelecionada}`);
        if (!resposta.ok) throw new Error('Não foi possível carregar os modelos.');
        
        const dados = await resposta.json();
        setModelos(dados.modelos); // Salva os modelos reais da API
      } catch (err) {
        setErroFipe('Erro ao carregar os modelos da API.');
      } finally {
        setCarregandoFipe(false);
      }
    };
    buscarModelos();
  }, [marcaSelecionada, tipoVeiculo]);

  // --- FIPE FASE 3: BUSCAR ANOS (100% REAL) ---
  useEffect(() => {
    if (!modeloSelecionado) return;
    const buscarAnos = async () => {
      try {
        setCarregandoFipe(true);
        setErroFipe('');
        setAnos([]); setAnoSelecionado(''); setPrecoFinal(null);

        const resposta = await fetch(`https://brasilapi.com.br/api/fipe/anos/v1/${tipoVeiculo}/${marcaSelecionada}/${modeloSelecionado}`);
        if (!resposta.ok) throw new Error('Não foi possível carregar os anos.');
        
        const dados = await resposta.json();
        setAnos(dados); // Salva os anos reais da API
      } catch (err) {
        setErroFipe('Erro ao carregar os anos da API.');
      } finally {
        setCarregandoFipe(false);
      }
    };
    buscarAnos();
  }, [modeloSelecionado, marcaSelecionada, tipoVeiculo]);

  // --- FIPE FASE 4: PREÇO FINAL (100% REAL) ---
  useEffect(() => {
    if (!anoSelecionado) return;
    const buscarPrecoFinal = async () => {
      try {
        setCarregandoFipe(true);
        setErroFipe('');
        
        const resposta = await fetch(`https://brasilapi.com.br/api/fipe/preco/v1/${tipoVeiculo}/${marcaSelecionada}/${modeloSelecionado}/${anoSelecionado}`);
        if (!resposta.ok) throw new Error('Não foi possível buscar o preço.');
        
        const dados = await response.json();
        setPrecoFinal(dados); // Mostra o valor real calculado pela FIPE
      } catch (err) {
        setErroFipe('Erro ao buscar o preço final da API.');
      } finally {
        setCarregandoFipe(false);
      }
    };
    buscarPrecoFinal();
  }, [anoSelecionado, modeloSelecionado, marcaSelecionada, tipoVeiculo]);

  const formatarData = (dataString) => {
    const [year, month, day] = dataString.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', color: '#fff', marginTop: '40px' }}>
      <h1>Sobre & Utilitários</h1>
      <p>Fique à vontade para conhecer mais sobre nós.</p>

      <hr style={{ margin: '30px 0', borderColor: '#444' }} />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', marginTop: '30px', textAlign: 'left', justifyContent: 'center' }}>
        
        {/* ================= PAINEL DE FERIADOS ================= */}
        <div style={{ flex: '1', minWidth: '280px', maxWidth: '400px', border: '1px solid #555', padding: '20px', borderRadius: '8px', backgroundColor: '#1e1e1e' }}>
          <h2>📅 Feriados Nacionais</h2>
          <div style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>
            <input
              type="text"
              value={anoFeriado}
              onChange={(e) => setAnoFeriado(e.target.value)}
              placeholder="Ex: 2026"
              maxLength={4}
              style={{ padding: '12px', width: '110px', fontSize: '16px', backgroundColor: '#fff', color: '#000', border: '2px solid #007bff', borderRadius: '4px' }}
            />
            <button onClick={buscarFeriados} style={{ padding: '12px 20px', fontSize: '14px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              Consultar
            </button>
          </div>
          {erroFeriados && <p style={{ color: '#ff6b6b' }}>{erroFeriados}</p>}
          <div style={{ maxHeight: '320px', overflowY: 'auto', border: '1px solid #444', padding: '10px', borderRadius: '4px', backgroundColor: '#121212' }}>
            {feriados.length === 0 && <p style={{ color: '#777' }}>Digite o ano e clique em Consultar.</p>}
            {feriados.map((f, i) => (
              <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid #333', fontSize: '14px' }}>
                <strong style={{ color: '#6ab04c' }}>{formatarData(f.date)}</strong> - {f.name}
              </div>
            ))}
          </div>
        </div>

        {/* ================= PAINEL FIPE COMPLETO ================= */}
        <div style={{ flex: '1', minWidth: '280px', maxWidth: '400px', border: '1px solid #555', padding: '20px', borderRadius: '8px', backgroundColor: '#1e1e1e' }}>
          <h2>🚗 Consulta Completa FIPE</h2>
          {carregandoFipe && <p style={{ color: '#e1b12c', margin: '5px 0' }}>Buscando dados no servidor...</p>}

          {/* PASSO 1: TIPO */}
          <div style={{ marginBottom: '12px' }}>
            <label style={{ fontSize: '12px', color: '#aaa', display: 'block' }}>1. Tipo de Veículo</label>
            <select value={tipoVeiculo} onChange={(e) => setTipoVeiculo(e.target.value)} style={{ padding: '10px', width: '100%', backgroundColor: '#fff', color: '#000', borderRadius: '4px' }}>
              <option value="carros">Carros</option>
              <option value="motos">Motos</option>
              <option value="caminhoes">Caminhões</option>
            </select>
          </div>

          {/* PASSO 2: MARCA */}
          <div style={{ marginBottom: '12px' }}>
            <label style={{ fontSize: '12px', color: '#aaa', display: 'block' }}>2. Selecione a Marca</label>
            <select value={marcaSelecionada} onChange={(e) => setMarcaSelecionada(e.target.value)} style={{ padding: '10px', width: '100%', backgroundColor: '#fff', color: '#000', borderRadius: '4px' }}>
              <option value="">-- Escolha uma Marca --</option>
              {marcas.map(m => <option key={m.valor} value={m.valor}>{m.nome}</option>)}
            </select>
          </div>

          {/* PASSO 3: MODELO */}
          <div style={{ marginBottom: '12px' }}>
            <label style={{ fontSize: '12px', color: '#aaa', display: 'block' }}>3. Selecione o Modelo</label>
            <select value={modeloSelecionado} disabled={!marcaSelecionada} onChange={(e) => setModeloSelecionado(e.target.value)} style={{ padding: '10px', width: '100%', backgroundColor: marcaSelecionada ? '#fff' : '#ddd', color: '#000', borderRadius: '4px' }}>
              <option value="">-- Escolha um Modelo --</option>
              {modelos.map(mod => <option key={mod.valor} value={mod.valor}>{mod.nome}</option>)}
            </select>
          </div>

          {/* PASSO 4: ANO */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontSize: '12px', color: '#aaa', display: 'block' }}>4. Selecione o Ano</label>
            <select value={anoSelecionado} disabled={!modeloSelecionado} onChange={(e) => setAnoSelecionado(e.target.value)} style={{ padding: '10px', width: '100%', backgroundColor: modeloSelecionado ? '#fff' : '#ddd', color: '#000', borderRadius: '4px' }}>
              <option value="">-- Escolha o Ano --</option>
              {anos.map(a => <option key={a.valor} value={a.valor}>{a.nome}</option>)}
            </select>
          </div>

          {/* EXIBIÇÃO DO PREÇO FINAL */}
          {precoFinal && (
            <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#121212', borderRadius: '6px', border: '1px solid #6ab04c', textAlign: 'center' }}>
              <span style={{ fontSize: '12px', color: '#6ab04c', fontWeight: 'bold', display: 'block' }}>PREÇO DA TABELA FIPE</span>
              <h2 style={{ color: '#fff', margin: '10px 0', fontSize: '28px' }}>{precoFinal.valor}</h2>
              <p style={{ margin: 0, fontSize: '13px', color: '#aaa' }}>Ref: {precoFinal.mesReferencia}</p>
              <span style={{ fontSize: '11px', color: '#777' }}>Código FIPE: {precoFinal.codigoFipe}</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export { Sobre };