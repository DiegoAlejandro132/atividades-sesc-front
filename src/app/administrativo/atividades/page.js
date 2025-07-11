'use client';

import TabelaCrud from '@/componentes/tabelaCrud';
import Cadastro from '@/app/administrativo/atividades/cadastro';
import { useState, useEffect } from 'react';
import api from '@/services/axios'

export default function Atividades() {
    const [modalAberto, setModalAberto] = useState(false);
    const [modo, setModo] = useState('Cadastrar');
    const [atividadeSelecionada, setatividadeSelecionada] = useState({ nomeAtividade: '', descricao: '', unidadeSesc: '' });
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
        { headerName: 'Cadastro', field: 'dataCriacao', filter: "agDateColumnFilter", valueFormatter: formatarData, valueGetter: (params) => new Date(params.data.dataCriacao) },
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
            const response = await api.post('/atividade', form)
            if (response.data){
                setDados(dadosAntigos => [...dadosAntigos, response.data])
            }
        }catch(erro){
            console.log(erro)
        }
    }

    const editar = async(form) => {
        try{
            const id = form.id
            const response = await api.put(`/atividade/${id}`, form)
            if (response.data){
                setDados(valoresAntigos => 
                    valoresAntigos.map(item => item.id === response.data.id ? response.data : item)
                )
            }
        }catch(erro){
            console.log(erro)
        }
    }

    const excluir = async(id) => {
        try{
            const response = await api.delete(`/atividade/${id}`)
            console.log(response)
            setDados(valoresAntigos =>
                valoresAntigos.filter(item => item.id !== id)
            )
        }catch(erro){
            console.log(erro)
        }
    }

    const abrirCadastro = () => {
        setModo('Cadastrar');
        setatividadeSelecionada({ nomeAtividade: '', descricao: '', unidadeSesc: '' });
        setModalAberto(true);
    };

    const abrirEdicao = (atividade) => {
        setModo('Editar');
        setatividadeSelecionada(atividade);
        setModalAberto(true);
    };

    useEffect(() => {
        listar()
    }, [])

    return (
        <div className='bg-gray-100 min-h-screen'>
            <div className='flex items-center justify-between px-4'>
                <h1 className='text-4xl font-bold text-center p-4'>Atividades</h1>
                <button
                    onClick={abrirCadastro}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
                >
                    Adicionar
                </button>
                <Cadastro
                    atividade={atividadeSelecionada}
                    acao={modo}
                    cadastrar={cadastrar}
                    editar={editar}
                    aberto={modalAberto}
                    fechar={() => setModalAberto(false)}
                />
            </div>
            <TabelaCrud 
                colDefs={colunas}
                rowData={dados}
                editar={(atividade) => {abrirEdicao(atividade)}}
                excluir={(atividade) => {excluir(atividade.id)}}
            />
        </div>
    )
}