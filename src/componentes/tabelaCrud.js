' use client'

import { AllCommunityModule,ModuleRegistry } from 'ag-grid-community'; 
import Image from "next/image";

ModuleRegistry.registerModules([AllCommunityModule]);
import { AgGridReact } from 'ag-grid-react'
import { useMemo } from 'react';


export default function TabelaCrud({
    colDefs = [],
    rowData = [],
    editar = () => {},
    excluir = () => {}
}){
    const defaultColDef = useMemo(() => ({
        resizable: true,
        sortable: true,
        filter: true,
        flex: 1,
        cellStyle: { textAlign: 'center', }
    }), []);

    const colunasComAcoes = useMemo(() => {
        return [
            ...colDefs,
            {
                headerName: "Ações",
                field: "acoes",
                cellRenderer: (params) =>{
                    return (
                        <div className="flex gap-6">
                            <button
                                onClick={() => editar(params.data)}
                                className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition cursor-pointer"
                            >
                                <Image 
                                    priority={true}
                                    src="/edit.svg" 
                                    alt="Retirar" 
                                    width={20} 
                                    height={20}
                                />
                            </button>
                            <button
                                onClick={() => excluir(params.data)}
                                className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition cursor-pointer"
                            >
                                <Image 
                                    priority={true}
                                    src="/delete.svg" 
                                    alt="Retirar" 
                                    width={20} 
                                    height={20}
                                />
                            </button>
                        </div>
                    )
                },
                cellStyle: { display: 'flex', justifyContent: 'center' },
                sortable: false,
                filter: false,
            }
        ]
    }, [colDefs, editar, excluir])

    return(
        <div className='p-4'>
            <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colunasComAcoes}
                    defaultColDef={defaultColDef}
                />
            </div>
        </div>
    )
}