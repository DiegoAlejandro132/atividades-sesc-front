'use client';

import TabelaCrud from '@/componentes/tabelaCrud';
import Cadastro from '@/app/administrativo/responsavel_atividade/cadastro';

export default function ResponsaveisAtividades() {

    const colunas = [
        { headerName: 'Atividade', field: 'nome_atividade' },
        { headerName: 'Responsavel', field: 'responsavel' },
        { headerName: 'Matricula do responsavel', field: 'matricula' },
        { headerName: 'Descrição da atividade', field: 'descricao' },
    ];

    const dados = [
        { nome_atividade: 'Diego', responsavel: '3215', matricula: 30, descricao: 'Atividade de teste' },
    ];

    const salvar = (form) => {
        const json = JSON.stringify(form);
        alert(`Salvo:\n${json}`);
    }

    return (
        <div className='bg-gray-100 min-h-screen'>
            <div className='flex items-center justify-between px-4'>
                <h1 className='text-4xl font-bold text-center p-4'>Responsaveis por atividade</h1>
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