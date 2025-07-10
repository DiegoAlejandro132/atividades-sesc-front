'use client';

import { useState } from 'react';
import Image from "next/image";

export default function Cadastro({ salvar }) {
    const [aberto, setAberto] = useState(false);
    const [form, setForm] = useState({ nome: '', matricula: '' });

    const abrir = () => setAberto(true);
    const fecharModal = () => setAberto(false);

    const onChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const submit = (e) => {
        e.preventDefault();
        setForm({ nome: '', matricula: '' });
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
                            <label htmlFor="nome" className="mb-1 font-medium">Nome</label>
                            <input
                                type="text"
                                name="nome"
                                id="nome"
                                value={form.nome}
                                onChange={onChange}
                                className="border rounded p-2"
                                required
                            />
                        </div>

                        <div className="flex flex-col w-64">
                            <label htmlFor="matricula" className="mb-1 font-medium">Matrícula</label>
                            <input
                                type="text"
                                name="matricula"
                                id="matricula"
                                value={form.matricula}
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
