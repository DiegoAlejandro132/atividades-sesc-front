'use client';

import TabelaCrud from '@/componentes/tabelaCrud';

export default function GestaoAvaliacoes() {
    const colunas = [
        { headerName: 'Nome', field: 'nome_responsavel' },
        { headerName: 'Matrícula', field: 'matricula' },
        { headerName: 'Cadastro', field: 'data_cadastro' },
    ];
    
    const dados = [
        { nome_responsavel: 'Diego', matricula: '3215', data_cadastro: 30 },
        { nome_responsavel: 'Ana', matricula: '4548123', data_cadastro: 25 },
    ];

    return (
        <div className='bg-gray-100 min-h-screen'>
            <div className='flex items-center justify-between px-4'>
                <h1 className='text-4xl font-bold text-center p-4'>Gestão de avaliações</h1>
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
            />
        </div>
    )
}