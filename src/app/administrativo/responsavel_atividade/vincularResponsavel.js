'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import api from '@/services/axios'; // Certifique-se de importar corretamente

export default function VincularResponsavel({ 
    aberto,
    fechar,
    vincular
}) {
    const [atividades, setAtividades] = useState([]);
    const [responsaveis, setResponsaveis] = useState([]);
    const [form, setForm] = useState({
        idAtividade: '',
        idResponsavel: ''
    });

    const onChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const submit = (e) => {
        e.preventDefault();
        vincular(form);
        fechar();
    };

    useEffect(() => {
        const buscarDados = async () => {
            try {
                const [resAtividades, resResponsaveis] = await Promise.all([
                    api.get('/atividade/sem-responsavel'),
                    api.get('/responsavel')
                ]);

                setAtividades(resAtividades.data);
                setResponsaveis(resResponsaveis.data);
            } catch (erro) {
                console.error("Erro ao carregar dados:", erro);
            }
        };

        if (aberto) {
            buscarDados();
            setForm({ idAtividade: '', idResponsavel: '' })
        }
    }, [aberto]);

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

                        <h3 className="text-xl font-bold text-center mb-6 m-4">
                            Vincular Responsável à Atividade
                        </h3>

                        <form onSubmit={submit} className="space-y-4 flex flex-col items-center">
                            <div className="flex flex-col w-64">
                                <label htmlFor="idAtividade" className="mb-1 font-medium">Atividade</label>
                                <select
                                    name="idAtividade"
                                    id="idAtividade"
                                    value={form.idAtividade}
                                    onChange={onChange}
                                    className="border rounded p-2"
                                    required
                                >
                                    <option value="">Selecione uma atividade</option>
                                    {atividades.map((atividade) => (
                                        <option key={atividade.id} value={atividade.id}>
                                            {atividade.nomeAtividade}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex flex-col w-64">
                                <label htmlFor="idResponsavel" className="mb-1 font-medium">Responsável</label>
                                <select
                                    name="idResponsavel"
                                    id="idResponsavel"
                                    value={form.idResponsavel}
                                    onChange={onChange}
                                    className="border rounded p-2"
                                    required
                                >
                                    <option value="">Selecione um responsável</option>
                                    {responsaveis.map((responsavel) => (
                                        <option key={responsavel.id} value={responsavel.id}>
                                            {responsavel.nomeResponsavel}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex justify-center pt-4">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-40 cursor-pointer"
                                >
                                    Vincular
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
