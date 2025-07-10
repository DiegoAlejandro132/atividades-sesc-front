'use client';

import TabelaCrud from '@/componentes/tabelaCrud';

export default function Inscricoes() {

    const colunas = [
        { headerName: 'Cliente',        field: 'nome_cliente' },
        { headerName: 'Atividade',      field: 'atividade' },
        { headerName: 'Descrição',      field: 'descricao_atividade' },
        { headerName: 'Unidade SESC',   field: 'unidade_sesc' },
    ];

    const dados = [
        { nome_cliente: 'Cliente 1', atividade: 'atividade 1', descricao_atividade: "descricao", unidade_sesc: 'Unidade 1' },
        { nome_cliente: 'Cliente 2', atividade: 'atividade 2', descricao_atividade: "descricao", unidade_sesc: 'Unidade 2' },
    ];

    return (
        <div className='bg-gray-100 min-h-screen'>
            <div className='flex items-center justify-between px-4'>
                <h1 className='text-4xl font-bold text-center p-4'>Inscrições</h1>
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

