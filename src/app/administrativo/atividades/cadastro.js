'use client';

import { useState } from 'react';
import Image from "next/image";

export default function Cadastro({ salvar }) {
    const [aberto, setAberto] = useState(false);
    const [form, setForm] = useState({ nome_atividade: '', descricao: '', unidade_sesc: '' });

    const abrir = () => setAberto(true);
    const fecharModal = () => setAberto(false);

    const onChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const submit = (e) => {
        e.preventDefault();
        setForm({ nome_atividade: '', descricao: '', unidade_sesc: '' });
        fecharModal();
        salvar(form);
    };

    return (
        <>
        <button
            onClick={abrir}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
            Adicionar
        </button>

        {aberto && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl shadow-lg w-100 p-6 relative">
                    <button
                        onClick={fecharModal}
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
                        Cadastro de perfil
                    </h3>

                    <form onSubmit={submit} className="space-y-4 flex flex-col items-center">
                        <div className="flex flex-col w-64">
                            <label htmlFor="nome_atividade" className="mb-1 font-medium">Nome da atividade</label>
                            <input
                                type="text"
                                name="nome_atividade"
                                id="nome_atividade"
                                value={form.nome_atividade}
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
                            <label htmlFor="unidade_sesc" className="mb-1 font-medium">Unidade SESC</label>
                            <input
                                type="text"
                                name="unidade_sesc"
                                id="unidade_sesc"
                                value={form.unidade_sesc}
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
                                Salvar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}
        </>
    );  
}
