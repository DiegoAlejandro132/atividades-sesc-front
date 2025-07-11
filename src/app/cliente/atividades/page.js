'use client';

import TabelaCrud from '@/componentes/tabelaCrud';
import Cadastro from '@/app/cliente/atividades/cadastro';
import { useState, useEffect } from 'react';
import api from '@/services/axios'
import ModalInscricao from './inscricao';

export default function Atividades() {
    const [modalCadastroAberto, setModalCadastroAberto] = useState(false);
    const [modalInscricaoAberto, setModalInscricaoAberto] = useState(false);
    const [atividadeSelecionada, setAtividadeSelecionada] = useState(null);
    const [dados, setDados] = useState([]);

    const formatarData = (params) => {
        if (!params.value) return '';
        const data = new Date(params.value);
        
        const dataStr = data.toLocaleDateString('pt-BR', {
            timeZone: 'America/Manaus'
        });
        
        const horaStr = data.toLocaleTimeString('pt-BR', {
            timeZone: 'America/Manaus',
            hour: '2-digit',
            minute: '2-digit'
        });

        return `${dataStr} ${horaStr}`;
    };

    const colunas = [
        { headerName: 'Nome', field: 'nomeAtividade' },
        { headerName: 'Descrição', field: 'descricao' },
        { headerName: 'Unidade SESC', field: 'unidadeSesc' },
        { headerName: 'Cadastro da atividade', field: 'dataCriacao', filter: "agDateColumnFilter", valueFormatter: formatarData, valueGetter: (params) => new Date(params.data.dataCriacao) },
        {
            headerName: 'Ações',
            field: 'acoes',
            cellRenderer: (params) => {
                return (
                <button
                    onClick={() => {
                        setAtividadeSelecionada(params.data)
                        setModalInscricaoAberto(true);
                    }}
                    className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm cursor-pointer"
                >
                    Inscrever-se
                </button>
                );
            }
        }
    ];


    const listar = async() =>{
        try{
            const response = await api.get('/atividade')
            setDados(response.data)
        }catch(erro){
            console.log(erro)
        }
    }

    const cadastrar = async(form) => {
        try{
            const response = await api.post('/cliente', form)
            if (response.data){
                alert("cadastrado com sucesso")
            }
        }catch(erro){
            console.log(erro)
        }
    }

    const abrirCadastro = () => {
        setAtividadeSelecionada({ nomeAtividade: '', descricao: '', unidadeSesc: '' });
        setModalCadastroAberto(true);
    };

    useEffect(() => {
        listar()
    }, [])

    return (
        <div className='bg-gray-100 max-h-50'>
            <div className='flex items-center justify-between px-4'>
                <h1 className='text-4xl font-bold text-center p-4'>Atividades</h1>
                <button
                    onClick={abrirCadastro}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
                >
                    Cadastrar
                </button>
                <Cadastro
                    cadastrar={cadastrar}
                    aberto={modalCadastroAberto}
                    fechar={() => setModalCadastroAberto(false)}
                />
            </div>
            <TabelaCrud 
                colDefs={colunas}
                rowData={dados}
                campoOpcoes={false}
            />
            <ModalInscricao
                aberto={modalInscricaoAberto}
                fechar={() => setModalInscricaoAberto(false)}
                idAtividade={atividadeSelecionada?.id}
            />
        </div>
    )
}