'use client';

import TabelaCrud from '@/componentes/tabelaCrud';
import Cadastro from '@/app/administrativo/atividades/cadastro';

export default function Atividades() {

    const colunas = [
        { headerName: 'Nome', field: 'nome_atividade' },
        { headerName: 'Descrição', field: 'descricao' },
        { headerName: 'Unidade SESC', field: 'unidade_sesc' },
        { headerName: 'Data de criação', field: 'data_criacao' },
    ];

    const dados = [
        { nome_atividade: 'Atividade 1', descricao: 'teste 1', unidade_sesc: 'unidade 1', data_criacao: '28/04/2002' },
        { nome_atividade: 'Atividade 1', descricao: 'teste 2', unidade_sesc: 'unidade 2', data_criacao: '28/04/2002' },
    ];

    const salvar = (form) => {
        const json = JSON.stringify(form);
        alert(`Salvo:\n${json}`);
    }

    return (
        <div className='bg-gray-100 min-h-screen'>
            <div className='flex items-center justify-between px-4'>
                <h1 className='text-4xl font-bold text-center p-4'>Atividades</h1>
                <Cadastro
                    salvar={salvar}
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
            />
        </div>
    )
}