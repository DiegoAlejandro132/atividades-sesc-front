'use client';

import TabelaCrud from '@/componentes/tabelaCrud';
import { useEffect, useState } from 'react';
import api from '@/services/axios';

export default function Inscricoes() {

    const [dados, setDados] = useState([])

    const colunas = [
        { headerName: 'Cliente',        field: 'nomeCliente' },
        { headerName: 'Atividade',      field: 'nomeAtividade' },
        { headerName: 'Unidade SESC',   field: 'unidadeSesc' },
    ];

    const listar = async() => {
        try{
            const response = await api.get('/inscricao')
            setDados(response.data)
        }catch(erro){
            alert("Houve um erro ao listar as inscrições")
            console.log(erro)
        }
    }

    useEffect(() => {
        listar()
    } ,[])

    return (
        <div className='bg-gray-100 min-h-screen'>
            <div className='flex items-center justify-between px-4'>
                <h1 className='text-4xl font-bold text-center p-4'>Inscrições</h1>
            </div>
            <TabelaCrud 
                colDefs={colunas}
                rowData={dados}
                campoOpcoes={false}
            />
        </div>
    )
}

