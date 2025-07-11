'use client';

import TabelaCrud from '@/componentes/tabelaCrud';
import Cadastro from '@/app/administrativo/perfis/cadastro';
import api from '@/services/axios'
import { useState, useEffect } from 'react';

export default function Perfis() {

    const [modalAberto, setModalAberto] = useState(false);
    const [modo, setModo] = useState('Cadastrar');
    const [perfilSelecionado, setPerfilSelecionado] = useState({ nome: '', matricula: '' });
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
        { headerName: 'Nome', field: 'nomeResponsavel' },
        { headerName: 'Matrícula', field: 'matricula' },
        { headerName: 'Cadastro', field: 'dataCriacao', filter: "agDateColumnFilter", valueFormatter: formatarData, valueGetter: (params) => new Date(params.data.dataCriacao) },
    ];

    const listar = async() =>{
        try{
            const response = await api.get('/responsavel')
            setDados(response.data)
        }catch(erro){
            alert("Houve um erro ao listar os pefis")
            console.log(erro)
        }
    }

    const cadastrar = async(form) => {
        try{
            const response = await api.post('/responsavel', form)
            if (response.data){
                setDados(dadosAntigos => [...dadosAntigos, response.data])
            }
        }catch(erro){
            alert("Houve um erro ao cadastrar o perfil")
            console.log(erro)
        }
    }

    const editar = async(form) => {
        try{
            const id = form.id
            const response = await api.put(`/responsavel/${id}`, form)
            if (response.data){
                setDados(valoresAntigos => 
                    valoresAntigos.map(item => item.id === response.data.id ? response.data : item)
                )
            }
        }catch(erro){
            alert("Houve um erro ao editar o perfil desejado")
            console.log(erro)
        }
    }

    const excluir = async(id) => {
        try{
            const response = await api.delete(`/responsavel/${id}`)
            setDados(valoresAntigos =>
                valoresAntigos.filter(item => item.id !== id)
            )
        }catch(erro){
            alert("Houve um erro ao excluir o perfil desejado")
            console.log(erro)
        }
    }

    const abrirCadastro = () => {
        setModo('Cadastrar');
        setPerfilSelecionado({ nomeResponsavel: '', matricula: '' });
        setModalAberto(true);
    };

    const abrirEdicao = (perfil) => {
        setModo('Editar');
        setPerfilSelecionado(perfil);
        setModalAberto(true);
    };

    useEffect(() => {
        listar()
    }, [])

    return (
        <div className='bg-gray-100 min-h-screen'>
            <div className='flex items-center justify-between px-4'>
                <h1 className='text-4xl font-bold text-center p-4'>Perfis</h1>
                <button
                    onClick={abrirCadastro}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
                >
                    Adicionar
                </button>
                <Cadastro
                    perfil={perfilSelecionado}
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
                editar={(perfil) => abrirEdicao(perfil)}
                excluir={(perfil) => {
                    excluir(perfil.id)
                }}
            />
        </div>
    )
}