import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { PokemonForList } from "../../interfaces"

interface PokemonTableProps{
    columns: ColumnDef<PokemonForList>[]
    data: PokemonForList[]
}

const PokemonTable = ({columns, data}:PokemonTableProps)=>{

    const { getHeaderGroups, getRowModel } = useReactTable({ 
        columns, 
        data,
        getCoreRowModel: getCoreRowModel()
    });
    return(
        <div className="flex items-center">
        <table className="w-full">
        <thead>
          {getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-sky-600  text-white small: text-sm ">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-2 py-0 md:py-4 ">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {getRowModel().rows.map((row) => (
            <tr key={row.id} className="bg-cyan-50 [&:nth-child(2n)]:bg-gray-200 small: text-sm ">
              {row.getVisibleCells().map((cell) => (
                <td id={cell.id} key={cell.id}>
                    
                    {cell.column.columnDef.cell && typeof cell.column.columnDef.cell!=="string"
                  ? cell.column.columnDef.cell(cell.getContext())
                  : cell.getValue()}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    )
}

export default PokemonTable