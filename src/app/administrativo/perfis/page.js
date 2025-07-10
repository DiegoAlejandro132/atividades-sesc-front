'use client';

import TabelaCrud from '@/componentes/tabelaCrud';
import Cadastro from '@/app/administrativo/perfis/cadastro';

export default function Perfis() {

    const colunas = [
        { headerName: 'Nome', field: 'nome_responsavel' },
        { headerName: 'Matrícula', field: 'matricula' },
        { headerName: 'Cadastro', field: 'data_cadastro' },
    ];

    const dados = [
        { nome_responsavel: 'Diego', matricula: '3215', data_cadastro: 30 },
        { nome_responsavel: 'Ana', matricula: '4548123', data_cadastro: 25 },
    ];

    const salvar = (form) => {
        const json = JSON.stringify(form);
        alert(`Salvo:\n${json}`);
    }

    return (
        <div className='bg-gray-100 min-h-screen'>
            <div className='flex items-center justify-between px-4'>
                <h1 className='text-4xl font-bold text-center p-4'>Perfis</h1>
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