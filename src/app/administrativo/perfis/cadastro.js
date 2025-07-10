'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";

export default function Cadastro({ 
    cadastrar,
    editar,
    aberto,
    fechar,
    acao = 'cadastro',
    perfil = {}
}) {
    const [form, setForm] = useState({
        nomeResponsavel: perfil.nomeResponsavel || '',
        matricula: perfil.matricula || ''
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
            nomeResponsavel: perfil.nomeResponsavel || '',
            matricula: perfil.matricula || '',
            id: perfil.id || null
        })
    }, [perfil]);

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
                            { acao === "Editar" ? "Editar perfil" : "Cadastro de perfil" }
                        </h3>

                        <form onSubmit={submit} className="space-y-4 flex flex-col items-center">
                            <div className="flex flex-col w-64">
                                <label htmlFor="nomeResponsavel" className="mb-1 font-medium">Nome</label>
                                <input
                                    type="text"
                                    name="nomeResponsavel"
                                    id="nomeResponsavel"
                                    value={form.nomeResponsavel}
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
                                    cadastrar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );  
}
