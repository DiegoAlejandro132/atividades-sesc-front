'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";

export default function Cadastro({ 
    cadastrar,
    editar,
    aberto,
    fechar,
    acao = 'cadastro',
    atividade = {}
 }) {
    const [form, setForm] = useState({
        nomeAtividade: atividade.nomeAtividade || '',
        descricao: atividade.descricao || '',
        unidadeSesc: atividade.unidadeSesc || ''
    })

    const onChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const submit = (e) => {
        e.preventDefault();
        fechar();
        if (acao === "Editar"){
            editar(form)
        }else{
            cadastrar(form);
        }
    };

    useEffect(() => {
        setForm({
            nomeAtividade: atividade.nomeAtividade || '',
            descricao: atividade.descricao || '',
            unidadeSesc: atividade.unidadeSesc || '',
            id: atividade.id || null
        })
    }, [atividade]);

    return (
        <>
            {aberto && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg w-100 p-6 relative">
                        <button
                            onClick={fechar}
                            className="absolute top-4 right-4"
                            aria-label="Fechar"
                        >
                            <Image
                                priority={true}
                                className='cursor-pointer'
                                src="/close.svg"
                                alt="Fechar modal"
                                width={30}
                                height={30}
                            />
                        </button>

                        <h3 className="text-xl font-bold text-center mb-6">
                            Cadastro de atividade
                        </h3>

                        <form onSubmit={submit} className="space-y-4 flex flex-col items-center">
                            <div className="flex flex-col w-64">
                                <label htmlFor="nomeAtividade" className="mb-1 font-medium">Nome da atividade</label>
                                <input
                                    type="text"
                                    name="nomeAtividade"
                                    id="nomeAtividade"
                                    value={form.nomeAtividade}
                                    onChange={onChange}
                                    className="border rounded p-2"
                                    required
                                />
                            </div>

                            <div className="flex flex-col w-64">
                                <label htmlFor="descricao" className="mb-1 font-medium">Descrição</label>
                                <input
                                    type="text"
                                    name="descricao"
                                    id="descricao"
                                    value={form.descricao}
                                    onChange={onChange}
                                    className="border rounded p-2"
                                    required
                                />
                            </div>

                            <div className="flex flex-col w-64">
                                <label htmlFor="unidadeSesc" className="mb-1 font-medium">Unidade SESC</label>
                                <input
                                    type="text"
                                    name="unidadeSesc"
                                    id="unidadeSesc"
                                    value={form.unidadeSesc}
                                    onChange={onChange}
                                    className="border rounded p-2"
                                    required
                                />
                            </div>

                            <div className="flex justify-center pt-4">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-40 cursor-pointer"
                                >
                                    {acao === "Editar" ? "Salvar" : "Cadastrar"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );  
}
