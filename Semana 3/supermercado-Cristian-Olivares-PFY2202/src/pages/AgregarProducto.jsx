import { useState } from 'react';
import { useInventory } from '../hooks/useInventory';
import { useFormulario } from '../hooks/useFormulario';
import { usePageTitle } from '../hooks/usePageTitle';
import { TIPOS_PRODUCTO } from '../data/constants';
import { validarArticulo } from '../utils/validadores';
import PageHeader from '../components/PageHeader';
import CampoTexto from '../components/form/CampoTexto';
import CampoSelect from '../components/form/CampoSelect';

const FORM_VACIO = { nombre: '', marca: '', tipo: '', precio: '', stock: '' };

export default function AgregarProducto() {
  usePageTitle('Agregar artículo');
  const { articulos, agregarArticulo } = useInventory();
  const [exito, setExito] = useState('');

  const { valores, errores, handleChange, handleSubmit } = useFormulario(FORM_VACIO, (v) =>
    validarArticulo(v, articulos)
  );

  const onValido = (datos, reiniciar) => {
    agregarArticulo(datos);
    reiniciar();
    setExito(`«${datos.nombre}» se agregó correctamente al inventario.`);
  };

  return (
    <div className="mx-auto max-w-lg">
      <PageHeader titulo="Ingresar Nuevo Artículo" subtitulo="Completa los datos para registrar un producto." />

      <form onSubmit={handleSubmit(onValido)} noValidate className="card flex flex-col gap-4 sm:p-8">
        <CampoTexto
          id="nombre" label="Nombre del artículo" placeholder="Ej: Fideos Espagueti 400g"
          value={valores.nombre} onChange={handleChange} error={errores.nombre} maxLength={60}
        />
        <CampoTexto
          id="marca" label="Marca" placeholder="Ej: Lucchetti"
          value={valores.marca} onChange={handleChange} error={errores.marca} maxLength={40}
        />
        <CampoSelect
          id="tipo" label="Tipo de producto" placeholder="-- Selecciona una categoría --"
          opciones={TIPOS_PRODUCTO} value={valores.tipo} onChange={handleChange} error={errores.tipo}
        />
        <div className="grid grid-cols-2 gap-4">
          <CampoTexto
            id="precio" label="Precio (CLP)" placeholder="Ej: 1490" inputMode="numeric"
            value={valores.precio} onChange={handleChange} error={errores.precio} maxLength={8}
          />
          <CampoTexto
            id="stock" label="Stock (unidades)" placeholder="Ej: 30" inputMode="numeric"
            value={valores.stock} onChange={handleChange} error={errores.stock} maxLength={6}
          />
        </div>

        <button type="submit" className="btn-primary mt-2">Guardar Artículo</button>

        {exito && <p role="status" className="alert alert-success">{exito}</p>}
      </form>
    </div>
  );
}
