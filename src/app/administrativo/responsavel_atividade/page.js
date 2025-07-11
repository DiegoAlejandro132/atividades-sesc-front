'use client';

import TabelaCrud from '@/componentes/tabelaCrud';
import Vincular from '@/app/administrativo/responsavel_atividade/vincularResponsavel';
import { useEffect, useState } from 'react';
import api from '@/services/axios';

export default function ResponsaveisAtividades() {

    const [dados, setDados] = useState([]);
    const [modalAberto, setModalAberto] = useState(false);

    const colunas = [
        { headerName: 'Atividade', field: 'nomeAtividade' },
        { headerName: 'Descrição da atividade', field: 'descricao' },
        { 
            headerName: 'Responsável', 
            valueGetter: params => params.data.responsavel?.nome || 'Sem responsável' 
        },
        { 
            headerName: 'Matrícula', 
            valueGetter: params => params.data.responsavel?.matricula || '-' 
        },
        {
            headerName: 'Ações',
            field: 'acoes',
            cellRenderer: (params) => {
                return params.data.responsavel ? (
                    <button
                        onClick={() => desvincular(params.data.id)}
                        className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm cursor-pointer"
                    >
                        Desvincular
                    </button>
                ) : null;
            }
        }
    ];

    const listar = async() => {
        try {
            const response = await api.get('/atividade');
            setDados(response.data)
        } catch (erro) {
            alert("Houve um erro ao listar as atividades")
            console.log(erro);
        }
    }

    const vincular = async (form) => {
        try {
            const response = await api.post("atividade/vincular-responsavel", form);

            if (response.data) {
                const responsavelVinculado = {
                    id: response.data.id,
                    nome: response.data.nome,
                    matricula: response.data.matricula
                };

                setDados(valoresAntigos => 
                    valoresAntigos.map(item => 
                        item.id === form.idAtividade 
                            ? { ...item, responsavel: responsavelVinculado }
                            : item
                    )
                );
            }
        } catch (erro) {
            alert("Houve um erro ao vincular o responsavel à atividade")
            console.log("Erro ao vincular:", erro);
        }
    }

    const desvincular = async(idAtividade) => {
        try{
            const response = await api.delete(`/atividade/desvincular-responsavel/${idAtividade}`)
            if (response.data){
                const atividade = response.data
                setDados(valoresAntigos => 
                    valoresAntigos.map(item => 
                        item.id === idAtividade 
                            ? atividade
                            : item
                    )
                );
            }
        }catch(erro){
            alert("Houve um erro ao desvincular o responsavel da atividade")
            console.log(erro)
        }
    }

    useEffect(() => {
        listar()
    }, [])

    return (
        <div className='bg-gray-100 min-h-screen'>
            <div className='flex items-center justify-between px-4'>
                <h1 className='text-4xl font-bold text-center p-4'>Responsaveis por atividade</h1>
                <button
                    onClick={() => setModalAberto(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
                >
                    Vincular
                </button>
                <Vincular
                    aberto={modalAberto}
                    fechar={() => setModalAberto(false)}
                    vincular={vincular}
                />
            </div>
            <TabelaCrud 
                colDefs={colunas}
                rowData={dados}
                editar={() => {
                    alert("editar perfil")
                }}
                excluir={() => {
                    alert("excluir perfil")
                }}
                campoOpcoes={false}
            />
        </div>
    )
}